/**
 * 简历内容的唯一数据源。
 * 页面只负责排版。补经历、技能、项目只改这里。
 */

export const profile = {
  name: '欧阳鼎',
  site: 'nianan.site',
  role: '前端 · AI Agent 工程',
};

/** 年限写在这段经历上方，不记到某一家公司头上。更早的公司不列。 */
export const experienceNote = '前端开发 9 年，AI 开发 1 年。';

export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  summary: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: '2021.03 – 2026.08',
    title: '前端开发',
    org: '锅圈食品（上海）股份有限公司',
    summary: '2021年3月15日入职，2026年8月12日离职，在职 5 年 4 个月。',
    points: [],
  },
];

export interface ContactLink {
  kind: 'phone' | 'email' | 'github';
  label: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  { kind: 'phone', label: '18717897274', href: 'tel:18717897274' },
  { kind: 'email', label: 'ding.ouyang0514@gmail.com', href: 'mailto:ding.ouyang0514@gmail.com' },
  { kind: 'github', label: 'github.com/d-ouyang', href: 'https://github.com/d-ouyang' },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { name: '前端', items: ['TypeScript', 'React', 'Tailwind CSS', 'WebGL'] },
  { name: 'AI Agent 工程', items: ['任务拆解', '工具调用', '工作流'] },
];

export interface ProjectItem {
  name: string;
  meta: string;
  summary: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    name: 'nianan.site',
    meta: '个人网站 · 2026',
    summary: '一页简历。首页留着背景动效，往下按技能、项目、经历、联系来读。',
    tags: ['React', 'TypeScript', 'WebGL'],
  },
];
