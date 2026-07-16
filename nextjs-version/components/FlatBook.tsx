"use client";

/* The accessible edition — used on small screens and for readers who prefer
   reduced motion. Same story, same artwork, laid flat page by page. */

import { motion, useReducedMotion } from "motion/react";
import { CHAPTERS } from "@/lib/chapters";
import { SCENES } from "./scenes";

function StaticScene({ scene: id }: { scene: string }) {
  const scene = SCENES[id];
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 top-[6%] [&>svg]:h-full [&>svg]:w-full">
        {scene.backdrop}
      </div>
      <div className="absolute bottom-[4%] left-[3%] h-[72%] w-[45%] [&>svg]:h-full [&>svg]:w-full">
        {scene.left}
      </div>
      <div className="absolute bottom-[4%] right-[3%] h-[72%] w-[45%] [&>svg]:h-full [&>svg]:w-full">
        {scene.right}
      </div>
      {scene.center && (
        <div className="absolute bottom-[12%] left-1/2 h-[36%] w-[20%] -translate-x-1/2 [&>svg]:h-full [&>svg]:w-full">
          {scene.center}
        </div>
      )}
      {scene.flap && (
        <div className="absolute bottom-[2%] left-1/2 h-[16%] w-[46%] -translate-x-1/2 [&>svg]:h-full [&>svg]:w-full">
          {scene.flap}
        </div>
      )}
    </div>
  );
}

export default function FlatBook() {
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <main className="mx-auto max-w-[640px] px-5 pb-24 pt-28">
      {/* cover */}
      <motion.section
        {...anim}
        className="relative mb-14 overflow-hidden rounded-2xl bg-[#16181d] px-8 py-16 text-center"
      >
        <div className="absolute inset-4 rounded-xl border border-[#c9a227]/50" />
        <div className="foil-text text-[26px]">✳</div>
        <div
          className="mt-4 text-[52px] leading-none text-[#f6f1e7]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 680 }}
        >
          ANRA
        </div>
        <div className="foil-text mt-2 text-[12px] font-semibold uppercase tracking-[0.5em]">
          Collective
        </div>
        <p className="mt-6 text-[15px] text-[#c9bfa8]" style={{ fontFamily: "var(--font-hand)" }}>
          a pop-up portfolio
        </p>
      </motion.section>

      {CHAPTERS.map((c, i) => (
        <motion.section key={c.id} id={`c-${c.id}`} {...anim} className="mb-12 scroll-mt-24">
          <article className="paper overflow-hidden rounded-2xl text-[#2a2620] shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <div style={{ background: c.accentSoft }}>
              <StaticScene scene={c.scene} />
            </div>
            <div className="px-7 py-8">
              <div
                className="text-[12px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: c.accent }}
              >
                {c.kicker}
              </div>
              <h2
                className="mt-2 text-[28px] leading-[1.1]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 640 }}
              >
                {c.title}
              </h2>
              <p
                className="mt-4 text-[15px] italic leading-[1.65] text-[#4a4438]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.tale}
              </p>
              <p className="mt-4 text-[13px] leading-[1.7] text-[#5b5546]">{c.what}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[11px] text-[#5b5546]"
                    style={{ borderColor: `${c.accent}55` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target={c.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-white"
                  style={{ background: c.accent }}
                >
                  {c.urlLabel} <span>↗</span>
                </a>
              )}
            </div>
          </article>
          <div className="mt-3 text-center text-[11px] tracking-[0.3em] text-[#6b6350]">
            {i + 1} / {CHAPTERS.length}
          </div>
        </motion.section>
      ))}

      <motion.section
        {...anim}
        className="relative overflow-hidden rounded-2xl bg-[#16181d] px-8 py-14 text-center"
      >
        <div className="absolute inset-4 rounded-xl border border-[#c9a227]/40" />
        <div
          className="text-[24px] text-[#f6f1e7]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 640 }}
        >
          The End
        </div>
        <p className="mt-3 text-[13px] text-[#c9bfa8]">
          Written, designed & paper-engineered by ANRA Collective.
        </p>
        <a
          href="mailto:anton.ranil@gmail.com"
          className="mt-8 inline-block rounded-full bg-[#c9a227] px-6 py-2.5 text-[13px] font-semibold text-[#16181d]"
        >
          Write to the author
        </a>
      </motion.section>
    </main>
  );
}
