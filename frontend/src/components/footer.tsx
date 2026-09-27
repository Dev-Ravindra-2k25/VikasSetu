"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-civic-border bg-[#05080f] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                Vikas<span className="text-orange-500">Setu</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                {t("footer.dpg")}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {t("footer.privacy")}
              </span>
              <span>•</span>
              <span>Open Architecture</span>
              <span>•</span>
              <span>India Stack Ready</span>
            </div>
          </div>

          {/* Col 2: Dashboards */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t("footer.dashboards")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/citizen" className="hover:text-amber-400 transition-colors">
                  {t("nav.citizen")}
                </Link>
              </li>
              <li>
                <Link href="/intelligence" className="hover:text-amber-400 transition-colors">
                  {t("nav.intelligence")}
                </Link>
              </li>
              <li>
                <Link href="/government" className="hover:text-amber-400 transition-colors">
                  {t("nav.government")}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-amber-400 transition-colors">
                  {t("nav.impact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: DPG Principles */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t("footer.principles")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                {t("footer.multilingual")}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                {t("footer.spatial")}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                {t("footer.gap")}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                Transparent Priority Scoring
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-civic-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1">
            {t("footer.smartGov")}
          </p>
        </div>
      </div>
    </footer>
  );
}

