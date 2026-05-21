import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users, UserCheck, ListTodo, Bug, Activity, TrendingUp, ArrowUpRight,
  GitMerge, FileUp, ShieldCheck, CalendarCheck, BarChart3, Clock,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, StatCard, Card, Badge, Avatar } from "@/components/ui-bits";
import { activities, bugTrend, departmentSplit, productivityWeek, tasks } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

const PIE_COLORS = ["oklch(0.72 0.18 285)", "oklch(0.7 0.18 200)", "oklch(0.78 0.16 75)", "oklch(0.7 0.17 155)", "oklch(0.68 0.22 25)"];

const iconForActivity = (type: string) => {
  switch (type) {
    case "code": return GitMerge;
    case "file": return FileUp;
    case "bug": return Bug;
    case "leave": return CalendarCheck;
    case "report": return BarChart3;
    case "attendance": return Clock;
    default: return Activity;
  }
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Jordan 👋"
        subtitle="Here's what's happening across your team today."
        action={
          <div className="flex items-center gap-2">
            <Badge tone="success">All systems normal</Badge>
            <button className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow">
              Generate report
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total employees" value="148" delta="+6 this month" icon={Users} tone="primary" index={0} />
        <StatCard label="Active now" value="92" delta="+12% vs. avg" icon={UserCheck} tone="success" index={1} />
        <StatCard label="Pending tasks" value="34" delta="-8 this week" icon={ListTodo} tone="warning" index={2} />
        <StatCard label="Open bugs" value="21" delta="3 critical" icon={Bug} tone="destructive" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Team productivity</h2>
              <p className="text-xs text-muted-foreground">Tasks completed · last 7 days</p>
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="size-4" /> +18%
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityWeek}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="tasks" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Team distribution</h2>
          <p className="text-xs text-muted-foreground mb-4">By department</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentSplit} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {departmentSplit.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {departmentSplit.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="size-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Bug velocity</h2>
              <p className="text-xs text-muted-foreground">Opened vs. resolved · last 6 weeks</p>
            </div>
            <Badge tone="success">Resolving faster</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bugTrend} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="opened" fill="oklch(0.68 0.22 25)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="resolved" fill="oklch(0.7 0.17 155)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent activity</h2>
            <button className="text-xs text-primary font-medium inline-flex items-center gap-1">View all <ArrowUpRight className="size-3" /></button>
          </div>
          <ul className="space-y-3">
            {activities.map((a, i) => {
              const Icon = iconForActivity(a.type);
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-3"
                >
                  <div className="size-8 rounded-lg bg-accent text-accent-foreground grid place-items-center shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm leading-snug"><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span></div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{a.when}</div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">Your tasks today</h2>
            <p className="text-xs text-muted-foreground">4 active · 2 due this week</p>
          </div>
          <button className="text-xs text-primary font-medium inline-flex items-center gap-1">View board <ArrowUpRight className="size-3" /></button>
        </div>
        <div className="divide-y divide-border">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-4 py-3">
              <input type="checkbox" className="size-4 rounded border-border" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.id} · {t.assignee}</div>
              </div>
              <Badge tone={t.status === "In Progress" ? "primary" : t.status === "In Review" ? "info" : "neutral"}>{t.status}</Badge>
              <span className="text-xs text-muted-foreground hidden sm:inline w-20 text-right">{t.due}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}