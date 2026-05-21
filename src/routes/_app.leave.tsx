import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus, Check, X, Clock } from "lucide-react";
import { useState } from "react";
import { PageHeader, Card, Badge, StatCard, Avatar } from "@/components/ui-bits";
import { leaves } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/leave")({ component: Leave });

function Leave() {
  const [filter, setFilter] = useState<"all" | "Pending" | "Approved" | "Rejected">("all");
  const filtered = leaves.filter((l) => filter === "all" || l.status === filter);
  const tone = (s: string) => s === "Approved" ? "success" : s === "Pending" ? "warning" : "destructive";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        subtitle="Apply, approve, and track time off in one place."
        action={
          <button className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow inline-flex items-center gap-2">
            <Plus className="size-4" /> Apply leave
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="On leave today" value="6" icon={CalendarDays} tone="info" index={0} />
        <StatCard label="Pending approval" value="4" icon={Clock} tone="warning" index={1} />
        <StatCard label="Approved (mo)" value="18" icon={Check} tone="success" index={2} />
        <StatCard label="Your balance" value="14d" delta="2d carried over" icon={CalendarDays} tone="primary" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Requests</h2>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {(["all", "Pending", "Approved", "Rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs rounded-md transition ${filter === f ? "bg-background shadow-soft text-foreground" : "text-muted-foreground"}`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filtered.map((l) => (
              <div key={l.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition">
                <Avatar initials={l.employee.split(" ").map((p) => p[0]).join("").slice(0,2)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{l.employee}</span>
                    <Badge tone="neutral">{l.type}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{l.from} → {l.to} · {l.days}d · {l.reason}</div>
                </div>
                <Badge tone={tone(l.status) as any}>{l.status}</Badge>
                {l.status === "Pending" && (
                  <div className="hidden sm:flex gap-1">
                    <button className="size-8 rounded-lg bg-success/15 text-success hover:bg-success/25 grid place-items-center"><Check className="size-4" /></button>
                    <button className="size-8 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25 grid place-items-center"><X className="size-4" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-1">May 2026</h2>
          <p className="text-xs text-muted-foreground mb-4">Team availability</p>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1">
            {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }).map((_, i) => {
              const onLeave = [22, 23, 28].includes(i + 1);
              const today = i + 1 === 21;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md text-xs grid place-items-center transition cursor-pointer
                    ${onLeave ? "bg-warning/20 text-warning font-medium" : "bg-muted/40 hover:bg-accent"}
                    ${today ? "ring-2 ring-primary" : ""}`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-warning/40" /> On leave</div>
            <div className="flex items-center gap-2"><span className="size-2.5 rounded-sm ring-2 ring-primary" /> Today</div>
          </div>
        </Card>
      </div>
    </div>
  );
}