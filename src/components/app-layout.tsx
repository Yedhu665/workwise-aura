import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Bug, Clock, CalendarDays, Users,
  BarChart3, Settings, Search, Bell, Sun, Moon, Sparkles, Menu, X, LogOut, Plus,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chat", label: "Chat", icon: MessageSquare, badge: 4 },
  { to: "/bugs", label: "Bug Tracker", icon: Bug, badge: 12 },
  { to: "/attendance", label: "Attendance", icon: Clock },
  { to: "/leave", label: "Leave", icon: CalendarDays },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Sparkles className="size-4 text-primary-foreground" />
        </div>
        <div>
          <div className="font-semibold tracking-tight">Trackora</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Work OS</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {nav.map((item) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-gradient-primary"
                />
              )}
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-primary/15 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <div className="size-9 rounded-full bg-gradient-primary grid place-items-center text-sm font-semibold text-primary-foreground">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Jordan Diaz</div>
            <div className="text-xs text-muted-foreground truncate">Team Lead · Engineering</div>
          </div>
          <Link to="/login" className="text-muted-foreground hover:text-foreground transition">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" />

      <aside className="hidden lg:flex w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl relative z-10">
        {SidebarInner}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", damping: 24, stiffness: 240 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-sidebar border-r border-sidebar-border"
            >
              {SidebarInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-16 shrink-0 border-b border-border/60 bg-background/60 backdrop-blur-xl flex items-center gap-3 px-4 lg:px-6">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-accent"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden md:flex relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search projects, people, bugs…"
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm transition"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">⌘K</kbd>
          </div>

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setAiOpen((o) => !o)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:opacity-90 transition"
            >
              <Sparkles className="size-4" />
              <span>Ask AI</span>
            </button>
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-accent transition" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-accent transition" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
            </button>
            <button className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-3 py-2 rounded-xl border border-border hover:bg-accent text-sm font-medium transition">
              <Plus className="size-4" /> New
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 lg:p-8 max-w-[1600px] mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {aiOpen && (
          <motion.aside
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 bg-card border-l border-border shadow-glow flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center">
                  <Sparkles className="size-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Trackora AI</div>
                  <div className="text-[10px] text-muted-foreground">Your work co-pilot</div>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="p-1.5 rounded-lg hover:bg-accent">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {[
                "Summarize this week's bug trends",
                "Who's on leave next Monday?",
                "Draft a standup update from my last 3 days",
                "Show productivity dip across engineering",
              ].map((p) => (
                <button key={p} className="w-full text-left text-sm p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-accent/50 transition">
                  {p}
                </button>
              ))}
              <div className="mt-6 p-4 rounded-xl glass">
                <div className="text-xs text-muted-foreground mb-1">Insight</div>
                <div className="text-sm">Bug resolution velocity is up <span className="text-success font-medium">+18%</span> this week. Engineering closed 31 issues, the highest in 6 weeks.</div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="relative">
                <input
                  placeholder="Ask anything about your team…"
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm transition"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold">
                  Ask
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}