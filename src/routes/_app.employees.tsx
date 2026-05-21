import { createFileRoute } from "@tanstack/react-router";
import { Mail, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader, Card, Badge, Avatar } from "@/components/ui-bits";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/employees")({ component: Employees });

function Employees() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        subtitle="Manage your team, roles, and departments."
        action={
          <button className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow inline-flex items-center gap-2">
            <Plus className="size-4" /> Add employee
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-60 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input placeholder="Search by name, role, department…"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted/60 text-sm outline-none focus:bg-background border border-transparent focus:border-primary/40" />
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1 text-xs">
          {["All", "Engineering", "Design", "Product", "Quality"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 rounded-md ${i === 0 ? "bg-background shadow-soft" : "text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {employees.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
          >
            <Card className="p-5 hover:border-primary/30 transition">
              <div className="flex items-start justify-between mb-4">
                <Avatar initials={e.avatar} size={12} status={e.status as any} />
                <Badge tone={e.status === "online" ? "success" : e.status === "away" ? "warning" : "neutral"}>
                  {e.status}
                </Badge>
              </div>
              <div className="font-semibold">{e.name}</div>
              <div className="text-xs text-muted-foreground">{e.role}</div>
              <div className="text-xs text-muted-foreground mt-1">{e.dept}</div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Productivity</span>
                  <span className="font-semibold">{e.productivity}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${e.productivity}%` }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-primary"
                  />
                </div>
              </div>
              <button className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-xs hover:bg-accent transition">
                <Mail className="size-3.5" /> Message
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}