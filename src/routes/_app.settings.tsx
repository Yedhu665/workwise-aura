import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Globe, Lock, Palette, User } from "lucide-react";
import { PageHeader, Card, Avatar, Badge } from "@/components/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({ component: Settings });

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "workspace", label: "Workspace", icon: Globe },
];
const accents = [
  { name: "Violet", color: "oklch(0.72 0.18 285)" },
  { name: "Ocean", color: "oklch(0.7 0.18 200)" },
  { name: "Emerald", color: "oklch(0.7 0.17 155)" },
  { name: "Sunset", color: "oklch(0.7 0.2 35)" },
  { name: "Rose", color: "oklch(0.7 0.2 0)" },
];

function Settings() {
  const [tab, setTab] = useState("profile");
  const [accent, setAccent] = useState("Violet");
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Personalize Trackora for your workflow." />
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="space-y-1">
          {tabs.map((t) => {
            const I = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                  tab === t.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50")}
              >
                <I className="size-4" /> {t.label}
              </button>
            );
          })}
        </aside>

        <div className="space-y-4">
          {tab === "profile" && (
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Avatar initials="JD" size={16} />
                <div>
                  <div className="font-semibold text-lg">Jordan Diaz</div>
                  <div className="text-sm text-muted-foreground">jordan@trackora.io</div>
                  <Badge tone="primary">Team Lead</Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  { l: "Full name", v: "Jordan Diaz" },
                  { l: "Email", v: "jordan@trackora.io" },
                  { l: "Role", v: "Team Lead" },
                  { l: "Department", v: "Engineering" },
                  { l: "Timezone", v: "GMT+1 · Berlin" },
                  { l: "Phone", v: "+49 30 12345678" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-xs text-muted-foreground">{f.l}</span>
                    <input defaultValue={f.v} className="mt-1 w-full px-3 py-2 rounded-lg bg-muted/50 border border-transparent focus:bg-background focus:border-primary/40 outline-none text-sm" />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow">Save changes</button>
              </div>
            </Card>
          )}

          {tab === "appearance" && (
            <Card className="p-6">
              <h3 className="font-semibold mb-1">Theme</h3>
              <p className="text-xs text-muted-foreground mb-4">Use the toggle in the header to switch between light and dark.</p>
              <h3 className="font-semibold mt-6 mb-3">Accent color</h3>
              <div className="flex flex-wrap gap-3">
                {accents.map((a) => (
                  <button key={a.name} onClick={() => setAccent(a.name)}
                    className={cn("flex items-center gap-2 px-3 py-2 rounded-xl border text-sm",
                      accent === a.name ? "border-primary" : "border-border hover:bg-accent")}>
                    <span className="size-4 rounded-full" style={{ background: a.color }} />
                    {a.name}
                  </button>
                ))}
              </div>
              <h3 className="font-semibold mt-6 mb-3">Density</h3>
              <div className="flex gap-2 text-sm">
                <button className="px-4 py-2 rounded-lg border border-primary bg-primary/10 text-primary">Comfortable</button>
                <button className="px-4 py-2 rounded-lg border border-border hover:bg-accent">Compact</button>
              </div>
            </Card>
          )}

          {tab === "notifications" && (
            <Card className="p-6 space-y-4">
              {[
                ["Mentions in chat", true],
                ["Bug assigned to me", true],
                ["Leave request updates", true],
                ["Weekly productivity digest", false],
                ["Marketing & product updates", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">Sent via email and in-app.</div>
                  </div>
                  <button className={cn("w-11 h-6 rounded-full transition relative", on ? "bg-primary" : "bg-muted")}>
                    <span className={cn("absolute top-0.5 size-5 rounded-full bg-background shadow-soft transition", on ? "left-5" : "left-0.5")} />
                  </button>
                </div>
              ))}
            </Card>
          )}

          {tab === "security" && (
            <Card className="p-6 space-y-4">
              <div>
                <div className="text-sm font-medium">Password</div>
                <div className="text-xs text-muted-foreground">Last changed 3 months ago.</div>
                <button className="mt-2 text-sm text-primary font-medium">Update password</button>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium">Two-factor authentication</div>
                <div className="text-xs text-muted-foreground">Add an extra layer using an authenticator app.</div>
                <button className="mt-2 px-3 py-1.5 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-medium">Enable 2FA</button>
              </div>
            </Card>
          )}

          {tab === "workspace" && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Workspace</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><div className="text-xs text-muted-foreground">Name</div><div className="font-medium">Trackora HQ</div></div>
                <div><div className="text-xs text-muted-foreground">Plan</div><div className="font-medium">Business · 148 seats</div></div>
                <div><div className="text-xs text-muted-foreground">Region</div><div className="font-medium">eu-central-1</div></div>
                <div><div className="text-xs text-muted-foreground">Created</div><div className="font-medium">Jan 14, 2024</div></div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}