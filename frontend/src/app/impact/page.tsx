"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  Building,
  Users,
  MapPin,
} from "lucide-react";
import { fetchImpactMetrics, fetchProjects } from "@/lib/api";
import { ImpactMetric, Project } from "@/types";
import { formatINR } from "@/lib/utils";

export default function ImpactPage() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, p] = await Promise.all([fetchImpactMetrics(), fetchProjects()]);
        setMetrics(m);
        setProjects(p);
      } catch (e) {
        console.error("Impact data load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-civic-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
              Dashboard 4 • Outcome Measurement
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-2">
            Development Impact & Evidence Analytics
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Closing the feedback loop by quantifying improvements in accessibility, commute times, and grievance reductions.
          </p>
        </div>

        {/* Global Impact Score Badge (PRD Section 8.9) */}
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-right">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
            Aggregated Impact Score
          </span>
          <div className="flex items-center gap-1.5 justify-end">
            <ArrowUpRight className="h-5 w-5 text-emerald-400" />
            <span className="text-2xl font-black text-emerald-300">+34.2%</span>
          </div>
          <span className="text-[11px] text-slate-400">Measured across all sanctioned interventions</span>
        </div>
      </div>

      {/* 1. Core Before vs After Benchmarks (PRD Section 8.9) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Targeted Before & After Outcome Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metric 1: Healthcare Accessibility */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Basti • Healthcare
                </span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                  +69.0%
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-4">
                Healthcare Accessibility Index
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                  <span className="text-xl font-extrabold text-rose-400">42%</span>
                </div>
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">After</span>
                  <span className="text-xl font-extrabold text-emerald-400">71%</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 border-t border-civic-border/50 pt-3">
              Operationalization of Kaptanganj Community Health Centre with 24x7 emergency ward.
            </p>
          </div>

          {/* Metric 2: Citizen Complaints Volume */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-rose-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Basti • Grievances
                </span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                  -74.1%
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-4">
                Citizen Complaints Volume
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                  <span className="text-xl font-extrabold text-rose-400">8,420</span>
                </div>
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">After</span>
                  <span className="text-xl font-extrabold text-emerald-400">2,180</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 border-t border-civic-border/50 pt-3">
              Sharp reduction in distress calls and public grievances within 60 days of service launch.
            </p>
          </div>

          {/* Metric 3: Travel Distance */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-blue-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Basti • Mobility
                </span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                  -50.0%
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-4">
                Average Emergency Travel Distance
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                  <span className="text-xl font-extrabold text-rose-400">18 km</span>
                </div>
                <div className="rounded-xl bg-slate-900/90 p-3 border border-civic-border">
                  <span className="text-[10px] text-slate-400 block uppercase">After</span>
                  <span className="text-xl font-extrabold text-emerald-400">9 km</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 border-t border-civic-border/50 pt-3">
              Commute distance cut in half for 42 surrounding Gram Panchayats.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Active Projects Performance & Delivery Tracker */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-civic-border/60 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Public Infrastructure Delivery Tracker
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitoring budget expenditure and physical progress across sanctioned works.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            {projects.filter((p) => p.status === "COMPLETED").length} Completed •{" "}
            {projects.filter((p) => p.status === "IN_PROGRESS").length} In Progress
          </span>
        </div>

        <div className="space-y-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-civic-border bg-slate-900/70 p-5 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-orange-400 font-bold">
                      {proj.project_code}
                    </span>
                    <span>•</span>
                    <span className="text-xs text-slate-400">{proj.district}, {proj.state}</span>
                    <span>•</span>
                    <span className="text-xs text-amber-400">{proj.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                </div>

                <span
                  className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full border ${
                    proj.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {proj.status.replace("_", " ")}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Execution Progress</span>
                  <span className="font-bold text-white">{proj.progress_pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: `${proj.progress_pct}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-civic-border/40 gap-2">
                <span>Executing Agency: <strong className="text-slate-200">{proj.department}</strong></span>
                <span>Sanctioned: <strong className="text-slate-200">{formatINR(proj.sanctioned_budget_inr)}</strong></span>
                <span>Spent: <strong className="text-emerald-400">{formatINR(proj.spent_budget_inr)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
