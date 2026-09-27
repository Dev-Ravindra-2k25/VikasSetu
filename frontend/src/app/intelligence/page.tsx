"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Filter,
  Layers,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Building,
  Users,
  Eye,
} from "lucide-react";
import { fetchHotspots } from "@/lib/api";
import { Hotspot } from "@/types";
import { LeafletMap } from "@/components/leaflet-map";
import { CATEGORIES, DISTRICTS } from "@/lib/constants";

export default function IntelligencePage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHotspots() {
      try {
        const data = await fetchHotspots();
        setHotspots(data);
        if (data.length > 0) setSelectedHotspot(data[0]);
      } catch (e) {
        console.error("Hotspot fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadHotspots();
  }, []);

  const filtered = hotspots.filter((h) => {
    const catMatch = selectedCategory === "All" || h.category === selectedCategory;
    const sevMatch = selectedSeverity === "All" || h.severity_level === selectedSeverity;
    return catMatch && sevMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-civic-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
              Dashboard 2 • Core Analytical Engine
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-2">
            Geospatial Demand Intelligence & Hotspots
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time clustering of citizen feedback cross-referenced with regional infrastructure gaps.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-civic-border bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="rounded-xl border border-civic-border bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical (85+)</option>
            <option value="HIGH">High (70-84)</option>
            <option value="MODERATE">Moderate (50-69)</option>
          </select>
        </div>
      </div>

      {/* Main Map View */}
      <div className="space-y-4">
        <LeafletMap
          hotspots={filtered}
          selectedCategory={selectedCategory}
          onSelectHotspot={(h) => setSelectedHotspot(h)}
        />
      </div>

      {/* Analytical Deep Dive: Selected Hotspot + Infrastructure Gap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hotspot Detailed Inspector (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Hotspot Inspector
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {selectedHotspot?.title || "Select a Hotspot on Map"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Cluster Region: {selectedHotspot?.cluster_area || "Central District Sector"}
              </p>
            </div>
            {selectedHotspot && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                selectedHotspot.severity_level === "CRITICAL"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  : "bg-orange-500/10 text-orange-400 border-orange-500/30"
              }`}>
                {selectedHotspot.severity_level} DEMAND
              </span>
            )}
          </div>

          {selectedHotspot && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-900/90 p-4 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Complaints Count</span>
                <span className="text-xl font-black text-orange-400 mt-1 block">
                  {selectedHotspot.total_complaints.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Verified citizen submissions</span>
              </div>

              <div className="rounded-xl bg-slate-900/90 p-4 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Demand Score</span>
                <span className="text-xl font-black text-rose-400 mt-1 block">
                  {selectedHotspot.demand_score.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-500">Out of 100 max intensity</span>
              </div>

              <div className="rounded-xl bg-slate-900/90 p-4 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Cluster Radius</span>
                <span className="text-xl font-black text-blue-400 mt-1 block">
                  {selectedHotspot.radius_km} km
                </span>
                <span className="text-[10px] text-slate-500">Geospatial catchment zone</span>
              </div>
            </div>
          )}

          {/* Benchmark Gap Analysis (PRD Section 8.6) */}
          <div className="rounded-xl border border-civic-border bg-slate-950/60 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>Infrastructure Gap Baseline Analysis</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-civic-border/50">
                <span className="text-[10px] text-slate-400 block">District Population</span>
                <span className="font-bold text-white text-sm">2,40,000</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-civic-border/50">
                <span className="text-[10px] text-slate-400 block">Operational Units</span>
                <span className="font-bold text-rose-400 text-sm">2 Facilities</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-civic-border/50">
                <span className="text-[10px] text-slate-400 block">Index Score</span>
                <span className="font-bold text-amber-400 text-sm">41 / 100</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-civic-border/50">
                <span className="text-[10px] text-slate-400 block">Avg Travel Distance</span>
                <span className="font-bold text-rose-400 text-sm">15 km</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
              <strong className="text-rose-400">AI Conclusion:</strong> Significant infrastructure
              gap detected. High citizen request volume ({selectedHotspot?.total_complaints.toLocaleString() || "8,420"})
              directly correlates with severe deficit in accessible local facilities.
            </p>
          </div>
        </div>

        {/* Hotspot Directory List (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-civic-border/60">
            <h3 className="text-sm font-bold text-white">Active Regional Clusters</h3>
            <span className="text-xs text-slate-400">{filtered.length} found</span>
          </div>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {filtered.map((h) => (
              <div
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                  selectedHotspot?.id === h.id
                    ? "border-amber-500/80 bg-slate-800/90 shadow-md shadow-amber-500/10"
                    : "border-civic-border/70 bg-slate-900/50 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                    {h.district} • {h.category}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                      h.severity_level === "CRITICAL"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                    }`}
                  >
                    {h.severity_level}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mb-2">{h.title}</h4>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{h.total_complaints.toLocaleString()} reports</span>
                  <span className="text-rose-400 font-bold">Demand: {h.demand_score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
