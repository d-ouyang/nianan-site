/**
 * Aurora —— 极光流体背景。
 *
 * 来源：reactbits.dev（Backgrounds / Aurora，TS + Tailwind 版）
 * 仓库：https://github.com/DavidHDev/react-bits  src/ts-tailwind/Backgrounds/Aurora/Aurora.tsx
 * 复制进仓库而非装依赖：reactbits 的设计就是「代码归你」，站点消失也不影响使用。
 *
 * 相对原版的三处改动（都是原版会踩的坑，改完才能进生产）：
 *   1. 原版在 rAF 里**每帧** map 一遍 colorStops 并 new Color(hex) —— 每秒凭空造 180 个对象。
 *      改成只在 colorStops 变化时算一次，rAF 里只写 uniform。
 *   2. 原版无离屏暂停：滚到第二屏它还在满速渲染。加了 IntersectionObserver，不可见就停 rAF。
 *   3. 原版无降级与 dpr 上限：移动端 3x 屏按原分辨率跑全屏 shader，掉帧加发热。
 *      这里 dpr 封顶 2；「要不要跑」交给上层 canRunWebGL() 判断。
 */

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export interface AuroraProps {
  /** 三个色标，取全站强调色的同色相分级（不引入第二个色相） */
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

// 默认色 = 设计令牌的强调色系（accent-deep → accent-soft → accent-deep）
const DEFAULT_STOPS = ['#00997a', '#5cffd0', '#00997a'];

export default function Aurora({
  colorStops = DEFAULT_STOPS,
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  className = '',
}: AuroraProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  // colorStops 是数组，引用每次渲染都变，不能直接进依赖数组（会无限重建 WebGL 上下文）。
  // 用它拼成的字符串当依赖，内容不变就不重建。
  const stopsKey = colorStops.join(',');

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
    } catch {
      // 没有 WebGL2（shader 是 #version 300 es）或上下文创建失败：
      // 什么都不画，背景保持 CSS 渐变，不要让整页崩掉。
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: Program | undefined;

    const resize = () => {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    };
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    // 只在依赖变化时转换一次颜色，不在 rAF 里重复构造
    const stops = stopsKey.split(',').map((hex) => {
      const c = new Color(hex.trim());
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: stops },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    let running = false;
    let clock = 0;
    let last = performance.now();

    const update = () => {
      animateId = requestAnimationFrame(update);
      if (!program) return;
      // 用真实时间差推进，而不是帧计数：掉帧时动画不会变慢，也便于离屏暂停后续接
      const now = performance.now();
      clock += ((now - last) / 1000) * speed;
      last = now;
      program.uniforms.uTime.value = clock * 0.1;
      renderer.render({ scene: mesh });
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      animateId = requestAnimationFrame(update);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animateId);
    };

    // 离屏就停：滚到第二屏还在满速渲染毫无意义，白耗 GPU 与电量
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(ctn);

    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend, speed, stopsKey]);

  return <div ref={ctnDom} className={`h-full w-full ${className}`} />;
}
