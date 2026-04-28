"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ShieldCheck, CheckCircle2, Zap, HandHelping, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VolunteerTaskPage() {
  const params = useParams();
  const needId = params.id as string;
  const [need, setNeed] = useState<any>(null);
  const [status, setStatus] = useState<"pending" | "accepted" | "completed">("pending");

  useEffect(() => {
    const fetchNeed = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/needs`);
        const data = await response.json();
        const found = data.find((n: any) => n.id === needId);
        setNeed(found);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchNeed();
  }, [needId]);

  if (!need) return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Establishing Secure Link...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] opacity-20" />
      </div>

      <header className="relative z-10 pt-12 pb-8 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="SevaSync Logo" 
              fill 
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">SevaSync</span>
        </motion.div>
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-100">Volunteer Mission</h1>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Secure Dispatch Node: {need.id.slice(-8).toUpperCase()}</p>
      </header>

      <main className="relative z-10 max-w-lg mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="glass border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-critical/20 text-critical border-critical/30 uppercase text-[9px] px-3 py-1 font-black">Urgent Protocol</Badge>
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-500">
                  <Clock className="w-3 h-3" /> 2m ago
                </div>
              </div>
              <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-slate-100">
                {need.category} Needed
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-primary font-bold text-sm mt-2">
                <MapPin className="w-4 h-4" /> {need.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Intelligence Report</p>
                <p className="text-slate-300 font-medium leading-relaxed italic">
                  "{need.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Affected PAX</p>
                  <p className="font-black text-2xl text-slate-100 italic">{need.affected_count}+</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Urgency Rank</p>
                  <p className="font-black text-2xl text-critical italic">{need.urgency}/10</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {status === "pending" && (
                  <motion.div 
                    key="pending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Button 
                      className="w-full h-16 rounded-2xl bg-primary text-background font-black text-lg uppercase italic tracking-tighter hover:glow-teal transition-all group"
                      onClick={() => setStatus("accepted")}
                    >
                      Accept Mission <Zap className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform" />
                    </Button>
                    <Button variant="ghost" className="w-full text-slate-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-300">
                      Decline & Re-route
                    </Button>
                  </motion.div>
                )}

                {status === "accepted" && (
                  <motion.div 
                    key="accepted"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                      <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-black text-primary uppercase italic text-lg">Mission Active</h3>
                      <p className="text-xs text-slate-400 font-bold mt-2 italic">Navigate to the sector and deploy resources.</p>
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        className="flex-1 h-14 rounded-xl bg-white/5 border border-white/5 font-black text-xs uppercase tracking-widest"
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${need.coordinates.lat},${need.coordinates.lng}`)}
                      >
                        Open Grid Maps
                      </Button>
                      <Button 
                        className="flex-1 h-14 rounded-xl bg-primary text-background font-black text-xs uppercase tracking-widest hover:glow-teal"
                        onClick={() => setStatus("completed")}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </motion.div>
                )}

                {status === "completed" && (
                  <motion.div 
                    key="completed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-primary/20 border border-primary/30 text-center space-y-6"
                  >
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(80,168,164,0.4)]">
                      <CheckCircle2 className="w-8 h-8 text-background" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-100 uppercase italic text-2xl">Mission Complete</h3>
                      <p className="text-xs text-primary font-bold mt-2 uppercase tracking-widest">Impact Recorded • 50 XP Earned</p>
                    </div>
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-primary transition-colors"
                    >
                      Return to Command Center <ArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <footer className="mt-12 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
            Powered by SevaSync AI • Visionary_Coders
          </p>
        </footer>
      </main>
    </div>
  );
}
