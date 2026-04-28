"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Upload, 
  Users, 
  PieChart, 
  HandHelping,
  LogOut,
  User,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Mesh", href: "/heatmap", icon: MapIcon },
  { name: "Digitize", href: "/upload", icon: Upload },
  { name: "Registry", href: "/dashboard/needs", icon: LayoutDashboard },
  { name: "Network", href: "/volunteers", icon: Users },
  { name: "Impact", href: "/dashboard/impact", icon: PieChart },
];

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  if (pathname === "/" || pathname === "/login" || pathname === "/about") return null;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 sm:px-6">
      <div className="glass rounded-2xl border-white/5 shadow-2xl px-6 py-2">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/heatmap" className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(80,168,164,0.4)]">
                <Image 
                  src="/logo.png" 
                  alt="SevaSync Logo" 
                  fill 
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter hidden lg:block uppercase italic text-slate-100 group-hover:text-primary transition-colors">
                SevaSync
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                    isActive
                      ? "text-primary"
                      : "text-slate-500 hover:text-slate-100"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(80,168,164,0.6)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "opacity-40")} />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
              >
                <Avatar className="w-8 h-8 border border-primary/20 group-hover:border-primary transition-all">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">
                    {user?.displayName?.substring(0, 2).toUpperCase() || <User className="w-3.5 h-3.5" />}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-[9px] font-black uppercase tracking-tighter text-slate-200 truncate max-w-[80px]">
                    {user?.displayName || "Node Active"}
                  </span>
                  <span className="text-[7px] font-black text-primary/60 uppercase tracking-widest">Profile</span>
                </div>
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 glass rounded-3xl border-white/10 shadow-2xl p-6 space-y-6"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                       <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-2xl">
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback className="bg-primary/20 text-primary font-black text-xl">
                            {user?.displayName?.substring(0, 2).toUpperCase() || "S"}
                          </AvatarFallback>
                       </Avatar>
                       <div>
                          <h4 className="text-sm font-black uppercase italic text-slate-100 tracking-tight">{user?.displayName || "NGO Coordinator"}</h4>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 flex items-center justify-center gap-1">
                             <Mail className="w-3 h-3 text-primary" /> {user?.email || "mesh@sevasync.ai"}
                          </p>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                       <Link href="/profile" className="w-full">
                         <Button 
                           variant="ghost" 
                           onClick={() => setShowProfile(false)}
                           className="w-full h-12 rounded-xl justify-start gap-4 px-4 hover:bg-primary/10 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-all"
                         >
                           <User className="w-4 h-4" /> Node Settings
                         </Button>
                       </Link>
                       <Button 
                         onClick={handleLogout}
                         className="w-full h-12 rounded-xl justify-start gap-4 px-4 bg-critical/10 text-critical hover:bg-critical hover:text-background text-[10px] font-black uppercase tracking-widest transition-all"
                       >
                         <LogOut className="w-4 h-4" /> Terminate Link
                       </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
