"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Volume2,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Activity,
  Layers,
  CheckCircle,
  Clock,
  Zap,
  Building,
  Users,
  ChevronRight,
} from "lucide-react";
import { fetchDashboardStats, fetchHotspots, fetchRecommendations } from "@/lib/api";
import { DashboardStats, Hotspot, Recommendation } from "@/types";
import { LeafletMap } from "@/components/leaflet-map";
import { PriorityScoreBadge } from "@/components/priority-score-badge";
import { CATEGORIES } from "@/lib/constants";
import { formatINR } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export default function HomePage() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, h, r] = await Promise.all([
          fetchDashboardStats(),
          fetchHotspots(),
          fetchRecommendations(),
        ]);
        setStats(s);
        setHotspots(h);
        setRecommendations(r);
      } catch (e) {
        console.error("Data load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-orange-500/15 via-blue-500/10 to-emerald-500/15 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-400 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping"></span>
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            {t("hero.titlePre")}{" "}
            <span className="gradient-saffron">{t("hero.titleVoices")}</span>{" "}
            {t("hero.titleMid")}{" "}
            <span className="gradient-civic">{t("hero.titleDecisions")}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              id="hero-cta-report"
              href="/citizen"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-orange-600/25 hover:from-orange-500 hover:to-amber-500 transition-all scale-100 hover:scale-105"
            >
              <Volume2 className="h-5 w-5" />
              {t("hero.ctaReport")}
            </Link>

            <Link
              id="hero-cta-map"
              href="/intelligence"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl border border-civic-border bg-slate-900/80 px-7 py-4 text-base font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-md"
            >
              <MapPin className="h-5 w-5 text-amber-400" />
              {t("hero.ctaMap")}
            </Link>
          </div>

          {/* Core feedback loop badge */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-400 bg-slate-950/60 border border-civic-border/50 rounded-2xl px-6 py-3">
            <span>Citizen</span>
            <span>→</span>
            <span className="text-orange-400 font-semibold">AI NLP</span>
            <span>→</span>
            <span>Hotspots</span>
            <span>→</span>
            <span className="text-emerald-400 font-semibold">Priority Scoring</span>
            <span>→</span>
            <span>Government Action</span>
            <span>→</span>
            <span className="text-blue-400 font-semibold">Impact</span>
          </div>
        </div>
      </section>

      {/* 2. KEY STATISTICS COUNTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl sm:text-4xl font-black text-orange-400">
              {stats?.total_citizen_requests.toLocaleString() || "28,420"}+
            </span>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
              {t("stats.reports")}
            </span>
            <span className="text-[11px] text-emerald-400 mt-2 block">
              ↑ 18% weekly voice submissions
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl sm:text-4xl font-black text-rose-400">
              {stats?.critical_hotspots_count || "6"}
            </span>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
              {t("stats.hotspots")}
            </span>
            <span className="text-[11px] text-slate-400 mt-2 block">
              14 total demand clusters
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              {stats ? formatINR(stats.total_budget_allocated_inr) : "₹24.5 Cr"}
            </span>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
              {t("stats.funds")}
            </span>
            <span className="text-[11px] text-emerald-400 mt-2 block">
              Across 8 public works projects
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400">
              +{stats?.average_impact_improvement_pct || "34.2"}%
            </span>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
              {t("stats.resolution")}
            </span>
            <span className="text-[11px] text-cyan-400 mt-2 block">
              Measured post-intervention
            </span>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            {t("workflow.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            {t("workflow.title")}
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Moving beyond passive complaint boxes into active, spatial development intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl relative border-t-2 border-t-orange-500">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("workflow.step1Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("workflow.step1Desc")}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative border-t-2 border-t-blue-500">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("workflow.step2Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("workflow.step2Desc")}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative border-t-2 border-t-emerald-500">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("workflow.step3Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("workflow.step3Desc")}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative border-t-2 border-t-purple-500">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-4">
              04
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("workflow.step4Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("workflow.step4Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. LIVE DEMAND HOTSPOTS MAP PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Live Geospatial Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Active Demand Hotspots Map
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Interactive map displaying aggregated demand clusters and infrastructure deficits.
            </p>
          </div>
          <Link
            href="/intelligence"
            className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>Open Full Geospatial Radar</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <LeafletMap hotspots={hotspots} />
      </section>

      {/* 5. TOP DEVELOPMENT NEEDS BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Categorical Intelligence
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Top Citizen Development Needs
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            AI-classified issue distribution across major infrastructure verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 6).map((cat, i) => {
            const count = stats?.category_breakdown?.[cat.name] || (8500 - i * 1100);
            return (
              <div
                key={cat.name}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cat.bg}`}>
                      {cat.name}
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      {count.toLocaleString()} requests
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-civic-border/50 flex items-center justify-between text-xs text-slate-400">
                  <span>Priority Trend: <strong className="text-amber-400">High</strong></span>
                  <Link
                    href={`/intelligence?category=${encodeURIComponent(cat.name)}`}
                    className="text-orange-400 hover:text-orange-300 font-medium"
                  >
                    View Cluster →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. AI RECOMMENDATIONS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Actionable Governance
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              AI Project Recommendations
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Scored and explained using transparent 5-factor weighting to support policymaking.
            </p>
          </div>
          <Link
            href="/government"
            className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>View All Recommendations</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {rec.district}, {rec.state}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300 border border-civic-border">
                    {rec.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {rec.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {rec.recommended_intervention}
                </p>

                <PriorityScoreBadge
                  score={rec.priority_score}
                  status={rec.priority_status}
                  demand={rec.citizen_demand_score}
                  gap={rec.infrastructure_gap_score}
                  population={rec.population_impact_score}
                  demographic={rec.demographic_need_score}
                  investment={rec.investment_deficit_score}
                  showBreakdown={true}
                />
              </div>

              <div className="pt-4 border-t border-civic-border/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Estimated Budget</span>
                  <span className="font-bold text-slate-200">
                    {formatINR(rec.estimated_budget_inr)}
                  </span>
                </div>
                <Link
                  href="/government"
                  className="rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/40 px-3 py-1.5 font-bold hover:bg-orange-600/30 transition-all"
                >
                  Review Proposal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. IMPACT STORIES (BEFORE VS AFTER) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Closing the Feedback Loop
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Measurable Development Impact
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Comparing conditions before and after AI-prioritized infrastructure interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Basti District • Healthcare
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-4">
              Community Health Centre Intervention
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                <p className="text-sm font-bold text-rose-400 mt-1">42% Accessibility</p>
                <p className="text-[11px] text-slate-400">18 km average travel</p>
                <p className="text-[11px] text-slate-400">8,420 complaints</p>
              </div>

              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">After</span>
                <p className="text-sm font-bold text-emerald-400 mt-1">71% Accessibility</p>
                <p className="text-[11px] text-slate-400">9 km average travel</p>
                <p className="text-[11px] text-slate-400">2,180 complaints</p>
              </div>
            </div>

            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-center">
              <span className="text-xs font-bold text-emerald-400">
                +69% Accessibility Improvement • -74% Grievances
              </span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Gorakhpur District • Water
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-4">
              JJM Piped Water Distribution Network
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                <p className="text-sm font-bold text-rose-400 mt-1">31% Coverage</p>
                <p className="text-[11px] text-slate-400">4 km haul distance</p>
                <p className="text-[11px] text-slate-400">6,210 complaints</p>
              </div>

              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">After</span>
                <p className="text-sm font-bold text-emerald-400 mt-1">84% Coverage</p>
                <p className="text-[11px] text-slate-400">Doorstep tap connection</p>
                <p className="text-[11px] text-slate-400">1,150 complaints</p>
              </div>
            </div>

            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-2.5 text-center">
              <span className="text-xs font-bold text-cyan-400">
                +170% Coverage • 18,400 Families Benefitted
              </span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Varanasi District • Connectivity
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-4">
              Sewapuri Rural All-Weather Corridor
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                <p className="text-sm font-bold text-rose-400 mt-1">95 Min Mandi Commute</p>
                <p className="text-[11px] text-slate-400">Seasonal monsoon cutoff</p>
                <p className="text-[11px] text-slate-400">4,500 complaints</p>
              </div>

              <div className="rounded-lg bg-slate-900/90 p-3 border border-civic-border">
                <span className="text-[10px] text-slate-400 block uppercase">After</span>
                <p className="text-sm font-bold text-emerald-400 mt-1">35 Min Commute</p>
                <p className="text-[11px] text-slate-400">22km Pucca Asphalt</p>
                <p className="text-[11px] text-slate-400">380 complaints</p>
              </div>
            </div>

            <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-center">
              <span className="text-xs font-bold text-amber-400">
                -63% Transit Time • -92% Complaints
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DIGITAL PUBLIC GOOD & OPEN PRINCIPLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <Shield className="h-3.5 w-3.5" />
              Digital Public Good (DPG) Principles
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Designed for Interoperability, Modularity, and Privacy
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              VikasSetu is built to be easily adopted by state governments, municipal corporations,
              NGOs, and civic departments. It operates with open REST APIs, standardized JSON schemas,
              and strict privacy preservation where personal identifiers are anonymized.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl bg-slate-900/80 p-4 border border-civic-border">
                <h5 className="text-sm font-bold text-white mb-1">Open Standards</h5>
                <p className="text-xs text-slate-400">
                  Standardized RESTful APIs and schemas for plug-and-play government department integration.
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/80 p-4 border border-civic-border">
                <h5 className="text-sm font-bold text-white mb-1">DPDP Act Privacy</h5>
                <p className="text-xs text-slate-400">
                  Citizen phone numbers and personal identities remain anonymized in public intelligence feeds.
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/80 p-4 border border-civic-border">
                <h5 className="text-sm font-bold text-white mb-1">Federated Architecture</h5>
                <p className="text-xs text-slate-400">
                  Architected to support local state/district model updates while preserving data sovereignty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
