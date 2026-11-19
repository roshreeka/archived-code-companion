import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MapPin, Play } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getHeritageSite, heritageSites, type SourceKind } from "@/lib/heritage-data";
import type { UiKey } from "@/lib/i18n-strings";
import { ColorfulQuote, PageHero } from "@/components/heritage/sections";
import { Reveal, Tilt } from "@/components/heritage/motion";
import { AnkhiLattice, ToranEdge } from "@/components/heritage/patterns";
import { ListenSection } from "@/components/heritage/voice-controls";

export const Route = createFileRoute("/heritage/$slug")({
  loader: ({ params }) => {
    const site = getHeritageSite(params.slug);
    if (!site) throw notFound();
    return { slug: site.slug };
  },
  head: ({ loaderData }) => {
    const site = loaderData ? getHeritageSite(loaderData.slug) : undefined;
    const title = site ? `${site.name.en} | Ward 16 Heritage` : "Heritage story | Ward 16 Heritage";
    const description = site?.shortDescription.en ?? "A heritage story from Ward 16, Kathmandu.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: StoryPage,
});

const sourceKey = (s: SourceKind) => `source.${s}` as UiKey;

function StoryPage() {
  const { slug } = Route.useLoaderData();
  const site = getHeritageSite(slug)!;
  const { t, tr, lang } = useI18n();
  const number = String(heritageSites.indexOf(site) + 1).padStart(2, "0");
  const related = site.related.map((r) => getHeritageSite(r)).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <main>
      <PageHero
        kicker={tr(site.type)}
        title={tr(site.name)}
        lead={tr(site.intro)}
        aside={
          <Tilt className="mx-auto max-w-sm rounded-[2.2rem] animate-float" max={12}>
            <div className="relative overflow-hidden rounded-[2.2rem] bg-maroon p-8 shadow-[var(--shadow-lift)]">
              <AnkhiLattice cell={30} />
              <div className="card-plaque pop relative mx-auto w-fit">
                <span className="extrude text-7xl" aria-hidden="true">
                  {number}
                </span>
                <span className="font-display text-lg font-semibold">{lang === "en" ? site.name.ne : site.name.en}</span>
              </div>
            </div>
          </Tilt>
        }
      >
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold" aria-label="Breadcrumb">
          <Link to="/" className="text-link">{t("nav.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/explore" className="text-link">{t("story.heritageStories")}</Link>
          <span aria-hidden="true">/</span>
          <span>{tr(site.name)}</span>
        </nav>
      </PageHero>

      {site.documented ? (
        <>
          <section className="sec sec-sky !pt-0">
            <ToranEdge />
            <div className="shell grid gap-10 pt-16 lg:grid-cols-[0.75fr_1.6fr] lg:pt-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="panel p-7">
                  <span className="eyebrow text-crimson">{t("story.asideEyebrow")}</span>
                  <h2 data-read className="mt-4 font-display text-3xl font-semibold text-maroon">{t("story.asideTitle")}</h2>
                  <p data-read className="mt-3 text-ink">{t("story.asideBody")}</p>
                  <div className="mt-5 flex flex-wrap gap-2" aria-label={t("story.legend")}>
                    {(["interview", "community-belief", "folklore"] as SourceKind[]).map((s) => (
                      <span key={s} className={`source-note source-${s}`}>{t(sourceKey(s))}</span>
                    ))}
                  </div>
                </div>
              </aside>
              <div className="grid gap-8">
                {site.sections.map((section, i) => (
                  <Reveal key={section.title.en} delay={60}>
                    <ListenSection className="panel p-7 md:p-10">
                      <div className="flex items-start gap-6">
                        <span className="extrude hidden text-6xl sm:block" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="eyebrow text-crimson">{tr(section.eyebrow)}</span>
                          <h2 data-read className="mt-3 font-display text-3xl font-semibold text-maroon md:text-4xl">{tr(section.title)}</h2>
                          {section.body.map((p) => (
                            <p data-read key={p.en} className="mt-4 text-lg text-ink">{tr(p)}</p>
                          ))}
                          <span className={`source-note source-${section.source} mt-5`}>{t(sourceKey(section.source))}</span>
                        </div>
                      </div>
                    </ListenSection>
                  </Reveal>
                ))}
                <Reveal>
                  <div className="panel p-7 md:p-10">
                    <span className="eyebrow text-crimson">{t("story.ritualEyebrow")}</span>
                    <h3 data-read className="mt-3 font-display text-3xl font-semibold text-maroon">{t("story.ritualTitle")}</h3>
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {site.rituals.map((r) => (
                        <li data-read key={r.en} className="status-chip status-documented !text-sm !normal-case !tracking-normal">{tr(r)}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="sec sec-temple !pt-0">
            <ToranEdge />
            <div className="shell grid gap-12 pt-16 lg:pt-20">
              <ColorfulQuote>{tr(site.quote)}</ColorfulQuote>

              <div>
                <span className="eyebrow text-gold">{t("story.galleryEyebrow")}</span>
                <h2 data-read className="display-lg mt-4">{t("story.galleryTitle")}</h2>
                <p data-read className="mt-4 max-w-2xl text-lg text-on-dark-soft">{t("story.galleryCopy")}</p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {site.gallery.map((g, i) => (
                    <Reveal key={g.en} delay={i * 100}>
                      <figure className="ankhi-frame">
                        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.4rem] bg-parchment">
                          <span className="px-4 text-center text-sm font-semibold text-ink-soft">{t("story.photoPending")}</span>
                        </div>
                        <figcaption className="mt-3 text-center text-sm font-semibold text-cream">{tr(g)}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="panel flex flex-col gap-4 p-7 md:p-9" role="img" aria-label={t("story.videoTitle", { name: tr(site.name) })}>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-cream shadow-[var(--shadow-btn)]">
                    <Play size={20} fill="currentColor" />
                  </span>
                  <span className="eyebrow text-crimson">{t("story.videoEyebrow")}</span>
                  <h3 data-read className="font-display text-2xl font-semibold text-maroon">{t("story.videoTitle", { name: tr(site.name) })}</h3>
                  <p data-read className="text-ink">{t("story.videoBody")}</p>
                  <span className="text-sm text-ink-soft">{t("story.videoCaption")}</span>
                </div>
                <div className="grid gap-6">
                  <div className="panel flex gap-4 p-7">
                    <MapPin className="mt-1 shrink-0 text-crimson" size={22} aria-hidden="true" />
                    <div>
                      <span className="eyebrow text-crimson">{t("story.locationEyebrow")}</span>
                      <h3 data-read className="mt-2 font-display text-xl font-semibold text-maroon">{tr(site.location)}</h3>
                      <p data-read className="mt-2 text-ink">{tr(site.visitorNote)}</p>
                      <Link to="/map" className="text-link mt-3 text-flag-blue">{t("nav.map")} <ArrowUpRight size={15} /></Link>
                    </div>
                  </div>
                  <div className="panel p-7">
                    <span className="eyebrow text-crimson">{t("story.refsEyebrow")}</span>
                    <h3 data-read className="mt-2 font-display text-xl font-semibold text-maroon">{t("story.refsTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
                      {site.sources.map((s) => (
                        <li data-read key={s.en}>{tr(s)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="sec sec-sky !pt-0">
          <ToranEdge />
          <div className="shell grid gap-6 pt-16 md:grid-cols-2 lg:pt-20">
            <div className="panel p-7 md:p-9">
              <span className="status-chip status-pending">{t("card.soon")}</span>
              <p data-read className="mt-4 text-lg text-ink">{t("story.pendingBody")}</p>
            </div>
            <div className="panel flex gap-4 p-7 md:p-9">
              <MapPin className="mt-1 shrink-0 text-crimson" size={22} aria-hidden="true" />
              <div>
                <span className="eyebrow text-crimson">{t("story.locationEyebrow")}</span>
                <h3 data-read className="mt-2 font-display text-xl font-semibold text-maroon">{tr(site.location)}</h3>
                <Link to="/map" className="text-link mt-3 text-flag-blue">{t("nav.map")} <ArrowUpRight size={15} /></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sec sec-sindoor !pt-0">
        <ToranEdge />
        <div className="shell pt-16 lg:pt-20">
          <span className="eyebrow text-gold">{t("story.relatedEyebrow")}</span>
          <h2 data-read className="display-lg mt-4">{t("story.relatedTitle")}</h2>
          <p data-read className="mt-4 max-w-2xl text-lg">{t("story.relatedCopy")}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {related.map((r) => (
              <Tilt key={r.slug} className="rounded-[1.5rem]" max={8}>
                <Link to="/heritage/$slug" params={{ slug: r.slug }} className="panel flex items-center justify-between gap-4 p-6 font-display text-2xl font-semibold text-maroon">
                  <span>{tr(r.name)}</span>
                  <ArrowUpRight size={22} className="text-crimson" />
                </Link>
              </Tilt>
            ))}
          </div>
          <Link to="/explore" className="text-link mt-10 text-gold">
            <ArrowLeft size={16} /> {t("story.back")}
          </Link>
        </div>
      </section>
    </main>
  );
}
