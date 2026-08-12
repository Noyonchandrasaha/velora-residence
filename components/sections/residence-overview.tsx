"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";
import { CompactAction } from "@/components/ui/compact-action";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ResidenceOverview() {
  const section = useRef<HTMLElement>(null);
  const pathImage = useRef<HTMLDivElement>(null);
  const houseImage = useRef<HTMLDivElement>(null);
  const trackFill = useRef<HTMLDivElement>(null);
  const trackDot = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-overview-reveal]", section.current).forEach((item, index) => {
        gsap.fromTo(item, { y: 42, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.05,
          delay: Math.min(index * 0.04, 0.16),
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });

      gsap.fromTo(pathImage.current, { yPercent: -6, scale: 1.1 }, {
        yPercent: 6,
        scale: 1.02,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.fromTo(houseImage.current, { yPercent: 5, scale: 1.08 }, {
        yPercent: -5,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.fromTo(trackFill.current, { scaleX: 0.06 }, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { trigger: ".overviewMediaGrid", start: "top 78%", end: "bottom 28%", scrub: 0.6 },
      });
      gsap.fromTo(trackDot.current, { x: 0 }, {
        x: () => Math.max(0, (trackDot.current?.parentElement?.clientWidth ?? 220) - 28),
        ease: "none",
        scrollTrigger: { trigger: ".overviewMediaGrid", start: "top 78%", end: "bottom 28%", scrub: 0.6 },
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section id="retreat" ref={section} className="overviewSection">
      <div className="overviewMeta" data-overview-reveal>
        <div>
          <span>Forest edge</span>
          <p>Reached by one narrow<br />stone path.</p>
        </div>
        <div>
          <span>Designed quietly</span>
          <p>Stone, timber, glass<br />and warm light.</p>
        </div>
        <div className="overviewIntro">
          <p>
            Deep beyond the last turn, the residence sits low among the trees. It reveals itself slowly — first as a glow, then as a silhouette, and finally as a place to disappear into.
          </p>
          <CompactAction href="#story">Read the story</CompactAction>
        </div>
      </div>

      <div className="overviewMediaGrid">
        <article className="quotePanel" data-overview-reveal>
          <div ref={pathImage} className="quoteImage">
            <Image src={images.path} alt="A stone pathway through the forest" fill sizes="(max-width: 768px) 100vw, 38vw" />
          </div>
          <blockquote>“You hear the forest before you see the house.”</blockquote>
          <div className="quoteMeta"><span>Arrival note</span><span>01 / 05</span></div>
        </article>

        <article className="housePanel" data-overview-reveal>
          <div ref={houseImage} className="housePanelImage">
            <Image src={images.partial} alt="The retreat partially revealed through the forest" fill sizes="(max-width: 768px) 100vw, 55vw" />
          </div>
          <div className="imageTrack" aria-hidden="true">
            <i ref={trackFill} />
            <span ref={trackDot} />
          </div>
        </article>
      </div>
    </section>
  );
}
