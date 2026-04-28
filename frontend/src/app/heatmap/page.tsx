"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, HeatmapLayer, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Filter, Layers, ListFilter, AlertCircle, Info, Map as MapIcon, Zap, Download } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import html2canvas from 'html2canvas';

const containerStyle = {
  width: "100%",
  height: "100%" 
};

const center = {
  lat: 19.0760,
  lng: 72.8777
};

const libraries: ("visualization" | "places" | "drawing" | "geometry" | "localContext")[] = ["visualization"];

export default function HeatmapPage() {
  const [needs, setNeeds] = useState<any[]>([]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/needs`);
        if (!response.ok) throw new Error("Failed to fetch needs");
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error("Error fetching needs for heatmap:", error);
      }
    };
    
    fetchNeeds();
    const interval = setInterval(fetchNeeds, 10000); // Polling as fallback for realtime
    return () => clearInterval(interval);
  }, []);

  const filteredNeeds = selectedCategory 
    ? needs.filter(n => n.category.toLowerCase() === selectedCategory.toLowerCase())
    : needs;

  const heatmapData = filteredNeeds
    .filter(n => n.coordinates?.lat && n.coordinates?.lng)
    .map(n => ({
      lat: n.coordinates.lat,
      lng: n.coordinates.lng,
      weight: n.urgency || 1
    }));

  const markerData = filteredNeeds
    .filter(n => n.coordinates?.lat && n.coordinates?.lng)
    .map(n => ({
      id: n.id,
      lat: n.coordinates.lat,
      lng: n.coordinates.lng,
      category: n.category || "General",
      urgency: (n.urgency || 0) >= 8 ? "Critical" : (n.urgency || 0) >= 5 ? "Serious" : "Moderate",
      score: n.urgency || 0
    }));

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const exportMesh = async () => {
    if (mapContainerRef.current === null) return;
    
    try {
      const canvas = await html2canvas(mapContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#030606',
        scale: 2, // High res
        ignoreElements: (element) => {
            return element.tagName === 'BUTTON' && element.innerText.includes('Export');
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `sevasync-mesh-report-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating map screenshot:', err);
      alert("Failed to capture screenshot due to browser security restrictions. Please try using a desktop browser or allow cross-origin map tiles.");
    }
  };

  return (
    <div ref={mapContainerRef} className="relative w-full h-screen bg-background -mt-28 overflow-hidden">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              { "elementType": "geometry", "stylers": [{ "color": "#030606" }] },
              { "elementType": "labels.text.stroke", "stylers": [{ "color": "#030606" }] },
              { "elementType": "labels.text.fill", "stylers": [{ "color": "#4b5563" }] },
              { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#50A8A4" }] },
              { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#111827" }] },
              { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2937" }] },
              { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
            ],
            disableDefaultUI: true,
            zoomControl: false,
          }}
        >
          {showHeatmap && typeof google !== "undefined" && (
            <HeatmapLayer
              data={heatmapData.map(d => new google.maps.LatLng(d.lat, d.lng))}
              options={{ 
                radius: 40, 
                opacity: 0.8, 
                gradient: [
                  'rgba(0, 255, 255, 0)', 
                  'rgba(80, 168, 164, 0.5)', 
                  'rgba(80, 168, 164, 0.8)', 
                  'rgba(80, 168, 164, 1)'
                ] 
              }}
            />
          )}

          {markerData.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                path: 0, // google.maps.SymbolPath.CIRCLE
                fillColor: marker.urgency === "Critical" ? "#FF4D4D" : marker.urgency === "Serious" ? "#FFB347" : "#00E676",
                fillOpacity: 1,
                strokeWeight: 4,
                strokeColor: "rgba(255,255,255,0.2)",
                scale: 14,
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Initializing Neural Mesh...</p>
          </div>
        </div>
      )}

      {/* Map Control Overlays */}
      <div className="absolute top-32 left-8 z-10 space-y-6 pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="pointer-events-auto">
          <Card className="w-80 glass border-none overflow-hidden rounded-[2rem]">
            <CardHeader className="p-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><MapIcon className="w-4 h-4 text-primary" /></div>
                 <div>
                    <CardTitle className="text-xs font-black uppercase tracking-widest">Mesh Controller</CardTitle>
                    <p className="text-[10px] text-slate-500 font-bold">V4.2.0 Operational</p>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold">Urgency Heatmap</span>
                <Button 
                  variant={showHeatmap ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="h-8 rounded-full text-[10px] font-black px-4 uppercase"
                >
                  {showHeatmap ? "On" : "Off"}
                </Button>
              </div>
              <div className="space-y-3 pt-2">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Live Telemetry</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "px-4 py-2 rounded-xl border border-white/5 cursor-pointer text-[10px] font-black transition-all uppercase tracking-widest",
                        selectedCategory === null 
                          ? "bg-primary text-background border-primary shadow-[0_0_20px_rgba(80,168,164,0.6)] scale-105" 
                          : "bg-white/5 text-slate-500 hover:border-primary/50 hover:bg-white/10"
                      )}
                    >
                      All Data
                    </Badge>
                    {["Medical", "Water", "Food", "Shelter", "Education", "Livelihood"].map(cat => (
                      <Badge 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-4 py-2 rounded-xl border border-white/5 cursor-pointer text-[10px] font-black transition-all uppercase tracking-widest",
                          selectedCategory === cat 
                            ? "bg-primary text-background border-primary shadow-[0_0_20px_rgba(80,168,164,0.6)] scale-105" 
                            : "bg-white/5 text-slate-500 hover:border-primary/50 hover:bg-white/10"
                        )}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
              </div>
              <div className="pt-2">
                <Button 
                  onClick={exportMesh}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase tracking-widest gap-2 transition-all hover:glow-teal"
                >
                  <Download className="w-3.5 h-3.5" /> Export Mesh Node
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Legend */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }}
          className="glass p-4 rounded-[1.5rem] border-none inline-flex items-center gap-6 px-6 pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-critical glow-teal" />
            <span className="text-[10px] font-black uppercase text-slate-400">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-[10px] font-black uppercase text-slate-400">Serious</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-[10px] font-black uppercase text-slate-400">Stable</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Action for Critical Need */}
      <AnimatePresence>
        {markerData.some(m => m.urgency === "Critical") && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-6 pointer-events-none"
          >
            <div className="glass p-6 rounded-[2rem] flex items-center justify-between border-primary/20 shadow-[0_0_40px_rgba(80,168,164,0.15)] pointer-events-auto">
              <div className="flex items-center gap-5">
                <div className="bg-critical/20 p-3 rounded-2xl animate-pulse">
                  <AlertCircle className="w-6 h-6 text-critical" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-critical mb-1">Critical Anomaly Detected</p>
                   <p className="text-sm font-bold text-slate-200">Zone 4: {markerData.find(m => m.urgency === "Critical")?.category} Cluster</p>
                </div>
              </div>
              <Link 
                href={`/match?id=${markerData.find(m => m.urgency === "Critical")?.id}`}
                className={cn(buttonVariants({ variant: "default" }), "bg-primary text-background font-black rounded-xl px-6 h-12 uppercase text-xs")}
              >
                Orchestrate <Zap className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
