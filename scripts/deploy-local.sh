#!/usr/bin/env bash
# nianan-site 手动部署脚本（自动部署的兜底）
# 正常流程：git tag vX.Y.Z && git push origin main --tags → GitHub Actions 自动部署
# 本脚本只在 runner 不可用 / 紧急回滚时手动跑，效果与 CI 完全一致：
#   本地构建（tsc + vite）→ rsync dist/ → 服务器 /var/www/personal
#
# 用法：bash scripts/deploy-local.sh
# 服务器地址不写在仓库里：从 scripts/.deploy-env（gitignore，本机私有）或环境变量
# DEPLOY_SERVER 读取。克隆本项目的人没有这两样，脚本会在第一步就拒绝执行。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# ── 部署目标：.deploy-env 私有配置 > 环境变量，都没有就拒绝 ──
ENV_FILE="$ROOT/scripts/.deploy-env"
[ -f "$ENV_FILE" ] && . "$ENV_FILE"
SERVER="${DEPLOY_SERVER:-}"
DEST="${DEPLOY_DEST:-/var/www/personal}"
[ -n "$SERVER" ] || {
  echo "❌ 未配置部署目标。请复制 scripts/.deploy-env.example 为 scripts/.deploy-env 并填入你的服务器地址（该文件不会入库）"
  exit 1
}

# ── 前置守卫：不满足条件直接拒绝，防误发 ──
branch="$(git rev-parse --abbrev-ref HEAD)"
[ "$branch" = "main" ] || { echo "❌ 当前分支是 $branch，只允许从 main 部署"; exit 1; }

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "❌ 工作区有未提交改动，先 commit 再部署："
  git status --short
  exit 1
fi

echo "[1/3] 同步远程，确认本地不落后于 origin/main"
git fetch origin main --tags
behind="$(git rev-list --count HEAD..origin/main)"
[ "$behind" = "0" ] || { echo "❌ 本地落后 origin/main $behind 个提交，先 pull 再部署"; exit 1; }

echo "[2/3] 构建（tsc -b && vite build）"
pnpm install --frozen-lockfile
pnpm build
test -f dist/index.html || { echo "❌ dist/index.html 不存在，构建产物异常"; exit 1; }

echo "[3/3] 发布到 $SERVER:$DEST"
rsync -av --delete dist/ "$SERVER:$DEST/"
ssh "$SERVER" "chmod -R a+rX $DEST"
echo "✅ 部署完成：https://nianan.site（静态产物无需 reload Caddy）"
