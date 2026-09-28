/**
 * 运行期能力探测：决定「要不要给这个用户上 WebGL 背景」。
 *
 * 为什么不无条件上 shader：全屏 WebGL 在移动端是「好看但烫手」—— 掉帧、耗电、风扇转。
 * 与其事后补救，不如加载时就不初始化。
 */

/** 是否允许运行 WebGL 背景（Hero 用） */
export function canRunWebGL(): boolean {
  if (typeof window === 'undefined') return false;

  const mq = window.matchMedia;

  // 用户明确要求减弱动效：一律降级为静态。这是无障碍硬要求，不是可选项。
  if (mq?.('(prefers-reduced-motion: reduce)').matches) return false;

  // 移动端（含平板竖屏）不上 shader：改走 CSS 静态渐变
  if (mq?.('(max-width: 768px)').matches) return false;

  // Aurora 的 fragment shader 是 `#version 300 es`，只有 WebGL2 能编译。
  // WebGL1 设备上不检测就直接 new Renderer，会得到一块黑屏加满控制台报错。
  try {
    const probe = document.createElement('canvas');
    const gl2 = probe.getContext('webgl2');
    return Boolean(gl2);
  } catch {
    return false;
  }
}

/** devicePixelRatio 上限：3x 屏按原分辨率渲染等于 GPU 负载翻 2.25 倍，肉眼看不出差别 */
export function maxDpr(): number {
  return Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 2);
}
