"use client";

import { useEffect, useState } from "react";
import { Hotspot } from "@/types";
import { MapPin, AlertCircle, Layers, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";

interface LeafletMapProps {
  hotspots: Hotspot[];
  selectedCategory?: string;
  onSelectHotspot?: (hotspot: Hotspot) => void;
}

export function LeafletMap({
  hotspots,
  selectedCategory,
  onSelectHotspot,
}: LeafletMapProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(hotspots[0] || null);
  const [mapZoom, setMapZoom] = useState(1);

  // Filter hotspots if category selected
  const filteredHotspots = selectedCategory && selectedCategory !== "All"
    ? hotspots.filter((h) => h.category === selectedCategory)
    : hotspots;

  // Uttar Pradesh / North India reference bounds
  // Lat: 25.0 to 29.0, Lng: 78.0 to 84.5
  const minLat = 24.8, maxLat = 29.2;
  const minLng = 77.8, maxLng = 84.8;

  const getPositionStyle = (lat: number, lng: number) => {
    // Convert lat/lng to percentage within map frame
    const x = ((lng - minLng) / (maxLng - minLng)) * 82 + 9;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 74 + 13;
    return { left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(8, Math.min(92, y))}%` };
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return {
          ring: "border-rose-500 bg-rose-500/30 text-rose-300",
          glow: "bg-rose-500/20 shadow-rose-500/50",
          pulse: "bg-rose-500",
          label: "Critical Demand Hotspot",
        };
      case "HIGH":
        return {
          ring: "border-orange-500 bg-orange-500/30 text-orange-300",
          glow: "bg-orange-500/20 shadow-orange-500/50",
          pulse: "bg-orange-500",
          label: "High Demand Hotspot",
        };
      default:
        return {
          ring: "border-amber-500 bg-amber-500/30 text-amber-300",
          glow: "bg-amber-500/20 shadow-amber-500/50",
          pulse: "bg-amber-500",
          label: "Moderate Demand Hotspot",
        };
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl border border-civic-border bg-[#090e1a] overflow-hidden shadow-2xl">
      {/* Map Header / Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="rounded-xl border border-civic-border/80 bg-slate-950/85 px-4 py-2 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-wide">
              LIVE GEOSPATIAL DEMAND RADAR
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Uttar Pradesh Regional Pilot Zone • {filteredHotspots.length} Active Hotspots
          </p>
        </div>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-10 rounded-xl border border-civic-border/80 bg-slate-950/85 p-3 backdrop-blur-md text-xs space-y-1.5 shadow-lg">
        <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-amber-400" />
          <span>Demand Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300 text-[11px]">Critical (85-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
          <span className="text-slate-300 text-[11px]">High (70-84)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-300 text-[11px]">Moderate (50-69)</span>
        </div>
      </div>

      {/* Background Geo-grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      {/* Vector Geographic Base Lines & Topography Curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <path
          d="M 50 150 Q 200 120 400 200 T 700 250 T 950 200"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 80 280 Q 260 220 500 320 T 850 350"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="50%" cy="50%" r="280" fill="none" stroke="#334155" strokeWidth="1" opacity="0.4" />
        <circle cx="50%" cy="50%" r="180" fill="none" stroke="#334155" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Hotspots Rendered as Geospatial Pins */}
      {filteredHotspots.map((hotspot) => {
        const style = getSeverityStyle(hotspot.severity_level);
        const pos = getPositionStyle(hotspot.latitude, hotspot.longitude);
        const isSelected = activeHotspot?.id === hotspot.id;

        return (
          <div
            key={hotspot.id}
            style={pos}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-110"
            onClick={() => {
              setActiveHotspot(hotspot);
              if (onSelectHotspot) onSelectHotspot(hotspot);
            }}
          >
            {/* Outer radar pulse */}
            <div className={`absolute -inset-4 rounded-full ${style.pulse} opacity-25 animate-ping`}></div>
            <div className={`absolute -inset-2 rounded-full ${style.glow} blur-sm`}></div>

            {/* Core Marker */}
            <div
              className={`relative flex items-center justify-center h-10 w-10 rounded-full border-2 shadow-xl ${
                style.ring
              } ${isSelected ? "ring-4 ring-white" : ""}`}
            >
              <MapPin className="h-5 w-5" />
            </div>

            {/* Label Tooltip */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/95 px-2.5 py-1 text-[10px] font-bold text-white border border-civic-border shadow-lg">
              {hotspot.district} • {hotspot.total_complaints.toLocaleString()} reports
            </div>
          </div>
        );
      })}

      {/* Selected Hotspot Detailed Flyout Inspector */}
      {activeHotspot && (
        <div className="absolute bottom-4 left-4 z-30 max-w-sm rounded-xl border border-civic-border bg-slate-950/95 p-4 backdrop-blur-md shadow-2xl animate-in fade-in">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {activeHotspot.category}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">
                {activeHotspot.title}
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                getSeverityStyle(activeHotspot.severity_level).ring
              }`}
            >
              {activeHotspot.severity_level}
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            {activeHotspot.cluster_area || `${activeHotspot.district} Regional Cluster`}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="rounded-lg bg-slate-900 p-2 border border-civic-border/50">
              <span className="text-[10px] text-slate-400 block">Complaints Logged</span>
              <span className="text-base font-extrabold text-orange-400">
                {activeHotspot.total_complaints.toLocaleString()}
              </span>
            </div>
            <div className="rounded-lg bg-slate-900 p-2 border border-civic-border/50">
              <span className="text-[10px] text-slate-400 block">Demand Score</span>
              <span className="text-base font-extrabold text-rose-400">
                {activeHotspot.demand_score.toFixed(1)} / 100
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-civic-border/50 text-xs">
            <span className="text-slate-400 text-[11px]">
              GPS: {activeHotspot.latitude.toFixed(4)}, {activeHotspot.longitude.toFixed(4)}
            </span>
            <span className="text-emerald-400 font-medium">Status: {activeHotspot.status}</span>
          </div>
        </div>
      )}
    </div>
  );
}
