/** 校验邮箱格式。不探测这个地址是否真实存在。 */
export function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  if (email.length < 3 || email.length > 254) return false;

  const at = email.indexOf('@');
  if (at <= 0 || at !== email.lastIndexOf('@')) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;

  if (domain.length > 253 || domain.includes('..')) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  if (
    !labels.every(
      (label) =>
        label.length > 0 &&
        label.length <= 63 &&
        /^[a-zA-Z0-9-]+$/.test(label) &&
        !label.startsWith('-') &&
        !label.endsWith('-'),
    )
  ) {
    return false;
  }

  const tld = labels[labels.length - 1];
  return tld.length >= 2 && /^[a-zA-Z]+$/.test(tld);
}
