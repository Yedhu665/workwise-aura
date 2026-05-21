import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hash, Plus, Send, Paperclip, Smile, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui-bits";
import { channels, dms, sampleMessages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/chat")({ component: Chat });

function Chat() {
  const [active, setActive] = useState("engineering");
  const [draft, setDraft] = useState("");
  return (
    <div className="h-[calc(100vh-10rem)] grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_280px] gap-4">
      <aside className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input placeholder="Find a chat" className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/60 text-sm outline-none focus:bg-background border border-transparent focus:border-primary/40" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
          <div className="flex items-center justify-between px-2 pt-2 pb-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Channels</div>
            <button className="text-muted-foreground hover:text-foreground"><Plus className="size-3.5" /></button>
          </div>
          {channels.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.name)}
              className={cn("w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm",
                active === c.name ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50")}
            >
              <Hash className="size-3.5" />
              <span className="flex-1 text-left">{c.name}</span>
              {c.unread > 0 && <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5">{c.unread}</span>}
            </button>
          ))}
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 pt-4 pb-1">Direct messages</div>
          {dms.map((d) => (
            <button key={d.id} onClick={() => setActive(d.name)}
              className={cn("w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm",
                active === d.name ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50")}>
              <Avatar initials={d.avatar} size={6} status={d.status as any} />
              <span className="flex-1 text-left truncate">{d.name}</span>
              {d.unread > 0 && <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5">{d.unread}</span>}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-2xl border border-border bg-card flex flex-col overflow-hidden">
        <header className="h-14 px-5 border-b border-border flex items-center gap-3">
          <Hash className="size-4 text-muted-foreground" />
          <div>
            <div className="font-semibold text-sm">{active}</div>
            <div className="text-[11px] text-muted-foreground">22 members · 3 online</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
          {sampleMessages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn("flex gap-3", m.me && "flex-row-reverse")}
            >
              <Avatar initials={m.avatar} size={8} />
              <div className={cn("max-w-[70%]", m.me && "items-end flex flex-col")}>
                <div className={cn("flex items-baseline gap-2 mb-1", m.me && "flex-row-reverse")}>
                  <span className="text-sm font-semibold">{m.from}</span>
                  <span className="text-[11px] text-muted-foreground">{m.time}</span>
                </div>
                <div className={cn("px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                  m.me ? "bg-gradient-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm")}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pl-11">
            <span className="flex gap-1">
              <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse" />
              <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:120ms]" />
              <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:240ms]" />
            </span>
            Aria is typing…
          </div>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border focus-within:border-primary/40 bg-background">
            <button className="text-muted-foreground hover:text-foreground"><Paperclip className="size-4" /></button>
            <input
              value={draft} onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message #${active}`}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="text-muted-foreground hover:text-foreground"><Smile className="size-4" /></button>
            <button className="size-8 rounded-lg bg-gradient-primary text-primary-foreground grid place-items-center"><Send className="size-4" /></button>
          </div>
        </div>
      </section>

      <aside className="hidden lg:flex rounded-2xl border border-border bg-card flex-col overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="text-sm font-semibold mb-3">Members</div>
          <div className="space-y-2.5">
            {dms.map((d) => (
              <div key={d.id} className="flex items-center gap-2.5">
                <Avatar initials={d.avatar} size={7} status={d.status as any} />
                <div className="text-sm">{d.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5">
          <div className="text-sm font-semibold mb-3">Shared files</div>
          <div className="space-y-2">
            {["design-v3.fig", "auth-flow.pdf", "Q3-roadmap.xlsx"].map((f) => (
              <div key={f} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-sm">
                <div className="size-8 rounded-md bg-gradient-primary/20 grid place-items-center text-primary">
                  <Paperclip className="size-4" />
                </div>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}