import { useMemo, useState } from 'react';
import {
  Activity,
  Bot,
  Moon,
  Search,
  Send,
  Sun,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface DemoProps {
  isMobileViewport: boolean;
  onRequestTemplate: () => void;
}

type Timeframe = '7D' | '30D' | '90D';
type WorkflowStatus = 'Active' | 'Optimizing' | 'Paused';

interface WorkflowRow {
  id: string;
  name: string;
  channel: string;
  runs: string;
  conversion: string;
  status: WorkflowStatus;
}

const TIMEFRAME_DATA: Record<
  Timeframe,
  {
    mrr: string;
    mrrDelta: string;
    tasksAutomated: string;
    tasksDelta: string;
    avgLatency: string;
    retention: string;
    series: { label: string; value: number; revenue: string }[];
    channels: { name: string; share: number; color: string }[];
  }
> = {
  '7D': {
    mrr: '₹14.8L',
    mrrDelta: '+18.4%',
    tasksAutomated: '24,910',
    tasksDelta: '+31.2%',
    avgLatency: '142ms',
    retention: '98.4%',
    series: [
      { label: 'Mon', value: 48, revenue: '₹1.8L' },
      { label: 'Tue', value: 62, revenue: '₹2.1L' },
      { label: 'Wed', value: 57, revenue: '₹1.9L' },
      { label: 'Thu', value: 76, revenue: '₹2.4L' },
      { label: 'Fri', value: 84, revenue: '₹2.6L' },
      { label: 'Sat', value: 71, revenue: '₹2.0L' },
      { label: 'Sun', value: 92, revenue: '₹2.9L' },
    ],
    channels: [
      { name: 'WhatsApp AI Concierge', share: 44, color: '#00F0FF' },
      { name: 'Checkout Recovery', share: 32, color: '#8B5CF6' },
      { name: 'Voice Qualification', share: 24, color: '#EC4899' },
    ],
  },
  '30D': {
    mrr: '₹62.4L',
    mrrDelta: '+29.6%',
    tasksAutomated: '112,480',
    tasksDelta: '+42.8%',
    avgLatency: '134ms',
    retention: '98.9%',
    series: [
      { label: 'W1', value: 52, revenue: '₹11.2L' },
      { label: 'W2', value: 66, revenue: '₹13.8L' },
      { label: 'W3', value: 78, revenue: '₹16.4L' },
      { label: 'W4', value: 95, revenue: '₹21.0L' },
    ],
    channels: [
      { name: 'WhatsApp AI Concierge', share: 48, color: '#00F0FF' },
      { name: 'Checkout Recovery', share: 29, color: '#8B5CF6' },
      { name: 'Voice Qualification', share: 23, color: '#EC4899' },
    ],
  },
  '90D': {
    mrr: '₹1.84Cr',
    mrrDelta: '+64.1%',
    tasksAutomated: '348,200',
    tasksDelta: '+78.5%',
    avgLatency: '129ms',
    retention: '99.2%',
    series: [
      { label: 'Sep', value: 58, revenue: '₹49.0L' },
      { label: 'Oct', value: 74, revenue: '₹61.2L' },
      { label: 'Nov', value: 96, revenue: '₹73.8L' },
    ],
    channels: [
      { name: 'WhatsApp AI Concierge', share: 51, color: '#00F0FF' },
      { name: 'Checkout Recovery', share: 28, color: '#8B5CF6' },
      { name: 'Voice Qualification', share: 21, color: '#EC4899' },
    ],
  },
};

const INITIAL_WORKFLOWS: WorkflowRow[] = [
  {
    id: 'wf-1',
    name: 'Lead Scoring & Instant Quote',
    channel: 'WhatsApp API',
    runs: '14,820',
    conversion: '34.2%',
    status: 'Active',
  },
  {
    id: 'wf-2',
    name: 'Abandoned Cart Recovery',
    channel: 'Webhooks + SMS',
    runs: '8,410',
    conversion: '27.8%',
    status: 'Active',
  },
  {
    id: 'wf-3',
    name: 'UPI Payment Auto-Reconciliation',
    channel: 'Cloudflare Worker',
    runs: '6,190',
    conversion: '99.8%',
    status: 'Optimizing',
  },
  {
    id: 'wf-4',
    name: 'VIP Renewal Reminder Agent',
    channel: 'Voice + Email',
    runs: '2,940',
    conversion: '41.5%',
    status: 'Paused',
  },
];

const QUICK_PROMPTS = [
  'Summarize top conversion driver',
  'Forecast next 30-day revenue',
  'Spot automation bottlenecks',
];

export function PulseOpsAiDemo({
  isMobileViewport,
  onRequestTemplate,
}: DemoProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [timeframe, setTimeframe] = useState<Timeframe>('30D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowRow[]>(INITIAL_WORKFLOWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotReply, setCopilotReply] = useState(
    'WhatsApp AI Concierge is driving 48% of closed pipeline over the last 30D with 134ms average edge response latency.',
  );

  const isDark = theme === 'dark';
  const currentData = TIMEFRAME_DATA[timeframe];

  const filteredWorkflows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return workflows;
    return workflows.filter(
      (wf) =>
        wf.name.toLowerCase().includes(q) ||
        wf.channel.toLowerCase().includes(q),
    );
  }, [workflows, searchQuery]);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === id
          ? {
              ...wf,
              status: wf.status === 'Active' ? 'Paused' : 'Active',
            }
          : wf,
      ),
    );
  };

  const askCopilot = (promptText: string) => {
    const clean = promptText.trim();
    if (!clean) return;
    const lower = clean.toLowerCase();
    if (lower.includes('forecast') || lower.includes('revenue')) {
      setCopilotReply(
        `Based on ${timeframe} velocity (${currentData.mrrDelta}), projected next-cycle revenue is trending +24% above target if Checkout Recovery stays active.`,
      );
    } else if (lower.includes('bottleneck') || lower.includes('spot')) {
      setCopilotReply(
        `1 workflow ("VIP Renewal Reminder Agent") is currently paused. Re-enabling it recovers an estimated ₹4.2L/mo in recurring renewals.`,
      );
    } else {
      setCopilotReply(
        `Insight (${timeframe}): ${currentData.channels[0].name} leads at ${currentData.channels[0].share}% share with ${currentData.retention} client retention across ${currentData.tasksAutomated} automated runs.`,
      );
    }
    setCopilotInput('');
  };

  // Build SVG Area Chart coordinates
  const svgW = 480;
  const svgH = 160;
  const padX = 24;
  const padY = 18;
  const points = currentData.series.map((pt, i) => {
    const x =
      padX +
      (i / Math.max(1, currentData.series.length - 1)) * (svgW - padX * 2);
    const y = svgH - padY - (pt.value / 100) * (svgH - padY * 2);
    return { ...pt, x, y };
  });
  const linePath = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(svgH - padY).toFixed(1)} L ${points[0].x.toFixed(1)} ${(svgH - padY).toFixed(1)} Z`;

  return (
    <div
      className={`min-h-full font-sans transition-colors duration-200 ${
        isDark
          ? 'bg-[#070B16] text-slate-100'
          : 'bg-[#F4F6FA] text-[#0F172A]'
      }`}
    >
      {/* Top Executive Dashboard Toolbar */}
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'border-white/10 bg-[#070B16]/90'
            : 'border-slate-200 bg-white/92'
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 ${
            isMobileViewport ? '' : 'sm:px-8'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] text-[#070B16]">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <span className="text-sm font-bold tracking-tight block">
                PulseOps AI
              </span>
              <span
                className={`text-[10px] block -mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Revenue &amp; Automation Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Timeframe Switcher */}
            <div
              className={`flex items-center gap-1 rounded-xl border p-1 ${
                isDark
                  ? 'border-white/10 bg-[#0D1428]'
                  : 'border-slate-200 bg-slate-100'
              }`}
            >
              {(['7D', '30D', '90D'] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setHoveredIdx(null);
                  }}
                  className={`min-h-[32px] rounded-lg px-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    timeframe === tf
                      ? isDark
                        ? 'bg-[#00F0FF] text-[#070B16]'
                        : 'bg-[#0F172A] text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Scoped Dark/Light Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch demo dashboard to ${isDark ? 'light' : 'dark'} mode`}
              className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'border-white/12 bg-white/[0.05] text-amber-300 hover:bg-white/10'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mx-auto max-w-6xl space-y-5 px-4 py-6 ${
          isMobileViewport ? '' : 'sm:px-8 sm:py-8'
        }`}
      >
        {/* 4 KPI Summary Cards */}
        <div
          className={`grid gap-3.5 ${
            isMobileViewport ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {[
            {
              label: 'Attributed Revenue',
              value: currentData.mrr,
              delta: currentData.mrrDelta,
              icon: TrendingUp,
            },
            {
              label: 'AI Tasks Executed',
              value: currentData.tasksAutomated,
              delta: currentData.tasksDelta,
              icon: Zap,
            },
            {
              label: 'Edge Latency',
              value: currentData.avgLatency,
              delta: 'Global Edge',
              icon: Activity,
            },
            {
              label: 'Client Retention',
              value: currentData.retention,
              delta: 'Top 1%',
              icon: Bot,
            },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className={`rounded-2xl border p-4 transition-colors ${
                  isDark
                    ? 'border-white/10 bg-[#0D1326]/90'
                    : 'border-slate-200 bg-white shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {kpi.label}
                  </span>
                  <Icon
                    className={`h-4 w-4 ${
                      isDark ? 'text-[#00F0FF]' : 'text-[#2563EB]'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-xl font-extrabold tabular-nums sm:text-2xl">
                  {kpi.value}
                </p>
                <p
                  className={`mt-1 text-[11px] font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  {kpi.delta}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Chart + Channel Breakdown */}
        <div
          className={`grid gap-5 ${
            isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* SVG Revenue Area Chart */}
          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? 'border-white/10 bg-[#0D1326]/90'
                : 'border-slate-200 bg-white shadow-xs'
            } ${isMobileViewport ? '' : 'lg:col-span-7'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold sm:text-base">
                  Revenue Velocity ({timeframe})
                </h2>
                <p
                  className={`text-[11px] ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Hover or tap any node to inspect exact revenue
                </p>
              </div>
              {hoveredIdx !== null && points[hoveredIdx] && (
                <span className="rounded-lg bg-[#00F0FF]/15 px-2.5 py-1 text-xs font-bold text-[#00F0FF] tabular-nums">
                  {points[hoveredIdx].label}: {points[hoveredIdx].revenue}
                </span>
              )}
            </div>

            <div className="mt-4 w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="h-44 w-full overflow-visible"
                role="img"
                aria-label="Revenue velocity trend chart"
              >
                <defs>
                  <linearGradient id="pulseAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isDark ? '#00F0FF' : '#2563EB'}
                      stopOpacity="0.34"
                    />
                    <stop
                      offset="100%"
                      stopColor={isDark ? '#00F0FF' : '#2563EB'}
                      stopOpacity="0.02"
                    />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#pulseAreaGrad)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke={isDark ? '#00F0FF' : '#2563EB'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((pt, idx) => (
                  <g
                    key={pt.label}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={() => setHoveredIdx(idx)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredIdx === idx ? 6 : 4}
                      fill={isDark ? '#070B16' : '#FFFFFF'}
                      stroke={isDark ? '#EC4899' : '#2563EB'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={pt.x}
                      y={svgH - 2}
                      textAnchor="middle"
                      fontSize="10"
                      fill={isDark ? '#94A3B8' : '#64748B'}
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Interactive AI Copilot Panel */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-5 ${
              isDark
                ? 'border-[#00F0FF]/25 bg-[#0D1326]/90'
                : 'border-slate-200 bg-white shadow-xs'
            } ${isMobileViewport ? '' : 'lg:col-span-5'}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold sm:text-base">
                  AI Ops Copilot
                </h2>
                <span className="text-[10px] font-semibold text-[#EC4899] uppercase">
                  Interactive
                </span>
              </div>

              <div
                className={`mt-3 rounded-xl border p-3.5 text-xs leading-relaxed ${
                  isDark
                    ? 'border-white/10 bg-[#070B16] text-slate-200'
                    : 'border-slate-200 bg-slate-50 text-slate-800'
                }`}
              >
                {copilotReply}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => askCopilot(q)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                askCopilot(copilotInput);
              }}
              className="mt-4 flex gap-2"
            >
              <input
                type="text"
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                placeholder="Ask about forecast or bottlenecks..."
                aria-label="Ask AI Copilot"
                className={`min-h-[40px] flex-1 rounded-xl border px-3 text-xs focus:outline-none ${
                  isDark
                    ? 'border-white/12 bg-[#070B16] text-white placeholder:text-slate-500 focus:border-[#00F0FF]'
                    : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB]'
                }`}
              />
              <button
                type="submit"
                aria-label="Send copilot question"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00F0FF] text-[#070B16] hover:bg-[#5CF6FF] cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Channel Distribution + Live Automations Table */}
        <div
          className={`rounded-2xl border p-5 ${
            isDark
              ? 'border-white/10 bg-[#0D1326]/90'
              : 'border-slate-200 bg-white shadow-xs'
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold sm:text-base">
                Active Automation Pipelines
              </h2>
              <p
                className={`text-[11px] ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Toggle any workflow live or search by channel
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-52">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter pipelines..."
                  aria-label="Filter automation pipelines"
                  className={`h-9 w-full rounded-xl border pl-8 pr-3 text-xs focus:outline-none ${
                    isDark
                      ? 'border-white/12 bg-[#070B16] text-white placeholder:text-slate-500 focus:border-[#00F0FF]'
                      : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB]'
                  }`}
                />
              </div>
              <button
                type="button"
                onClick={onRequestTemplate}
                className="min-h-[36px] rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#EC4899] px-3.5 text-xs font-bold text-[#070B16] cursor-pointer whitespace-nowrap"
              >
                Build Mine
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {filteredWorkflows.map((wf) => (
              <div
                key={wf.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 ${
                  isDark
                    ? 'border-white/8 bg-[#070B16]/75'
                    : 'border-slate-200 bg-slate-50/75'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold">{wf.name}</p>
                  <p
                    className={`mt-0.5 text-[11px] tabular-nums ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {wf.channel} · {wf.runs} runs · {wf.conversion} conv.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWorkflowStatus(wf.id)}
                  className={`min-h-[34px] rounded-lg border px-3 text-xs font-semibold transition-colors cursor-pointer ${
                    wf.status === 'Active'
                      ? isDark
                        ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                        : 'border-emerald-600/30 bg-emerald-50 text-emerald-800'
                      : wf.status === 'Optimizing'
                        ? isDark
                          ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-300'
                          : 'border-sky-600/30 bg-sky-50 text-sky-800'
                        : isDark
                          ? 'border-white/15 bg-white/5 text-slate-400'
                          : 'border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  {wf.status} (Tap to Toggle)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
