"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { HandHelping, ArrowRight, ShieldCheck, Zap, BarChart3, Globe, Activity, Layers, Users, Sparkles, MessageSquare, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link className="flex items-center gap-4 group" href="/">
            <div className="relative w-16 h-16 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(80,168,164,0.4)]">
              <Image 
                src="/logo.png" 
                alt="SevaSync Logo" 
                fill 
                priority
                sizes="64px"
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-100">SevaSync</span>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-10">
              <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors" href="#engine">Engine</Link>
              <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors" href="#impact">Impact</Link>
            </nav>
            <Link 
              href="/login" 
              className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:glow-teal text-background font-black px-8 rounded-full transition-all border-none")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-48 pb-32 md:pt-64 md:pb-48">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-10"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/80">Next-Gen Resource Allocation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10"
            >
              The Future of <br />
              <span className="text-primary text-glow italic">Humanitarian Tech.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-14 italic"
            >
              "An AI-powered platform that digitizes community needs from paper surveys and connects volunteers to the right place — in under 90 seconds."
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link 
                href="/login" 
                className={cn(buttonVariants({ variant: "default" }), "h-16 px-12 bg-primary hover:glow-teal text-background rounded-full text-lg font-black transition-all")}
              >
                Launch Protocol <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              <Link 
                href="/technical-deck"
                className={cn(buttonVariants({ variant: "outline" }), "h-16 px-12 rounded-full text-lg font-bold border-white/5 bg-white/5 hover:bg-white/10 transition-all")}
              >
                Technical Deck
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards - Grid System */}
        <section id="engine" className="py-24 md:py-48 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { 
                  title: "90s OCR Core", 
                  desc: "Gemini 1.5 Pro extracts critical needs from paper with 94% accuracy.",
                  icon: Zap,
                  tag: "INTELLIGENCE"
                },
                { 
                  title: "Urgency Mesh", 
                  desc: "Dynamic Google Maps heatmaps visualizing real-time severity clusters.",
                  icon: Globe,
                  tag: "VISUALIZATION"
                },
                { 
                  title: "Neural Dispatch", 
                  desc: "Vertex AI dispatches the optimal volunteer based on semantic fit.",
                  icon: Layers,
                  tag: "AUTOMATION"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 rounded-3xl glass hover:border-primary/30 transition-all duration-500"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-8 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="text-[10px] font-black tracking-[0.2em] text-primary/60 mb-3 uppercase">{feature.tag}</div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works - Step-by-Step */}
        <section className="py-24 md:py-48">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Workflow <span className="text-primary italic">Sync.</span></h2>
              <p className="text-slate-500 font-medium">The end-to-end humanitarian coordination loop.</p>
            </div>

            <div className="relative space-y-12">
               {[
                 { step: "01", title: "Capture & Digitize", desc: "Scan paper surveys via mobile capture or cloud upload.", icon: Upload },
                 { step: "02", title: "AI Urgency Triage", desc: "Gemini 1.5 Pro analyzes semantic intent and ranks severity.", icon: Activity },
                 { step: "03", title: "Semantic Matching", desc: "Vertex AI dispatches vetted volunteers to mission hotspots.", icon: Users },
               ].map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex items-start gap-8 group"
                 >
                    <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors pt-1">{step.step}</div>
                    <div className="flex-1 p-8 rounded-3xl glass group-hover:bg-primary/5 transition-all">
                       <div className="flex items-center gap-4 mb-3">
                          <div className="p-2 rounded-lg bg-white/5"><step.icon className="w-5 h-5 text-primary" /></div>
                          <h4 className="text-xl font-bold">{step.title}</h4>
                       </div>
                       <p className="text-slate-500 font-medium text-sm">{step.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-white/5 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            {/* Brand & Mission */}
            <div className="md:col-span-2 space-y-8">
              <Link className="flex items-center gap-4 group" href="/">
                <div className="relative w-16 h-16 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(80,168,164,0.4)]">
                  <Image 
                    src="/logo.png" 
                    alt="SevaSync Logo" 
                    fill 
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-100">SevaSync AI</span>
              </Link>
              <div className="space-y-4">
                <p className="text-lg font-black text-slate-100 uppercase italic tracking-tighter leading-tight">
                  Sync every seva to every need
                </p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md">
                  "An AI-powered platform that digitizes community needs from paper surveys and connects volunteers to the right place — in under 90 seconds."
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                 <Link href="https://linkedin.com" target="_blank" className="p-3 hover:bg-primary/20 hover:text-primary rounded-xl transition-all text-slate-600 border border-white/5">
                    <ShieldCheck className="w-5 h-5" />
                 </Link>
                 <Link href="https://instagram.com" target="_blank" className="p-3 hover:bg-primary/20 hover:text-primary rounded-xl transition-all text-slate-600 border border-white/5">
                    <MessageSquare className="w-5 h-5" />
                 </Link>
              </div>
            </div>

            {/* Solution Links */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol Mesh</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/heatmap" className="text-sm font-bold text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-tight italic">Urgency Mesh</Link>
                <Link href="/upload" className="text-sm font-bold text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-tight italic">OCR Digitize</Link>
                <Link href="/dashboard/needs" className="text-sm font-bold text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-tight italic">Registry Node</Link>
                <Link href="/volunteers" className="text-sm font-bold text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-tight italic">Volunteer Network</Link>
              </nav>
            </div>

            {/* Team & Meta */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Organization</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-slate-100 transition-colors uppercase tracking-tight italic">About Team</Link>
              </nav>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              Build and powered by Visionary_Coder & Vaibhav Shaw Co.
            </p>
            <div className="flex gap-10">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 italic">© 2026 Proto-Layer V4</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
