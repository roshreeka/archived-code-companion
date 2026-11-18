import { createFileRoute } from "@tanstack/react-router";
import { heritageSites } from "@/lib/heritage-data";

// Carried over from the original Express backend's GET /api/heritage, now serving the public archive content.
export const Route = createFileRoute("/api/public/heritage")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          {
            data: heritageSites.map((s) => ({
              slug: s.slug,
              name: s.name,
              type: s.type,
              documented: s.documented,
              shortDescription: s.shortDescription,
            })),
          },
          { headers: { "Access-Control-Allow-Origin": "*" } },
        ),
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS" },
        }),
    },
  },
});
