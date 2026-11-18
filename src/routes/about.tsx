import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AboutSection, PageHero, PreservationSection, SourcesSection } from "@/components/heritage/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ward 16 | Ward 16 Heritage" },
      {
        name: "description",
        content: "Why Ward 16 Heritage exists: documenting temples, shrines and practices with community care and honest source notes.",
      },
      { property: "og:title", content: "About Ward 16 Heritage" },
      { property: "og:description", content: "A heritage archive that knows the difference between memory and record." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <main>
      <PageHero kicker={t("aboutPage.kicker")} title={t("aboutPage.title")} lead={t("hero.lead")} />
      <AboutSection id="ward" tone="sindoor" />
      <PreservationSection />
      <SourcesSection />
    </main>
  );
}
