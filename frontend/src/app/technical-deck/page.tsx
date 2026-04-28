"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Database, 
  Layers, 
  Users, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  Server,
  Code2,
  Workflow
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const workflowSteps = [
  {
    title: "Inbound Payload",
    description: "NGO coordinator uploads a handwritten survey or field report image.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Neural Extraction",
    description: "Gemini 1.5 Pro performs high-precision OCR and entity extraction.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Mesh Synchronization",
    description: "Extracted data is instantly synchronized across the global mesh via Firestore.",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Semantic Mapping",
    description: "Vertex AI computes cosine similarity to find the most compatible responder nodes.",
    icon: Layers,
    color: "text-warning",
    bg: "bg-warning/10"
  },
  {
    title: "Resource Dispatch",
    description: "Coordinators finalize the link and trigger real-time deployment notifications.",
    icon: ShieldCheck,
    color: "text-success",
    bg: "bg-success/10"
  }
];

const personas = [
  {
    role: "NGO Coordinator",
    task: "Data entry, mesh monitoring, and field orchestration.",
    avatar: "https://i.pravatar.cc/150?u=coord"
  },
  {
    role: "Responder Node",
    task: "Execution of specialized humanitarian tasks (medical, logistical).",
    avatar: "https://i.pravatar.cc/150?u=vol"
  },
  {
    role: "Mesh Administrator",
    task: "Infrastructure oversight and strategic impact reporting.",
    avatar: "https://i.pravatar.cc/150?u=admin"
  }
];

export default function TechnicalDeck() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-6 lg:px-12 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 px-6 py-2 rounded-full glass border-none text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">
            <Server className="w-4 h-4" /> System Architecture V1.0
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Technical <span className="text-primary text-glow">Deck.</span>
          </h1>
        </motion.div>
        <p className="text-slate-500 text-xl font-medium max-w-2xl italic">
          "A decentralized intelligence layer for rapid humanitarian response coordination."
        </p>
      </div>

      {/* Tech Stack Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32 relative group"
      >
        <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative glass rounded-[4rem] border-white/5 overflow-hidden shadow-2xl p-4 lg:p-12">
          <div className="flex items-center gap-4 mb-8 px-8">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Protocol Stack</h2>
          </div>
          <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden bg-white/[0.02]">
            <Image 
              src="/tech-stack.png" 
              alt="SevaSync AI Tech Stack" 
              fill 
              className="object-contain p-8"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Workflow Section */}
      <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
        <div>
           <div className="flex items-center gap-4 mb-8">
              <Workflow className="w-6 h-6 text-primary" />
              <h2 className="text-4xl font-black uppercase tracking-tight italic">Mission <span className="text-primary">Workflow.</span></h2>
           </div>
           <div className="space-y-4">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-6 rounded-[2rem] hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 group"
                >
                  <div className={`p-4 rounded-2xl h-fit ${step.bg} ${step.color} group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase italic text-slate-100 mb-2">{step.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
        <div className="relative">
           <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px]" />
           <div className="glass rounded-[4rem] border-white/5 p-12 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-10">
                 <div className="p-2 rounded-lg bg-primary/20"><Zap className="w-4 h-4 text-primary" /></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Neural Mesh Latency</span>
              </div>
              <div className="space-y-12">
                 {[
                   { label: "OCR Accuracy", value: "99.4%", color: "text-primary" },
                   { label: "Match Velocity", value: "0.8s", color: "text-primary" },
                   { label: "Mesh Uptime", value: "99.9%", color: "text-primary" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end border-b border-white/5 pb-6">
                      <span className="text-sm font-black uppercase text-slate-500">{stat.label}</span>
                      <span className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</span>
                   </div>
                 ))}
              </div>
              <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/5">
                 <p className="text-xs font-bold text-slate-400 italic leading-relaxed">
                   "The integration of Gemini 1.5 Pro allows for multi-modal context understanding, moving beyond simple keyword matching to true semantic intent within humanitarian needs."
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Personas Section */}
      <div className="mb-32">
        <div className="flex items-center justify-center gap-4 mb-16">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-4xl font-black uppercase tracking-tight italic text-center">User <span className="text-primary">Personas.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="border-none glass rounded-[3rem] overflow-hidden group hover:glow-teal transition-all h-full">
                <CardContent className="p-10 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image 
                      src={persona.avatar} 
                      alt={persona.role} 
                      width={96} 
                      height={96} 
                      className="rounded-full border-4 border-white/5 relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-black uppercase italic text-slate-100 mb-4">{persona.role}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{persona.task}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-10"
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-primary" />
        <Link href="/">
          <Button className="h-16 px-12 rounded-2xl bg-primary text-background hover:glow-teal font-black text-xs uppercase tracking-widest gap-4 group">
             Back to Command Center <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
