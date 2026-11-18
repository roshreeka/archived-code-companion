import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { L } from "./heritage-data";
import { ui, type UiKey } from "./i18n-strings";

export type Lang = "en" | "ne";
const STORAGE_KEY = "w16-lang";

type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: UiKey, vars?: Record<string, string>) => string;
  tr: (value: L) => string;
};

const I18nContext = createContext<I18n | null>(null);

export function translate(lang: Lang, key: UiKey, vars?: Record<string, string>) {
  let text: string = ui[key][lang];
  if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
  return text;
}

const fallback: I18n = {
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: (key, vars) => translate("en", key, vars),
  tr: (v) => v.en,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is the default; a saved choice is restored after hydration.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ne" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "ne" : "en"),
      t: (key, vars) => translate(lang, key, vars),
      tr: (v) => v[lang] || v.en,
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  // Outside the provider (e.g. error boundaries) fall back to English.
  return ctx ?? fallback;
}
