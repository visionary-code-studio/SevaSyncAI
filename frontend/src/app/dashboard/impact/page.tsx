"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Target,
  Zap,
  Activity,
  Globe,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const lineData = [
  { name: "Mon", needs: 40, resolved: 24 },
  { name: "Tue", needs: 30, resolved: 13 },
  { name: "Wed", needs: 20, resolved: 38 },
  { name: "Thu", needs: 27, resolved: 39 },
  { name: "Fri", needs: 18, resolved: 48 },
  { name: "Sat", needs: 23, resolved: 38 },
  { name: "Sun", needs: 34, resolved: 43 },
];

export default function ImpactDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const categoryData = stats?.category_breakdown?.map((item: any, i: number) => ({
    ...item,
    color: ["#50A8A4", "#00E676", "#FFB347", "#FF4D4D", "#7B1FA2"][i % 5]
  })) || [
    { name: "Medical", value: 400, color: "#50A8A4" },
    { name: "Food", value: 300, color: "#00E676" },
    { name: "Water", value: 300, color: "#FFB347" },
    { name: "Shelter", value: 200, color: "#FF4D4D" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Network Analytics V2.4</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Impact <span className="text-primary text-glow">Metrics.</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium">Real-time throughput and response velocity within the humanitarian mesh.</p>
        </motion.div>
        
        <div className="flex gap-4">
           <div className="flex items-center gap-3 px-6 h-14 rounded-2xl glass border-none text-[10px] font-black uppercase tracking-widest text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(0,230,118,0.6)]" />
              <span>Gateway Live</span>
           </div>
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 font-bold text-xs">
             Export Data
           </Button>
        </div>
      </div>

      {/* Stats Cards - SaaS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Missions Resolved", value: stats?.needs_resolved || "1,245", trend: "+12.5%", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Active Nodes", value: stats?.active_volunteers || "842", trend: "+5.2%", icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Avg Triage Time", value: stats?.avg_response_time || "1.2h", trend: "-18%", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Network Health", value: "94.2%", trend: "+2.1%", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none glass rounded-[2.5rem] shadow-2xl group hover:glow-teal transition-all">
              <CardContent className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                   <div className={cn("p-4 rounded-2xl border border-white/5", stat.bg, stat.color)}>
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-success uppercase tracking-widest">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.trend}
                   </div>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-100 group-hover:text-primary transition-colors">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-none glass rounded-[3rem] overflow-hidden">
            <CardHeader className="p-10 border-b border-white/5">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold">Response Velocity</CardTitle>
                  <CardDescription className="text-slate-500 font-medium italic mt-1">Telemetry comparison: Identified vs Resolved payloads.</CardDescription>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary glow-teal" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Payloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(0,230,118,0.6)]" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Resolution</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[450px] p-10 pt-12">
              <div className="w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <AreaChart data={lineData}>
                    <defs>
                      <linearGradient id="colorNeeds" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#50A8A4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#50A8A4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E676" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00E676" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#64748b', fontWeight: 900, textAnchor: 'middle'}} 
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#64748b', fontWeight: 900}} 
                    />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0d1414', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', padding: '16px'}}
                      itemStyle={{fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase'}}
                    />
                    <Area type="monotone" dataKey="needs" stroke="#50A8A4" fillOpacity={1} fill="url(#colorNeeds)" strokeWidth={4} />
                    <Area type="monotone" dataKey="resolved" stroke="#00E676" fillOpacity={1} fill="url(#colorResolved)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-none glass rounded-[3rem] h-full flex flex-col">
            <CardHeader className="p-10 border-b border-white/5">
              <CardTitle className="text-xl font-bold">Domain Matrix</CardTitle>
              <CardDescription className="text-slate-500 font-medium italic mt-1">Resource allocation by sector.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-10 flex flex-col items-center justify-center">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={10}
                      dataKey="value"
                    >
                      {categoryData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-12 w-full">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                      <span className="text-sm font-bold text-slate-100 italic">{Math.round(item.value/13)}% Network</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
