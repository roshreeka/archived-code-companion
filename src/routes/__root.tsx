import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider, useI18n } from "../lib/i18n";
import { SpeechProvider } from "../lib/speech";
import { SiteHeader } from "../components/heritage/site-header";
import { SiteFooter } from "../components/heritage/site-footer";
import { VoiceDock } from "../components/heritage/voice-controls";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <main className="sec-marigold flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="extrude text-8xl">404</h1>
        <h2 data-read className="mt-6 text-2xl font-semibold">
          {t("notFound.title")}
        </h2>
        <p data-read className="mt-2">
          {t("notFound.body")}
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-gradient">
            {t("notFound.home")}
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gradient"
          >
            Try again
          </button>
          <a href="/" className="btn-pill">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ward 16 Heritage | A living archive" },
      {
        name: "description",
        content: "A community-minded digital archive for selected cultural heritage locations in Ward 16, Kathmandu.",
      },
      { name: "author", content: "Ward 16 Heritage" },
      { property: "og:title", content: "Ward 16 Heritage" },
      {
        property: "og:description",
        content: "A living digital field guide to places, practices, and memories of Ward 16.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#E8A33A" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Mukta:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SpeechProvider>
          <SiteHeader />
          {/* Required: nested routes render here. */}
          <Outlet />
          <SiteFooter />
          <VoiceDock />
        </SpeechProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
