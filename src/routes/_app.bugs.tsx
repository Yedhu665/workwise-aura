import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Card, Badge, StatCard } from "@/components/ui-bits";
import { Bug, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { bugs, bugTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/bugs")({ component: Bugs });

const priorityTone = (p: string) =>
  p === "Critical" ? "destructive" : p === "High" ? "warning" : p === "Medium" ? "info" : "neutral";

const statusTone = (s: string) =>
  s === "Open" ? "destructive" : s === "In Progress" ? "warning" : s === "In Review" ? "info" : "success";

function Bugs() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bug Tracker"
        subtitle="Triage, assign, and resolve issues across all your projects."
        action={
          <button className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow inline-flex items-center gap-2">
            <Plus className="size-4" /> Report bug
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open" value="21" delta="3 critical" icon={Bug} tone="destructive" index={0} />
        <StatCard label="In progress" value="14" icon={Loader2} tone="warning" index={1} />
        <StatCard label="Resolved (wk)" value="31" delta="+18% vs avg" icon={CheckCircle2} tone="success" index={2} />
        <StatCard label="Avg. resolution" value="2.4d" delta="-0.5d" icon={AlertTriangle} tone="info" index={3} />
      </div>

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Resolution velocity</h2>
        <p className="text-xs text-muted-foreground mb-4">Bugs resolved vs. reported by week</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bugTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="opened" fill="oklch(0.68 0.22 25)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="resolved" fill="oklch(0.7 0.17 155)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input placeholder="Search bugs by title, ID, or assignee…"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted/60 text-sm outline-none focus:bg-background border border-transparent focus:border-primary/40" />
          </div>
          <button className="px-3 py-2 rounded-xl border border-border text-sm inline-flex items-center gap-2 hover:bg-accent">
            <Filter className="size-4" /> Filters
          </button>
        </div>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                <th className="text-left font-medium py-3">ID</th>
                <th className="text-left font-medium py-3">Title</th>
                <th className="text-left font-medium py-3">Project</th>
                <th className="text-left font-medium py-3">Priority</th>
                <th className="text-left font-medium py-3">Status</th>
                <th className="text-left font-medium py-3">Assignee</th>
                <th className="text-left font-medium py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((b) => (
                <tr key={b.id} className="border-b border-border/60 hover:bg-accent/30 transition">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                  <td className="py-3 font-medium max-w-md truncate">{b.title}</td>
                  <td className="py-3 text-muted-foreground">{b.project}</td>
                  <td className="py-3"><Badge tone={priorityTone(b.priority) as any}>{b.priority}</Badge></td>
                  <td className="py-3"><Badge tone={statusTone(b.status) as any}>{b.status}</Badge></td>
                  <td className="py-3 text-muted-foreground">{b.assignee}</td>
                  <td className="py-3 text-muted-foreground text-xs">{b.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}