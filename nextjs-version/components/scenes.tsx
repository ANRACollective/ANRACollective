/* Paper-cut pop-up artwork for each chapter.
   Each scene = backdrop platform + left/right v-fold wings (hinged at the
   gutter) + optional standing centerpiece + a bottom-hinged front flap.
   Flat fills only — everything should read as cut card stock. */

import type { ReactNode } from "react";

export type Scene = {
  backdrop: ReactNode; // wide card, deepest layer
  left: ReactNode; // v-fold left wing (hinge = right edge)
  right: ReactNode; // v-fold right wing (hinge = left edge)
  center?: ReactNode; // small standing piece across the fold
  flap?: ReactNode; // bottom-hinged foreground flap
};

const INK = "#2a2620";
const CREAM = "#fbf8f1";

/* ————————————————— PROLOGUE — a shelf of little worlds ————————————————— */
const prologue: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <circle cx="280" cy="120" r="86" fill="#f3dfae" />
      <circle cx="280" cy="120" r="60" fill="#eccf8b" />
      {[...Array(12)].map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <rect
            key={i}
            x="277"
            y="8"
            width="6"
            height="26"
            rx="3"
            fill="#c9a227"
            transform={`rotate(${(a * 180) / Math.PI} 280 120)`}
          />
        );
      })}
      <path d="M0 240 Q140 200 280 240 T560 240 V300 H0 Z" fill="#e8dcc0" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* stack of books */}
      <rect x="60" y="196" width="200" height="30" rx="6" fill="#773dbd" />
      <rect x="80" y="164" width="180" height="30" rx="6" fill="#2456e6" />
      <rect x="96" y="132" width="164" height="30" rx="6" fill="#0e7a5f" />
      <rect x="116" y="100" width="144" height="30" rx="6" fill="#ff2e00" />
      {[
        [70, 211, "#5f2f99"],
        [90, 179, "#1a3fae"],
        [106, 147, "#0a5c47"],
        [126, 115, "#c42300"],
      ].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="14" height="8" rx="2" fill={c as string} />
      ))}
      <rect x="140" y="70" width="120" height="26" rx="6" fill="#d63384" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* open book with pages flying */}
      <path d="M40 200 Q140 160 240 200 L240 250 Q140 214 40 250 Z" fill={CREAM} stroke={INK} strokeWidth="3" />
      <path d="M140 172 L140 232" stroke={INK} strokeWidth="3" />
      <path d="M80 120 q18 -18 36 0 q-18 6 -36 0" fill="#c9a227" />
      <path d="M150 84 q18 -18 36 0 q-18 6 -36 0" fill="#e8c96a" />
      <path d="M210 130 q14 -14 28 0 q-14 5 -28 0" fill="#c9a227" />
    </svg>
  ),
  center: (
    <svg viewBox="0 0 160 160" aria-hidden>
      <circle cx="80" cy="80" r="56" fill={INK} />
      <text x="80" y="97" textAnchor="middle" fontFamily="Georgia, serif" fontSize="52" fill="#e8c96a">
        A
      </text>
    </svg>
  ),
};

/* ————————————————— BRIAM — the steel garden ————————————————— */
const briam: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <rect x="0" y="0" width="560" height="300" fill="none" />
      <circle cx="430" cy="70" r="44" fill="#e8c96a" />
      <path d="M0 250 L110 190 L220 250 L330 200 L440 250 L560 210 V300 H0 Z" fill="#cbb8e8" />
      <path d="M0 272 H560 V300 H0 Z" fill="#a98bd6" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* three silos */}
      {[
        [60, 110, 58],
        [130, 90, 66],
        [206, 118, 54],
      ].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={260 - (y as number)} rx="8" fill="#e9e4ef" stroke={INK} strokeWidth="3" />
          <path
            d={`M${x} ${y} Q${(x as number) + (w as number) / 2} ${(y as number) - 34} ${(x as number) + (w as number)} ${y}`}
            fill="#773dbd"
            stroke={INK}
            strokeWidth="3"
          />
          <line x1={(x as number) + 10} y1={(y as number) + 22} x2={(x as number) + (w as number) - 10} y2={(y as number) + 22} stroke="#b9a8d8" strokeWidth="4" />
          <line x1={(x as number) + 10} y1={(y as number) + 46} x2={(x as number) + (w as number) - 10} y2={(y as number) + 46} stroke="#b9a8d8" strokeWidth="4" />
        </g>
      ))}
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* steel truss tower + crane */}
      <g stroke="#773dbd" strokeWidth="6" strokeLinecap="round">
        <line x1="80" y1="260" x2="80" y2="60" />
        <line x1="150" y1="260" x2="150" y2="60" />
        <line x1="80" y1="240" x2="150" y2="200" />
        <line x1="150" y1="240" x2="80" y2="200" />
        <line x1="80" y1="180" x2="150" y2="140" />
        <line x1="150" y1="180" x2="80" y2="140" />
        <line x1="80" y1="120" x2="150" y2="80" />
        <line x1="150" y1="120" x2="80" y2="80" />
        <line x1="80" y1="60" x2="230" y2="60" />
        <line x1="230" y1="60" x2="230" y2="110" />
      </g>
      <rect x="214" y="110" width="32" height="26" rx="4" fill="#e8c96a" stroke={INK} strokeWidth="3" />
      <rect x="60" y="252" width="110" height="12" rx="5" fill={INK} />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="10" fill="#773dbd" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fill={CREAM} fontStyle="italic">
        BRIAM Asia
      </text>
    </svg>
  ),
};

/* ————————————————— SILBLOXX — the factory that hired ————————————————— */
const silbloxx: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <circle cx="120" cy="80" r="40" fill="#ffdc00" />
      <path d="M0 260 H560 V300 H0 Z" fill="#f5c9bb" />
      {/* smoke puffs */}
      <circle cx="380" cy="70" r="18" fill="#f0e9dc" />
      <circle cx="408" cy="52" r="13" fill="#f0e9dc" />
      <circle cx="430" cy="40" r="9" fill="#f0e9dc" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* sawtooth factory */}
      <path d="M30 260 V150 L90 110 V150 L150 110 V150 L210 110 V260 Z" fill="#ff2e00" stroke={INK} strokeWidth="3" />
      <rect x="52" y="190" width="34" height="34" rx="4" fill="#ffdc00" />
      <rect x="104" y="190" width="34" height="34" rx="4" fill="#ffdc00" />
      <rect x="156" y="190" width="34" height="34" rx="4" fill="#ffdc00" />
      <rect x="222" y="70" width="22" height="190" fill="#c42300" stroke={INK} strokeWidth="3" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* robot arm */}
      <rect x="40" y="236" width="130" height="26" rx="8" fill={INK} />
      <g stroke={INK} strokeWidth="14" strokeLinecap="round">
        <line x1="90" y1="236" x2="130" y2="150" />
        <line x1="130" y1="150" x2="200" y2="110" />
      </g>
      <circle cx="90" cy="236" r="14" fill="#ffdc00" stroke={INK} strokeWidth="4" />
      <circle cx="130" cy="150" r="12" fill="#ffdc00" stroke={INK} strokeWidth="4" />
      <path d="M200 110 l30 -18 M200 110 l34 6" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <circle cx="246" cy="86" r="10" fill="#ff2e00" />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="27" fill="#ffdc00" />
      <text x="120" y="44" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="22" fill="#000">
        NOW HIRING
      </text>
    </svg>
  ),
};

/* ————————————————— MYSCHOLAR — the door nobody knew about ————————————————— */
const myscholar: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      {[...Array(14)].map((_, i) => (
        <circle key={i} cx={(i * 97) % 560} cy={(i * 53) % 170 + 14} r={i % 3 === 0 ? 4 : 2.5} fill="#9db6f5" />
      ))}
      <path d="M0 252 Q280 210 560 252 V300 H0 Z" fill="#c9d6f8" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* open door with light */}
      <rect x="70" y="60" width="150" height="200" rx="8" fill="#1a3fae" stroke={INK} strokeWidth="3" />
      <path d="M92 84 h106 v176 h-106 z" fill="#fdf6e0" />
      <path d="M92 84 L40 110 V286 L92 260 Z" fill="#2456e6" stroke={INK} strokeWidth="3" />
      <circle cx="80" cy="180" r="6" fill="#e8c96a" />
      <path d="M145 120 l8 20 20 2 -15 14 5 21 -18 -11 -18 11 5 -21 -15 -14 20 -2 z" fill="#e8c96a" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* graduation cap */}
      <path d="M150 90 L260 140 L150 190 L40 140 Z" fill={INK} />
      <path d="M96 166 v46 q54 30 108 0 v-46" fill="none" stroke={INK} strokeWidth="16" />
      <line x1="150" y1="140" x2="238" y2="176" stroke="#e8c96a" strokeWidth="5" />
      <circle cx="238" cy="182" r="9" fill="#e8c96a" />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="10" fill="#2456e6" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill={CREAM} fontStyle="italic">
        myscholar.my
      </text>
    </svg>
  ),
};

/* ————————————————— LEARNFPA — twelve weeks up ————————————————— */
const learnfpa: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <path d="M60 240 H500" stroke="#bcded2" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 240 V60" stroke="#bcded2" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 262 H560 V300 H0 Z" fill="#cfe8de" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* rising bars */}
      {[
        [60, 190, 60, "#7cc4ab"],
        [120, 150, 100, "#3fa286"],
        [180, 100, 150, "#0e7a5f"],
      ].map(([x, y, h, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="46" height={h as number} rx="8" fill={c as string} stroke={INK} strokeWidth="3" />
      ))}
      <path d="M70 170 L140 128 L204 76" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M204 76 l-4 22 M204 76 l-22 -2" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* calendar “12 weeks” */}
      <rect x="60" y="70" width="180" height="170" rx="14" fill={CREAM} stroke={INK} strokeWidth="4" />
      <rect x="60" y="70" width="180" height="44" rx="14" fill="#0e7a5f" />
      <circle cx="100" cy="70" r="8" fill={INK} />
      <circle cx="200" cy="70" r="8" fill={INK} />
      <text x="150" y="180" textAnchor="middle" fontFamily="Georgia,serif" fontSize="56" fill="#0e7a5f" fontWeight="700">
        12
      </text>
      <text x="150" y="216" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="18" fill={INK}>
        WEEKS
      </text>
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="10" fill="#0e7a5f" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill={CREAM} fontStyle="italic">
        LearnFP&amp;A
      </text>
    </svg>
  ),
};

/* ————————————————— TRASHTALKS — the family ————————————————— */
const trashtalks: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <path d="M0 250 Q140 214 280 250 T560 250 V300 H0 Z" fill="#bfe3d6" />
      <circle cx="460" cy="66" r="38" fill="#d9efe6" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* bubble-tea cup character */}
      <path d="M90 100 L210 100 L192 260 L108 260 Z" fill="#8fd8c0" stroke={INK} strokeWidth="4" />
      <line x1="150" y1="40" x2="162" y2="120" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      {[...Array(6)].map((_, i) => (
        <circle key={i} cx={116 + (i % 3) * 34} cy={228 - Math.floor(i / 3) * 26} r="9" fill={INK} />
      ))}
      <circle cx="130" cy="150" r="7" fill={INK} />
      <circle cx="176" cy="150" r="7" fill={INK} />
      <path d="M136 180 q17 14 34 0" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* plastic bag character */}
      <path d="M70 120 Q70 84 100 84 L110 60 130 84 170 84 190 60 200 84 Q230 84 230 120 L216 250 Q150 272 84 250 Z" fill="#f0e9dc" stroke={INK} strokeWidth="4" />
      <circle cx="128" cy="150" r="7" fill={INK} />
      <circle cx="174" cy="150" r="7" fill={INK} />
      <path d="M132 190 q19 -10 38 0" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  center: (
    <svg viewBox="0 0 160 160" aria-hidden>
      {/* small bottle buddy */}
      <rect x="58" y="52" width="44" height="88" rx="14" fill="#1f8a70" stroke={INK} strokeWidth="4" />
      <rect x="68" y="30" width="24" height="24" rx="6" fill={INK} />
      <circle cx="72" cy="86" r="5" fill={CREAM} />
      <circle cx="90" cy="86" r="5" fill={CREAM} />
      <path d="M72 108 q9 8 18 0" stroke={CREAM} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="27" fill="#1f8a70" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fill={CREAM} fontStyle="italic">
        hi. we&apos;re your trash.
      </text>
    </svg>
  ),
};

/* ————————————————— MYHUTAN — the disappearing green ————————————————— */
const myhutan: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <path d="M0 220 L90 150 L180 220 L280 140 L380 220 L470 160 L560 220 V300 H0 Z" fill="#bfe0c8" />
      <path d="M0 258 H560 V300 H0 Z" fill="#8fc9a0" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* lush trees */}
      {[
        [90, 150, 56],
        [170, 120, 70],
        [240, 160, 48],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <rect x={(cx as number) - 8} y={cy as number} width="16" height={260 - (cy as number)} fill="#7a5230" stroke={INK} strokeWidth="3" />
          <circle cx={cx as number} cy={cy as number} r={r as number} fill="#1c6b3c" stroke={INK} strokeWidth="3" />
          <circle cx={(cx as number) - (r as number) / 2.4} cy={(cy as number) + 10} r={(r as number) / 2.2} fill="#2e8b50" />
        </g>
      ))}
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* stump + hornbill */}
      <ellipse cx="110" cy="238" rx="46" ry="16" fill="#a8794e" stroke={INK} strokeWidth="3" />
      <rect x="70" y="196" width="80" height="42" fill="#7a5230" stroke={INK} strokeWidth="3" />
      <ellipse cx="110" cy="196" rx="40" ry="14" fill="#c9995f" stroke={INK} strokeWidth="3" />
      <path d="M110 196 m-24 0 a24 8 0 1 0 48 0" fill="none" stroke="#7a5230" strokeWidth="3" />
      {/* hornbill */}
      <ellipse cx="210" cy="130" rx="34" ry="26" fill={INK} />
      <circle cx="238" cy="112" r="16" fill={INK} />
      <path d="M250 108 q34 -2 30 16 q-18 8 -32 -4 z" fill="#f5a623" stroke={INK} strokeWidth="3" />
      <path d="M240 96 q10 -12 18 -4" stroke="#f5a623" strokeWidth="6" fill="none" />
      <circle cx="240" cy="110" r="3.4" fill={CREAM} />
      <line x1="210" y1="156" x2="210" y2="184" stroke={INK} strokeWidth="5" />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="10" fill="#1c6b3c" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill={CREAM} fontStyle="italic">
        MyHutan
      </text>
    </svg>
  ),
};

/* ————————————————— ATLASCERITA — where the old stories live ————————————————— */
const atlascerita: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <circle cx="150" cy="86" r="52" fill="#f3d9a4" />
      <circle cx="132" cy="78" r="44" fill="#fbe7ef" />
      {[...Array(10)].map((_, i) => (
        <circle key={i} cx={(i * 131) % 560} cy={(i * 67) % 150 + 12} r={i % 2 ? 2.5 : 4} fill="#e7b8cd" />
      ))}
      <path d="M0 236 Q140 190 280 236 T560 236 V300 H0 Z" fill="#c26493" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* wayang kulit puppet silhouette */}
      <g fill="#5c0f33">
        <path d="M150 70 q26 0 26 28 q0 20 -14 26 l4 96 q22 4 22 24 l-76 0 q0 -20 22 -24 l4 -96 q-14 -6 -14 -26 q0 -28 26 -28" />
        <path d="M176 130 q44 10 54 46 q-26 2 -40 -14" />
        <path d="M124 130 q-44 10 -54 46 q26 2 40 -14" />
        <path d="M150 74 q4 -26 22 -32 q2 16 -8 26 z" />
      </g>
      <circle cx="150" cy="98" r="5" fill="#f3d9a4" />
      <line x1="150" y1="244" x2="150" y2="286" stroke="#5c0f33" strokeWidth="6" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* folded map with a path */}
      <path d="M50 90 L130 70 L210 90 L250 74 V230 L170 250 L90 230 L50 246 Z" fill={CREAM} stroke={INK} strokeWidth="4" />
      <path d="M130 70 V230 M210 90 V250" stroke="#e0d3b8" strokeWidth="3" />
      <path d="M70 200 Q110 150 150 170 T240 120" stroke="#9d174d" strokeWidth="5" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
      <path d="M238 106 l10 22 -22 -6 z" fill="#9d174d" />
      <circle cx="72" cy="200" r="8" fill="#9d174d" />
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="10" fill="#9d174d" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fill={CREAM} fontStyle="italic">
        AtlasCerita
      </text>
    </svg>
  ),
};

/* ————————————————— MANAMANA — the mystery chapter ————————————————— */
const manamana: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      {[...Array(9)].map((_, i) => (
        <text key={i} x={(i * 149) % 520 + 20} y={(i * 83) % 180 + 40} fontSize={i % 2 ? 22 : 34} fill="#f3b7d4" fontFamily="Georgia,serif">
          ?
        </text>
      ))}
      <path d="M0 252 Q280 214 560 252 V300 H0 Z" fill="#f3b7d4" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* gift box, slightly open */}
      <rect x="70" y="130" width="160" height="120" rx="8" fill="#d63384" stroke={INK} strokeWidth="4" />
      <rect x="60" y="100" width="180" height="40" rx="8" fill="#b02368" stroke={INK} strokeWidth="4" transform="rotate(-6 150 120)" />
      <rect x="138" y="100" width="24" height="150" fill="#ffd6ea" />
      <path d="M150 100 q-30 -40 -8 -52 q18 -8 8 52 M150 100 q30 -40 8 -52 q-18 -8 -8 52" fill="none" stroke="#ffd6ea" strokeWidth="8" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* big question mark on a pin */}
      <path d="M150 250 q-56 -50 -56 -110 a56 56 0 1 1 112 0 q0 60 -56 110" fill="#d63384" stroke={INK} strokeWidth="4" />
      <text x="150" y="160" textAnchor="middle" fontFamily="Georgia,serif" fontSize="92" fill={CREAM} fontWeight="700">
        ?
      </text>
    </svg>
  ),
  flap: (
    <svg viewBox="0 0 240 70" aria-hidden>
      <rect x="0" y="8" width="240" height="54" rx="27" fill="#d63384" />
      <text x="120" y="43" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fill={CREAM} fontStyle="italic">
        shhh… coming soon
      </text>
    </svg>
  ),
};

/* ————————————————— EPILOGUE — write the next chapter ————————————————— */
const epilogue: Scene = {
  backdrop: (
    <svg viewBox="0 0 560 300" aria-hidden>
      <circle cx="280" cy="130" r="90" fill="#f3dfae" opacity="0.7" />
      <path d="M0 250 Q280 206 560 250 V300 H0 Z" fill="#e8dcc0" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* envelope */}
      <rect x="50" y="110" width="200" height="130" rx="10" fill={CREAM} stroke={INK} strokeWidth="4" />
      <path d="M50 120 L150 190 L250 120" fill="none" stroke={INK} strokeWidth="4" />
      <circle cx="150" cy="120" r="16" fill="#c9a227" stroke={INK} strokeWidth="3" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 300 300" aria-hidden>
      {/* fountain pen writing a line */}
      <path d="M60 240 q60 -30 120 -10 t80 -24" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
      <g transform="rotate(-38 190 130)">
        <rect x="160" y="118" width="120" height="24" rx="12" fill="#16181d" />
        <path d="M160 130 l-34 0 l24 -12 z" fill="#c9a227" stroke={INK} strokeWidth="2" />
      </g>
    </svg>
  ),
  center: (
    <svg viewBox="0 0 160 160" aria-hidden>
      <path d="M80 130 q-44 -34 -44 -64 a26 26 0 0 1 44 -18 a26 26 0 0 1 44 18 q0 30 -44 64" fill="#c9a227" stroke={INK} strokeWidth="4" />
    </svg>
  ),
};

export const SCENES: Record<string, Scene> = {
  prologue,
  briam,
  silbloxx,
  myscholar,
  learnfpa,
  trashtalks,
  myhutan,
  atlascerita,
  manamana,
  epilogue,
};
