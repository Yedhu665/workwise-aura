import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Mail, Lock, User, Chrome, Github } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 lg:p-12 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Create your workspace</h2>
            <p className="text-sm text-muted-foreground mt-1">Get started in under a minute.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-accent text-sm"><Chrome className="size-4" /> Google</button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-accent text-sm"><Github className="size-4" /> GitHub</button>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or with email <div className="flex-1 h-px bg-border" />
          </div>
          <form className="space-y-3">
            <label className="block"><span className="text-xs text-muted-foreground">Full name</span>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm" placeholder="Jordan Diaz" />
              </div>
            </label>
            <label className="block"><span className="text-xs text-muted-foreground">Work email</span>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="email" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm" placeholder="you@company.com" />
              </div>
            </label>
            <label className="block"><span className="text-xs text-muted-foreground">Password</span>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="password" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm" placeholder="At least 8 characters" />
              </div>
            </label>
            <Link to="/" className="block text-center w-full py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow">Create account</Link>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            Already have one? <Link to="/login" className="text-primary font-medium">Sign in</Link>
          </div>
        </motion.div>
      </div>
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-primary p-12 flex-col justify-between text-primary-foreground order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="relative flex items-center gap-2 justify-end">
          <div className="font-semibold text-lg">Trackora</div>
          <div className="size-10 rounded-xl glass grid place-items-center"><Sparkles className="size-5" /></div>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-semibold tracking-tight leading-tight">Run your team with calm and clarity.</h1>
          <ul className="mt-6 space-y-2 text-primary-foreground/85 text-sm">
            <li>• Real-time chat, channels and DMs</li>
            <li>• Bug tracking with priorities and analytics</li>
            <li>• Attendance, leaves, and productivity insights</li>
            <li>• Built-in AI co-pilot for every workflow</li>
          </ul>
        </div>
        <div className="relative text-xs text-primary-foreground/70 text-right">Trusted by 2,400+ modern teams</div>
      </div>
    </div>
  );
}