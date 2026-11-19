// Map positions for the Ward 16 heritage sites (browser-safe, shared by the map page and map component).
// All positions are approximate until the community verifies exact locations.

export type MapSite = {
  slug: string;
  lat: number;
  lng: number;
  approximate: boolean;
};

export const WARD16_CENTER: [number, number] = [27.7318, 85.3048];
export const WARD16_ZOOM = 16;

export const mapSites: MapSite[] = [
  { slug: "siddhi-ganesh", lat: 27.7302, lng: 85.3051, approximate: true },
  { slug: "koncha-dyo", lat: 27.7294, lng: 85.3068, approximate: true },
  { slug: "22-dhara", lat: 27.7356, lng: 85.3042, approximate: true },
  { slug: "sitala-ajima", lat: 27.7349, lng: 85.3031, approximate: true },
  { slug: "mhepi-ajima", lat: 27.7262, lng: 85.3076, approximate: true },
  { slug: "gurunakak", lat: 27.7321, lng: 85.3016, approximate: true },
];
