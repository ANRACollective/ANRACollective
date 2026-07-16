"use client";

/* The paper engineering. A pop-up never animates on its own — every piece's
   angle is a pure function of how far its spread is open (`openness`),
   exactly like real paper linkages (Sabuda/Reinhart school):
   - v-fold wings hinge at the gutter (rotateY), rising as the spread opens
   - the backdrop platform lifts away from the page (translateZ)
   - the front flap folds up from its bottom crease (rotateX)
   - everything collapses again when the next page turns over it            */

import { motion, MotionValue, useTransform } from "motion/react";
import { SCENES } from "./scenes";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/* smooth paper ease — no overshoot, paper doesn't bounce */
const paper = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
/* remap a window of the openness to 0..1 */
const win = (t: number, a: number, b: number) => paper((t - a) / (b - a));

export default function PopUp({
  openness,
  scene: sceneId,
}: {
  openness: MotionValue<number>;
  scene: string;
}) {
  const scene = SCENES[sceneId];

  /* linkage phases — backdrop leads, wings follow, flap arrives last */
  const backdropZ = useTransform(openness, (t) => -90 + 60 * win(t, 0, 0.75));
  const backdropOpacity = useTransform(openness, (t) => win(t, 0, 0.2));
  const backdropScale = useTransform(openness, (t) => 0.86 + 0.14 * win(t, 0, 0.8));

  const leftDeg = useTransform(openness, (t) => 52 * win(t, 0.06, 0.9));
  const rightDeg = useTransform(openness, (t) => -52 * win(t, 0.06, 0.9));
  const wingOpacity = useTransform(openness, (t) => win(t, 0.02, 0.16));

  const centerZ = useTransform(openness, (t) => 24 + 40 * win(t, 0.25, 1));
  const centerScale = useTransform(openness, (t) => 0.5 + 0.5 * win(t, 0.25, 1));
  const centerOpacity = useTransform(openness, (t) => win(t, 0.25, 0.5));

  const flapDeg = useTransform(openness, (t) => -80 + 74 * win(t, 0.35, 1));
  const flapOpacity = useTransform(openness, (t) => win(t, 0.3, 0.5));

  const shadowOpacity = useTransform(openness, (t) => 0.28 * win(t, 0, 0.8));
  const shadowScale = useTransform(openness, (t) => 0.55 + 0.45 * win(t, 0, 0.8));

  const display = useTransform(openness, (t) => (t < 0.005 ? "none" : "block"));
  /* fade with the fold so a collapsing pop-up reads as folding away,
     not as flat art lying on the page */
  const groupOpacity = useTransform(openness, (t) => win(t, 0.02, 0.24));

  return (
    <motion.div
      aria-hidden
      className="preserve-3d pointer-events-none absolute left-[52.5%] top-[8%] h-[74%] w-[45%]"
      style={{ display, opacity: groupOpacity, zIndex: 60 }}
    >
      {/* cast shadow on the page */}
      <motion.div
        className="absolute bottom-[2%] left-1/2 h-[10%] w-[80%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
        style={{ opacity: shadowOpacity, scaleX: shadowScale }}
      />

      {/* backdrop platform */}
      <motion.div
        className="absolute inset-x-0 bottom-[6%] top-[8%]"
        style={{ z: backdropZ, opacity: backdropOpacity, scale: backdropScale }}
      >
        <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full">{scene.backdrop}</div>
      </motion.div>

      {/* v-fold wings, hinged at the gutter */}
      <motion.div
        className="absolute bottom-[8%] right-1/2 h-[74%] w-[46%] origin-right"
        style={{ rotateY: leftDeg, opacity: wingOpacity, z: 6 }}
      >
        <div className="h-full w-full drop-shadow-[0_18px_14px_rgba(0,0,0,0.18)] [&>svg]:h-full [&>svg]:w-full">
          {scene.left}
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-[8%] left-1/2 h-[74%] w-[46%] origin-left"
        style={{ rotateY: rightDeg, opacity: wingOpacity, z: 6 }}
      >
        <div className="h-full w-full drop-shadow-[0_18px_14px_rgba(0,0,0,0.18)] [&>svg]:h-full [&>svg]:w-full">
          {scene.right}
        </div>
      </motion.div>

      {/* standing centerpiece across the fold */}
      {scene.center && (
        <motion.div
          className="absolute bottom-[16%] left-1/2 h-[38%] w-[24%] -translate-x-1/2"
          style={{ z: centerZ, scale: centerScale, opacity: centerOpacity }}
        >
          <div className="h-full w-full drop-shadow-[0_14px_10px_rgba(0,0,0,0.2)] [&>svg]:h-full [&>svg]:w-full">
            {scene.center}
          </div>
        </motion.div>
      )}

      {/* bottom-hinged caption flap */}
      {scene.flap && (
        <motion.div
          className="absolute bottom-[-2%] left-1/2 h-[18%] w-[44%] -translate-x-1/2 origin-bottom"
          style={{ rotateX: flapDeg, opacity: flapOpacity, z: 40 }}
        >
          <div className="h-full w-full drop-shadow-[0_10px_8px_rgba(0,0,0,0.22)] [&>svg]:h-full [&>svg]:w-full">
            {scene.flap}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
