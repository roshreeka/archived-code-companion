import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { heritageSites, type HeritageSite } from "@/lib/heritage-data";
import { DhakaBand, ToranEdge } from "./patterns";

export function SiteFooter() {
  const { t, tr } = useI18n();
  const [siddhi, koncha, dhara] = heritageSites as [HeritageSite, HeritageSite, HeritageSite, ...HeritageSite[]];
  return (
    <footer id="chatbot" className="sec sec-navy !pb-10 !pt-0">
      <ToranEdge />
      <div className="shell grid gap-12 pt-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="eyebrow text-petal">{t("footer.eyebrow")}</p>
          <h2 className="display-lg mt-5 text-cream">{t("footer.title")}</h2>
          <p className="mt-5 max-w-sm text-on-dark-soft">{t("footer.body")}</p>
          <a className="btn-gradient mt-7" href="mailto:heritage@ward16.example">
            {t("footer.share")} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-petal">{t("footer.navigate")}</p>
          <Link to="/" className="text-link w-fit">{t("nav.home")}</Link>
          <Link to="/explore" className="text-link w-fit">{t("nav.explore")}</Link>
          <Link to="/about" className="text-link w-fit">{t("nav.about")}</Link>
          <a href="#chatbot" className="text-link w-fit">{t("footer.questions")}</a>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-petal">{t("footer.stories")}</p>
          <Link to="/heritage/$slug" params={{ slug: siddhi.slug }} className="text-link w-fit">{tr(siddhi.name)}</Link>
          <Link to="/heritage/$slug" params={{ slug: koncha.slug }} className="text-link w-fit">{tr(koncha.name)}</Link>
          <span className="opacity-80">{tr(dhara.name)}</span>
          <span className="opacity-80">{t("footer.ajima")}</span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-petal">{t("footer.noteLabel")}</p>
          <p className="text-on-dark-soft">{t("footer.note")}</p>
          <p className="mt-2 font-semibold text-petal">{t("footer.mark")}</p>
        </div>
      </div>
      <DhakaBand height={20} className="mt-16" />
      <div className="shell mt-6 flex flex-wrap justify-between gap-3 text-sm text-on-dark-soft">
        <span>{t("footer.copy")}</span>
        <span>{t("footer.tagline")}</span>
      </div>
    </footer>
  );
}
