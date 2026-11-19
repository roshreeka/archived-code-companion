import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getHeritageSite, heritageSites } from "@/lib/heritage-data";
import { mapSites } from "@/lib/map-sites";
import { PageHero } from "@/components/heritage/sections";
import { ToranEdge } from "@/components/heritage/patterns";

const HeritageMap = lazy(() => import("@/components/heritage/heritage-map"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Explore Map | Ward 16 Heritage" },
      {
        name: "description",
        content: "An interactive OpenStreetMap of heritage sites in Ward 16, Kathmandu, with numbered markers and links to each story.",
      },
      { property: "og:title", content: "Explore Map — Ward 16 Heritage" },
      { property: "og:description", content: "Find Siddhi Ganesh Temple, Koncha Dyo, 22 Dhara and more on the map of Ward 16." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t, tr } = useI18n();
  const [selected, setSelected] = useState<string | null>(null);

  const sites = useMemo(
    () =>
      mapSites
        .map((m) => {
          const site = getHeritageSite(m.slug);
          if (!site) return null;
          return { ...m, number: heritageSites.indexOf(site) + 1, label: tr(site.name), site };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .sort((a, b) => a.number - b.number),
    [tr],
  );
  const current = sites.find((s) => s.slug === selected);
  const fallback = (
    <div className="heritage-map grid place-items-center text-ink-soft">{t("map.loading")}</div>
  );

  return (
    <main>
      <PageHero kicker={t("map.kicker")} title={t("map.title")} lead={t("map.lead")} />
      <section className="sec sec-sky !pt-0">
        <ToranEdge />
        <div className="shell grid gap-8 pt-16 lg:grid-cols-[1.6fr_1fr] lg:pt-20">
          <div className="map-frame lg:self-start">
            <ClientOnly fallback={fallback}>
              <Suspense fallback={fallback}>
                <HeritageMap sites={sites} selected={selected} onSelect={setSelected} mapLabel={t("map.region")} />
              </Suspense>
            </ClientOnly>
          </div>

          <aside className="panel flex flex-col gap-6 p-6 md:p-7" aria-live="polite">
            {current ? (
              <div>
                <span className="site-option-num !h-10 !w-10 !text-base" aria-hidden="true">
                  {current.number}
                </span>
                <p className="mt-4 text-sm font-semibold text-ink-soft">{tr(current.site.type)}</p>
                <h2 data-read className="mt-1 font-display text-3xl font-semibold text-maroon">
                  {tr(current.site.name)}
                </h2>
                <p data-read className="mt-3 text-ink">
                  {tr(current.site.shortDescription)}
                </p>
                {current.approximate && (
                  <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                    <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" /> {t("map.approximate")}
                  </p>
                )}
                <Link to="/heritage/$slug" params={{ slug: current.slug }} className="btn-gradient mt-5">
                  {t("map.details")} <ArrowUpRight size={16} />
                </Link>
              </div>
            ) : (
              <p data-read className="font-display text-2xl font-semibold text-maroon">
                {t("map.pick")}
              </p>
            )}

            <div className="border-t pt-5">
              <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">{t("map.sites")}</p>
              <ul className="mt-3 grid gap-1">
                {sites.map((s) => (
                  <li key={s.slug}>
                    <button
                      type="button"
                      className="site-option"
                      aria-pressed={s.slug === selected}
                      onClick={() => setSelected(s.slug)}
                    >
                      <span className="site-option-num" aria-hidden="true">
                        {s.number}
                      </span>
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
