"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const walkthroughScenes = [
  {
    image: images.mystery,
    eyebrow: "TAKE 01 / THE APPROACH",
    title: "THE HIDDEN\nRETREAT",
    note: "Scroll to walk through. The camera never cuts.",
    position: "50% 50%",
  },
  {
    image: images.path,
    eyebrow: "TAKE 02 / THE PATH",
    title: "FOLLOW\nTHE LIGHT.",
    note: "The road ends. A narrow stone path keeps going.",
    position: "50% 56%",
  },
  {
    image: images.partial,
    eyebrow: "TAKE 03 / FIRST GLIMPSE",
    title: "THE HOUSE\nAPPEARS.",
    note: "Not all at once. First a glow, then a silhouette.",
    position: "50% 52%",
  },
  {
    image: images.entrance,
    eyebrow: "TAKE 04 / THE THRESHOLD",
    title: "CROSS\nQUIETLY.",
    note: "Stone, timber and glass pull the forest inward.",
    position: "50% 52%",
  },
  {
    image: images.exterior,
    eyebrow: "TAKE 05 / THE REVEAL",
    title: "TWO LEVELS.\nONE SANCTUARY.",
    note: "A private residence designed to disappear into the trees.",
    position: "50% 50%",
  },
];

export function CinematicWalkthroughHero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const portal = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const takeNumber = useRef<HTMLSpanElement>(null);
  const takeLabel = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const scenes = gsap.utils.toArray<HTMLElement>(".walkScene", section.current);
      const chapters = gsap.utils.toArray<HTMLElement>(".walkChapter", section.current);
      const sceneImages = gsap.utils.toArray<HTMLElement>(".walkSceneImage", section.current);

      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(sceneImages, { scale: 1.14, yPercent: 2 });
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(chapters, { autoAlpha: 0, y: 36 });
      gsap.set(chapters[0], { autoAlpha: 1, y: 0 });
      gsap.set(hud.current, { autoAlpha: 0, y: 15 });
      gsap.set(progress.current, { scaleX: 0, transformOrigin: "left center" });

      const trigger = {
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.72,
        onUpdate: (self: ScrollTrigger) => {
          const p = self.progress;
          const index = p < 0.31 ? 0 : p < 0.46 ? 1 : p < 0.61 ? 2 : p < 0.76 ? 3 : 4;
          if (takeNumber.current) takeNumber.current.textContent = String(index + 1).padStart(2, "0");
          if (takeLabel.current) takeLabel.current.textContent = walkthroughScenes[index].eyebrow.split(" / ")[1] ?? "THE APPROACH";
        },
      };

      const tl = gsap.timeline({ scrollTrigger: trigger });

      tl.fromTo(
        portal.current,
        { width: "100vw", height: "100svh", borderRadius: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
        { width: "100vw", height: "100svh", borderRadius: 0, duration: 0.14, ease: "none" },
        0.02,
      )
        .to(intro.current, { autoAlpha: 0, y: -22, duration: 0.05, ease: "none" }, 0.08)
        .to(stage.current, { backgroundColor: "#0a0c0b", duration: 0.08, ease: "none" }, 0.1)
        .to(
          portal.current,
          { width: "100vw", height: "100svh", borderRadius: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.16, ease: "none" },
          0.12,
        )
        .to(hud.current, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.18)
        .to(progress.current, { scaleX: 1, duration: 0.78, ease: "none" }, 0.18)
        .to(sceneImages[0], { scale: 1.04, yPercent: -1, duration: 0.24, ease: "none" }, 0.16);

      const marks = [0.3, 0.45, 0.6, 0.75];
      marks.forEach((mark, index) => {
        const current = index;
        const next = index + 1;
        tl.to(chapters[current], { autoAlpha: 0, y: -26, duration: 0.055, ease: "none" }, mark - 0.02)
          .to(scenes[current], { autoAlpha: 0, duration: 0.075, ease: "none" }, mark)
          .to(scenes[next], { autoAlpha: 1, duration: 0.085, ease: "none" }, mark)
          .to(sceneImages[next], { scale: 1.02, yPercent: -1.5, duration: 0.18, ease: "none" }, mark)
          .to(chapters[next], { autoAlpha: 1, y: 0, duration: 0.07, ease: "none" }, mark + 0.025);
      });

      tl.to(chapters[4], { y: -16, duration: 0.1, ease: "none" }, 0.88)
        .to(portal.current, { scale: 1.018, duration: 0.1, ease: "none" }, 0.88)
        .to(hud.current, { autoAlpha: 0, y: 12, duration: 0.05, ease: "none" }, 0.94);
    });

    mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const scenes = gsap.utils.toArray<HTMLElement>(".walkScene", section.current);
      const chapters = gsap.utils.toArray<HTMLElement>(".walkChapter", section.current);
      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(chapters, { autoAlpha: 0 });
      gsap.set(chapters[0], { autoAlpha: 1 });

      gsap.fromTo(
        portal.current,
        { width: "100vw", height: "100svh", borderRadius: 0 },
        {
          width: "100vw",
          height: "100svh",
          borderRadius: 0,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: "45% top", scrub: 0.8 },
        },
      );
      gsap.to(stage.current, {
        backgroundColor: "#0a0c0b",
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "8% top", end: "25% top", scrub: 0.6 },
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section id="journey" ref={section} className="walkthroughHero">
      <div ref={stage} className="walkthroughStage">
        <div ref={intro} className="walkPortalIntro">
          <span>PRIVATE FOREST RESIDENCE</span>
          <p>Some places are built to be seen. This one is discovered.</p>
        </div>

        <div ref={portal} className="walkthroughPortal">
          {walkthroughScenes.map((scene, index) => (
            <div key={scene.eyebrow} className={`walkScene walkScene${index + 1}`}>
              <div className="walkSceneImage">
                <Image
                  src={scene.image}
                  alt={scene.eyebrow}
                  fill
                  priority={index < 2}
                  sizes="100vw"
                  style={{ objectPosition: scene.position }}
                />
              </div>
            </div>
          ))}
          <div className="walkSceneShade" />
          <div className="walkSceneGrain" />
        </div>

        <div className="walkChapterStack">
          {walkthroughScenes.map((scene, index) => (
            <div key={scene.title} className={`walkChapter walkChapter${index + 1}`}>
              <span>{scene.eyebrow}</span>
              <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.note}</p>
            </div>
          ))}
        </div>

        <div ref={hud} className="walkHud">
          <div className="walkHudTake">TAKE <span ref={takeNumber}>01</span> / 05</div>
          <div className="walkHudTrack"><i ref={progress} /></div>
          <span ref={takeLabel} className="walkHudLabel">THE APPROACH</span>
        </div>

        <div className="walkTopMeta"><span>THE HIDDEN RETREAT</span><span>FOREST SANCTUARY / 2026</span></div>
        <div className="walkSideIndex">SCROLL / DISCOVER</div>
      </div>
    </section>
  );
}
