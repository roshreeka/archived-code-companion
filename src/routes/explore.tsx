import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { CollectionSection, PageHero, PreservationSection, SourcesSection } from "@/components/heritage/sections";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Heritage | Ward 16 Heritage" },
      {
        name: "description",
        content: "Six heritage places of Ward 16: Siddhi Ganesh Temple, Koncha Dyo, 22 Dhara, Sitala Ajima, Mhepi Ajima and Gurunakak.",
      },
      { property: "og:title", content: "Explore the heritage of Ward 16" },
      { property: "og:description", content: "Six places. Many ways to remember. Two documented stories, four more coming." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { t } = useI18n();
  return (
    <main>
      <PageHero kicker={t("explore.pageKicker")} title={t("explore.pageTitle")} lead={t("explore.copy")} />
      <CollectionSection id="collection" />
      <PreservationSection />
      <SourcesSection />
    </main>
  );
}
