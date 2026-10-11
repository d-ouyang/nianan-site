/**
 * 简历内容的唯一数据源。
 * 页面只负责排版。补经历、技能、项目只改这里。
 */

export const profile = {
  name: '欧阳鼎',
  /** 邮箱 ding.ouyang 的写法：名在前，姓在后。 */
  nameEn: 'Ding Ouyang',
  site: 'nianan.site',
  role: '前端·全栈·AI Agent',
};

/** 年限和总时段写在时间轴上方，不记到某一家公司头上。 */
export const experienceNote = '前端开发 10 年，AI Agent 开发 1 年。';
export const experienceSpan = '2017.03 – 2026.08';

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
}

export const experience: TimelineItem[] = [
  {
    period: '2021.03 – 2026.08',
    title: '前端开发',
    org: '锅圈食品（上海）股份有限公司',
  },
  {
    period: '2019.03 – 2021.03',
    title: '前端工程师',
    org: '数说新奇信息技术（上海）有限公司',
  },
  {
    period: '2017.02 – 2018.12',
    title: 'H5前端工程师',
    org: '讯泊网络科技（上海）',
  },
];

export const education: TimelineItem[] = [
  {
    period: '2012.08 – 2016.06',
    title: '机械设计制造及自动化 · 全日制本科',
    org: '合肥大学',
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
  {
    name: '前端',
    items: [
      'Vue 3',
      'React',
      'TypeScript',
      'Vite',
      'Pinia',
      'Tailwind CSS',
      'UniApp / 小程序',
      'Canvas / WebGL',
    ],
  },
  {
    name: '后端',
    items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'LangChain', 'REST / NDJSON 流式', 'JWT 鉴权'],
  },
  {
    name: 'AI Agent 工程',
    items: [
      '任务拆解',
      '工具调用',
      '工作流',
      'RAG（检索增强）',
      '向量数据库 / 重排',
      'MCP',
      '多 Agent 协作',
    ],
  },
  {
    name: '运维 / 部署',
    items: ['Docker / Compose', 'Nginx', 'CI/CD', 'MySQL', 'Redis', 'Chroma', 'Linux', 'HTTPS / TLS'],
  },
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
