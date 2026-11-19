import { describe, expect, it } from "vitest";
import { ui } from "@/lib/i18n-strings";
import { heritageSites } from "@/lib/heritage-data";
import { mapSites } from "@/lib/map-sites";

function collectLocalized(value: unknown, path: string, out: { path: string; en: string; ne: string }[]) {
  if (Array.isArray(value)) value.forEach((v, i) => collectLocalized(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const en = obj["en"];
    const ne = obj["ne"];
    if (typeof en === "string" && typeof ne === "string") out.push({ path, en, ne });
    else for (const [k, v] of Object.entries(obj)) collectLocalized(v, `${path}.${k}`, out);
  }
}

describe("Nepali translation", () => {
  it("every interface string has a Nepali version", () => {
    const missing = Object.entries(ui).filter(([, v]) => !v.ne.trim()).map(([k]) => k);
    expect(missing).toEqual([]);
  });

  it("every piece of heritage content with English text also has Nepali text", () => {
    const all: { path: string; en: string; ne: string }[] = [];
    collectLocalized(heritageSites, "sites", all);
    const missing = all.filter((l) => l.en.trim() && !l.ne.trim()).map((l) => l.path);
    expect(missing).toEqual([]);
  });
});

describe("Explore map", () => {
  it("shows all six Ward 16 heritage sites", () => {
    expect(mapSites.map((s) => s.slug).sort()).toEqual(heritageSites.map((s) => s.slug).sort());
    expect(mapSites).toHaveLength(6);
  });
});
