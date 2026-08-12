"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/data/site";
import { MiniIcon } from "@/components/ui/mini-icon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeatureGrid() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".featureItem", section.current);
    gsap.fromTo(items, { y: 55, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.05,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: section.current, start: "top 75%", once: true },
    });

    items.forEach((item, index) => {
      const svg = item.querySelector("svg");
      if (!svg) return;
      gsap.fromTo(svg, { rotate: index % 2 ? -18 : 18, scale: 0.72, opacity: 0 }, {
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "expo.out",
        scrollTrigger: { trigger: item, start: "top 78%", once: true },
      });
    });
  }, { scope: section });

  return (
    <section ref={section} className="featureSection">
      <div className="featureSectionLabel"><span>03</span><p>A few things the forest changes.</p></div>
      <div className="featureGrid">
        {features.map((feature) => (
          <article key={feature.title} className="featureItem">
            <p className="featureKicker">{feature.kicker}</p>
            <MiniIcon type={feature.icon as "path" | "tree" | "house"} />
            <h3>{feature.title}</h3>
            <p className="featureBody">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
