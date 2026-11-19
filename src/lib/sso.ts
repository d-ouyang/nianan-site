/**
 * 演示 SSO（v2.4.4）：点项目卡片 → 生成一次性 HMAC ticket → 跳转对应项目免登录。
 *
 * 安全边界：密钥随本文件进入构建产物（公开可读），因此目标后端的白名单
 * （username 必须 demo 前缀）才是真正的防线——ticket 只能换演示账号的 token。
 */
const SSO_SECRET = '5f0bfcdb07e39fab929cad605b883a5d56c00d92387278dcf57914625b08dafb';
const DEMO_USERS = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6'];

const TARGET_URL: Record<'rag' | 'office', string> = {
  rag: 'https://qa.nianan.site/',
  office: 'https://office.nianan.site/',
};

async function makeSsoTicket(username: string): Promise<string> {
  const payload = JSON.stringify({ u: username, exp: Math.floor(Date.now() / 1000) + 60 });
  // base64url（无 padding）：与后端验签的解码口径一致
  const b64 = btoa(unescape(encodeURIComponent(payload)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SSO_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(b64));
  const hex = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${b64}.${hex}`;
}

/** 随机取一个演示账号（分散配额），生成 ticket 后整页跳转。 */
export function enterDemo(target: 'rag' | 'office'): void {
  const user = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
  void makeSsoTicket(user).then((ticket) => {
    window.location.href = `${TARGET_URL[target]}?sso=${encodeURIComponent(ticket)}`;
  });
}
