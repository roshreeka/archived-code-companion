import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useI18n, type Lang } from "./i18n";

type Status = "idle" | "playing" | "paused";
type Chunk = { text: string; el: HTMLElement };

type Speech = {
  status: Status;
  supported: boolean;
  readPage: () => void;
  readElement: (root: HTMLElement) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const SpeechContext = createContext<Speech | null>(null);

/** Split text into sentence-sized chunks so long paragraphs don't get cut off by the browser. */
export function splitForSpeech(text: string): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.split(/(?<=[.!?।])\s+/);
  const out: string[] = [];
  for (const s of sentences) {
    if (s.length <= 220) out.push(s);
    else out.push(...s.split(/(?<=[,;—])\s+/));
  }
  return out.filter(Boolean);
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (lang === "ne") {
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith("ne")) ??
      voices.find((v) => v.lang.toLowerCase().startsWith("hi"))
    );
  }
  return (
    voices.find((v) => v.lang === "en-GB" && /natural|google|samantha|daniel/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

/** Top-level readable elements inside a root, in page order, skipping hidden ones and nested duplicates. */
function collectChunks(root: ParentNode): Chunk[] {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-read]"));
  if (root instanceof HTMLElement && root.hasAttribute("data-read")) nodes.unshift(root);
  const chunks: Chunk[] = [];
  for (const el of nodes) {
    if (el.parentElement?.closest("[data-read]") && nodes.includes(el.parentElement.closest("[data-read]") as HTMLElement)) continue;
    if (el.offsetParent === null && el !== root) continue;
    for (const text of splitForSpeech(el.innerText)) chunks.push({ text, el });
  }
  return chunks;
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(true);
  const runRef = useRef(0);
  const currentEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    if (ok) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const clearHighlight = () => {
    currentEl.current?.classList.remove("is-reading");
    currentEl.current = null;
  };

  const stop = useCallback(() => {
    runRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    clearHighlight();
    setStatus("idle");
  }, []);

  const play = useCallback(
    (chunks: Chunk[]) => {
      if (!("speechSynthesis" in window) || chunks.length === 0) return;
      window.speechSynthesis.cancel();
      const run = ++runRef.current;
      const voice = pickVoice(lang);
      let i = 0;
      setStatus("playing");

      const next = () => {
        if (run !== runRef.current) return;
        if (i >= chunks.length) {
          clearHighlight();
          setStatus("idle");
          return;
        }
        const { text, el } = chunks[i++]!;
        if (currentEl.current !== el) {
          clearHighlight();
          currentEl.current = el;
          el.classList.add("is-reading");
          const r = el.getBoundingClientRect();
          if (r.top < 80 || r.bottom > window.innerHeight - 100) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice?.lang ?? (lang === "ne" ? "ne-NP" : "en-GB");
        if (voice) u.voice = voice;
        u.rate = lang === "ne" ? 0.9 : 0.95;
        u.onend = next;
        u.onerror = () => {
          if (run === runRef.current) next();
        };
        window.speechSynthesis.speak(u);
      };
      next();
    },
    [lang],
  );

  const readPage = useCallback(() => {
    const main = document.querySelector("main");
    if (main) play(collectChunks(main));
  }, [play]);

  const readElement = useCallback((root: HTMLElement) => play(collectChunks(root)), [play]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setStatus("paused");
  }, []);
  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setStatus("playing");
  }, []);

  // Stop reading when the language or page changes.
  useEffect(() => stop, [lang, pathname, stop]);

  const value = useMemo(
    () => ({ status, supported, readPage, readElement, pause, resume, stop }),
    [status, supported, readPage, readElement, pause, resume, stop],
  );
  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeech must be used inside SpeechProvider");
  return ctx;
}
