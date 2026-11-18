import { Link } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ListenPageButton } from "./voice-controls";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/explore", key: "nav.explore" },
  { to: "/about", key: "nav.about" },
] as const;

function LanguageToggle() {
  const { t, toggle } = useI18n();
  return (
    <button type="button" className="btn-pill" onClick={toggle} aria-label={t("lang.label")}>
      <Languages size={15} />
      <span>{t("lang.switchTo")}</span>
    </button>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  return (
    <header className="site-header">
      <div className="shell header-pill">
        <Link to="/" className="brand flex items-center gap-3" aria-label={t("brand.home")}>
          <span className="brand-seal" aria-hidden="true">
            16
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-bold text-maroon">{t("brand.name")}</span>
            <span className="text-xs font-semibold text-ink-soft">{t("brand.subtitle")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("nav.primary")}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link" activeOptions={{ exact: true }}>
              {t(item.key)}
            </Link>
          ))}
          <a href="#chatbot" className="nav-link text-crimson">
            {t("nav.ask")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <span className="hidden sm:inline-flex">
            <ListenPageButton />
          </span>
          <span className="sm:hidden">
            <ListenPageButton compact />
          </span>
          <details className="relative lg:hidden">
            <summary className="btn-pill cursor-pointer list-none [&::-webkit-details-marker]:hidden">{t("nav.menu")}</summary>
            <nav className="panel absolute right-0 top-12 flex w-56 flex-col gap-1 p-3" aria-label={t("nav.primary")}>
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="nav-link" activeOptions={{ exact: true }}>
                  {t(item.key)}
                </Link>
              ))}
              <a href="#chatbot" className="nav-link text-crimson">
                {t("nav.ask")}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
