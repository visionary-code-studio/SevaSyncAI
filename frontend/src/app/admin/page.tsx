"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Key, 
  Bell, 
  Shield, 
  Database, 
  Cloud,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  Globe,
  Zap,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminPanel() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-12 bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <Lock className="w-4 h-4 text-slate-500" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Controller S4</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Infrastructure <span className="text-primary text-glow">Control.</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium">Orchestrating humanitarian nodes and API mesh protocols.</p>
        </motion.div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-primary text-background px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
            >
              <CheckCircle2 className="w-4 h-4" /> Changes synced to mesh
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tabs defaultValue="profile" className="space-y-10">
        <TabsList className="bg-white/5 p-1.5 rounded-2xl w-full sm:w-auto flex flex-wrap gap-2 border border-white/5">
          <TabsTrigger value="profile" className="gap-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-background">
            <Shield className="w-3.5 h-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-background">
            <Key className="w-3.5 h-3.5" /> Access
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-background">
            <Bell className="w-3.5 h-3.5" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-background">
            <Database className="w-3.5 h-3.5" /> Telemetry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-none glass rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                <CardTitle className="text-xl font-bold uppercase italic tracking-tighter">Organization Node</CardTitle>
                <CardDescription className="text-slate-500 font-medium mt-1">Immutable identity for humanitarian mesh participation.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Identity Label</label>
                    <Input defaultValue="Global Relief Alliance" className="h-14 rounded-2xl bg-white/5 border-none font-bold text-slate-200 shadow-inner" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Mesh Registration ID</label>
                    <Input defaultValue="MESH-2024-99812" disabled className="h-14 rounded-2xl bg-white/[0.02] border-none font-mono text-slate-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Mission Protocol</label>
                  <Input defaultValue="Empowering local communities through data-driven resource allocation." className="h-14 rounded-2xl bg-white/5 border-none font-bold text-slate-200" />
                </div>
                <div className="pt-6">
                  <Button 
                    className="h-14 px-12 rounded-2xl bg-primary hover:glow-teal text-background font-black text-xs uppercase transition-all"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Synchronizing..." : "Update Node Infrastructure"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="api">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-none glass rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold uppercase italic tracking-tighter">Google Neural Mesh</CardTitle>
                    <CardDescription className="text-slate-500 font-medium mt-1">Authentication layers for AI and Mapping clusters.</CardDescription>
                  </div>
                  <Badge className="bg-success/20 text-success border border-success/20 px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">
                    SYNCED: US-CENTRAL1
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                {[
                  { name: "Gemini 1.5 Pro AI", status: "Active", lastUsed: "2 mins ago", icon: Zap, color: "text-primary" },
                  { name: "Vertex AI Matcher", status: "Active", lastUsed: "14 mins ago", icon: Shield, color: "text-purple-500" },
                  { name: "Maps Neural Mesh", status: "Active", lastUsed: "Now", icon: Globe, color: "text-primary" },
                  { name: "Vision Core (OCR)", status: "Active", lastUsed: "1h ago", icon: Cloud, color: "text-accent" },
                ].map((api) => (
                  <div key={api.name} className="flex items-center justify-between p-8 bg-white/[0.01] rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                        <api.icon className={cn("w-6 h-6", api.color)} />
                      </div>
                      <div>
                        <p className="font-black text-slate-100 uppercase text-xs tracking-tight">{api.name}</p>
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-1">Last Sync: {api.lastUsed}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden sm:block">
                        <Badge variant="outline" className="bg-white/5 border-white/5 font-mono text-[10px] tracking-[0.3em] px-6 py-1 text-slate-600">••••••••••••••••</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-full hover:bg-white/5 text-slate-600 hover:text-primary transition-all">
                        <RefreshCw className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-none glass rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                <CardTitle className="text-xl font-bold uppercase italic tracking-tighter">Dispatch Gateway</CardTitle>
                <CardDescription className="text-slate-500 font-medium italic mt-1">Multi-channel orchestration for mobile responders.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] shadow-inner">
                  <div className="flex gap-6">
                    <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
                      <Bell className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-black text-slate-100 uppercase text-xs tracking-tight">SMS Payload Cluster</p>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Real-time mobilization for High/Critical triage.</p>
                    </div>
                  </div>
                  <Button className="rounded-xl border-success/20 bg-success/10 text-success font-black text-[10px] uppercase tracking-widest px-8 h-12">ENABLED</Button>
                </div>

                <div className="p-8 bg-warning/5 border border-warning/10 rounded-[2.5rem] flex gap-8 items-center">
                  <div className="bg-warning/20 p-4 rounded-2xl">
                    <Activity className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-warning uppercase tracking-widest mb-1">Throughput Optimization Warning</p>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      SMS node at 12% capacity. System will auto-fallback to In-App mesh messaging in 45 missions.
                    </p>
                  </div>
                  <Button className="bg-warning text-background font-black rounded-xl px-8 h-12 text-[10px] uppercase tracking-widest">Add Credits</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
