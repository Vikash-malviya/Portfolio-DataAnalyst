import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, ShoppingBag, Users, Percent } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { dashboardSeries, categoryShare } from "../data/profile";

const GOLD = "#D4AF37";
const kpis = [
  { icon: TrendingUp, label: "Revenue tracked", value: "₹7.9L", delta: "+18.2% YoY" },
  { icon: ShoppingBag, label: "Orders analysed", value: "5,637", delta: "+12.4% YoY" },
  { icon: Users, label: "Churn risk flagged", value: "23%", delta: "of 7K customers" },
  { icon: Percent, label: "Avg. order value", value: "₹1,402", delta: "+6.1% YoY" },
];

const tooltipStyle = {
  backgroundColor: "rgba(10,10,12,0.92)",
  border: "1px solid rgba(212,175,55,0.3)",
  borderRadius: "14px",
  fontSize: "12px",
  color: "#F5F5F7",
  backdropFilter: "blur(12px)",
};

export default function Dashboard() {
  return (
    <section id="dashboard" data-testid="dashboard-section" className="relative bg-[#0A0A0C] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="04 — Live Style Dashboard"
          title="Data, worn"
          accent="elegantly."
          description="A glimpse of how I present numbers — illustrative figures in the style of my Retail Sales Performance project."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={0.05 + i * 0.06}>
              <div data-testid={`kpi-card-${i}`} className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-gold/30">
                <k.icon size={18} className="text-gold" />
                <p className="mt-4 font-serif text-2xl sm:text-3xl text-zinc-100">{k.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">{k.label}</p>
                <p className="mt-2 text-xs text-gold/80">{k.delta}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-serif text-xl text-zinc-100">Monthly Revenue</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">₹ thousands · illustrative</span>
              </div>
              <div className="h-72" data-testid="revenue-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardSeries} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={GOLD} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(212,175,55,0.3)" }} />
                    <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2} fill="url(#goldFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.16}>
            <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-serif text-xl text-zinc-100">Category Share</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">%</span>
              </div>
              <div className="h-72" data-testid="category-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryShare} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} width={82} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(212,175,55,0.06)" }} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={18}>
                      {categoryShare.map((_, i) => (
                        <Cell key={i} fill={GOLD} fillOpacity={1 - i * 0.22} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
