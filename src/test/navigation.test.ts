import { describe, expect, it } from "vitest";
import { navItems } from "@/components/heritage/site-header";
import { ui } from "@/lib/i18n-strings";
import { heritageSites } from "@/lib/heritage-data";

describe("Main navigation", () => {
  it("has an Explore Heritage link that goes to the six heritage cards, not the map", () => {
    const explore = navItems.find((i) => i.key === "nav.explore");
    expect(explore?.to).toBe("/explore");
    expect(ui["nav.explore"].en).toBe("Explore Heritage");
    expect(heritageSites).toHaveLength(6);
  });

  it("labels the map link Explore Map", () => {
    const map = navItems.find((i) => i.to === "/map");
    expect(map?.key).toBe("nav.map");
    expect(ui["nav.map"].en).toBe("Explore Map");
  });
});
