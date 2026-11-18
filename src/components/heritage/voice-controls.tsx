import { useRef, type ReactNode } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSpeech } from "@/lib/speech";

/** Header button that reads the whole page aloud. */
export function ListenPageButton({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const { status, supported, readPage, stop } = useSpeech();
  const active = status !== "idle";
  return (
    <button
      type="button"
      className="btn-gradient !px-4 !py-2.5 text-sm"
      onClick={() => (active ? stop() : readPage())}
      disabled={!supported}
      title={supported ? t("voice.listenPage") : t("voice.unsupported")}
      aria-label={active ? t("voice.stop") : t("voice.listenPage")}
    >
      {active ? <Square size={15} fill="currentColor" /> : <Volume2 size={17} />}
      {!compact && <span>{active ? t("voice.stop") : t("voice.listen")}</span>}
    </button>
  );
}

/** Small button that reads just the wrapped section. */
export function ListenSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { t } = useI18n();
  const { supported, readElement } = useSpeech();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={className}>
      {children}
      {supported && (
        <button type="button" className="btn-pill mt-5" onClick={() => ref.current && readElement(ref.current)}>
          <Volume2 size={15} /> {t("voice.listenSection")}
        </button>
      )}
    </div>
  );
}

/** Floating player shown while reading aloud. */
export function VoiceDock() {
  const { t } = useI18n();
  const { status, pause, resume, stop } = useSpeech();
  if (status === "idle") return null;
  const paused = status === "paused";
  return (
    <div className="voice-dock" role="region" aria-label={t("voice.reading")}>
      <span className={`voice-bars ${paused ? "is-paused" : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="text-sm font-semibold">{t("voice.reading")}</span>
      <button
        type="button"
        className="icon-btn icon-btn-primary"
        onClick={paused ? resume : pause}
        aria-label={paused ? t("voice.resume") : t("voice.pause")}
      >
        {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      </button>
      <button type="button" className="icon-btn" onClick={stop} aria-label={t("voice.stop")}>
        <Square size={14} fill="currentColor" />
      </button>
    </div>
  );
}
