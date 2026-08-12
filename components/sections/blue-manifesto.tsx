"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";
import { CompactAction } from "@/components/ui/compact-action";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sentence = "The house sits last in the tree line — beyond traffic, beyond schedules, beyond the need to be anywhere else. Glass opens every room to the canopy while stone keeps the architecture grounded.";

export function BlueManifesto() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLParagraphElement>(null);
  const action = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const wordEls = words.current?.querySelectorAll("span") ?? [];
      gsap.set(wordEls, { opacity: 0.2, yPercent: 25 });
      gsap.set(image.current, { yPercent: 32, scale: 0.76, clipPath: "inset(0 9% 0 9%)" });
      gsap.set(action.current, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.to(wordEls, { opacity: 1, yPercent: 0, stagger: 0.008, duration: 0.26, ease: "none" }, 0)
        .to(image.current, { yPercent: 0, scale: 0.94, clipPath: "inset(0 0% 0 0%)", duration: 0.32, ease: "none" }, 0.18)
        .to(action.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.36)
        .to(words.current, { autoAlpha: 0, y: -40, duration: 0.16 }, 0.48)
        .to(image.current, { scale: 1.08, width: "100vw", height: "100svh", duration: 0.32, ease: "none" }, 0.48)
        .to(action.current, { autoAlpha: 0, duration: 0.08 }, 0.7)
        .to(stage.current, { backgroundColor: "#159ad2", duration: 0.25 }, 0.56);
    });

    mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(image.current, { yPercent: 10, scale: 0.95 }, {
        yPercent: -3,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section id="story" ref={section} className="blueManifestoMotion">
      <div ref={stage} className="blueManifestoStage">
        <div className="blueOrbit blueOrbitA" /><div className="blueOrbit blueOrbitB" />
        <div className="blueStatementMotion">
          <span className="blueKicker">THE HOUSE / 02</span>
          <p ref={words}>{sentence.split(" ").map((word, index) => <span key={`${word}-${index}`}>{word} </span>)}</p>
        </div>

        <div ref={image} className="blueHouseMotion">
          <Image
            src={images.exterior}
            alt="Full exterior of The Hidden Retreat"
            fill
            sizes="(max-width: 900px) 100vw, min(82vw, 1340px)"
          />
          <div className="blueHouseShade" />
          <div ref={action} className="blueHouseAction"><CompactAction href="#inside" light>See inside</CompactAction></div>
        </div>
      </div>
    </section>
  );
}
