"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";


gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CircularSplitReveal() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const openingCopy = useRef<HTMLDivElement>(null);
  const closingCopy = useRef<HTMLDivElement>(null);
  const orbit = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(back.current, { autoAlpha: 0, scale: 1.1 });
      gsap.set(closingCopy.current, { autoAlpha: 0, y: 45 });
      gsap.set(topHalf.current, { yPercent: 0 });
      gsap.set(bottomHalf.current, { yPercent: 0 });
      gsap.set(orbit.current, { scale: 0.72, opacity: 0.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.72,
        },
      });

      tl.fromTo(
        lens.current,
        { width: "21vw", height: "21vw", borderRadius: "50%", rotate: -7, scale: 0.78 },
        { width: "36vw", height: "36vw", borderRadius: "50%", rotate: 0, scale: 1, duration: 0.2, ease: "none" },
        0,
      )
        .to(orbit.current, { scale: 1.15, opacity: 1, duration: 0.25, ease: "none" }, 0)
        .to(openingCopy.current, { y: -26, duration: 0.12, ease: "none" }, 0.12)
        .to(lens.current, { width: "68vw", height: "70vh", borderRadius: 18, duration: 0.22, ease: "none" }, 0.2)
        .to(stage.current, { backgroundColor: "#0b0d0c", duration: 0.18, ease: "none" }, 0.3)
        .to(openingCopy.current, { color: "#f7f7f3", autoAlpha: 0.92, duration: 0.12, ease: "none" }, 0.31)
        .to(back.current, { autoAlpha: 1, scale: 1.02, duration: 0.18, ease: "none" }, 0.43)
        .to(topHalf.current, { yPercent: -62, rotate: -2.5, duration: 0.2, ease: "none" }, 0.48)
        .to(bottomHalf.current, { yPercent: 62, rotate: 2.5, duration: 0.2, ease: "none" }, 0.48)
        .to(openingCopy.current, { autoAlpha: 0, y: -70, duration: 0.1, ease: "none" }, 0.48)
        .to(lens.current, { width: "100vw", height: "100svh", borderRadius: 0, duration: 0.2, ease: "none" }, 0.58)
        .to(back.current, { scale: 1, duration: 0.22, ease: "none" }, 0.58)
        .to([topHalf.current, bottomHalf.current], { autoAlpha: 0, duration: 0.08 }, 0.68)
        .to(closingCopy.current, { autoAlpha: 1, y: 0, duration: 0.12, ease: "none" }, 0.7)
        .to(closingCopy.current, { y: -16, duration: 0.15, ease: "none" }, 0.84)
        .to(back.current, { scale: 1.035, duration: 0.16, ease: "none" }, 0.84);
    });

    mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(lens.current, { scale: 0.9 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top 85%", end: "bottom 20%", scrub: 0.8 },
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section ref={section} className="circularRevealSection">
      <div ref={stage} className="circularRevealStage">
        <div ref={orbit} className="circularOrbit" aria-hidden="true"><i /><i /><i /></div>

        <div ref={openingCopy} className="circularOpeningCopy">
          <span>THE COURTYARD / 03</span>
          <h2>At the centre,<br />the forest remains.</h2>
          <p>One mature tree. Water at its feet. The house arranged around it.</p>
        </div>

        <div ref={lens} className="circularLens">
          <div ref={back} className="circularBackImage">
            <Image src={images.bedroom} alt="Private bedroom facing the forest" fill sizes="100vw" />
            <div className="circularBackShade" />
          </div>
          <div ref={topHalf} className="circularHalf circularHalfTop">
            <Image src={images.courtyard} alt="Courtyard with a preserved tree" fill sizes="100vw" />
          </div>
          <div ref={bottomHalf} className="circularHalf circularHalfBottom">
            <Image src={images.courtyard} alt="Courtyard with a preserved tree" fill sizes="100vw" />
          </div>
        </div>

        <div ref={closingCopy} className="circularClosingCopy">
          <span>THE PRIVATE WING / 04</span>
          <h3>The architecture opens.<br /><em>The world closes out.</em></h3>
          <p>Floor-to-ceiling glass keeps the canopy close while distance keeps everything else away.</p>
        </div>

        <div className="circularCornerMeta"><span>COURTYARD</span><span>→</span><span>PRIVATE SUITE</span></div>
      </div>
    </section>
  );
}
