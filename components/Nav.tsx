"use client";

import { useEffect, useState } from "react";
import { CHAPTERS, TOTAL_UNITS, FLIP_LEN, DWELL_LEN, flipStart } from "@/lib/chapters";

const flipEnd = (i: number) => flipStart(i) + FLIP_LEN;

function jumpTo(i: number) {
  const anchor = document.getElementById(`c-${CHAPTERS[i].id}`);
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const units = flipEnd(i) + DWELL_LEN * 0.3;
  window.scrollTo({ top: (units / TOTAL_UNITS) * total, behavior: "smooth" });
}

export default function Nav() {
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const t = (window.scrollY / total) * TOTAL_UNITS;
      let idx = -1;
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (t >= flipEnd(i) - FLIP_LEN * 0.5) idx = i;
      }
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[700] transition-colors duration-500 ${
        scrolled ? "bg-[#16181d]/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-baseline gap-2"
          aria-label="Back to the cover"
        >
          <span
            className="text-[19px] text-[#f6f1e7]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 660 }}
          >
            ANRA
          </span>
          <span className="foil-text text-[9px] font-bold uppercase tracking-[0.34em]">
            Collective
          </span>
        </button>

        {/* chapter dots */}
        <div className="hidden items-center gap-2.5 md:flex" role="navigation" aria-label="Chapters">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => jumpTo(i)}
              aria-label={`${c.kicker}: ${c.title}`}
              title={`${c.kicker} — ${c.title}`}
              className="group relative flex h-6 w-4 items-center justify-center"
            >
              <span
                className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i <= active ? c.accent : "rgba(246,241,231,0.25)",
                  transform: i === active ? "scale(1.8)" : "scale(1)",
                }}
              />
            </button>
          ))}
        </div>

        <a
          href="mailto:anton.ranil@gmail.com"
          className="rounded-full border border-[#c9a227]/60 px-4 py-1.5 text-[12px] font-medium text-[#e8c96a] transition-all duration-300 hover:-translate-y-px hover:bg-[#c9a227] hover:text-[#16181d]"
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
