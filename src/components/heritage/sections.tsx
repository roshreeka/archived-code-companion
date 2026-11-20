
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import {
  documentedSites,
  futureSites,
  heritageSites,
} from "@/lib/heritage-data";
import { HeritageCard } from "./heritage-card";
import { Reveal, Tilt } from "./motion";
import { AnkhiLattice, ToranEdge } from "./patterns";
import { SectionHeading } from "./section-heading";

export function AboutSection({
  id = "about",
  tone = "blush",
}: {
  id?: string;
  tone?: "blush" | "rose";
}) {
  const { t } = useI18n();

  return (
    <section id={id} className={`sec sec-${tone} !pt-0`}>
      <ToranEdge />

      <div className="shell grid items-center gap-14 pt-20 md:grid-cols-[0.9fr_1.1fr] md:pt-24">
        <Reveal variant="left">
          <div className="animate-float">
            <Tilt className="rounded-[2.2rem]" max={12}>
              <div className="relative overflow-hidden rounded-[2.2rem] bg-maroon p-6 shadow-[var(--shadow-lift)] md:p-9">
                <AnkhiLattice/>

                <div className="panel pop relative p-7 md:p-8">
                  <p
                    data-read
                    className="mt-6 font-display text-2xl font-semibold text-maroon"
                  >
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

export function CollectionSection({
  id = "explore",
}: {
  id?: string;
}) {
  const { t } = useI18n();

  return (
    <section id={id} className="sec sec-rose !pt-0">
      <ToranEdge />

      <div className="shell pt-20 md:pt-24">
        <SectionHeading
          eyebrow={t("explore.eyebrow")}
          title={t("explore.title")}
          copy={t("explore.copy")}
          action={
            <a href="#preserve" className="text-link text-petal">
              {t("explore.action")} <ArrowUpRight size={16} />
            </a>
          }
        />

        <div className="grid gap-8 md:grid-cols-2">
          {documentedSites.map((site, i) => (
            <Reveal key={site.slug} delay={i * 140} variant="zoom">
              <HeritageCard
                site={site}
                index={heritageSites.indexOf(site)}
                featured
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {futureSites.map((site, i) => (
            <Reveal key={site.slug} delay={i * 110}>
              <HeritageCard
                site={site}
                index={heritageSites.indexOf(site)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// YouTube video gallery
const youtubeVideos = [
  {
    title: "Discover the Heritage of Ward 16",
    url: "https://youtube.com/shorts/ANQ7eLEpTL4",
  },
];

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/
  );

  return match?.[1] ?? "";
}

export function PreservationSection() {
  return (
    <section id="preserve" className="sec sec-powder !pt-0">
      <ToranEdge />

      <div className="shell py-20 md:py-24">
        <Reveal>
          <span className="eyebrow">WATCH AND EXPLORE</span>

          <h2 data-read className="display-lg mt-5 max-w-3xl">
            Ward 16 Through the Lens
          </h2>

          <p data-read className="mt-5 max-w-2xl text-lg">
            Discover the stories, culture, traditions and heritage of
            sidhi ganesh and koncha dyo through videos from our community.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 w-full max-w-5xl">
          {youtubeVideos.map((video, index) => {
            const videoId = getYouTubeId(video.url);

            return (
              <Reveal key={video.url} delay={index * 120}>
  <a
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className="panel group mx-auto block w-full overflow-hidden rounded-[1.75rem]"
  >
    <div className="relative aspect-[16/6] w-full overflow-hidden">
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={video.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/40">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-3xl text-red-600 shadow-lg">
          ▶
        </span>
      </div>
    </div>

    <div className="p-6 md:p-8">
      <h3 className="font-display text-2xl font-semibold text-maroon">
        {video.title}
      </h3>

      <p className="mt-2 text-sm opacity-70">
        Watch on YouTube ↗
      </p>
    </div>
  </a>
</Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** A quote set on a glass card over a moving, multi-colour background. */
export function ColorfulQuote({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
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

          {footer ? (
            <figcaption className="mt-8">{footer}</figcaption>
          ) : null}
        </div>
      </figure>
    </Reveal>
  );
}

export function SourcesSection() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t("sources.eyebrow")}
      className="sec sec-dusk !pt-0"
    >
      <ToranEdge />

      <div className="shell pt-20 md:pt-24">
        <Reveal>
          <span className="eyebrow text-petal">
            {t("sources.eyebrow")}
          </span>
        </Reveal>

        <div className="mt-8">
          <ColorfulQuote
            footer={
              <>
                <p data-read className="max-w-3xl text-lg text-ink">
                  {t("sources.body")}
                </p>

                <Link
                  to="/explore">
                
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

/** Opening band for inner pages: soft blush, with a faint carved-window lattice. */
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
    <section className="page-hero sec-blush">
      <AnkhiLattice
      />

      <div
        className={`shell relative grid items-center gap-12 ${
          aside ? "md:grid-cols-[1.2fr_0.8fr]" : ""
        }`}
      >
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
