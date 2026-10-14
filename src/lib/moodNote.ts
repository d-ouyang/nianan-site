export interface MoodNotePayload {
  email: string;
  /** -1 低落，0 平静，1 开心 */
  mood: number;
}

export type MoodSubmitResult =
  /** 已入库 */
  | 'ok'
  /** 同一邮箱在冷却窗口内提交过（后端默认 10 分钟） */
  | 'duplicate'
  /** 同一 IP 每分钟超过 3 次 */
  | 'rate-limited'
  /** 网络/服务异常 */
  | 'error';

/**
 * 提交到本站后端（rag-qa-system 的 site-mood 模块）。
 *
 * 请求路径 `/api/mood/submit` 由边缘 nginx 同源转发到网关的
 * `/api/v1/mood/submit`——同源直发，没有跨域问题，也不暴露后端地址。
 * 后端契约：HTTP 200 = 请求被正常处理；业务上成没成看 body 里的
 * `ok` / `reason`（`rate_limited` | `duplicate`）。
 */
export async function submitMoodNote(payload: MoodNotePayload): Promise<MoodSubmitResult> {
  try {
    const res = await fetch('/api/mood/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return 'error';
    const data = (await res.json()) as { ok?: boolean; reason?: string };
    if (data.ok) return 'ok';
    if (data.reason === 'duplicate') return 'duplicate';
    if (data.reason === 'rate_limited') return 'rate-limited';
    return 'error';
  } catch {
    return 'error';
  }
}
