"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Zap, 
  MapPin, 
  Star, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Loader2,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function MatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const needId = searchParams.get("id");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [showDispatchSuccess, setShowDispatchSuccess] = useState(false);

  useEffect(() => {
    if (!needId) return;

    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/match?need_id=${needId}`, {
          method: "POST",
        });
        const data = await response.json();
        setMatches(data.matches || []);
      } catch (error) {
        console.error("Match error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [needId]);

  const handleDispatch = (volunteerId: string) => {
    setDispatchingId(volunteerId);
    setTimeout(() => {
      setDispatchingId(null);
      setShowDispatchSuccess(true);
    }, 2000);
  };

  if (!needId) return (
    <div className="max-w-7xl mx-auto py-32 text-center bg-background min-h-screen">
       <div className="bg-white/5 p-8 rounded-full w-fit mx-auto mb-10 border border-white/5">
          <Info className="w-12 h-12 text-slate-700" />
       </div>
       <h1 className="text-3xl font-black text-slate-100 uppercase italic tracking-tighter">Mission Hash Missing</h1>
       <p className="text-slate-500 mt-4 font-medium max-w-sm mx-auto">Please select a payload from the registry or mesh to initiate orchestration.</p>
       <Button className="mt-12 h-14 px-12 rounded-full bg-primary hover:glow-teal text-background font-black uppercase text-xs" onClick={() => router.push("/heatmap")}>
         Return to Mesh
       </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 lg:px-12 bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Vertex AI Orchestration Mesh</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Mission <span className="text-primary text-glow">Sync.</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium">Orchestrating vetted responders for Payload ID: <span className="text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10">#{needId.slice(-8).toUpperCase()}</span></p>
        </motion.div>

        <div className="flex gap-4">
           <div className="p-6 rounded-[2rem] glass border-none flex flex-col items-center min-w-[140px]">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Neural Nodes</span>
              <span className="text-3xl font-black text-slate-100">{matches.length}</span>
           </div>
           <div className="p-6 rounded-[2rem] glass border-none flex flex-col items-center min-w-[140px]">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Confidence Score</span>
              <span className="text-3xl font-black text-primary">98.4%</span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="mb-10 flex items-center justify-between">
             <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Ranked Responders</h2>
             <Badge variant="outline" className="rounded-full border-white/5 bg-white/5 text-slate-500 px-4 py-1 font-bold text-[9px] uppercase">Sorted by Neural Score</Badge>
          </div>

          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-48 w-full glass rounded-[2.5rem] animate-pulse border-none" />
              ))
            ) : matches.length === 0 ? (
              <div className="py-24 text-center glass rounded-[2.5rem] border-none">
                 <p className="text-lg font-bold text-slate-500 italic">No optimal responders found in current cluster.</p>
              </div>
            ) : (
              matches.map((match, i) => (
                <motion.div
                  key={match.volunteer_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={cn(
                    "group border-none glass rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:glow-teal",
                    i === 0 ? "border-primary/20 bg-white/[0.03]" : "bg-white/[0.01]"
                  )}>
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="p-10 flex-1">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-6">
                            <Avatar className="w-20 h-20 border-4 border-white/5 shadow-2xl">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${match.volunteer_id}`} />
                              <AvatarFallback className="bg-primary/20 text-primary font-black uppercase">{match.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-black text-slate-100 tracking-tight leading-none uppercase">{match.name}</h3>
                                {i === 0 && (
                                  <Badge className="bg-primary text-background border-none rounded-full px-3 py-0.5 text-[8px] font-black uppercase tracking-widest h-fit">
                                    Primary Result
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-primary text-primary" /> 4.9</div>
                                <div className="w-1 h-1 bg-white/10 rounded-full" />
                                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 1.2km Alpha</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Neural Rank</p>
                             <div className="text-4xl font-black text-primary italic">
                                {Math.round(match.score * 100)}<span className="text-sm opacity-30 ml-1">%</span>
                             </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                              <p className="text-[9px] text-primary/60 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                 <Sparkles className="w-3.5 h-3.5 text-primary" /> Gemini Interpretation
                              </p>
                              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                                "{match.explanation || "Highly qualified for medical assistance based on current certifications and geographic proximity."}"
                              </p>
                           </div>

                           <div className="flex flex-wrap gap-2 pt-2">
                              {match.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="px-4 py-1.5 rounded-xl bg-white/5 border-white/5 text-slate-400 font-black text-[9px] uppercase tracking-widest group-hover:border-primary/30 transition-colors">
                                  {skill}
                                </Badge>
                              ))}
                           </div>
                        </div>
                      </div>

                      <div className="md:w-64 bg-white/[0.01] p-10 flex flex-col justify-center items-center gap-6 border-l border-white/5">
                        <Button 
                          className="w-full h-16 rounded-2xl bg-primary hover:glow-teal text-background font-black text-xs uppercase gap-2 transition-all"
                          onClick={() => handleDispatch(match.volunteer_id)}
                          disabled={dispatchingId === match.volunteer_id}
                        >
                          {dispatchingId === match.volunteer_id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>Dispatch Node <ArrowRight className="w-4 h-4" /></>
                          )}
                        </Button>
                        <Button variant="ghost" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:text-primary hover:bg-primary/5">
                          View Protocol
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
           >
             <Card className="border-none glass shadow-2xl rounded-[3rem] bg-slate-900/50 text-white overflow-hidden relative group hover:glow-teal transition-all">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <CardHeader className="p-10 border-b border-white/5">
                   <CardTitle className="text-xl font-bold uppercase italic tracking-tighter">Mission Manifest</CardTitle>
                   <CardDescription className="text-slate-500 font-medium italic mt-1">Immutable Deployment Specs</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                   <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Primary Objective</span>
                         <span className="text-lg font-bold text-slate-100">Medical Cluster Deployment</span>
                      </div>
                      <div className="flex flex-col gap-2">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Deployment Zone</span>
                         <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-lg font-bold text-slate-100 uppercase italic">Alpha Cluster (Zone 4)</span>
                         </div>
                      </div>
                      <div className="flex flex-col gap-2">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-critical">Severity Index</span>
                         <div className="flex items-center gap-4">
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                               <div className="w-[85%] h-full bg-critical shadow-[0_0_8px_rgba(255,77,77,0.6)]" />
                            </div>
                            <span className="font-black text-critical text-xl italic text-glow">8.5</span>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
           </motion.div>

           <Card className="border-none glass shadow-2xl rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5">
                 <CardTitle className="text-xl font-bold uppercase italic tracking-tighter">Protocol Mesh</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                 {[
                   { label: "Neural Match", status: "Verified", icon: ShieldCheck, color: "text-primary" },
                   { label: "SMS Gateway", status: "Synchronized", icon: Smartphone, color: "text-success" },
                   { label: "Auth Layer", status: "Encrypted", icon: ShieldCheck, color: "text-success" },
                 ].map(protocol => (
                   <div key={protocol.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className={cn("p-2 rounded-lg bg-white/5", protocol.color)}><protocol.icon className="w-5 h-5" /></div>
                         <span className="text-xs font-bold text-slate-200">{protocol.label}</span>
                      </div>
                      <span className="text-[8px] font-black uppercase text-slate-600 tracking-widest">{protocol.status}</span>
                   </div>
                 ))}
              </CardContent>
           </Card>
        </div>
      </div>

      <AnimatePresence>
        {showDispatchSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-[3rem] p-16 max-w-xl w-full text-center border-primary/20 shadow-[0_0_60px_rgba(80,168,164,0.2)]"
            >
              <div className="bg-success p-6 rounded-full w-fit mx-auto mb-10 shadow-[0_0_30px_rgba(0,230,118,0.3)]">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-black text-slate-100 uppercase italic tracking-tighter mb-4">Mission Synced</h2>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-10 text-left">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-primary" /> Outgoing Payload Manifest
                </p>
                <div className="bg-background/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                  <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                    "🚨 SevaSync AI: Critical mission synced in Zone 4. Tactical link initialized. Auth hash: http://sevasync.ai/m/{needId.slice(-8).toUpperCase()}"
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full h-16 rounded-2xl bg-primary hover:glow-teal text-background font-black text-lg uppercase transition-all" onClick={() => router.push("/heatmap")}>
                  Return to Control
                </Button>
                <Button variant="ghost" className="w-full font-black text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-primary" onClick={() => setShowDispatchSuccess(false)}>
                  Dismiss Manifest
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MatchPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
             <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Initializing Orchestration Mesh...</p>
          </div>
       </div>
    }>
      <MatchContent />
    </Suspense>
  );
}
