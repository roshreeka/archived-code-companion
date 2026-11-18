import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { documentedSites, futureSites, heritageSites } from "@/lib/heritage-data";
import type { UiKey } from "@/lib/i18n-strings";
import { HeritageCard } from "./heritage-card";
import { Reveal, Tilt } from "./motion";
import { AnkhiLattice, ToranEdge } from "./patterns";
import { SectionHeading } from "./section-heading";

export function AboutSection({ id = "about", tone = "marigold" }: { id?: string; tone?: "marigold" | "sindoor" }) {
  const { t } = useI18n();
  return (
    <section id={id} className={`sec sec-${tone} !pt-0`}>
      <ToranEdge />
      <div className="shell grid items-center gap-14 pt-20 md:grid-cols-[0.9fr_1.1fr] md:pt-24">
        <Reveal variant="left">
          <div className="animate-float">
            <Tilt className="rounded-[2.2rem]" max={12}>
              <div className="relative overflow-hidden rounded-[2.2rem] bg-maroon p-6 shadow-[var(--shadow-lift)] md:p-9">
                <AnkhiLattice cell={30} />
                <div className="panel pop relative p-7 md:p-8">
                  <span className="extrude text-6xl" aria-hidden="true">
                    01
                  </span>
                  <p data-read className="mt-6 font-display text-2xl font-semibold text-maroon">
                    {t("about.noteTitle")}
                  </p>
                  <p data-read className="mt-3 text-ink">
                    {t("about.noteBody")}
                  </p>
                </div>
              </div>
            </Tilt>
          </div>
        </Reveal>
        <Reveal variant="right">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 data-read className="display-lg mt-5">
            {t("about.title")}
          </h2>
          <p data-read className="mt-6 text-lg">
            {t("about.p1")}
          </p>
          <p data-read className="mt-4 text-lg">
            {t("about.p2")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function CollectionSection({ id = "explore", headingLevelIndex = "02" }: { id?: string; headingLevelIndex?: string }) {
  const { t } = useI18n();
  return (
    <section id={id} className="sec sec-sindoor !pt-0">
      <ToranEdge />
      <div className="shell pt-20 md:pt-24">
        <SectionHeading
          index={headingLevelIndex}
          eyebrow={t("explore.eyebrow")}
          title={t("explore.title")}
          copy={t("explore.copy")}
          action={
            <a href="#preserve" className="text-link text-gold">
              {t("explore.action")} <ArrowUpRight size={16} />
            </a>
          }
        />
        <div className="grid gap-8 md:grid-cols-2">
          {documentedSites.map((site, i) => (
            <Reveal key={site.slug} delay={i * 140} variant="zoom">
              <HeritageCard site={site} index={heritageSites.indexOf(site)} featured />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {futureSites.map((site, i) => (
            <Reveal key={site.slug} delay={i * 110}>
              <HeritageCard site={site} index={heritageSites.indexOf(site)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const preservationItems: { title: UiKey; body: UiKey }[] = [
  { title: "preserve.i1t", body: "preserve.i1b" },
  { title: "preserve.i2t", body: "preserve.i2b" },
  { title: "preserve.i3t", body: "preserve.i3b" },
  { title: "preserve.i4t", body: "preserve.i4b" },
];

export function PreservationSection() {
  const { t } = useI18n();
  return (
    <section id="preserve" className="sec sec-sky !pt-0">
      <ToranEdge />
      <div className="shell grid gap-14 pt-20 md:grid-cols-[0.9fr_1.1fr] md:pt-24">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <span className="extrude text-8xl md:text-9xl" aria-hidden="true">
              03
            </span>
            <span className="eyebrow mt-8 flex">{t("preserve.eyebrow")}</span>
            <h2 data-read className="display-lg mt-5">
              {t("preserve.title")}
            </h2>
            <p data-read className="mt-6 max-w-md text-lg">
              {t("preserve.copy")}
            </p>
          </Reveal>
        </div>
        <ol className="grid gap-6">
          {preservationItems.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 120} variant={i % 2 ? "right" : "left"}>
              <Tilt className="rounded-[1.75rem]" max={8}>
                <div className="panel flex gap-6 p-7 md:p-8">
                  <span className="pop-sm grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] font-display text-xl font-bold text-cream shadow-[var(--shadow-btn)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pop-sm">
                    <h3 data-read className="font-display text-2xl font-semibold text-maroon">
                      {t(item.title)}
                    </h3>
                    <p data-read className="mt-2 text-ink">
                      {t(item.body)}
                    </p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** A quote set on a glass card over a moving, multi-colour background. */
export function ColorfulQuote({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <Reveal variant="zoom">
      <figure className="quote-colorful">
        <div className="panel-glass p-8 md:p-14">
          <span className="quote-mark block" aria-hidden="true">
            “
          </span>
          <blockquote data-read className="display-lg mt-2 text-maroon">
            {children}
          </blockquote>
          {footer ? <figcaption className="mt-8">{footer}</figcaption> : null}
        </div>
      </figure>
    </Reveal>
  );
}

export function SourcesSection() {
  const { t } = useI18n();
  return (
    <section aria-label={t("sources.eyebrow")} className="sec sec-temple !pt-0">
      <ToranEdge />
      <div className="shell pt-20 md:pt-24">
        <Reveal>
          <span className="eyebrow text-gold">{t("sources.eyebrow")}</span>
        </Reveal>
        <div className="mt-8">
          <ColorfulQuote
            footer={
              <>
                <p data-read className="max-w-3xl text-lg text-ink">
                  {t("sources.body")}
                </p>
                <Link to="/heritage/$slug" params={{ slug: "siddhi-ganesh" }} className="btn-gradient mt-7">
                  {t("sources.link")} <ArrowUpRight size={16} />
                </Link>
              </>
            }
          >
            {t("sources.title")}
          </ColorfulQuote>
        </div>
      </div>
    </section>
  );
}

/** Opening band for inner pages: marigold, with a faint carved-window lattice. */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  aside,
}: {
  kicker: ReactNode;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero sec-marigold">
      <AnkhiLattice className="opacity-20 [mask-image:linear-gradient(to_left,black,transparent_75%)]" cell={34} />
      <div className={`shell relative grid items-center gap-12 ${aside ? "md:grid-cols-[1.2fr_0.8fr]" : ""}`}>
        <Reveal>
          {children}
          <span className="eyebrow mt-6 flex">{kicker}</span>
          <h1 data-read className="display-xl mt-5 max-w-4xl">
            {title}
          </h1>
          {lead ? (
            <p data-read className="mt-7 max-w-2xl text-xl">
              {lead}
            </p>
          ) : null}
        </Reveal>
        {aside ? <Reveal variant="right">{aside}</Reveal> : null}
      </div>
    </section>
  );
}
