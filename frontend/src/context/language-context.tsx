"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from "@/lib/constants";
import { translations, LanguageCode } from "@/lib/translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: string) => void;
  currentLanguage: (typeof LANGUAGES)[0];
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("hi");

  useEffect(() => {
    // Read persisted language preference from localStorage if available
    try {
      const saved = localStorage.getItem("vikassetu_lang") as LanguageCode;
      if (saved && translations[saved]) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = "hi";
      }
    } catch (e) {
      console.warn("Could not read language from localStorage", e);
    }
  }, []);

  const setLanguage = (newLang: string) => {
    const validLang = (translations[newLang as LanguageCode] ? newLang : "en") as LanguageCode;
    setLanguageState(validLang);
    try {
      localStorage.setItem("vikassetu_lang", validLang);
      document.documentElement.lang = validLang;
    } catch (e) {
      console.warn("Could not persist language to localStorage", e);
    }
  };

  const currentLanguage =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
