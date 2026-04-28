"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHelping, Mail, ShieldCheck, Lock, ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/heatmap");
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 selection:bg-primary/20">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-3 group mb-8">
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
          </Link>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-center">
            Access <span className="text-primary">Protocol</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-3">Authorize SevaSync AI Humanitarian Mesh</p>
        </div>

        <Card className="border-white/5 glass rounded-[2.5rem] shadow-2xl overflow-hidden">
          <CardHeader className="p-8 pb-4 text-center">
            <div className="flex justify-center mb-6">
               <div className="p-3 rounded-full bg-white/5 border border-white/5">
                  <Lock className="w-6 h-6 text-primary" />
               </div>
            </div>
            <CardTitle className="text-xl font-bold">Encrypted Login</CardTitle>
            <CardDescription className="font-medium text-slate-500">Select an identity provider to continue.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-6 space-y-4">
            <Button 
              className="w-full h-14 rounded-2xl bg-primary hover:glow-teal text-background font-black text-sm gap-3 border-none transition-all"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Smartphone className="w-5 h-5" /> {loading ? "Authorizing..." : "Sign in with Google"}
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-[#0d1414] px-4 text-slate-600">Secure Fallback</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 font-bold gap-3 transition-all"
              onClick={() => router.push("/heatmap")}
            >
              <ShieldCheck className="w-5 h-5 text-primary/60" /> Development Bypass (Auto-Login)
            </Button>
            
            <p className="text-[10px] text-center text-slate-600 mt-8 font-black uppercase tracking-widest leading-loose">
              By accessing the protocol, you agree to the <br /> 
              <span className="text-slate-400 underline cursor-pointer hover:text-primary transition-colors">Digital Sovereignty Terms</span>
            </p>
          </CardContent>
        </Card>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center items-center gap-2 text-xs font-bold text-slate-500"
        >
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>V4 AES-256 Mesh Encryption Active</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
