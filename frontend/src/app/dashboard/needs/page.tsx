"use client";

import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, ArrowUpDown, MapPin, AlertTriangle, LayoutDashboard, Database, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NeedsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [needs, setNeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        console.log(`Fetching needs from: ${baseUrl}/api/needs`);
        const response = await fetch(`${baseUrl}/api/needs`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error("Error fetching needs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNeeds();
  }, []);

  const filteredNeeds = needs.filter(need => 
    need.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    need.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Central Registry V4</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Inbound <span className="text-primary text-glow">Payloads.</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium max-w-xl">Real-time humanitarian requirements extracted via Gemini 1.5 Pro Neural Mesh.</p>
        </motion.div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <Button variant="outline" className="h-12 px-8 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 font-bold gap-2 text-xs">
            <Filter className="w-4 h-4" /> Protocol Filter
          </Button>
          <Link 
            href="/upload" 
            className={cn(buttonVariants({ variant: "default" }), "h-12 px-10 rounded-xl bg-primary hover:glow-teal text-background font-black gap-2 text-xs uppercase")}
          >
            New Digitize
          </Link>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-[2rem] border-white/5 overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row gap-8 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Query category, zone, or severity..." 
              className="pl-14 h-14 bg-white/5 border-none rounded-2xl focus:ring-primary text-slate-200 font-medium placeholder:text-slate-600 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 px-6 h-14 rounded-2xl bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary group">
            <Activity className="w-4 h-4 group-hover:animate-pulse" />
            <span>2 Critical Anomalies detected</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="hover:bg-transparent border-white/5 h-16">
                <TableHead className="w-[120px] font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 px-8">ID Hash</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Resource Category</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Deployment Zone</TableHead>
                <TableHead className="text-center font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Severity</TableHead>
                <TableHead className="text-center font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">PAX Impact</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Protocol Status</TableHead>
                <TableHead className="text-right font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 px-8">Command</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-32 border-none">
                     <div className="flex flex-col items-center gap-6">
                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Synchronizing Registry Mesh...</p>
                     </div>
                  </TableCell>
                </TableRow>
              ) : filteredNeeds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-32 border-none">
                    <p className="text-lg font-bold text-slate-500 italic">No inbound payloads found in current cluster.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredNeeds.map((need, i) => (
                  <TableRow key={need.id} className="group hover:bg-white/[0.03] transition-colors border-white/5 h-20">
                    <TableCell className="font-mono text-[10px] font-black text-slate-600 px-8">#{need.id.slice(-8).toUpperCase()}</TableCell>
                    <TableCell>
                      <div className="font-black text-slate-100 uppercase text-xs tracking-tight">{need.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <MapPin className="w-3 h-3 text-primary" />
                        {need.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "text-xl font-black italic",
                        need.urgency >= 8 ? "text-critical text-glow" : need.urgency >= 5 ? "text-warning" : "text-success"
                      )}>
                        {need.urgency.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-black text-xs text-slate-200">{need.affected_count} <span className="text-[9px] font-black uppercase text-slate-600 ml-1">PAX</span></span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border-none shadow-sm",
                        need.urgency >= 8 ? "bg-critical/20 text-critical border border-critical/20" :
                        need.urgency >= 5 ? "bg-warning/20 text-warning border border-warning/20" :
                        "bg-success/20 text-success border border-success/20"
                      )}>
                        {need.urgency >= 8 ? "Critical" : need.urgency >= 5 ? "Serious" : "Stable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Link 
                        href={`/match?id=${need.id}`} 
                        className={cn(buttonVariants({ variant: "default", size: "sm" }), "h-10 px-6 rounded-xl bg-slate-100 text-background hover:bg-primary hover:glow-teal font-black text-[10px] uppercase transition-all opacity-0 group-hover:opacity-100")}
                      >
                        Match <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
