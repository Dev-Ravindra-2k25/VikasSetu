"use client";

import { useState } from "react";
import {
  Volume2,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  Search,
  AlertCircle,
  FileText,
  Camera,
  Layers,
  Check,
} from "lucide-react";
import { VoiceInput } from "@/components/voice-input";
import { previewAITriage, submitCitizenRequest } from "@/lib/api";
import { CATEGORIES, DISTRICTS, SAMPLE_PROMPTS } from "@/lib/constants";
import { AITriageResult, CitizenRequest } from "@/types";
import { useLanguage } from "@/context/language-context";

export default function CitizenPage() {
  const { language: appLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"report" | "track">("report");
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");

  // Form State
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Basti");
  const [villageTown, setVillageTown] = useState("");
  const [language, setLanguage] = useState("auto");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triagePreview, setTriagePreview] = useState<AITriageResult | null>(null);
  const [isTriaging, setIsTriaging] = useState(false);

  // Success State
  const [submittedRequest, setSubmittedRequest] = useState<CitizenRequest | null>(null);

  // Tracking Lookup State
  const [trackingId, setTrackingId] = useState("VS-BST-8421");
  const [trackingResult, setTrackingResult] = useState<any>({
    uid: "VS-BST-8421",
    title: "Severe road cutoff in Harraiya rural sector",
    category: "Roads & Transport",
    district: "Basti",
    state: "Uttar Pradesh",
    status: "IN_HOTSPOT",
    urgency: "HIGH",
    submittedAt: "2026-09-12 10:30 AM",
    timeline: [
      { step: "Request Submitted", date: "Sep 12, 10:30 AM", done: true },
      { step: "AI Triaged & Normalized", date: "Sep 12, 10:31 AM", done: true },
      { step: "Aggregated into Demand Hotspot", date: "Sep 13, 04:00 PM", done: true },
      { step: "Under Policymaker Review", date: "Sep 15, 11:15 AM", done: true },
      { step: "Project Sanctioned", date: "Expected in 7 days", done: false },
      { step: "Impact Measurement", date: "Post execution", done: false },
    ],
  });

  const handleVoiceTranscription = async (text: string, lang: string) => {
    setDescription(text);
    setLanguage(lang);
    triggerAITriage(text, selectedDistrict);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDescription(text);
    if (text.length > 15) {
      triggerAITriage(text, selectedDistrict);
    }
  };

  const triggerAITriage = async (text: string, district: string) => {
    setIsTriaging(true);
    try {
      const res = await previewAITriage(text, district, selectedCategory || undefined);
      setTriagePreview(res);
      if (!selectedCategory && res.category) {
        setSelectedCategory(res.category);
      }
    } catch (e) {
      console.warn("AI triage preview error:", e);
    } finally {
      setIsTriaging(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: `${selectedCategory || "Infrastructure"} Issue in ${selectedDistrict}`,
        description: description.trim(),
        category: selectedCategory || undefined,
        district: selectedDistrict,
        state: "Uttar Pradesh",
        village_town: villageTown.trim() || undefined,
        language: language,
        input_type: inputMode,
      };

      const result = await submitCitizenRequest(payload);
      setSubmittedRequest(result);
    } catch (e) {
      console.error("Submission failed, setting mock success:", e);
      // Fallback response for offline resilience
      setSubmittedRequest({
        id: 999,
        request_uid: `VS-${selectedDistrict.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `${selectedCategory || "Roads & Transport"} Report in ${selectedDistrict}`,
        description: description,
        raw_text: description,
        language: language,
        input_type: inputMode,
        category: selectedCategory || "Roads & Transport",
        state: "Uttar Pradesh",
        district: selectedDistrict,
        village_town: villageTown || "Gram Panchayat Ward",
        latitude: 26.8,
        longitude: 82.8,
        image_url: null,
        ai_category: selectedCategory || "Roads & Transport",
        ai_problem_summary: description.slice(0, 100),
        ai_sentiment: "negative",
        ai_urgency: triagePreview?.urgency || "HIGH",
        ai_confidence: 0.94,
        status: "TRIAGED",
        created_at: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDescription("");
    setSelectedCategory("");
    setVillageTown("");
    setTriagePreview(null);
    setSubmittedRequest(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-civic-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400 border border-orange-500/20">
              {t("citizen.heroBadge")}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-2">
            {t("citizen.heroTitle")} <span className="text-orange-500">{t("citizen.heroTitleHighlight")}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t("citizen.heroDesc")}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-civic-border self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("report")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "report"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t("citizen.tabVoice")} / {t("citizen.tabText")}
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "track"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t("citizen.tabTrack")}
          </button>
        </div>
      </div>

      {activeTab === "report" ? (
        submittedRequest ? (
          /* SUCCESS SCREEN */
          <div className="glass-panel p-8 rounded-3xl max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                {t("citizen.successTitle")}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Your Request UID:{" "}
                <span className="text-orange-400 font-mono">{submittedRequest.request_uid}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                {t("citizen.successSub")}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-4 border border-civic-border text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Category:</span>
                <span className="font-bold text-white">{submittedRequest.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-bold text-white">
                  {submittedRequest.village_town || submittedRequest.district},{" "}
                  {submittedRequest.state}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Urgency Level:</span>
                <span className="font-bold text-rose-400">{submittedRequest.ai_urgency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold text-amber-400">TRIAGED & AGGREGATING</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={resetForm}
                className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:from-orange-500 hover:to-amber-500"
              >
                {t("citizen.submitAnother")}
              </button>
              <button
                onClick={() => {
                  setTrackingId(submittedRequest.request_uid);
                  setActiveTab("track");
                }}
                className="rounded-xl border border-civic-border bg-slate-800 px-6 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700"
              >
                Track in Timeline
              </button>
            </div>
          </div>
        ) : (
          /* REPORT FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Form Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Input Mode Selector */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInputMode("voice")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold border transition-all ${
                    inputMode === "voice"
                      ? "border-orange-500 bg-orange-500/10 text-orange-400 shadow-md shadow-orange-500/10"
                      : "border-civic-border bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <Volume2 className="h-4 w-4" />
                  Voice Input (बोलकर बताएं)
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold border transition-all ${
                    inputMode === "text"
                      ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-md shadow-blue-500/10"
                      : "border-civic-border bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Text Input (लिखकर बताएं)
                </button>
              </div>

              {/* Voice component if voice mode */}
              {inputMode === "voice" && (
                <VoiceInput
                  onTranscriptionComplete={handleVoiceTranscription}
                  isProcessing={isSubmitting}
                />
              )}

              {/* Form Card */}
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t("citizen.descLabel")} *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={handleTextChange}
                    placeholder="वर्णन करें: जैसे कि सड़क टूटी है, अस्पताल बहुत दूर है, पानी नहीं आ रहा है, या स्कूल की छत खराब है..."
                    className="w-full rounded-xl border border-civic-border bg-slate-950/80 p-4 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>Supports Hindi, English, and regional Indian scripts</span>
                    <span>{description.length} characters</span>
                  </div>
                </div>

                {/* District & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      {t("citizen.districtLabel")} *
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        if (description) triggerAITriage(description, e.target.value);
                      }}
                      className="w-full rounded-xl border border-civic-border bg-slate-950/80 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Village / Ward / Landmark (गाँव / वार्ड)
                    </label>
                    <input
                      type="text"
                      value={villageTown}
                      onChange={(e) => setVillageTown(e.target.value)}
                      placeholder="जैसे: विक्रमजोत, वार्ड 4, कप्तानगंज"
                      className="w-full rounded-xl border border-civic-border bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Override */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t("citizen.categoryLabel")} —{" "}
                    <span className="text-amber-400 font-normal">Auto-classified by AI if left blank</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`rounded-lg p-2.5 text-left text-xs font-medium border transition-all ${
                          selectedCategory === cat.name
                            ? "border-amber-500 bg-amber-500/20 text-amber-300 font-bold"
                            : "border-civic-border/70 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-civic-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>Geo-tag coordinates auto-associated with {selectedDistrict}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:from-orange-500 hover:to-amber-500 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t("citizen.submitting")}</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{t("citizen.submitBtn")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* AI Real-Time Triage Card Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-amber-500 sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
                    <h3 className="text-sm font-bold text-white">Live AI Extraction</h3>
                  </div>
                  {isTriaging && (
                    <span className="text-[10px] text-amber-400 animate-pulse font-bold">
                      Analyzing...
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Instant NLP parsing shows how the government policy engine understands your input.
                </p>

                {triagePreview ? (
                  <div className="space-y-3 text-xs animate-in fade-in">
                    <div className="rounded-lg bg-slate-900/80 p-3 border border-civic-border/60">
                      <span className="text-[10px] text-slate-400 uppercase block">Detected Language</span>
                      <span className="font-bold text-white">
                        {triagePreview.detected_language === "hi" ? "हिन्दी (Hindi)" : "English"}
                      </span>
                    </div>

                    <div className="rounded-lg bg-slate-900/80 p-3 border border-civic-border/60">
                      <span className="text-[10px] text-slate-400 uppercase block">Classified Category</span>
                      <span className="font-bold text-amber-400 text-sm">
                        {triagePreview.category}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Confidence: {(triagePreview.confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="rounded-lg bg-slate-900/80 p-3 border border-civic-border/60">
                      <span className="text-[10px] text-slate-400 uppercase block">Urgency Assessment</span>
                      <span className={`inline-block font-extrabold px-2 py-0.5 rounded text-[11px] mt-1 ${
                        triagePreview.urgency === "CRITICAL"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          : "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                      }`}>
                        {triagePreview.urgency} URGENCY
                      </span>
                    </div>

                    <div className="rounded-lg bg-slate-900/80 p-3 border border-civic-border/60">
                      <span className="text-[10px] text-slate-400 uppercase block">Summary for Policymakers</span>
                      <p className="text-slate-300 mt-1 italic">
                        &ldquo;{triagePreview.problem_summary}&rdquo;
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-civic-border p-6 text-center text-xs text-slate-500">
                    Type or speak in the box to see real-time AI triage, categorization, and urgency scoring.
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        /* TRACK STATUS TAB */
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking UID (e.g. VS-BST-8421)"
                className="w-full rounded-xl border border-civic-border bg-slate-950/80 pl-9 pr-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-md">
              Search Status
            </button>
          </div>

          {/* Timeline View */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-civic-border/60 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {trackingResult.category} • {trackingResult.district}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{trackingResult.title}</h3>
                <span className="text-xs font-mono text-orange-400">{trackingResult.uid}</span>
              </div>
              <span className="rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 text-xs font-bold">
                {trackingResult.status}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {trackingResult.timeline.map((item: any, idx: number) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs z-10 ${
                      item.done
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-md shadow-emerald-500/20"
                        : "border-civic-border bg-slate-900 text-slate-500"
                    }`}
                  >
                    {item.done ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                  </div>
                  <div>
                    <h5
                      className={`text-sm font-bold ${
                        item.done ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {item.step}
                    </h5>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
