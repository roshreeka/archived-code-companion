import { createFileRoute } from "@tanstack/react-router";

// Carried over from the original Express backend's GET /api/health.
export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () => Response.json({ status: "ok", service: "ward16-heritage-api" }),
    },
  },
});
