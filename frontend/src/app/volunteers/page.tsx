"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Filter,
  Users,
  Zap,
  LayoutGrid,
  List,
  Phone,
  Mail,
  Calendar,
  Award,
  ShieldCheck,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function VolunteerNetwork() {
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  const fetchVolunteers = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      console.log(`Fetching volunteers from: ${baseUrl}/api/volunteers`);
      const response = await fetch(`${baseUrl}/api/volunteers`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // In a real app, this would be a PATCH request
      // For this prototype, we'll simulate the update
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
      setSelectedVolunteer((prev: any) => prev?.id === id ? { ...prev, status: newStatus } : prev);
      
      // Simulate backend update
      console.log(`Setting volunteer ${id} to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Network Topology V1.9</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Human <span className="text-primary text-glow">Resources.</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium max-w-xl">A decentralized mesh of vetted humanitarian responders synchronized via Vertex AI.</p>
        </motion.div>
        
        <div className="flex items-center gap-4 p-1.5 rounded-2xl glass border-none self-end">
           <Button 
             variant={viewMode === "grid" ? "default" : "ghost"} 
             size="sm" 
             onClick={() => setViewMode("grid")}
             className={cn("h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2", viewMode === "grid" ? "bg-primary text-background" : "text-slate-500")}
           >
             <LayoutGrid className="w-4 h-4" /> Grid
           </Button>
           <Button 
             variant={viewMode === "table" ? "default" : "ghost"} 
             size="sm" 
             onClick={() => setViewMode("table")}
             className={cn("h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2", viewMode === "table" ? "bg-primary text-background" : "text-slate-500")}
           >
             <List className="w-4 h-4" /> Table
           </Button>
        </div>
      </div>

      <div className="mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="relative flex-1 w-full max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            placeholder="Search nodes by identity or skill mesh..." 
            className="pl-14 h-14 bg-white/5 border-none rounded-2xl focus:ring-primary text-slate-200 font-medium placeholder:text-slate-600 shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
           <Link href="/register/volunteer">
             <Button className="h-14 px-8 rounded-2xl bg-primary text-background hover:glow-teal font-black text-[10px] uppercase tracking-widest gap-2">
               <Zap className="w-4 h-4" /> Register New Node
             </Button>
           </Link>
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 font-bold text-xs gap-2">
             <Filter className="w-4 h-4" /> Filter Mesh
           </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-32 flex flex-col items-center gap-6"
          >
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Mapping Network Nodes...</p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVolunteers.map((volunteer, i) => (
              <Card 
                key={volunteer.id} 
                onClick={() => setSelectedVolunteer(volunteer)}
                className="border-none glass rounded-[2.5rem] overflow-hidden group hover:glow-teal transition-all cursor-pointer"
              >
                <CardContent className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <Avatar className="w-20 h-20 border-4 border-white/5 shadow-2xl">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${volunteer.id}`} />
                      <AvatarFallback className="bg-primary/20 text-primary font-black uppercase">{volunteer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                       <Badge variant="outline" className={cn(
                         "font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full",
                         volunteer.status === "pending" ? "bg-warning/10 border-warning/20 text-warning" : "bg-primary/5 border-primary/20 text-primary"
                       )}>
                          {volunteer.status === "pending" ? "PENDING REVIEW" : "ACTIVE NODE"}
                       </Badge>
                       <div className="flex items-center gap-1 mt-3 justify-end">
                          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                          <span className="text-xs font-black text-slate-100">{volunteer.reliability || "4.9"}</span>
                       </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-100 tracking-tight uppercase leading-none mb-3">{volunteer.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest mb-8">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {volunteer.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {volunteer.skills.slice(0, 3).map((skill: string) => (
                      <Badge key={skill} variant="outline" className="px-3 py-1 rounded-lg bg-white/5 border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-white/5">
                    <Button 
                      className="flex-1 h-12 rounded-xl bg-primary hover:glow-teal text-background font-black text-[10px] uppercase transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/match?volunteer=${volunteer.id}`;
                      }}
                    >
                      Dispatch
                    </Button>
                    <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-white/5 bg-white/5 text-slate-400">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-[2rem] border-white/5 overflow-hidden shadow-2xl"
          >
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="hover:bg-transparent border-white/5 h-16">
                  <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 px-8">Identity Node</TableHead>
                  <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Resource Domain</TableHead>
                  <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Zone</TableHead>
                  <TableHead className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-500">Reliability</TableHead>
                  <TableHead className="text-right font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 px-8">Command</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((v) => (
                  <TableRow 
                    key={v.id} 
                    onClick={() => setSelectedVolunteer(v)}
                    className="group hover:bg-white/[0.03] transition-colors border-white/5 h-20 cursor-pointer"
                  >
                    <TableCell className="px-8">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 border border-white/5">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${v.id}`} />
                          <AvatarFallback className="bg-primary/20 text-primary font-black text-[10px]">{v.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-slate-100 uppercase text-xs tracking-tight">{v.name}</p>
                          <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">{v.status === 'pending' ? 'Pending' : 'Active'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {v.skills.slice(0, 2).map((skill: string) => (
                          <Badge key={skill} className="bg-white/5 text-slate-400 border-none font-black text-[8px] uppercase">{skill}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400 font-bold text-xs uppercase italic">{v.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="font-black text-slate-200 text-xs">{v.reliability || "4.9"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-8">
                       <Button className="h-10 px-6 rounded-xl bg-slate-100 text-background hover:bg-primary hover:glow-teal font-black text-[10px] uppercase transition-all opacity-0 group-hover:opacity-100">
                          Inspect Node
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volunteer Detail Dialog */}
      <Dialog open={!!selectedVolunteer} onOpenChange={(open) => !open && setSelectedVolunteer(null)}>
        <DialogContent className="max-w-2xl bg-background border-white/5 rounded-[3rem] p-0 overflow-hidden">
          {selectedVolunteer && (
            <div className="flex flex-col">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 border-b border-white/5" />
              <div className="px-10 pb-10 -mt-16">
                <div className="flex justify-between items-end mb-8">
                   <Avatar className="w-32 h-32 border-8 border-background shadow-2xl">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedVolunteer.id}`} />
                      <AvatarFallback className="bg-primary/20 text-primary font-black text-3xl">{selectedVolunteer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                   </Avatar>
                   <div className="flex gap-3 mb-4">
                     {selectedVolunteer.status === "pending" ? (
                       <>
                         <Button 
                           onClick={() => handleStatusChange(selectedVolunteer.id, "active")}
                           className="bg-primary text-background font-black text-[10px] uppercase tracking-widest h-12 px-6 rounded-xl hover:glow-teal"
                         >
                           Approve Node
                         </Button>
                         <Button 
                           onClick={() => handleStatusChange(selectedVolunteer.id, "rejected")}
                           variant="outline" 
                           className="border-critical/20 text-critical hover:bg-critical/10 h-12 w-12 p-0 rounded-xl"
                         >
                           <XCircle className="w-5 h-5" />
                         </Button>
                       </>
                     ) : (
                       <Button variant="outline" className="border-white/5 bg-white/5 h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400">
                         Modify Protocol
                       </Button>
                     )}
                   </div>
                </div>

                <div className="space-y-10">
                   <div>
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-100">{selectedVolunteer.name}</h2>
                      <div className="flex items-center gap-6 mt-4">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-primary" /> {selectedVolunteer.location}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-primary" /> Since {new Date(selectedVolunteer.since || Date.now()).toLocaleDateString()}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-6">
                      <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 text-center">
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Reliability</p>
                         <p className="text-2xl font-black text-primary italic">{selectedVolunteer.reliability || "98"}%</p>
                      </div>
                      <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 text-center">
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Hours</p>
                         <p className="text-2xl font-black text-slate-100 italic">{selectedVolunteer.hours || "124"}</p>
                      </div>
                      <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 text-center">
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Rank</p>
                         <div className="flex items-center justify-center gap-2 text-2xl font-black text-warning italic">
                            <Award className="w-5 h-5" /> Elite
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600">Skill Domain Mesh</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVolunteer.skills.map((skill: string) => (
                          <Badge key={skill} className="px-4 py-2 rounded-xl bg-primary/10 text-primary border-primary/20 font-black text-[10px] uppercase tracking-widest">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600">Contact Vector</h4>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                              <Mail className="w-4 h-4 text-primary" /> {selectedVolunteer.email || "node@sevasync.ai"}
                           </div>
                           <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                              <Phone className="w-4 h-4 text-primary" /> {selectedVolunteer.phone || "+91 98765 43210"}
                           </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600">Availability</h4>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                           <Calendar className="w-4 h-4 text-primary" /> 
                           <span className="capitalize">{selectedVolunteer.availability || "Always Available"}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {(selectedVolunteer.zones || ["Central Zone"]).map((zone: string) => (
                             <Badge key={zone} variant="outline" className="text-[8px] font-black uppercase border-white/10 text-slate-500">
                               {zone}
                             </Badge>
                           ))}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
