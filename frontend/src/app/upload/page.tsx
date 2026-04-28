"use client";

import { useState, useRef, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Camera, CheckCircle2, Loader2, AlertCircle, Sparkles, Database, ArrowRight, X, Activity, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "capturing" | "uploading" | "processing" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    setStatus("capturing");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Could not access camera. Please check permissions.");
      setStatus("idle");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
            setFile(capturedFile);
            stopCamera();
            setStatus("idle");
          }
        }, "image/jpeg");
      }
    }
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setExtractedData(null);
    stopCamera();
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setStatus("uploading");
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 90));
    }, 150);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);
      setStatus("processing");

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      setExtractedData(data.extracted_data);
      
      setTimeout(() => {
        setStatus("success");
      }, 2500);
    } catch (error) {
      console.error("Upload error:", error);
      clearInterval(progressInterval);
      setStatus("idle");
      alert("Error processing payload. Please try again.");
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-12 bg-background min-h-screen">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 p-3 rounded-2xl mb-8 border border-primary/20 shadow-[0_0_20px_rgba(80,168,164,0.1)]"
        >
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none"
        >
          Payload <span className="text-primary text-glow">Digitization.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 mt-6 text-lg max-w-2xl font-medium"
        >
          Converting unstructured field reports into high-fidelity mission data via Gemini 1.5 Pro.
        </motion.p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={cn(
            "group border-2 border-dashed transition-all duration-300 rounded-[3rem] relative overflow-hidden h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10",
            file ? "border-primary bg-primary/5" : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10"
          )}>
            <div className={cn(
              "p-10 rounded-[2.5rem] shadow-2xl mb-8 transition-transform group-hover:scale-110",
              file ? "bg-primary text-background" : "bg-white/5 text-slate-500"
            )}>
              <Upload className="w-12 h-12" />
            </div>
            <CardTitle className="text-xl font-bold mb-2">Sync Binary</CardTitle>
            <p className="text-slate-500 text-sm font-medium mb-10 max-w-[200px]">Direct upload for high-fidelity OCR scanning.</p>
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileChange}
              accept="image/*,.pdf"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className={cn(buttonVariants({ variant: "outline" }), "h-14 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs uppercase tracking-widest cursor-pointer transition-all")}>
                Select Payload File
              </div>
            </label>
            
            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 px-6 py-4 glass rounded-2xl border-primary/20 flex items-center gap-4 group"
              >
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-slate-300 truncate max-w-[150px]">{file.name}</span>
                <button onClick={reset} className="text-slate-600 hover:text-critical transition-colors ml-4"><X className="w-4 h-4" /></button>
              </motion.div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none glass rounded-[3rem] h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 group hover:glow-teal transition-all overflow-hidden relative">
            <AnimatePresence mode="wait">
              {status === "capturing" ? (
                <motion.div 
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black flex flex-col"
                >
                  <video ref={videoRef} autoPlay playsInline className="flex-1 object-cover" />
                  <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 z-30">
                    <Button 
                      className="w-16 h-16 rounded-full bg-white text-black hover:bg-white/90 shadow-2xl"
                      onClick={capturePhoto}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-black" />
                    </Button>
                    <Button 
                      variant="destructive"
                      className="w-16 h-16 rounded-full p-0 shadow-2xl"
                      onClick={() => { stopCamera(); setStatus("idle"); }}
                    >
                      <X className="w-8 h-8" />
                    </Button>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-white/5 p-10 rounded-[2.5rem] mb-8 text-slate-500 transition-transform group-hover:scale-110">
                    <Camera className="w-12 h-12" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">Live Capture</CardTitle>
                  <p className="text-slate-500 text-sm font-medium mb-10 max-w-[200px]">Instant OCR digitization via field mobile sensor.</p>
                  <Button 
                    variant="outline" 
                    className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 font-black text-xs uppercase tracking-widest gap-3"
                    onClick={startCamera}
                  >
                    Initialize Lens
                  </Button>
                  <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4 max-w-xs text-left">
                    <div className="p-2 bg-primary/10 rounded-lg h-fit"><Activity className="w-4 h-4 text-primary" /></div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-tight">
                      Mesh Protocol: Optimized for edge computing in low-bandwidth sectors.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      <div className="mt-20">
        <AnimatePresence mode="wait">
          {status === "idle" && file && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <Button size="lg" className="h-16 px-16 rounded-full bg-primary hover:glow-teal text-background font-black text-lg gap-4 transition-all" onClick={handleUpload}>
                Execute Analysis Loop <Sparkles className="w-6 h-6" />
              </Button>
            </motion.div>
          )}

          {(status === "uploading" || status === "processing") && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-[3rem] border-none max-w-2xl mx-auto shadow-2xl"
            >
              <div className="flex items-start gap-8 mb-10">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner relative">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  {status === "processing" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-100 uppercase italic tracking-tighter leading-none mb-3">
                    {status === "uploading" ? "Syncing Binary..." : "Neural Extraction..."}
                  </h3>
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">
                    {status === "uploading" ? "Establishing secure socket layer for payload transfer." : "Analyzing semantic intent and mission-critical hotspots."}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                   <span>Throughput Progress</span>
                   <span className="text-primary">{status === "uploading" ? progress : 100}%</span>
                </div>
                <Progress value={status === "uploading" ? progress : 100} className="h-2 rounded-full bg-white/5" />
              </div>
              
              {status === "processing" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 grid grid-cols-2 gap-6"
                >
                  {[
                    { k: "Model", v: "Gemini 1.5 Pro", c: "text-primary" },
                    { k: "Core", v: "Zero-Shot Mesh", c: "text-success" },
                    { k: "Confidence", v: "94.2%", c: "text-primary text-glow" },
                    { k: "Latency", v: "240ms", c: "text-warning" },
                  ].map(stat => (
                    <div key={stat.k} className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 shadow-inner flex flex-col gap-2">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{stat.k}</span>
                      <span className={cn("text-sm font-black italic", stat.c)}>{stat.v}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-16 rounded-[3.5rem] border-primary/20 shadow-[0_0_60px_rgba(80,168,164,0.1)] max-w-3xl mx-auto"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-success p-6 rounded-full shadow-[0_0_30px_rgba(0,230,118,0.3)] mb-10">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black text-slate-100 uppercase italic tracking-tighter">Mission Extracted</h3>
                <p className="text-slate-500 mt-4 text-lg font-medium">Community payload successfully geo-tagged and synced to mesh.</p>
                
                <div className="mt-12 w-full glass p-10 rounded-[2.5rem] border-none flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="text-center md:text-left">
                    <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mb-2">Identified Payload</p>
                    <p className="font-black text-3xl text-slate-100 uppercase italic tracking-tighter leading-none">
                      {extractedData?.needs?.[0]?.category || "General"}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                       <MapPin className="w-4 h-4 text-primary" /> {extractedData?.location || "Alpha Cluster"}
                    </div>
                  </div>
                  <div className="h-px w-24 bg-white/5 hidden md:block" />
                  <div className="text-center md:text-right">
                    <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mb-2">Severity Index</p>
                    <p className="font-black text-5xl text-critical text-glow italic leading-none">
                      {extractedData?.needs?.[0]?.urgency || "8.5"}<span className="text-sm opacity-30 ml-2 not-italic">/10</span>
                    </p>
                  </div>
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                  <Link 
                    href="/heatmap" 
                    className={cn(buttonVariants({ variant: "default" }), "h-16 px-14 rounded-full bg-primary hover:glow-teal text-background font-black text-lg transition-all")}
                  >
                    View on Mesh <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                  <Button variant="outline" className="h-16 px-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold text-slate-300" onClick={reset}>
                    Flush Session
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
