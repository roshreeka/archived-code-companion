
import { useId } from "react";

function useSafeId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

/**
 * Traditional-inspired red fabric toran border.
 * Repeating hanging cloth panels with golden detailing.
 */

export function ToranEdge({
  className = "",
  height = 65,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={`toran-border w-full overflow-hidden ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <img
        src="/images/toran.png"
        alt=""
        className="toran-fabric-image"
      />
    </div>
  );
}

/**
 * Keep existing component imports working.
 * All decorative borders now use the same red toran.
 */
export function DhakaBand({
  className = "",
  height = 48,
}: {
  className?: string;
  height?: number;
}) {
  return <ToranEdge className={className} height={height} />;
}

export function AnkhiLattice({
  className = "",
}: {
  className?: string;
  cell?: number;
}) {
  return <ToranEdge className={className} />;
}

export function LatticeDivider({
  className = "",
}: {
  className?: string;
}) {
  return <ToranEdge className={className} />;
}
