import { createFileRoute } from "@tanstack/react-router";
import { Download, TrendingUp } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, Card, StatCard, Badge } from "@/components/ui-bits";
import { BarChart3, CheckCircle2, Users, Zap } from "lucide-react";
import { bugTrend, productivityWeek } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/reports")({ component: Reports });

const revenue = [
  { m: "Jan", r: 32 }, { m: "Feb", r: 38 }, { m: "Mar", r: 41 },
  { m: "Apr", r: 47 }, { m: "May", r: 52 }, { m: "Jun", r: 49 },
];
const skills = [
  { skill: "Velocity", A: 88 }, { skill: "Quality", A: 92 }, { skill: "Collab", A: 84 },
  { skill: "Delivery", A: 90 }, { skill: "Innovation", A: 78 }, { skill: "Focus", A: 86 },
];

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Performance, productivity, and revenue at a glance."
        action={
          <button className="px-4 py-2 rounded-xl border border-border hover:bg-accent text-sm font-medium inline-flex items-center gap-2">
            <Download className="size-4" /> Export
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tasks shipped" value="1,284" delta="+22% MoM" icon={CheckCircle2} tone="success" index={0} />
        <StatCard label="Active users" value="148" delta="+6" icon={Users} tone="primary" index={1} />
        <StatCard label="Avg. velocity" value="42 pts" delta="+5" icon={Zap} tone="info" index={2} />
        <StatCard label="Revenue" value="$248K" delta="+18%" icon={BarChart3} tone="warning" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Revenue trend</h2>
              <p className="text-xs text-muted-foreground">Monthly · in thousands</p>
            </div>
            <Badge tone="success"><span className="inline-flex items-center gap-1"><TrendingUp className="size-3" /> +18%</span></Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="r" stroke="oklch(0.72 0.18 285)" strokeWidth={3} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-1">Team competency</h2>
          <p className="text-xs text-muted-foreground mb-4">Across 6 dimensions</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Radar dataKey="A" stroke="oklch(0.72 0.18 285)" fill="oklch(0.72 0.18 285)" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="font-semibold mb-1">Hours worked</h2>
          <p className="text-xs text-muted-foreground mb-4">Weekly cadence</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="hours" stroke="oklch(0.7 0.18 200)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold mb-1">Bug resolution</h2>
          <p className="text-xs text-muted-foreground mb-4">Opened vs. resolved</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bugTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="opened" fill="oklch(0.68 0.22 25)" radius={[6,6,0,0]} />
                <Bar dataKey="resolved" fill="oklch(0.7 0.17 155)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}