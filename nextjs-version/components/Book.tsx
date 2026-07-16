"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  CHAPTERS,
  LEAVES,
  FLIP_LEN,
  DWELL_LEN,
  END_LEN,
  TOTAL_UNITS,
  flipStart,
  type Chapter,
} from "@/lib/chapters";
import PopUp from "./PopUp";
import FlatBook from "./FlatBook";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const paper = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const win = (t: number, a: number, b: number) => paper((t - a) / (b - a));

const BOOK_W = 1150; // full open spread
const BOOK_H = 700;
const UNIT_VH = 55; // scroll length per timeline unit

const flipEnd = (i: number) => flipStart(i) + FLIP_LEN;
const END_START = flipEnd(LEAVES - 1) + DWELL_LEN * 0.7;

/* scroll offset (0..1 of the container) for the reading position of chapter i */
export const chapterOffset = (i: number) =>
  (flipEnd(i) + DWELL_LEN * 0.3) / TOTAL_UNITS;

/* ————————————————————————— left page: the story ————————————————————————— */

function Reveal({
  r,
  from,
  to,
  children,
  className,
}: {
  r: MotionValue<number>;
  from: number;
  to: number;
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useTransform(r, (v) => win(v, from, to));
  const y = useTransform(r, (v) => 16 * (1 - win(v, from, to)));
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function StoryPage({
  chapter,
  r,
  pageNo,
}: {
  chapter: Chapter;
  r: MotionValue<number>;
  pageNo: number;
}) {
  return (
    <div className="paper gutter-right relative flex h-full flex-col justify-center px-[9%] py-[8%] text-[#2a2620]">
      <Reveal r={r} from={0} to={0.25}>
        <div
          className="text-[13px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: chapter.accent }}
        >
          {chapter.kicker}
        </div>
      </Reveal>

      <Reveal r={r} from={0.08} to={0.35} className="mt-4">
        <h2
          className="text-[clamp(26px,2.6vw,40px)] leading-[1.06] text-[#211d17]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 640 }}
        >
          {chapter.title}
        </h2>
      </Reveal>

      <Reveal r={r} from={0.2} to={0.5} className="mt-5">
        <p
          className="text-[15.5px] italic leading-[1.65] text-[#4a4438]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {chapter.tale}
        </p>
      </Reveal>

      <Reveal r={r} from={0.35} to={0.6} className="my-5">
        <div className="h-px w-16" style={{ background: chapter.accent }} />
      </Reveal>

      <Reveal r={r} from={0.42} to={0.7}>
        <p className="text-[13px] leading-[1.7] text-[#5b5546]">{chapter.what}</p>
      </Reveal>

      <Reveal r={r} from={0.55} to={0.85} className="mt-5 flex flex-wrap gap-2">
        {chapter.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1 text-[11px] tracking-wide text-[#5b5546]"
            style={{ borderColor: `${chapter.accent}55` }}
          >
            {tag}
          </span>
        ))}
      </Reveal>

      {chapter.url && (
        <Reveal r={r} from={0.68} to={1} className="mt-7">
          <a
            href={chapter.url}
            target={chapter.url.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: chapter.accent,
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {chapter.urlLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
        </Reveal>
      )}

      <div
        className="absolute bottom-[4%] left-[9%] text-[11px] tracking-[0.2em] text-[#9a917d]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {pageNo}
      </div>
    </div>
  );
}

/* ——————————————————————— right page: the stage ground ——————————————————————— */

function SceneGround({ chapter, pageNo }: { chapter: Chapter; pageNo: number }) {
  return (
    <div
      className="paper gutter-left relative h-full w-full"
      style={{ background: chapter.accentSoft }}
    >
      {/* printed horizon so flattened art has somewhere to live */}
      <div
        className="absolute inset-x-[8%] bottom-[12%] h-px opacity-40"
        style={{ background: chapter.accent }}
      />
      <div
        className="absolute right-[8%] top-[6%] rounded-sm border px-2.5 py-1 text-[10.5px] tracking-[0.14em]"
        style={{
          borderColor: `${chapter.accent}66`,
          color: chapter.accent,
          fontFamily: "var(--font-hand)",
          transform: "rotate(1.6deg)",
        }}
      >
        fig. {pageNo} — {chapter.urlLabel ?? "unpublished"}
      </div>
      <div
        className="absolute bottom-[4%] right-[9%] text-[11px] tracking-[0.2em] text-[#9a917d]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {pageNo}
      </div>
    </div>
  );
}

/* ————————————————————————— the cover ————————————————————————— */

function CoverFace() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-r-[14px] rounded-l-[4px] bg-[#16181d]">
      {/* leather grain */}
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(120%_100%_at_30%_0%,#252831,transparent_55%),radial-gradient(120%_120%_at_80%_110%,#0d0e12,transparent_50%)]" />
      {/* foil frames */}
      <div className="absolute inset-[26px] rounded-[10px] border border-[#c9a227]/70" />
      <div className="absolute inset-[34px] rounded-[8px] border border-[#c9a227]/30" />

      <div className="relative flex flex-col items-center text-center">
        <div className="foil-text mb-7 text-[34px] leading-none">✳</div>
        <div
          className="text-[64px] leading-[0.95] text-[#f6f1e7]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 680 }}
        >
          ANRA
        </div>
        <div className="foil-text mt-3 text-[15px] font-semibold uppercase tracking-[0.55em]">
          Collective
        </div>
        <div className="foil-line mt-8 h-px w-40" />
        <div
          className="mt-6 text-[15px] text-[#c9bfa8]"
          style={{ fontFamily: "var(--font-hand)" }}
        >
          a pop-up portfolio
        </div>
      </div>

      <div className="absolute bottom-9 flex flex-col items-center gap-1.5 text-[#8d8468]">
        <span className="text-[10.5px] uppercase tracking-[0.3em]">scroll to open</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[13px]"
        >
          ⌄
        </motion.span>
      </div>
    </div>
  );
}

function FinFace() {
  return (
    <div className="paper gutter-right relative flex h-full flex-col items-center justify-center px-[10%] text-center text-[#2a2620]">
      <div
        className="text-[42px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 640 }}
      >
        The End
      </div>
      <div className="foil-line mt-6 h-px w-24" />
      <p className="mt-6 max-w-[75%] text-[12.5px] leading-[1.8] text-[#5b5546]">
        Written, designed & paper-engineered by ANRA Collective.
        <br />
        Set in Fraunces & Inter. Built with Figma, Claude and Next.js.
        <br />
        MMXXVI — Singapore & Kuala Lumpur.
      </p>
      <div className="mt-8 text-[13px] text-[#9a917d]" style={{ fontFamily: "var(--font-hand)" }}>
        (keep scrolling to close the book)
      </div>
    </div>
  );
}

function Endpaper() {
  return (
    <div className="relative h-full w-full bg-[#ede5d4]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(#c9a227 1.1px, transparent 1.1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </div>
  );
}

/* story page + pop-up wrappers so each owns its hooks */

function StoryLeafBack({ i, t }: { i: number; t: MotionValue<number> }) {
  const r = useTransform(t, (v) => clamp01((v - flipEnd(i)) / DWELL_LEN));
  return <StoryPage chapter={CHAPTERS[i]} pageNo={i * 2 + 1} r={r} />;
}

function SpreadPopUp({ i, t, scene }: { i: number; t: MotionValue<number>; scene: string }) {
  const openness = useTransform(t, (v) => {
    const rise = win(v, flipEnd(i), flipEnd(i) + DWELL_LEN * 0.55);
    const collapse = 1 - win(clamp01(v - flipStart(i + 1)), 0, 0.42);
    return rise * collapse;
  });
  return (
    <div className="preserve-3d absolute inset-0" style={{ zIndex: 300 }}>
      <PopUp scene={scene} openness={openness} />
    </div>
  );
}

/* ————————————————————————— a leaf ————————————————————————— */

function Leaf({
  i,
  t,
  front,
  back,
}: {
  i: number;
  t: MotionValue<number>;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const flipped = useTransform(t, (v) => clamp01(v - flipStart(i)));
  const rotateY = useTransform(flipped, (f) => -180 * f);
  const zIndex = useTransform(flipped, (f) =>
    f <= 0.001 ? LEAVES + 2 - i : f >= 0.999 ? i + 1 : 400
  );
  /* soft shading while the page is mid-turn */
  const shade = useTransform(flipped, (f) => 0.38 * Math.sin(Math.PI * f));

  return (
    <motion.div
      className="preserve-3d absolute left-1/2 top-0 h-full w-1/2 origin-left"
      style={{ rotateY, zIndex }}
    >
      {/* front face */}
      <div className="backface-hidden absolute inset-0 overflow-hidden rounded-r-[10px] shadow-[2px_0_6px_rgba(0,0,0,0.12)]">
        {front}
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      </div>
      {/* back face */}
      <div
        className="backface-hidden absolute inset-0 overflow-hidden rounded-l-[10px]"
        style={{ transform: "rotateY(180deg)" }}
      >
        {back}
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      </div>
    </motion.div>
  );
}

/* ————————————————————————— the book ————————————————————————— */

export default function Book() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"unknown" | "book" | "flat">("unknown");
  const [scale, setScale] = useState(0.8);
  const [activeChapter, setActiveChapter] = useState(-1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 899px)");
    const decide = () => setMode(reduced.matches || small.matches ? "flat" : "book");
    decide();
    reduced.addEventListener("change", decide);
    small.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
      small.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    const onResize = () =>
      setScale(
        Math.min((window.innerWidth - 48) / BOOK_W, (window.innerHeight - 150) / BOOK_H, 1.05)
      );
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const t = useTransform(scrollYProgress, (v) => v * TOTAL_UNITS);

  /* which chapter is the reader on (for the ribbon + nav dots) */
  useMotionValueEvent(t, "change", (v) => {
    let idx = -1;
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (v >= flipStart(i) + FLIP_LEN * 0.5) idx = i;
    }
    if (v < flipStart(0) + FLIP_LEN * 0.5) idx = -1;
    setActiveChapter(idx);
  });

  /* whole-book motion: settle the tilt as it opens, close-out at the end */
  const opening = useTransform(t, (v) => win(v, flipStart(0), flipEnd(0)));
  const endP = useTransform(t, (v) => clamp01((v - END_START) / END_LEN));

  const bookRotateX = useTransform(opening, (o) => 16 - 6 * o);
  const bookRotateZ = useTransform(opening, (o) => -2.5 * (1 - o));
  const bookX = useTransform(opening, (o) => -(BOOK_W / 4) * (1 - o));
  const bookScaleMV = useTransform(endP, (e) => scale * (1 - 0.4 * paper(e)));
  const bookOpacity = useTransform(endP, (e) => 1 - win(e, 0.55, 1));
  const bookY = useTransform(endP, (e) => 40 * paper(e));

  const endCardOpacity = useTransform(endP, (e) => win(e, 0.55, 1));
  const endCardEvents = useTransform(endP, (e) => (e > 0.7 ? "auto" : "none")) as MotionValue<
    "auto" | "none"
  >;

  const scrollToUnits = useCallback((units: number, smooth = true) => {
    const el = containerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + (units / TOTAL_UNITS) * total,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  /* keyboard paging */
  useEffect(() => {
    if (mode !== "book") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const cur = activeChapter;
      const next =
        e.key === "ArrowRight"
          ? Math.min(cur + 1, CHAPTERS.length - 1)
          : Math.max(cur - 1, 0);
      scrollToUnits(flipEnd(next) + DWELL_LEN * 0.3);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, activeChapter, scrollToUnits]);

  if (mode === "flat") return <FlatBook />;

  return (
    <div
      ref={containerRef}
      style={{ height: `${Math.round(TOTAL_UNITS * UNIT_VH)}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* stage vignette */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(90%_70%_at_50%_38%,rgba(201,162,39,0.07),transparent_60%),radial-gradient(120%_100%_at_50%_100%,rgba(0,0,0,0.55),transparent_55%)]" />

        <motion.div
          className="preserve-3d relative"
          style={{
            width: BOOK_W,
            height: BOOK_H,
            perspective: 2200,
            scale: bookScaleMV,
            opacity: bookOpacity,
            y: bookY,
            x: bookX,
          }}
        >
          <motion.div
            className="preserve-3d relative h-full w-full"
            style={{ rotateX: bookRotateX, rotateZ: bookRotateZ }}
          >
            {/* back board — hides behind the cover while the book is closed,
                extends under the left stack as it opens */}
            <motion.div
              className="absolute -inset-y-3 -right-3 rounded-[16px] bg-[#101216] shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
              style={{
                left: useTransform(opening, (o) => `calc(${50 * (1 - o)}% - ${12 * o}px)`),
              }}
            />
            <div className="page-block absolute inset-y-1 left-1/2 right-0 rounded-r-[8px]" />
            {/* inside back board (visible on the fin spread) */}
            <div className="absolute inset-y-0 left-1/2 right-0 overflow-hidden rounded-r-[10px]">
              <Endpaper />
            </div>
            {/* spine ridge */}
            <div className="absolute inset-y-0 left-1/2 z-[500] w-[3px] -translate-x-1/2 bg-gradient-to-b from-black/0 via-black/25 to-black/0" />

            {/* leaves */}
            {Array.from({ length: LEAVES }, (_, i) => (
              <Leaf
                key={i}
                i={i}
                t={t}
                front={
                  i === 0 ? (
                    <CoverFace />
                  ) : (
                    <SceneGround chapter={CHAPTERS[i - 1]} pageNo={i * 2} />
                  )
                }
                back={i === LEAVES - 1 ? <FinFace /> : <StoryLeafBack i={i} t={t} />}
              />
            ))}

            {/* pop-ups — one per spread, mechanically tied to its pages */}
            {CHAPTERS.map((chapter, i) => (
              <SpreadPopUp key={chapter.id} i={i} t={t} scene={chapter.scene} />
            ))}
          </motion.div>
        </motion.div>

        {/* closing card */}
        <motion.div
          className="absolute inset-0 z-[600] flex items-center justify-center"
          style={{ opacity: endCardOpacity, pointerEvents: endCardEvents }}
        >
          <div className="relative flex h-[420px] w-[300px] flex-col items-center justify-center rounded-[14px] bg-[#16181d] text-center shadow-[0_50px_100px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-[18px] rounded-[9px] border border-[#c9a227]/50" />
            <div className="foil-text text-[26px]">✳</div>
            <div
              className="mt-4 text-[26px] text-[#f6f1e7]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 660 }}
            >
              ANRA
            </div>
            <div className="foil-text mt-1 text-[10px] font-semibold uppercase tracking-[0.4em]">
              Collective
            </div>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="mailto:anton.ranil@gmail.com"
                className="rounded-full bg-[#c9a227] px-6 py-2.5 text-[13px] font-semibold text-[#16181d] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Write to the author
              </a>
              <button
                onClick={() => scrollToUnits(0)}
                className="rounded-full border border-[#c9a227]/50 px-6 py-2.5 text-[13px] text-[#e8c96a] transition-colors duration-300 hover:bg-[#c9a227]/10"
              >
                Read it again
              </button>
            </div>
          </div>
        </motion.div>

        {/* chapter ribbon */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-[610] -translate-x-1/2">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: activeChapter >= 0 ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full bg-black/40 px-5 py-2 text-[11.5px] tracking-[0.12em] text-[#d8cfb8] backdrop-blur-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {activeChapter >= 0 && activeChapter < CHAPTERS.length ? (
              <>
                <span className="text-[#c9a227]">{CHAPTERS[activeChapter].kicker}</span>
                <span className="mx-2 opacity-40">·</span>
                {CHAPTERS[activeChapter].title}
              </>
            ) : (
              " "
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
