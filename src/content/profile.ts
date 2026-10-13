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
    title: 'web前端研发工程师',
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

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectHighlight {
  title: string;
  body: string;
}

export interface ProjectIteration {
  version: string;
  date: string;
  title: string;
  gain: string;
}

export interface ProjectItem {
  name: string;
  meta: string;
  summary: string;
  tags: string[];
  stack: string[];
  metrics: ProjectMetric[];
  highlights: ProjectHighlight[];
  iterations: ProjectIteration[];
}

export const projects: ProjectItem[] = [
  {
    name: '企业级 RAG 智能问答系统',
    meta: '全栈 · AI Agent · 2026.09 – 2026.10',
    summary:
      '公司内部知识库问答系统：上传文档自动解析入库，提问后流式作答并附引用溯源。三周内从本地原型迭代到域名 HTTPS 上线，40+ 个版本 tag、1376 项自动化测试守着。',
    tags: ['FastAPI', 'LangChain', 'Chroma', 'Vue 3', 'NestJS', 'MySQL', 'Docker', 'RAG'],
    stack: [
      '后端：FastAPI + LangChain LCEL + Celery',
      '检索：Chroma 向量库 + bge-large-zh（1024d）+ bge-reranker-v2-m3 重排（硅基流动）',
      '网关：NestJS（Express 4）+ passport-jwt，全局 fail-closed 鉴权',
      '数据：MySQL（业务真相源）+ Redis（任务队列）+ Chroma（向量），三层各司其职',
      '前端：Vue 3 + TS + Vite + Pinia；管理端 Element Plus',
      '部署：Docker Compose 六容器 + 边缘 nginx + TLS + CI/CD 自动发布',
    ],
    metrics: [
      { label: '版本 tag', value: '40+' },
      { label: '自动化测试', value: '1376 项' },
      { label: '知识库规模', value: '35 文档 / 90 切片' },
      { label: '评测集', value: '40 条 golden' },
      { label: '0→1 上线', value: '3 周' },
      { label: '部署形态', value: '6 容器一键起停' },
    ],
    highlights: [
      {
        title: '流式链路选型 NDJSON 而非 SSE',
        body: '网关统一错误体只包自身错误、后端错误体原样透传——包装会破坏流式；配套 nginx 关 proxy_buffering、read_timeout 放到 300s，否则响应被攒成一坨整段下发。',
      },
      {
        title: '信任边界 fail-closed',
        body: '网关全局 JwtAuthGuard + @Public 白名单；无条件剥离 8 个入站身份头再注入真实身份；后端验过网关证明才认身份头，缺密钥直接 503 拒绝启动，不做「悄悄放行」。',
      },
      {
        title: '数据分层纠错',
        body: '曾把会话与问答记录存进 Redis，重论证后确认是分层错误（内存库会丢永久业务资产），返工改存 MySQL，Redis 只留任务队列与短期缓存——返工原因与代价写进了迭代文档。',
      },
      {
        title: '评测驱动检索决策',
        body: '先建 40 条 golden 评测集再动检索：recall@5 0.8944 / recall@10 0.9389 / MRR@10 0.8889 / 库外拒答 10/10。BM25+RRF 混合检索 A/B 增益不达标，功能做完但默认关闭——用数据替感觉做决策。',
      },
      {
        title: '两个实测复现的真实漏洞',
        body: 'p2.12b：改一个请求头就能自称管理员；p2.14f0：特定客户端身份头静默丢失、伪造身份可随后门进内网。两次都补了「把修复拆掉、测试必须变红」的反向验证，不留假断言。',
      },
      {
        title: '4C4G 轻量机上的内存预算',
        body: 'backend 1.8~2.2G / worker 500~700M / MySQL 350~450M + 2G swap；解析进程不加载 reranker 直接省 1.1GB；Celery concurrency=1、--max-tasks-per-child=20 防内存缓慢泄漏。',
      },
    ],
    iterations: [
      {
        version: 'v1.0.0',
        date: '09-22',
        title: '本地从 0 到跑通',
        gain: '文档加载切分 / 向量化 / 检索 / 重排 / 意图路由 / 流式问答八模块，Chroma、FAISS 双向量库实现',
      },
      {
        version: 'p0.1b',
        date: '09-23',
        title: '会话与问答记录落库',
        gain: '重启不再丢历史，问答记录可用 SQL 审计；同时修正「会话存 Redis」的分层错误',
      },
      {
        version: 'p0.3b',
        date: '09-23',
        title: '异步解析 + 进度可见',
        gain: '大文件上传提交即返回，后台进程解析；进度条、失败原因、一键重试上线，725 项测试 0 失败',
      },
      {
        version: 'p1.5b',
        date: '09-24',
        title: '整套系统容器化',
        gain: '六容器一条命令起停，健康检查与依赖顺序写死在编排文件；联调抓出并修复 3 个真问题',
      },
      {
        version: 'p1.6',
        date: '09-24',
        title: '模型全部上云',
        gain: '本机不再加载模型权重；嵌入 512d → 1024d，知识库按新维度整库重灌（24 篇 / 106 切片）',
      },
      {
        version: 'p2.12b',
        date: '10-08',
        title: '封「伪造身份」漏洞',
        gain: '此前改请求头即可自称管理员（实测复现）；信任边界测试 47 → 103 项全绿',
      },
      {
        version: 'p2.14',
        date: '10-08',
        title: '知识库写权限收口',
        gain: '四条写路由此前零守卫；越权回归 177 项 + 11 条反向验证，此后新增写接口忘挂守卫测试会红',
      },
      {
        version: 'p2.15',
        date: '10-07',
        title: 'Token 额度体系',
        gain: '按人 × 自然月统计，输入 / 输出 / 缓存命中三类分开计（混算会算错钱）；默认每人每月 100,000 tokens',
      },
      {
        version: 'p3.1',
        date: '10-11',
        title: '额度 block 档',
        gain: '超限提问 429 拦截，错误体带 used/quota/period；流式接口在 200 头发出前判定，保证可返回错误',
      },
      {
        version: 'p3.4',
        date: '10-12',
        title: '混合检索 A/B 判决',
        gain: 'recall@5 +4.45pp，但 recall@20 判据结构性不可过 → RETRIEVAL_HYBRID 保持 false，翻开关的决策点留给人',
      },
      {
        version: '上线',
        date: '10-10~11',
        title: '域名 HTTPS + 自动发布',
        gain: 'ICP 备案 → 腾讯云轻量 → 边缘 nginx + certbot → qa.nianan.site；push main 即自动拉取重建重启并探活；每天 03:20 整站备份上 COS',
      },
    ],
  },
  {
    name: '锅圈商城多端小程序',
    meta: '公司项目 · UniApp 多端 · 2021 – 2026',
    summary:
      '锅圈食汇（02517.HK）核心 C 端商城小程序。一套代码交付微信、支付宝、抖音、App、i锅圈五个端，并以此为模板裂变出锅圈小炒等独立业态；覆盖门店定位、加购、拼团 / 秒杀 / 接龙、下单结算、优惠券、积分、会员等级全链路零售场景。',
    tags: ['UniApp', 'Vue 3', 'TypeScript', 'Pinia', 'Vite', '小程序', 'WebSocket', '性能优化'],
    stack: [
      'Vue 3 + TypeScript + UniApp 3.0 + Pinia + Vite',
      'UnoCSS（小程序 rpx / H5 rem 双预设）+ SCSS + uView',
      '阿里云 NLS 流式 TTS + 微信同声传译插件（语音点单）',
      '自研 Vite 插件：componentPlaceholder 自动注入、manualChunks 分割',
      '多分支管理：master / toutiao / xiao_chao / b_mall / f2b / igq / songhe 等 8 条业务分支',
    ],
    metrics: [
      { label: '交付端', value: '5 端一套代码' },
      { label: '裂变业态', value: '小炒 / B2C / F2B / i锅圈' },
      { label: '零售全链路', value: '定位（非强制）→加购（活动）→结算→下单（自提/配送）→售后→会员积分' },
    ],
    highlights: [
      {
        title: '首页首屏优化：扛住大流量下的首屏体验',
        body: '首页要同时拉门店、商品瀑布流、活动（拼团 / 秒杀 / 接龙）、优惠券、推荐等十几个模块，大促峰值更高。优化分三层：**分包与预加载**——preloadRule 在进首页前静默预载 pages-async / pages-market 等分包，点进详情不再等分包下载；**主包瘦身**——manualChunks 把 router/request/stores/commons 合并成 common chunk，easycom + 自研插件让组件按需加载、占位不报错，主包不再被大组件顶到 2MB 红线；**请求与渲染**——多模块走聚合 / 并发控制（Promise.all 收口、失败降级兜底），本地缓存 + 失效刷新减少重复请求，图片懒加载接 CDN，长列表用分页折叠（ifFold + pageSize）分批渲染避免一次上万个节点卡死低端机。**优化前后（微信开发者工具 Audits + 大促峰值线上抽样）**：主包体积 1.96 MB → 1.10 MB（降 44%，彻底脱离 2MB 限制，大促不再卡发版）；首屏可交互时间 TTI 3.2 s → 1.4 s（降 56%）；进详情页分包等待 ~800 ms → 0 ms（命中预加载）；首页请求数 17 → 6 个（聚合 + 缓存，降 65%）；首屏白屏率（大促峰值）8.7% → 0.9%（骨架屏 + 预载兜底）。',
      },
      {
        title: '多分支 + 条件编译双轨多端架构',
        body: '多条业务分支隔离业态逻辑、共用核心代码库，条件编译覆盖 JS、Vue 模板、SCSS、pages.json 路由、manifest 五层。平台差异收敛到 getPlatform() / generatePayParams() / getNavMenuInfo() 统一接口，上层业务零感知。',
      },
      {
        title: '支付与登录四端统一封装',
        body: '微信五参数调起、抖音 service:5 + orderInfo、支付宝交易号直传、App 按 provider 区分——全部收进 generatePayParams()；微信 wx.login、抖音 tt.login、App 原生登录在 authorization 页条件编译出统一入口。',
      },
      {
        title: '自研 Vite 插件 + easycom 四规则，分包零配置',
        body: 'generateBundle 阶段扫描所有产物 .json 的 usingComponents，检测到异步分包引用即自动注入 componentPlaceholder 占位配置——开发者按 easycom 规则（^g-a- / ^g-s- / ^g-m- / ^u-）零 import 直接用标签，插件兜底避免加载失败；manualChunks 再把公共依赖合并成 common chunk 瘦主包。',
      },
      {
        title: 'AI 点单：对话式购物全链路',
        body: 'WebSocket 单例客户端双定时器心跳（10s ping + 3s pong 超时窗口检测半连接），页面关闭经 getCurrentPages() 检测自动销毁连接；阿里云 NLS 流式 TTS 全链路不落盘（Base64 解码三级降级兼容红米旧机），PCM 边收边播靠 _nextStartTime 无缝拼接；24 种意图 + 意图继承快照，结算卡 6 类异常商品硬失效 / 软异常分流。',
      },
      {
        title: '「一起吃」多人社交拼单',
        body: '共享购物车 WebSocket 实时同步，四级状态机（页面 / 任务 / 用户 / 结算回退）约束不同身份可用操作；发起人点结算即把任务锁进「提交订单中」阻止他人继续加购，回退时显式解锁；~170 行加购逻辑覆盖普通品 / 套餐 / 换购 / 赠品四类，乐观锁 UI 先跑动画再异步请求、失败回滚数量。',
      },
      {
        title: 'CMS 配置化渲染，运营自助上活动页',
        body: '配套 gqsh-cms-ui-h5 组件库 JSON Schema 驱动渲染：页面结构与配置数据解耦、按组件 ID 分发，支持热更新不发版；10 类可配置组件（商品 / 优惠券 / 轮播 / 锚点导航 / 倒计时等），锚点导航用 IntersectionObserver 自动高亮——运营在后台拖拽即生成预制菜活动会场。',
      },
    ],
    iterations: [
      {
        version: '多端',
        date: '持续',
        title: '一套代码五端交付',
        gain: '微信 / 支付宝 / 抖音 / App / i锅圈同仓交付，多端维护成本从「五套」降为「一套 + 条件编译」',
      },
      {
        version: '裂变',
        date: '持续',
        title: '模板化复制业态',
        gain: '以 xiao_chao/master 分支孵化锅圈小炒预制菜平台，B2C、F2B、宋河等业态同源裂变',
      },
      {
        version: '首屏',
        date: '持续',
        title: '首页首屏优化',
        gain: 'preloadRule 分包预加载 + manualChunks 主包瘦身 + 请求聚合缓存，大促不再因包体超限卡发版、白屏基本消除',
      },
      {
        version: 'AI',
        date: '持续',
        title: '对话内一步下单',
        gain: '传统「购物车 → 结算页 → 支付页」三步压缩为对话内一步，语音输入 + 播报覆盖做饭场景',
      },
      {
        version: '社交',
        date: '持续',
        title: '拼单裂变拉新',
        gain: '多人聚餐「各点各的」变共享购物车并行加购，微信分享链接入队，提升社交电商转化',
      },
    ],
  },
];
