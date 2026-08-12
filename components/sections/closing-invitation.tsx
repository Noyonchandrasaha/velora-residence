"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";
import { CompactAction } from "@/components/ui/compact-action";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ClosingInvitation() {
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top 72%", end: "bottom bottom", scrub: 0.75 },
      });
      tl.fromTo(image.current, { yPercent: 24, scale: 0.76, clipPath: "inset(0 12% 0 12%)" }, {
        yPercent: 0, scale: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.65, ease: "none",
      }, 0)
        .fromTo(copy.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "none" }, 0.18);
    });
    return () => mm.revert();
  }, { scope: section });

  return (
    <section id="viewing" ref={section} className="closingInvitationMotion">
      <div ref={copy} className="closingMotionCopy">
        <span>PRIVATE VIEWING / BY APPOINTMENT</span>
        <h2>Disappear<br /><em>for a while.</em></h2>
        <p>One house. One forest. Nothing else competing for your attention.</p>
        <CompactAction href="mailto:hello@example.com" light>Request a viewing</CompactAction>
      </div>
      <div ref={image} className="closingMotionImage">
        <Image src={images.night} alt="The retreat glowing at night among the trees" fill sizes="100vw" />
        <div className="closingImageShade" />
      </div>
      <footer className="referenceFooter motionFooter">
        <span>THE HIDDEN RETREAT</span>
        <span>A conceptual forest residence</span>
        <span>© 2026</span>
      </footer>
    </section>
  );
}
