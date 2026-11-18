import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { HeritageSite } from "@/lib/heritage-data";
import { AnkhiLattice } from "./patterns";
import { Tilt } from "./motion";

const visuals = ["card-visual-a", "card-visual-b", "card-visual-c", "card-visual-d"];

export function HeritageCard({ site, index, featured = false }: { site: HeritageSite; index: number; featured?: boolean }) {
  const { t, tr, lang } = useI18n();
  const number = String(index + 1).padStart(2, "0");
  return (
    <Tilt className="h-full rounded-[2rem]" max={featured ? 7 : 10}>
      <article className="heritage-card">
        <div className={`card-visual ${visuals[index % visuals.length]} ${featured ? "h-64 md:h-72" : "h-44"}`}>
          <AnkhiLattice cell={featured ? 34 : 26} className="opacity-70" />
          <div className="absolute inset-0 grid place-items-center" style={{ transformStyle: "preserve-3d" }}>
            <div className="card-plaque pop">
              <span className={`extrude ${featured ? "text-6xl" : "text-4xl"}`} aria-hidden="true">
                {number}
              </span>
              <span className="font-display text-sm font-semibold">{lang === "en" ? site.name.ne : site.name.en}</span>
            </div>
          </div>
          <span className={`status-chip absolute left-4 top-4 ${site.documented ? "status-documented" : "status-pending"}`}>
            {site.documented ? t("card.documented") : t("card.soon")}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
          <div className="flex items-center justify-between gap-2 text-sm font-semibold text-ink-soft">
            <span>{tr(site.type)}</span>
            {!site.documented && <Lock size={14} aria-hidden="true" />}
          </div>
          <h3 data-read className={`font-display font-semibold text-maroon ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>{tr(site.name)}</h3>
          <p data-read className="text-ink">{tr(site.cardDescription)}</p>
          <div className="mt-auto pt-3">
            {site.documented ? (
              <Link to="/heritage/$slug" params={{ slug: site.slug }} className="text-link text-crimson">
                {t("card.explore")} <ArrowUpRight size={16} />
              </Link>
            ) : (
              <span className="text-sm font-semibold text-ink-soft">{t("card.more")}</span>
            )}
          </div>
        </div>
      </article>
    </Tilt>
  );
}
