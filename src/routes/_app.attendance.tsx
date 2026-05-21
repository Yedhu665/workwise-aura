import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Clock, Users, Timer, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/ui-bits";
import { attendanceMonth, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/attendance")({ component: Attendance });

function Attendance() {
  const [clockedIn, setClockedIn] = useState(true);
  const [elapsed, setElapsed] = useState(4 * 3600 + 23 * 60 + 12);
  useEffect(() => {
    if (!clockedIn) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [clockedIn]);
  const h = Math.floor(elapsed / 3600).toString().padStart(2, "0");
  const m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, "0");
  const s = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" subtitle="Track work hours and productivity across the team." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 size-48 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Today</div>
            <motion.div
              key={h+m+s}
              initial={{ opacity: 0.7 }} animate={{ opacity: 1 }}
              className="text-5xl font-semibold tracking-tight tabular-nums mt-2"
            >
              {h}:{m}<span className="text-muted-foreground">:{s}</span>
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">Clocked in at 09:02 AM</div>
            <button
              onClick={() => setClockedIn((v) => !v)}
              className="mt-6 w-full px-4 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow inline-flex items-center justify-center gap-2"
            >
              {clockedIn ? <><Pause className="size-4" /> Clock out</> : <><Play className="size-4" /> Clock in</>}
            </button>
            <div className="grid grid-cols-3 mt-6 gap-3 text-center">
              <div className="rounded-xl bg-muted/60 p-3"><div className="text-xs text-muted-foreground">Week</div><div className="font-semibold mt-1">38h 12m</div></div>
              <div className="rounded-xl bg-muted/60 p-3"><div className="text-xs text-muted-foreground">Month</div><div className="font-semibold mt-1">142h</div></div>
              <div className="rounded-xl bg-muted/60 p-3"><div className="text-xs text-muted-foreground">Score</div><div className="font-semibold mt-1 text-success">94</div></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard label="Present today" value="92" delta="62% of 148" icon={Users} tone="success" index={0} />
          <StatCard label="On leave" value="6" icon={Clock} tone="warning" index={1} />
          <StatCard label="Avg. hours" value="7h 48m" delta="+12m vs avg" icon={Timer} tone="info" index={2} />
          <StatCard label="Productivity" value="86%" delta="+4% wk" icon={TrendingUp} tone="primary" index={3} />
        </div>
      </div>

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Attendance · last 30 days</h2>
        <p className="text-xs text-muted-foreground mb-4">Daily present / late / absent</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendanceMonth}>
              <defs>
                <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.17 155)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.7 0.17 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="present" stroke="oklch(0.7 0.17 155)" strokeWidth={2.5} fill="url(#att)" />
              <Area type="monotone" dataKey="late" stroke="oklch(0.78 0.16 75)" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="absent" stroke="oklch(0.68 0.22 25)" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold mb-4">Today's check-ins</h2>
        <div className="divide-y divide-border">
          {employees.slice(0, 6).map((e, i) => (
            <div key={e.id} className="flex items-center gap-4 py-3">
              <Avatar initials={e.avatar} status={e.status as any} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{e.name}</div>
                <div className="text-xs text-muted-foreground">{e.role}</div>
              </div>
              <div className="hidden sm:block text-sm text-muted-foreground tabular-nums">08:{(45 + i * 3).toString().padStart(2, "0")}</div>
              <Badge tone={e.status === "online" ? "success" : e.status === "away" ? "warning" : "neutral"}>{e.status === "online" ? "Working" : e.status === "away" ? "Break" : "Off"}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}