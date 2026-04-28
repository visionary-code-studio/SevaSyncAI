"use client";

import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ShieldCheck, 
  Mail, 
  User, 
  Zap, 
  Settings, 
  Activity, 
  Clock, 
  BarChart3,
  Camera,
  Edit3,
  CheckCircle2,
  Trash2,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PRESET_AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Seva1",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Seva2",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Seva3",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Seva4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Anya"
];

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({ digitized: 12, matches: 45, uptime: "99.9%" });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewName(currentUser.displayName || "");
        
        try {
          // Add a timeout to the Firestore call to prevent infinite loading if DB is not found
          const fetchPromise = (async () => {
             const docRef = doc(db, "users", currentUser.uid);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
               return docSnap.data().stats;
             }
             return null;
          })();

          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 3000)
          );

          const result = await Promise.race([fetchPromise, timeoutPromise]) as any;
          if (result) {
            setStats(prev => ({ ...prev, ...result }));
          }
        } catch (error) {
          console.warn("Firestore telemetry offline or timeout. Using local fallbacks.");
        }
      }
      // Guaranteed resolution of loading state
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: newName });
      setEditing(false);
      setUser({ ...user, displayName: newName } as FirebaseUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(user, { photoURL: downloadURL });
      setUser({ ...user, photoURL: downloadURL } as FirebaseUser);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSelectPreset = async (url: string) => {
    if (!user) return;
    setUploading(true);
    try {
      await updateProfile(user, { photoURL: url });
      setUser({ ...user, photoURL: url } as FirebaseUser);
    } catch (error) {
      console.error("Preset selection error:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Synchronizing Profile Mesh...</p>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 lg:px-12 bg-background min-h-screen selection:bg-primary/20">
      <div className="grid lg:grid-cols-3 gap-12 pt-20">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Card className="glass border-none rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5" />
              <CardContent className="px-8 pb-10 -mt-16 text-center">
                <div className="relative inline-block mb-8 group">
                    <Avatar className="w-40 h-40 border-8 border-background shadow-2xl group-hover:border-primary/20 transition-all duration-500">
                       <AvatarImage src={user.photoURL || ""} />
                       <AvatarFallback className="bg-primary/10 text-primary font-black text-5xl">
                         {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : "SS"}
                       </AvatarFallback>
                    </Avatar>
                   
                   <AnimatePresence>
                     {uploading && (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
                       >
                         <Loader2 className="w-8 h-8 text-primary animate-spin" />
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="absolute bottom-2 right-2 p-3 bg-primary text-background rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                   >
                      <Camera className="w-5 h-5" />
                   </button>
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     accept="image/*"
                     onChange={handleFileUpload}
                   />
                </div>
                
                <div className="space-y-4">
                   {editing ? (
                     <div className="flex gap-2">
                       <Input 
                         value={newName}
                         onChange={(e) => setNewName(e.target.value)}
                         className="bg-white/5 border-none h-12 rounded-xl text-center font-black uppercase italic"
                       />
                       <Button onClick={handleUpdateProfile} className="h-12 w-12 p-0 bg-primary rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-background" />
                       </Button>
                     </div>
                   ) : (
                     <div className="flex items-center justify-center gap-3">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-100">{user?.displayName || "NGO Member"}</h2>
                        <button onClick={() => setEditing(true)} className="text-slate-600 hover:text-primary transition-colors">
                           <Edit3 className="w-4 h-4" />
                        </button>
                     </div>
                   )}
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-primary" /> {user?.email}
                   </p>
                </div>

                <div className="pt-10 mt-10 border-t border-white/5 flex gap-4">
                   <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-1">Status</p>
                      <p className="text-xs font-black text-primary uppercase italic">Active Node</p>
                   </div>
                   <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-1">Role</p>
                      <p className="text-xs font-black text-slate-300 uppercase italic">Admin</p>
                   </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-8 glass rounded-[2.5rem] space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Preset Identity Nodes</h4>
               <div className="grid grid-cols-3 gap-4">
                  {PRESET_AVATARS.map((url, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSelectPreset(url)}
                      className="relative rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary transition-all group"
                    >
                      <img src={url} alt={`Preset ${i}`} className="w-full h-auto bg-white/5" />
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>

        {/* Stats & Activity */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
          >
             <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-100 mb-8 flex items-center gap-4">
                <Activity className="w-6 h-6 text-primary" /> Mesh Activity
             </h3>
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Needs Digitized", value: stats.digitized, icon: Zap, color: "text-primary" },
                  { label: "Matches Orchestrated", value: stats.matches, icon: BarChart3, color: "text-success" },
                  { label: "Node Uptime", value: stats.uptime, icon: Clock, color: "text-warning" }
                ].map((stat, i) => (
                  <Card key={i} className="glass border-none rounded-3xl p-8 hover:bg-white/5 transition-colors">
                     <stat.icon className={cn("w-8 h-8 mb-6", stat.color)} />
                     <p className="text-3xl font-black text-slate-100 italic tracking-tighter mb-2">{stat.value}</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{stat.label}</p>
                  </Card>
                ))}
             </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-8"
          >
             <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-100 mb-8 flex items-center gap-4">
                <BarChart3 className="w-6 h-6 text-primary" /> Real-Time Analytics
             </h3>
             <Card className="glass border-none rounded-[3.5rem] overflow-hidden p-10">
                <div className="space-y-8">
                   <div>
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Extraction Accuracy</span>
                         <span className="text-xs font-black text-primary uppercase italic">98.4%</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "98.4%" }}
                            className="h-full bg-primary shadow-[0_0_15px_rgba(80,168,164,0.5)]"
                         />
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Response Orchestration Speed</span>
                         <span className="text-xs font-black text-success uppercase italic">84s Avg</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            className="h-full bg-success shadow-[0_0_15px_rgba(0,230,118,0.3)]"
                         />
                      </div>
                   </div>
                </div>
             </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
