"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, HandHelping, MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = ["Medical", "Food Distribution", "Construction", "Education", "Counseling", "Logistics", "Tech"];
const ZONES = ["North Zone", "South Zone", "East Zone", "West Zone", "Central Zone"];

export default function VolunteerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    availability: "always",
    languages: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleZone = (zone: string) => {
    setSelectedZones(prev => 
      prev.includes(zone) ? prev.filter(z => z !== zone) : (prev.length < 3 ? [...prev, zone] : prev)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const volunteerData = {
      ...formData,
      skills: selectedSkills,
      zones: selectedZones,
      status: "pending",
      reliability: 0,
      hours: 0,
      since: new Date().toISOString(),
      assignments: []
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorText = await response.text();
        console.error("Backend registration error:", errorText);
        alert(`Server error: ${errorText}`);
      }
    } catch (error: any) {
      console.error("Network registration error:", error);
      alert(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-12 rounded-[3rem] text-center space-y-8"
        >
          <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(80,168,164,0.4)]">
            <CheckCircle2 className="w-10 h-10 text-background" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-100">Handshake Successful</h2>
            <p className="text-slate-500 font-medium leading-relaxed italic">
              "Your identity node has been submitted for verification. An NGO Admin will review your profile shortly."
            </p>
          </div>
          <Button 
            className="w-full h-14 rounded-2xl bg-primary text-background font-black uppercase tracking-widest hover:glow-teal transition-all"
            onClick={() => window.location.href = "/"}
          >
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 overflow-hidden py-24 px-6">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] opacity-20" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8"
          >
            <div className="relative w-12 h-12 drop-shadow-[0_0_15px_rgba(80,168,164,0.3)]">
              <Image 
                src="/logo.png" 
                alt="SevaSync Logo" 
                fill 
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Volunteer Onboarding</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
            Join the <span className="text-primary text-glow">Mesh.</span>
          </h1>
          <p className="text-slate-500 font-medium">Sync your skills to community needs in real-time.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-slate-100">Identity Details</CardTitle>
              <CardDescription className="text-slate-600 font-medium">Provide your verified contact information.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <div className="relative">
                       <Input 
                         required
                         placeholder="e.g. Vaibhav Shaw"
                         className="h-14 bg-white/5 border-none rounded-2xl pl-12 text-slate-100 font-bold focus:ring-primary shadow-inner"
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                       <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Node</label>
                    <div className="relative">
                       <Input 
                         required
                         type="email"
                         placeholder="vaibhav@visionary.ai"
                         className="h-14 bg-white/5 border-none rounded-2xl pl-12 text-slate-100 font-bold focus:ring-primary shadow-inner"
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Contact</label>
                    <div className="relative">
                       <Input 
                         required
                         placeholder="+91 00000 00000"
                         className="h-14 bg-white/5 border-none rounded-2xl pl-12 text-slate-100 font-bold focus:ring-primary shadow-inner"
                         value={formData.phone}
                         onChange={e => setFormData({...formData, phone: e.target.value})}
                       />
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Primary Zone</label>
                    <div className="relative">
                       <Input 
                         required
                         placeholder="e.g. Bandra, Mumbai"
                         className="h-14 bg-white/5 border-none rounded-2xl pl-12 text-slate-100 font-bold focus:ring-primary shadow-inner"
                         value={formData.location}
                         onChange={e => setFormData({...formData, location: e.target.value})}
                       />
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skill Mesh (Select All That Apply)</h4>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.map(skill => (
                      <Badge
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          "px-6 py-3 rounded-2xl cursor-pointer transition-all border font-black text-[10px] uppercase tracking-widest",
                          selectedSkills.includes(skill)
                            ? "bg-primary text-background border-primary glow-teal"
                            : "bg-white/5 text-slate-500 border-white/5 hover:bg-white/10"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Availability Zones (Up to 3)</h4>
                  <div className="flex flex-wrap gap-3">
                    {ZONES.map(zone => (
                      <Badge
                        key={zone}
                        onClick={() => toggleZone(zone)}
                        className={cn(
                          "px-6 py-3 rounded-2xl cursor-pointer transition-all border font-black text-[10px] uppercase tracking-widest",
                          selectedZones.includes(zone)
                            ? "bg-primary text-background border-primary glow-teal"
                            : "bg-white/5 text-slate-500 border-white/5 hover:bg-white/10"
                        )}
                      >
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Availability Window</label>
                   <select 
                     className="w-full h-14 bg-white/5 border-none rounded-2xl px-6 text-slate-100 font-bold focus:ring-primary shadow-inner outline-none appearance-none"
                     value={formData.availability}
                     onChange={e => setFormData({...formData, availability: e.target.value})}
                   >
                     <option value="always" className="bg-slate-900">Always / High Response</option>
                     <option value="weekdays" className="bg-slate-900">Weekdays Protocol</option>
                     <option value="weekends" className="bg-slate-900">Weekend Only</option>
                     <option value="custom" className="bg-slate-900">Custom Schedule</option>
                   </select>
                </div>

                <div className="pt-10 border-t border-white/5">
                   <Button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full h-16 rounded-[2rem] bg-primary text-background font-black text-lg uppercase italic tracking-tighter hover:glow-teal transition-all group"
                   >
                     {isSubmitting ? "Syncing Identity..." : "Finalize Registration"} 
                     <Zap className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform" />
                   </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
