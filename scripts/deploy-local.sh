#!/usr/bin/env bash
# nianan-site 手动部署脚本（自动部署的兜底）
# 正常流程：git tag vX.Y.Z && git push origin main --tags → GitHub Actions 自动部署
# 本脚本只在 runner 不可用 / 紧急回滚时手动跑，效果与 CI 完全一致：
#   本地构建（tsc + vite）→ rsync dist/ → 服务器 /var/www/personal
#
# 用法：bash scripts/deploy-local.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SERVER="${DEPLOY_SERVER:-ubuntu@42.192.111.82}"
DEST="/var/www/personal"

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
