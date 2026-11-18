import { useId } from "react";

function useSafeId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

/** Toran-style hanging edge (rope, scallops, drops and bells), drawn in SVG. */
export function ToranEdge({ className = "" }: { className?: string }) {
  const id = useSafeId("toran");
  return (
    <svg className={`block w-full ${className}`} height="38" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="48" height="38" patternUnits="userSpaceOnUse">
          <rect className="toran-rope" width="48" height="6" />
          <path className="toran-line" d="M0 6 L6 0 M8 6 L14 0 M16 6 L22 0 M24 6 L30 0 M32 6 L38 0 M40 6 L46 0" />
          <path className="toran-a" d="M0 6 C3 26 21 26 24 6 Z" />
          <path className="toran-b" d="M24 6 C27 26 45 26 48 6 Z" />
          <path className="toran-drop" d="M12 22 L16 29 L12 37 L8 29 Z" />
          <rect className="toran-bell" x="35.2" y="20" width="1.6" height="6" />
          <circle className="toran-bell" cx="36" cy="29.5" r="4" />
        </pattern>
      </defs>
      <rect width="100%" height="38" fill={`url(#${id})`} />
    </svg>
  );
}

/** Dhaka cloth band: nested diamonds with corner triangles and gold stripes. */
export function DhakaBand({ className = "", height = 40 }: { className?: string; height?: number }) {
  const id = useSafeId("dhaka");
  const s = height / 40;
  return (
    <svg className={`block w-full ${className}`} height={height} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={40 * s} height={40 * s} patternUnits="userSpaceOnUse" patternTransform={`scale(${s})`}>
          <rect className="dhaka-bg" width="40" height="40" />
          <rect className="dhaka-stripe" width="40" height="2.5" />
          <rect className="dhaka-stripe" y="37.5" width="40" height="2.5" />
          <path className="dhaka-1" d="M20 4 L36 20 L20 36 L4 20 Z" />
          <path className="dhaka-2" d="M20 10 L30 20 L20 30 L10 20 Z" />
          <path className="dhaka-3" d="M20 15 L25 20 L20 25 L15 20 Z" />
          <path className="dhaka-4" d="M0 4 L8 4 L0 12 Z M40 4 L32 4 L40 12 Z" />
          <path className="dhaka-5" d="M0 36 L8 36 L0 28 Z M40 36 L32 36 L40 28 Z" />
          <path className="dhaka-3" d="M0 18 L2 20 L0 22 Z M40 18 L38 20 L40 22 Z" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Carved Newari window (Ankhi jhyal) lattice. Holes are transparent so the section colour shows through. */
export function AnkhiLattice({ className = "", cell = 28 }: { className?: string; cell?: number }) {
  const id = useSafeId("ankhi");
  const s = cell / 28;
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={cell} height={cell} patternUnits="userSpaceOnUse" patternTransform={`scale(${s})`}>
          <path className="ankhi-bar-shadow" d="M0 0 L28 28 M28 0 L0 28" transform="translate(1.5 1.5)" />
          <path className="ankhi-bar" d="M0 0 L28 28 M28 0 L0 28" />
          <path className="ankhi-bar-light" d="M0 -1.5 L29.5 28 M28 -1.5 L-1.5 28" />
          <circle className="ankhi-rosette" cx="14" cy="14" r="4.2" />
          <circle className="ankhi-rosette" cx="0" cy="0" r="4.2" />
          <circle className="ankhi-rosette" cx="28" cy="0" r="4.2" />
          <circle className="ankhi-rosette" cx="0" cy="28" r="4.2" />
          <circle className="ankhi-rosette" cx="28" cy="28" r="4.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A full-width divider made from a lattice strip between two thin Dhaka bands. */
export function LatticeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <DhakaBand height={16} />
      <div className="relative h-14 bg-maroon">
        <AnkhiLattice cell={28} />
      </div>
      <DhakaBand height={16} />
    </div>
  );
}
