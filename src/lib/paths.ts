export type PathStep = { ref: string; zh: string; en: string };
export type LearningPath = {
  slug: string;
  icon: string;
  zh: { title: string; summary: string; intro: string; outcome: string };
  en: { title: string; summary: string; intro: string; outcome: string };
  steps: PathStep[];
};

const K = (slug: string) => `knowledge:${slug}`;

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: 'start-running',
    icon: 'play',
    zh: { title: '从零开始跑', summary: '六步建立第一周，不追配速。', intro: '这条路径只解决三件事：能连续跑、知道什么叫轻松、出现疼痛时不硬扛。每一步都先读边界，再决定要不要加量。', outcome: '完成后你能安排一周三次、每次 20–40 分钟的可持续跑步，并知道什么信号该停下。' },
    en: { title: 'Start running', summary: 'Six steps to a first repeatable week, no pace chasing.', intro: 'This path solves three things: run continuously, know what easy means, and do not push through pain. Each step reads the boundary before adding load.', outcome: 'You can arrange three 20–40 minute runs a week and know which signals mean stop.' },
    steps: [
      { ref: K('easy-run'), zh: '先定义“轻松”：能说完整句子，而不是看手表。', en: 'Define easy first: full sentences, not a watch number.' },
      { ref: K('breathing-and-rhythm'), zh: '用呼吸判断强度，不硬套 3:2 节拍。', en: 'Use breathing to judge effort, not a fixed 3:2 rhythm.' },
      { ref: K('running-habits'), zh: '把三次跑步放进固定时段，先求出现，再求距离。', en: 'Put three runs into fixed slots; show up before adding distance.' },
      { ref: K('training-week'), zh: '轻松跑之间留一天，质量课从零开始不算落后。', en: 'Leave a day between easy runs; starting with no quality work is not a deficit.' },
      { ref: K('running-shoes'), zh: '第一双鞋以合脚和舒适为先，不追碳板。', en: 'The first shoe should fit and feel comfortable; no carbon plate needed.' },
      { ref: K('pain-and-load'), zh: '疼到改变步态就停，别用“跑开就好了”掩盖。', en: 'Stop when pain changes your gait; do not mask it with “it loosens up”.' },
    ],
  },
  {
    slug: 'understand-intensity',
    icon: 'chart',
    zh: { title: '理解强度', summary: '把轻松、节奏、间歇和恢复放在同一张周表里。', intro: '强度不是越苦越有效。这条路径用呼吸、动作、心率和周结构四个视角交叉验证，避免只盯一个配速数字。', outcome: '完成后你能说清本周哪一次是质量课、哪一次必须是轻松跑，以及为什么。' },
    en: { title: 'Understand intensity', summary: 'Put easy, tempo, intervals and recovery on one weekly map.', intro: 'Harder is not automatically better. This path cross-checks effort through breathing, form, heart rate and weekly structure instead of one pace number.', outcome: 'You can say which session this week is quality, which must be easy, and why.' },
    steps: [
      { ref: K('easy-run'), zh: '轻松跑是训练，不是“没质量的热身”。', en: 'Easy running is training, not a worthless warm-up.' },
      { ref: K('running-form'), zh: '动作看稳定与放松，不追求统一姿势。', en: 'Look for stable, relaxed form, not one universal posture.' },
      { ref: K('cadence-and-stride'), zh: '步频是结果，不是强行拉高的指标。', en: 'Cadence is an outcome, not a number to force up.' },
      { ref: K('tempo-and-intervals'), zh: '节奏跑与间歇跑解决不同问题，不能互相替代。', en: 'Tempo and intervals solve different problems; one does not replace the other.' },
      { ref: K('training-pace-zones'), zh: '配速区间有体系差异，先固定一种口径。', en: 'Pace zones differ by system; fix one basis first.' },
      { ref: K('long-run'), zh: '长距离的目的不是把每周跑量一次用完。', en: 'The long run is not a way to spend the weekly volume in one session.' },
      { ref: K('recovery-day'), zh: '恢复日可以动，但不要把“动”变成第二次质量课。', en: 'A recovery day can move, but not become a second quality session.' },
    ],
  },
  {
    slug: 'first-half-marathon',
    icon: 'flag',
    zh: { title: '首场半马', summary: '从当前周跑量到 21.1 公里的比赛日。', intro: '半马不是“全马减半”。这条路径先确定当前周跑量与可训练天数，再排长距离、补给和比赛日流程。', outcome: '完成后你有一张 10–14 周的周计划骨架，以及比赛日从起床到终点的 if/then 清单。' },
    en: { title: 'First half marathon', summary: 'From current weekly volume to 21.1 km on race day.', intro: 'A half is not “a marathon halved”. Start from current weekly volume and available days, then add the long run, fuelling and race-day flow.', outcome: 'You have a 10–14 week skeleton and an if/then list from wake-up to finish.' },
    steps: [
      { ref: K('half-marathon-training-plan'), zh: '按当前周跑量选 10、12 或 14 周版本，不硬套 16 周。', en: 'Choose the 10, 12 or 14 week version from current volume; do not force 16.' },
      { ref: K('training-week'), zh: '一周只放一次质量课，长距离前后留轻松日。', en: 'One quality session a week; easy days around the long run.' },
      { ref: K('long-run'), zh: '长距离逐步到 16–18 公里，最后两周减量。', en: 'Build the long run toward 16–18 km, then taper in the last two weeks.' },
      { ref: K('pre-and-post-run-fueling'), zh: '练跑前 2 小时与跑后 30 分钟的吃法。', en: 'Practise the two-hour pre-run and 30-minute post-run windows.' },
      { ref: K('race-day-pacing'), zh: '前 5 公里比目标慢 10–15 秒，不是“先冲再撑”。', en: 'Run the first 5 km 10–15 seconds slower than target; do not sprint and hang on.' },
      { ref: K('race-morning-protocol'), zh: '把起床、早餐、出门、热身写成时间轴。', en: 'Write wake-up, breakfast, travel and warm-up as a timeline.' },
      { ref: K('post-race-recovery'), zh: '完赛当天先补水与睡眠，不急着复盘成绩。', en: 'Fluids and sleep first on race day; review the result later.' },
    ],
  },
  {
    slug: 'first-marathon',
    icon: 'route',
    zh: { title: '首场全马', summary: '18–24 周结构、长距离补给与比赛日执行。', intro: '全马的风险不在“能不能跑完”，而在后半程掉速、胃肠与热。路径把训练、补给、减量和比赛日分开，避免把所有问题堆到比赛周。', outcome: '完成后你有一张可执行的 18–24 周表、两次完整补给演练，以及一份比赛日决策卡。' },
    en: { title: 'First marathon', summary: 'An 18–24 week structure, long-run fuelling and race-day execution.', intro: 'The marathon risk is not “can I finish” but the second-half fade, gut and heat. This path separates training, fuelling, taper and race day so they do not all land in race week.', outcome: 'You have an executable 18–24 week plan, two full fuelling rehearsals and a race-day decision card.' },
    steps: [
      { ref: K('marathon-training-plan'), zh: '先选 18、20 或 24 周，取决于当前周跑量与伤病史。', en: 'Choose 18, 20 or 24 weeks from current volume and injury history.' },
      { ref: K('periodization'), zh: '基础、专项、峰值、减量四段各自只解决一个任务。', en: 'Base, specific, peak and taper each solve one task.' },
      { ref: K('long-run-fueling'), zh: '长距离里练 30–60 克/小时的碳水，不只在比赛日试。', en: 'Practise 30–60 g/h carbohydrate on long runs, not only on race day.' },
      { ref: K('hydration'), zh: '按出汗率与天气定补液，不按“每小时一升”硬灌。', en: 'Set fluid from sweat rate and weather, not a fixed litre per hour.' },
      { ref: K('race-day-fueling'), zh: '把训练中验证过的胶、盐与真食写进比赛日表。', en: 'Put tested gels, salt and real food into the race-day table.' },
      { ref: K('heat-and-humidity'), zh: '湿球温度高时主动降级目标，不拿 PB 硬扛。', en: 'Downgrade the goal when wet-bulb temperature is high; do not force a PB.' },
      { ref: 'tool:taper-planner', zh: '用两周或三周减量，把最后一周末周占比算出来。', en: 'Use a two- or three-week taper and calculate the final-week share.' },
      { ref: K('post-race-recovery'), zh: '完赛后 72 小时先恢复，再谈下一场比赛。', en: 'Recover for 72 hours before talking about the next race.' },
    ],
  },
  {
    slug: 'first-100k-trail',
    icon: 'mountain',
    zh: { title: '首场百公里越野', summary: '爬升、夜段、强制装备与关门管理。', intro: '百公里的门槛不是距离，而是“能不能在夜里继续走、在检查站按时到、在缺装备时不被罚下”。路径按训练、装备、导航、执行四块推进。', outcome: '完成后你有一条 16–20 周的越野周计划、完整强制装备表，以及每个检查站的关门余量。' },
    en: { title: 'First 100 km trail race', summary: 'Climb, night, mandatory kit and cut-off management.', intro: 'The 100 km gate is not distance but continuing at night, reaching checkpoints on time and not being penalised for missing kit. The path moves through training, gear, navigation and execution.', outcome: 'You have a 16–20 week trail plan, a complete mandatory-kit table and a cut-off margin for every checkpoint.' },
    steps: [
      { ref: K('ultra-running-basics'), zh: '先理解 100 公里真正要求什么：time-on-foot 与夜段。', en: 'Understand what 100 km really asks: time on foot and night sections.' },
      { ref: K('trail-ultra-training-plan'), zh: '周爬升、背靠背长课与夜间训练要分开排。', en: 'Weekly climb, back-to-back long runs and night training need separate blocks.' },
      { ref: K('trail-gear'), zh: '按赛事强制清单组系统，不按品牌清单购物。', en: 'Build a system from the race mandatory list, not a brand shopping list.' },
      { ref: K('poles-technique'), zh: '杖长、上坡推与下坡放，先在训练里用熟。', en: 'Pole length, uphill push and downhill placement must be rehearsed.' },
      { ref: K('trail-navigation'), zh: 'GPX 是底图，不是保障；离线地图与撤退点要另存。', en: 'GPX is a base map, not a guarantee; store offline maps and escape points.' },
      { ref: K('cutoff-management'), zh: '把官方关门表折成每段可用时间，标出最紧点。', en: 'Convert the official cut-off table into per-segment time and mark the tightest point.' },
      { ref: K('crew-and-pacer-planning'), zh: 'crew 只允许在检查站出现时，交接点就是计划的核心。', en: 'When crew can only appear at checkpoints, handoffs become the plan.' },
      { ref: K('headlamps-and-lighting'), zh: '主灯、备用灯与电池分开放，练一次 30 秒换灯。', en: 'Keep primary, backup and batteries separate; rehearse a 30-second swap.' },
    ],
  },
  {
    slug: 'injury-return',
    icon: 'shield',
    zh: { title: '伤病后复跑', summary: '从红旗排查到分段加量，不靠意志硬顶。', intro: '复跑不是“不疼了就回到原周跑量”。路径先分清必须就医的信号，再用分级闸门与负荷记录决定每次加多少。', outcome: '完成后你有一张分阶段复跑表、明确的退回条件，以及一次完整的负荷复盘。' },
    en: { title: 'Return after injury', summary: 'From red flags to staged reload, without gritting through.', intro: 'Returning is not “go back to the old weekly volume once pain stops”. This path separates signals that need care, then uses staged gates and load records to decide each increment.', outcome: 'You have a staged return table, explicit back-off conditions and one full load review.' },
    steps: [
      { ref: K('running-injury-prevention'), zh: '先看负荷、力量、睡眠与早期信号，不先换鞋。', en: 'Read load, strength, sleep and early signals before changing shoes.' },
      { ref: K('return-to-running'), zh: '按阶段闸门复跑：无痛走路、慢跑、连续跑、加量。', en: 'Return through gates: pain-free walking, jogging, continuous running, then volume.' },
      { ref: K('pain-and-load'), zh: '疼痛改变步态或次日加重，就是退回上一级。', en: 'If pain changes gait or worsens next day, step back one level.' },
      { ref: K('strength-training-for-runners'), zh: '力量训练补短板，不用大重量硬撑疼痛部位。', en: 'Strength work fills the gap; do not load a painful site with maximal weight.' },
      { ref: K('running-shoes'), zh: '复跑期先选稳定、合脚、熟悉的鞋。', en: 'During return, use a stable, familiar, well-fitting shoe.' },
      { ref: K('load-and-overtraining'), zh: '用 7 天与 28 天负荷看趋势，不用单次训练判断。', en: 'Use seven- and 28-day load trends, not one session.' },
    ],
  },
  {
    slug: 'heat-and-altitude',
    icon: 'sun',
    zh: { title: '热天与高原比赛', summary: '湿热、补水、钠、海拔与紫外线。', intro: '热与海拔都会让同一配速变难，但机制不同。路径先分清干热、湿热与高原，再分别处理补液、钠、降级目标与防晒。', outcome: '完成后你能按 WBGT 或海拔设置当天目标，并写出补液、盐与撤退的 if/then。' },
    en: { title: 'Heat and altitude racing', summary: 'Humid heat, fluids, sodium, altitude and UV.', intro: 'Heat and altitude both make the same pace harder, for different reasons. This path separates dry heat, humid heat and altitude, then handles fluids, sodium, goal downgrade and sun protection.', outcome: 'You can set a race-day target from WBGT or altitude and write if/then rules for fluids, salt and retreat.' },
    steps: [
      { ref: K('heat-and-humidity'), zh: '湿球温度比气温更能说明风险，先看 WBGT。', en: 'Wet-bulb temperature says more than air temperature; read WBGT first.' },
      { ref: K('hydration'), zh: '按出汗率与天气定补液，少量多次。', en: 'Set fluid from sweat rate and weather; small amounts, often.' },
      { ref: K('electrolytes-and-sodium'), zh: '钠不是越多越好，低钠血症同样危险。', en: 'More sodium is not better; hyponatraemia is also dangerous.' },
      { ref: K('altitude-and-running'), zh: '高原先适应再谈强度，出现下撤信号就下撤。', en: 'Adapt before intensity at altitude; descend when retreat signals appear.' },
      { ref: K('sun-and-uv-exposure'), zh: 'UV 指数、出汗后补涂与雪地反射要单独算。', en: 'UV index, reapplication after sweating and snow reflection need separate rules.' },
      { ref: K('race-day-fueling'), zh: '热天胃口会变，补给形式与温度都要演练。', en: 'Appetite changes in heat; rehearse food form and temperature.' },
      { ref: 'tool:heat-acclimation-planner', zh: '按 WBGT 算暴露缺口，用 10–14 天逐日安排。', en: 'Calculate the exposure gap from WBGT and schedule 10–14 days.' },
    ],
  },
  {
    slug: 'race-day-execution',
    icon: 'flag',
    zh: { title: '比赛日执行', summary: '从起床到退赛决策，一张 if/then 卡。', intro: '比赛日的错误大多不是体能，而是时间、补给与判断。路径把早晨流程、配速、关门、补给、crew 与退赛放在同一张卡上。', outcome: '完成后你有一张按时间排序的执行卡，以及“什么情况下必须退”的红线。' },
    en: { title: 'Race-day execution', summary: 'From wake-up to DNF decisions, one if/then card.', intro: 'Most race-day errors are not fitness but timing, fuelling and judgement. This path puts morning flow, pacing, cut-offs, fuel, crew and withdrawal on one card.', outcome: 'You have a time-ordered execution card and explicit red lines for stopping.' },
    steps: [
      { ref: K('race-morning-protocol'), zh: '起床、早餐、出门、热身写成倒推时间轴。', en: 'Write wake-up, breakfast, travel and warm-up as a backward timeline.' },
      { ref: K('race-day-pacing'), zh: '前段保守，后半程按负分段或匀速执行。', en: 'Start conservatively; execute even or negative splits.' },
      { ref: K('cutoff-management'), zh: '每个检查站写“关门减 45 分钟”的到达线。', en: 'Write an arrival line of “cut-off minus 45 minutes” at each checkpoint.' },
      { ref: K('race-day-fueling'), zh: '按小时吃碳水，不等到饿了才吃。', en: 'Eat carbohydrate by the hour; do not wait for hunger.' },
      { ref: K('crew-and-pacer-planning'), zh: 'crew 只在允许点出现，交接动作不超过 5 分钟。', en: 'Crew appears only where allowed; keep each handoff under five minutes.' },
      { ref: K('dnf-decision-making'), zh: '红旗信号出现就退，不在赛道上开辩论会。', en: 'Withdraw when red flags appear; do not debate on course.' },
      { ref: 'tool:race-checklist', zh: '按路面、时长与天气生成清单，赛前一周核对。', en: 'Generate a list from surface, duration and weather; check it race week.' },
    ],
  },
];

export function learningPath(slug: string): LearningPath | undefined {
  return LEARNING_PATHS.find((item) => item.slug === slug);
}

export function pathsForKnowledge(slug: string): LearningPath[] {
  return LEARNING_PATHS.filter((path) => path.steps.some((step) => step.ref === `knowledge:${slug}`));
}
