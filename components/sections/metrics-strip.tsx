"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
  { value: 2, pad: true, label: "quiet levels" },
  { value: 5, pad: true, label: "signature spaces" },
  { value: 1, pad: true, label: "hidden sanctuary" },
];

export function MetricsStrip() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-count]", section.current).forEach((el) => {
      const end = Number(el.dataset.count ?? "0");
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: end,
        duration: 1.25,
        ease: "power3.out",
        snap: { value: 1 },
        scrollTrigger: { trigger: section.current, start: "top 80%", once: true },
        onUpdate: () => { el.textContent = String(Math.round(proxy.value)).padStart(2, "0"); },
      });
    });

    gsap.fromTo(".metric, .metricLead", { y: 28, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: section.current, start: "top 84%", once: true },
    });
  }, { scope: section });

  return (
    <section id="details" ref={section} className="metricsStrip">
      <div className="metricLead">
        <p>A retreat shaped by the landscape, not placed on top of it.</p>
      </div>
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <strong data-count={metric.value}>00</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </section>
  );
}
