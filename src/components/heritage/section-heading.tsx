import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  action,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  copy?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mb-14 grid gap-8 md:grid-cols-[auto_1fr] md:items-end ${className}`}>
      {index ? (
        <span className="extrude text-7xl md:text-9xl" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 data-read className="display-lg mt-4 max-w-3xl">{title}</h2>
        {copy ? <p data-read className="mt-5 max-w-2xl text-lg opacity-90">{copy}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </Reveal>
  );
}
