"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Globe,
  Radio,
  MapPin,
  Building2,
  TrendingUp,
  Menu,
  X,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { useLanguage } from "@/context/language-context";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Globe },
    { href: "/citizen", label: t("nav.citizen"), icon: Volume2, highlight: true },
    { href: "/intelligence", label: t("nav.intelligence"), icon: MapPin },
    { href: "/government", label: t("nav.government"), icon: Building2 },
    { href: "/impact", label: t("nav.impact"), icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-civic-border/60 bg-[#080c14]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080c14]">
              <Radio className="h-5 w-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Vikas<span className="text-orange-500">Setu</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                DPG v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              AI Citizen Intelligence & Infrastructure Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800/90 text-amber-400 border border-amber-500/30 shadow-sm"
                    : link.highlight
                      ? "text-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : ""}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Language & Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none cursor-pointer rounded-lg border border-civic-border bg-[#131b2e] px-3 py-1.5 pr-8 text-xs font-medium text-slate-200 hover:border-amber-500/60 focus:border-amber-500 focus:outline-none transition-colors"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#0b1120] text-slate-200">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          <Link
            href="/citizen"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-orange-600/20 hover:from-orange-500 hover:to-amber-500 transition-all"
          >
            <Volume2 className="h-3.5 w-3.5" />
            {t("nav.reportIssue")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-civic-border bg-[#080c14]/95 px-4 pt-2 pb-4 space-y-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-civic-border/50">
            <span className="text-xs text-slate-400">Language / भाषा:</span>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none rounded-lg border border-civic-border bg-[#131b2e] px-3 py-1 pr-7 text-xs text-slate-200"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0b1120] text-slate-200">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
            </div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-slate-800 text-amber-400" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 py-2.5 text-sm font-semibold text-white"
            >
              <Volume2 className="h-4 w-4" />
              {t("nav.reportDevIssue")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
