"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, Check, AlertTriangle } from "lucide-react";
import { SAMPLE_PROMPTS } from "@/lib/constants";
import { useLanguage } from "@/context/language-context";

interface VoiceInputProps {
  onTranscriptionComplete: (text: string, lang: string) => void;
  isProcessing?: boolean;
}

export function VoiceInput({ onTranscriptionComplete, isProcessing = false }: VoiceInputProps) {
  const { language: appLang } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("hi-IN");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const speechLangMap: Record<string, string> = {
      hi: "hi-IN",
      en: "en-IN",
      bn: "bn-IN",
      ta: "ta-IN",
      te: "te-IN",
      mr: "mr-IN",
    };
    if (speechLangMap[appLang]) {
      setSelectedLanguage(speechLangMap[appLang]);
    }
  }, [appLang]);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      recognizer.lang = selectedLanguage;

      recognizer.onresult = (event: any) => {
        let current = "";
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setLiveTranscript(current);
      };

      recognizer.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognizer.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognizer;
    } else {
      setRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [selectedLanguage]);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      if (liveTranscript.trim()) {
        onTranscriptionComplete(liveTranscript, selectedLanguage.startsWith("hi") ? "hi" : "en");
      }
    } else {
      setLiveTranscript("");
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = selectedLanguage;
          recognitionRef.current.start();
          setIsRecording(true);
        } else {
          // Simulation fallback if browser mic permission or speech recognition is blocked
          simulateVoiceRecording();
        }
      } catch (err) {
        console.warn("Mic start error, using simulation:", err);
        simulateVoiceRecording();
      }
    }
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setLiveTranscript("सुन रहे हैं... (Listening in Hindi...)");
    setTimeout(() => {
      const sample = "हमारे गांव में सड़क बहुत खराब है और बारिश में पूरा रास्ता बंद हो जाता है।";
      setLiveTranscript(sample);
      setIsRecording(false);
      onTranscriptionComplete(sample, "hi");
    }, 2500);
  };

  const handleApplySample = (sample: (typeof SAMPLE_PROMPTS)[0]) => {
    setLiveTranscript(sample.text);
    onTranscriptionComplete(sample.text, sample.lang === "Hindi" ? "hi" : "en");
  };

  return (
    <div className="rounded-2xl border border-civic-border bg-civic-card/80 p-6 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-civic-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Volume2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Multilingual Voice Input (आवाज से दर्ज करें)
            </h3>
            <p className="text-xs text-slate-400">
              Speak in Hindi, English or regional language — AI automatically triages
            </p>
          </div>
        </div>

        {/* Audio Language Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Speech Lang:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isRecording}
            className="rounded-lg border border-civic-border bg-slate-900 px-3 py-1 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="hi-IN">🇮🇳 हिन्दी (Hindi)</option>
            <option value="en-IN">🌐 Indian English</option>
            <option value="bn-IN">🇮🇳 বাংলা (Bengali)</option>
            <option value="ta-IN">🇮🇳 தமிழ் (Tamil)</option>
          </select>
        </div>
      </div>

      {/* Recording Area */}
      <div className="py-8 flex flex-col items-center justify-center text-center">
        {/* Animated Mic Button */}
        <div className="relative mb-6">
          {isRecording && (
            <>
              <div className="absolute -inset-4 rounded-full bg-orange-500/20 animate-ping"></div>
              <div className="absolute -inset-8 rounded-full bg-orange-500/10 animate-pulse"></div>
            </>
          )}

          <button
            type="button"
            onClick={toggleRecording}
            disabled={isProcessing}
            className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-2xl transition-all ${
              isRecording
                ? "border-orange-500 bg-orange-600 text-white shadow-orange-500/50 scale-105"
                : "border-civic-border bg-slate-900 text-slate-300 hover:border-orange-500/60 hover:text-orange-400 hover:scale-105"
            }`}
          >
            {isRecording ? (
              <Mic className="h-10 w-10 animate-bounce" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </button>
        </div>

        {/* Audio Wave Simulation */}
        {isRecording ? (
          <div className="flex items-center gap-1 h-8 mb-4">
            <span className="text-xs font-semibold text-orange-400 mr-2">RECORDING</span>
            {[40, 75, 90, 60, 100, 45, 80, 50, 95, 30].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-orange-400 animate-wave"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-300 mb-2">
            Click microphone and describe your development problem
          </p>
        )}

        {/* Live Transcription Box */}
        {liveTranscript ? (
          <div className="w-full max-w-xl rounded-xl border border-civic-border bg-slate-950/70 p-4 text-left shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Live Transcription:
              </span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {selectedLanguage.startsWith("hi") ? "Hindi Speech" : "English Speech"}
              </span>
            </div>
            <p className="text-sm font-medium text-white leading-relaxed">
              &ldquo;{liveTranscript}&rdquo;
            </p>
          </div>
        ) : null}
      </div>

      {/* Quick Test Samples */}
      <div className="pt-4 border-t border-civic-border/50">
        <p className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
          <span>⚡</span>
          <span>Or test with a 1-click citizen sample (PRD Benchmark Scenarios):</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySample(sample)}
              className="flex flex-col items-start rounded-lg border border-civic-border/60 bg-slate-900/60 p-2.5 text-left transition-all hover:border-amber-500/40 hover:bg-slate-800/80"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {sample.category} • {sample.district}
                </span>
                <span className="text-[10px] text-slate-500">{sample.lang}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                &ldquo;{sample.text}&rdquo;
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
