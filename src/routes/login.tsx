import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Mail, Lock, Github, Chrome } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-primary p-12 flex-col justify-between text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="relative flex items-center gap-2">
          <div className="size-10 rounded-xl glass grid place-items-center"><Sparkles className="size-5" /></div>
          <div className="font-semibold text-lg">Trackora</div>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-semibold tracking-tight leading-tight">The work OS your team will actually love.</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-sm">Chat, bugs, attendance, leaves, and analytics — unified with an AI co-pilot built in.</p>
        </div>
        <div className="relative text-xs text-primary-foreground/70">© 2026 Trackora · All rights reserved</div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your Trackora workspace.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-accent text-sm"><Chrome className="size-4" /> Google</button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-accent text-sm"><Github className="size-4" /> GitHub</button>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or with email <div className="flex-1 h-px bg-border" />
          </div>
          <form className="space-y-3">
            <label className="block">
              <span className="text-xs text-muted-foreground">Email</span>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="email" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm" placeholder="you@company.com" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Password</span>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="password" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm" placeholder="••••••••" />
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-border" /> Remember me</label>
              <Link to="/" className="text-primary font-medium">Forgot password?</Link>
            </div>
            <Link to="/" className="block text-center w-full py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow">Sign in</Link>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            New to Trackora? <Link to="/signup" className="text-primary font-medium">Create an account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}