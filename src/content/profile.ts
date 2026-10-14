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
  /** 刻意不在页面上渲染时间节点：展示的是「做了什么」，不是「什么时候做的」。 */
  date?: string;
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
      '公司内部知识库问答系统：上传文档后台解析入库，提问流式作答并附引用溯源。从本机原型一路做到域名 HTTPS 上线，六容器一键起停、push main 自动发布；每次改动有自动化测试与检索评测集兜底。',
    tags: ['FastAPI', 'LangChain', 'Chroma', 'Vue 3', 'NestJS', 'MySQL', 'Caddy', 'Docker', 'RAG'],
    stack: [
      '后端：FastAPI + LangChain LCEL + Celery（解析异步化）',
      '检索：Chroma 向量库 + bge-large-zh（1024d）+ bge-reranker-v2-m3 重排（硅基流动）',
      '网关：NestJS（Express 4）+ passport-jwt，全局 fail-closed 鉴权 + 路径级授权',
      '数据：MySQL（业务真相源）+ Redis（任务队列与短期缓存）+ Chroma（向量），三层各司其职',
      '前端：Vue 3 + TS + Vite + Pinia；管理端 Element Plus',
      '部署：Docker Compose 六容器，端口只绑 127.0.0.1 不对外暴露；边缘 Caddy 自动签发续期证书并反代；GitHub Actions 自托管 runner 自动发布；每日 03:20 整站备份上 COS',
    ],
    metrics: [
      { label: '自动化测试', value: '1376 项' },
      { label: '评测集', value: '40 条 golden' },
      { label: '部署形态', value: '6 容器一键起停' },
    ],
    highlights: [
      {
        title: '流式链路选型 NDJSON 而非 SSE',
        body: '选 NDJSON 不是跟风：单条 JSON 流比 SSE 的事件帧更好穿代理，也更容易在网关层保持原样透传。配套三处——网关统一错误体只包自身错误、后端错误体原样透传（包装会破坏流式），转发时显式带 Accept-Encoding: identity 少一层压缩缓冲，边缘 Caddy 默认即流式转发不攒包。',
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
        body: '先建 40 条 golden 评测集再动检索：recall@5 0.8944 / recall@10 0.9389 / MRR@10 0.8889 / 库外拒答 10/10。BM25+RRF 混合检索 A/B 增益不达标，功能做完但默认关闭——用数据替感觉做决策。上线后又抓到一件评测测不出来的事：链上检索走的是另一条管线，整段绕过了融合（评测与断言全绿、线上没生效），修完补了源码级守卫和「回归环境钉死开关」。',
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
        title: '本机从 0 到能问能答',
        gain: '跟着教学视频把八个模块跑通：文档加载切分、向量化、检索、重排、意图路由、多轮记忆、流式问答。向量库写了 Chroma 与 FAISS 两个实现可切换，大模型接 ollama / 硅基流动 / OpenAI 三家。跑通当天就把没做的事列清楚：会话还在内存里重启即丢、任何人都能访问、没有数据库——这三件成了后面整个大版本的待办。',
      },
      {
        version: 'p0.1b',
        title: '会话与问答记录进数据库',
        gain: '重启不再丢历史，问答记录能用 SQL 审计。中途改过一次方向：先把会话存进了 Redis，后来认定这是分层错误——内存库扛不住「永久业务资产」，返工改存 MySQL，Redis 退回只做队列和短期缓存。返工原因和代价写进了迭代文档。',
      },
      {
        version: 'p0.2',
        title: '给系统装门',
        gain: '加 NestJS 网关与 JWT 全局守卫，从「谁都能访问」变成必须登录。代理写成 Controller 里的通配路由而不是中间件——中间件跑在守卫前面，那样写鉴权会整段失效，而且日志一切正常，极难发现。',
      },
      {
        version: 'p0.3',
        title: '解析搬出请求，进度看得见',
        gain: '大文件不再在请求里转圈：提交即返回，解析丢给后台进程。状态真相源放在 MySQL 的 document.status 而不是队列，配了进度条、失败原因、一键重试，以及被 kill 掉留下的僵尸任务回收。725 项测试 0 失败。',
      },
      {
        version: 'p0.4',
        title: '引用可点、可溯源、删得干净',
        gain: '每条引用带 chunk_id，点开能看切片全文和它出自哪份文档；修掉一个「只问一轮永远试不出来」的记录错位（刷新之后引用还在）；删文档时对应切片一并清掉。',
      },
      {
        version: 'p1.5b',
        title: '整套系统进容器',
        gain: '中间件和四个应用全部容器化，一条命令起停；健康检查与依赖顺序写进编排文件，不靠启动脚本里 sleep 碰运气。联调时抓出并修掉三个只在容器里才现形的问题。',
      },
      {
        version: 'p1.6',
        title: '模型搬到云上',
        gain: '本机不再加载模型权重，嵌入与重排都走接口。嵌入从 512 维换到 1024 维——换维度等于换索引，知识库按新维度整库重灌，不能混在同一个 collection 里。',
      },
      {
        version: 'p2.12b / p2.14f0',
        title: '封掉两个能实测复现的身份漏洞',
        gain: '一个是改请求头就能自称管理员，自己 curl 复现过；另一个更隐蔽：某些客户端发来的请求网关会「忘记这是谁」，伪造的身份头于是跟着进后门。两次都补了把修复拆掉、测试必须变红的反向验证，不留假断言。信任边界测试 47 → 103 项。',
      },
      {
        version: 'p2.14',
        title: '知识库写权限收口',
        gain: '上传、删除、重灌这几条写路由此前一条守卫都没有，等于任何人都能改全公司共用的知识库。按 kb_role 收口后补了越权回归 177 项与 11 条反向验证——以后谁新增写接口忘了挂守卫，测试会红。顺手修掉两个真 bug：写死的动作名字典会在新增动作时 500，以及验收脚本遇第一个失败就停、导致后面六个模块连续三个版本一次都没跑过。',
      },
      {
        version: 'p2.15 → p3.1',
        title: '额度体系，以及推翻自己一次决定',
        gain: '先按人 × 自然月把用量算准，输入 / 输出 / 命中服务商缓存三类分开计（混在一起会算错钱）。当时把「超额之后会发生什么」定死成只提醒不阻断，还写进启动校验防止被悄悄改掉。系统对外上线后这个判断不成立——成本不可控，于是推翻成超限 429 拦截，错误体带 used/quota/period，流式接口在 200 头发出前判定。推翻理由和旧断言的改写都记在迭代文档。',
      },
      {
        version: 'p3.3',
        title: '检索第一次有了尺子',
        gain: '40 条人工标注题库（专名、编号条款、口语化改写、跨文档综合，外加 10 条库外拒答），一条命令量出 recall@5/10/20、MRR@10、拒答正确率。基线 recall@5 0.8944、MRR@10 0.8889、库外拒答 10/10。读出一个反直觉的结论：recall@10 等于 recall@20，说明瓶颈在排序不在召回面。',
      },
      {
        version: 'p3.4',
        title: '混合检索做完，但没开',
        gain: 'BM25 + RRF 双路召回做完，recall@5 提升 4.45pp，把基线唯一失手的编号题救了回来，但 recall@20 那条判据结构性过不了（基线在 k=20 已摸到天花板）。结论是功能上线、开关保持 false，翻不翻留给人判断。上线后又抓到评测测不出来的事：链上检索走的是另一条管线，整段绕过融合，评测与断言全绿而线上没生效。',
      },
      {
        version: '上线',
        title: '备案、域名、HTTPS 与自动发布',
        gain: 'ICP 备案通过后在腾讯云轻量上开放 80/443，边缘用宿主机的 Caddy 反代并自动签发续期证书，应用容器端口只绑 127.0.0.1 不直接对外，qa.nianan.site 上线。push main 后服务器上的 runner 自动拉代码、重建、重启、探活；每天 03:20 把数据库、上传文件、知识库打包备份到 COS。',
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
      { label: '零售全链路', value: '定位→加购→结算→下单→售后' },
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
      {
        title: '数据埋点：默认 + 自定义 + 可视区域曝光三层覆盖',
        body: '基于神策 UniApp SDK 做全链路埋点，三层覆盖：**默认埋点（autoTrack 全埋点）**——appLaunch / appShow / pageShow / mpClick / pageLeave 等生命周期与点击自动采集，零侵入；**自定义埋点**——在 initSensors 里封装几十个语义化事件（ClickPageIcon、BannerClick、KingKong_position、AddToShoppingCart、BuyNow、ReceiveDiscount、LoginResult 等），几乎全是点击交互类，用短方法名（sa.cpi / sa.bc / sa.atsc）收敛调用；**可视区域曝光埋点（exposure/index.js）**——IntersectionObserver 监听元素进入视口（阈值 0.6 且停留 1s 才上报），用户真实浏览才埋点、没浏览不埋，区分商品（ProductExposure）与运营位（ExposureBannerClick）曝光，解决「渲染了但没看见」的虚假曝光。',
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
