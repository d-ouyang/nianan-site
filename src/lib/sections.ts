/**
 * 区块注册表 —— 导航的唯一数据源。
 *
 * Dock 高亮、滚动进度、URL hash、锚点跳转全部从这一份列表派生。
 * 加/删区块只改这里，导航不必同步改（P0-4 填内容时也不会碰到导航代码）。
 */

export interface SectionMeta {
  id: string;
  label: string;
}

export const SECTIONS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'timeline', label: '经历' },
  { id: 'contact', label: '联系' },
] as const satisfies readonly SectionMeta[];

export type SectionId = (typeof SECTIONS)[number]['id'];

/** 除 Hero 外的区块 —— P0-3 先用占位，P0-4 逐个换成真实内容 */
export const CONTENT_SECTIONS = SECTIONS.filter((s) => s.id !== 'hero');
