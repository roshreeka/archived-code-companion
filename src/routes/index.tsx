import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, Volume2 } from "lucide-react";
import heroPhoto from "@/assets/ward16-heritage-background.jpg.asset.json";
import { useI18n } from "@/lib/i18n";
import { useSpeech } from "@/lib/speech";
import { useScrollProgress } from "@/components/heritage/motion";
import { DhakaBand } from "@/components/heritage/patterns";
import {
  AboutSection,
  CollectionSection,
  PreservationSection,
  SourcesSection,
} from "@/components/heritage/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ward 16 Heritage | Temples, shrines & living memory of Kathmandu" },
      {
        name: "description",
        content:
          "Explore Siddhi Ganesh Temple, Koncha Dyo and more heritage places of Ward 16, Kathmandu — in English or Nepali, with read-aloud.",
      },
      { property: "og:title", content: "Ward 16 Heritage — a living archive" },
      {
        property: "og:description",
        content: "Every place holds a story worth carrying forward. Temples, shrines and memories of Ward 16.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Hero() {
  const { t } = useI18n();
  const { readPage, supported } = useSpeech();
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="hero3d" aria-labelledby="hero-title">
      <div className="hero3d-sticky">
        <div
          className="hero3d-photo"
          role="img"
          aria-label={t("hero.photoAlt")}
          style={{ backgroundImage: `url(${heroPhoto.url})` }}
        />
        <div className="hero3d-content">
          <div className="shell">
            <span className="eyebrow text-petal">{t("hero.kicker")}</span>
            <h1 id="hero-title" data-read className="display-xl hero3d-title mt-6 max-w-5xl text-cream">
              {t("hero.title")}
            </h1>
            <p data-read className="mt-7 max-w-2xl text-lg text-on-dark-soft md:text-xl">
              {t("hero.lead")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/explore" className="btn-gradient">
                {t("hero.cta")} <ArrowDownRight size={18} />
              </Link>
              {supported && (
                <button type="button" className="btn-glass" onClick={readPage}>
                  <Volume2 size={18} /> {t("voice.listenPage")}
                </button>
              )}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-on-dark/25 pt-6 text-sm font-semibold text-on-dark-soft">
              <span>{t("hero.stat1")}</span>
              <span className="hidden items-center gap-3 md:inline-flex">
                <span className="scroll-cue" aria-hidden="true" /> {t("hero.scroll")}
              </span>
              <span>{t("hero.stat2")}</span>
            </div>
          </div>
        </div>
        <div className="hero-rail hidden md:block">{t("hero.rail")}</div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <div className="relative z-10 -mt-[40vh]">
        <DhakaBand height={22} className="relative z-10" />
      </div>
      <AboutSection />
      <CollectionSection />
      <PreservationSection />
      <SourcesSection />
    </main>
  );
}
