"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";
import { CompactAction } from "@/components/ui/compact-action";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function InterludeReveal() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(copy.current, { autoAlpha: 0, y: 55 });
      gsap.set(number.current, { autoAlpha: 1 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.75 },
      });

      tl.fromTo(frame.current,
        { width: 110, height: 84, borderRadius: 18, yPercent: 0 },
        { width: "23vw", height: "31vh", borderRadius: 12, duration: 0.18 }, 0)
        .to(number.current, { autoAlpha: 0, y: -18, duration: 0.08 }, 0.15)
        .to(frame.current, { width: "66vw", height: "70vh", borderRadius: 0, duration: 0.28 }, 0.2)
        .to(image.current, { scale: 1, duration: 0.28 }, 0.2)
        .to(stage.current, { backgroundColor: "#21a8df", duration: 0.2 }, 0.46)
        .to(frame.current, { width: "100vw", height: "100svh", duration: 0.25 }, 0.48)
        .to(copy.current, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.6)
        .to(frame.current, { scale: 1.035, duration: 0.22 }, 0.72)
        .to(copy.current, { y: -18, duration: 0.2 }, 0.75);
    });
    return () => mm.revert();
  }, { scope: section });

  return (
    <section ref={section} className="interludeReveal">
      <div ref={stage} className="interludeStage">
        <div ref={number} className="interludeNumber"><strong>54%</strong><span>of the feeling is outside the frame.</span></div>
        <div ref={frame} className="interludeFrame">
          <div ref={image} className="interludeImage">
            <Image src={images.sunset} alt="The retreat at sunset in the forest" fill sizes="(max-width: 900px) 100vw, 110px" />
          </div>
          <div className="interludeShade" />
        </div>
        <div ref={copy} className="interludeCopy">
          <span>THE VIEW / 04</span>
          <h2>Come and see it.<br />Photographs undersell it.</h2>
          <CompactAction href="#inside" light>Continue inside</CompactAction>
        </div>
      </div>
    </section>
  );
}
