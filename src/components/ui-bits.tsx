import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card text-card-foreground shadow-soft", className)}>
      {children}
    </div>
  );
}

export function StatCard({
  label, value, delta, icon: Icon, tone = "primary", index = 0,
}: {
  label: string; value: string; delta?: string; icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "info" | "destructive"; index?: number;
}) {
  const toneMap = {
    primary: "from-primary/20 to-primary/0 text-primary",
    success: "from-success/20 to-success/0 text-success",
    warning: "from-warning/20 to-warning/0 text-warning",
    info: "from-info/20 to-info/0 text-info",
    destructive: "from-destructive/20 to-destructive/0 text-destructive",
  } as const;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft"
    >
      <div className={cn("absolute -top-10 -right-10 size-32 rounded-full blur-2xl bg-gradient-to-br opacity-70", toneMap[tone])} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
          <div className="text-3xl font-semibold mt-2 tracking-tight">{value}</div>
          {delta && <div className="text-xs mt-2 text-success font-medium">{delta}</div>}
        </div>
        <div className={cn("size-10 rounded-xl grid place-items-center bg-background/60 border border-border", toneMap[tone].split(" ").pop())}>
          <Icon className="size-5" />
        </div>
      </div>
    </motion.div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "primary" | "success" | "warning" | "destructive" | "info" }) {
  const map = {
    neutral: "bg-muted text-muted-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
  } as const;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium", map[tone])}>
      {children}
    </span>
  );
}

export function Avatar({ initials, size = 8, status }: { initials: string; size?: number; status?: "online" | "away" | "offline" }) {
  const statusColor = status === "online" ? "bg-success" : status === "away" ? "bg-warning" : "bg-muted-foreground";
  return (
    <div className="relative inline-block">
      <div
        className="rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-semibold"
        style={{ width: `${size * 4}px`, height: `${size * 4}px`, fontSize: `${size * 1.4}px` }}
      >
        {initials}
      </div>
      {status && <span className={cn("absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-background", statusColor)} />}
    </div>
  );
}