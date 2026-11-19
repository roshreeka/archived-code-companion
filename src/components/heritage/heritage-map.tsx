// Browser-only: imports Leaflet. Load with React.lazy behind <ClientOnly>, never statically from a route.
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { WARD16_CENTER, WARD16_ZOOM, type MapSite } from "@/lib/map-sites";

type Props = {
  sites: (MapSite & { number: number; label: string })[];
  selected: string | null;
  onSelect: (slug: string) => void;
  mapLabel: string;
};

function pinIcon(number: number, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<span class="map-pin${active ? " is-active" : ""}">${number}</span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export default function HeritageMap({ sites, selected, onSelect, mapLabel }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const fittedRef = useRef(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, { scrollWheelZoom: false }).setView(WARD16_CENTER, WARD16_ZOOM);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // (Re)build markers when the sites or their labels change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    for (const s of sites) {
      const marker = L.marker([s.lat, s.lng], {
        icon: pinIcon(s.number, s.slug === selected),
        title: s.label,
        alt: s.label,
        keyboard: true,
      })
        .on("click", () => onSelectRef.current(s.slug))
        .addTo(map);
      markersRef.current.set(s.slug, marker);
    }
    if (sites.length > 0 && !fittedRef.current) {
      map.fitBounds(L.latLngBounds(sites.map((s) => [s.lat, s.lng] as [number, number])), { padding: [48, 48], maxZoom: 17 });
      fittedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sites]);

  // Highlight and pan to the selected site.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const s of sites) {
      markersRef.current.get(s.slug)?.setIcon(pinIcon(s.number, s.slug === selected));
    }
    const site = sites.find((s) => s.slug === selected);
    if (site) map.panTo([site.lat, site.lng], { animate: true });
  }, [selected, sites]);

  return <div ref={elRef} className="heritage-map" role="region" aria-label={mapLabel} />;
}
