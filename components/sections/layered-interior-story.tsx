"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const roomLayers = [
  {
    number: "01",
    label: "Threshold",
    title: "Arrival becomes interior.",
    image: images.entrance,
  },
  {
    number: "02",
    label: "Private suite",
    title: "Wake inside the canopy.",
    image: images.bedroom,
  },
  {
    number: "03",
    label: "Forest spa",
    title: "Warm stone. Cold mist.",
    image: images.spa,
  },
];

export function LayeredInteriorStory() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const finale = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".layerRoomCard", section.current);
      const metas = gsap.utils.toArray<HTMLElement>(".layerRoomMeta", section.current);
      const imagesEls = gsap.utils.toArray<HTMLElement>(".layerRoomImageInner", section.current);

      gsap.set(cards, { xPercent: -50, yPercent: -50 });
      gsap.set(cards[0], { zIndex: 3, scale: 1, rotate: -0.5, x: -14, y: -4 });
      gsap.set(cards[1], { zIndex: 2, scale: 0.97, rotate: 1.4, x: 8, y: 12 });
      gsap.set(cards[2], { zIndex: 1, scale: 0.94, rotate: -1.7, x: 22, y: 25 });
      gsap.set(metas, { autoAlpha: 0, y: 18 });
      gsap.set(finale.current, { autoAlpha: 0, y: 42 });
      gsap.set(rail.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(imagesEls, { scale: 1.08 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.74,
        },
      });

      tl.to(header.current, { y: -30, autoAlpha: 0.78, duration: 0.12, ease: "none" }, 0)
        .to(rail.current, { scaleX: 1, duration: 0.84, ease: "none" }, 0.08)
        .to(cards[0], { x: "-28vw", y: "-5vh", scale: 0.74, rotate: -5.5, duration: 0.23, ease: "none" }, 0.12)
        .to(cards[1], { x: 0, y: "5vh", scale: 0.82, rotate: 0, duration: 0.23, ease: "none" }, 0.12)
        .to(cards[2], { x: "28vw", y: "-2vh", scale: 0.74, rotate: 5.5, duration: 0.23, ease: "none" }, 0.12)
        .to(imagesEls, { scale: 1, duration: 0.25, ease: "none" }, 0.12)
        .to(metas, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.1, ease: "none" }, 0.28)
        .to(cards[0], { x: "-47vw", y: "-4vh", autoAlpha: 0.38, duration: 0.18, ease: "none" }, 0.45)
        .to(cards[2], { x: "47vw", y: "-1vh", autoAlpha: 0.38, duration: 0.18, ease: "none" }, 0.45)
        .to(metas[0], { autoAlpha: 0, duration: 0.08 }, 0.45)
        .to(metas[2], { autoAlpha: 0, duration: 0.08 }, 0.45)
        .to(cards[1], { width: "78vw", height: "72vh", y: 0, scale: 1, duration: 0.2, ease: "none" }, 0.5)
        .to(metas[1], { x: "-24vw", y: "-27vh", duration: 0.16, ease: "none" }, 0.5)
        .to(cards[1], { width: "100vw", height: "100svh", duration: 0.18, ease: "none" }, 0.68)
        .to([cards[0], cards[2]], { autoAlpha: 0, duration: 0.08 }, 0.68)
        .to(metas[1], { autoAlpha: 0, duration: 0.08 }, 0.7)
        .to(finale.current, { autoAlpha: 1, y: 0, duration: 0.12, ease: "none" }, 0.74)
        .to(cards[1], { scale: 1.025, duration: 0.16, ease: "none" }, 0.82)
        .to(finale.current, { y: -12, duration: 0.14, ease: "none" }, 0.84);
    });

    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".layerRoomCard", section.current);
      cards.forEach((card) => {
        gsap.fromTo(card, { y: 42, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section id="inside" ref={section} className="layeredRoomsSection">
      <div ref={stage} className="layeredRoomsStage">
        <div ref={header} className="layeredRoomsHeader">
          <span>INSIDE / 05</span>
          <h2>Three rooms.<br /><em>Three ways to disappear.</em></h2>
          <p>The new reference uses layered objects that separate as you scroll. Here, the architecture becomes the object.</p>
        </div>

        <div className="layeredRoomsDeck">
          {roomLayers.map((room) => (
            <article key={room.number} className="layerRoomCard">
              <div className="layerRoomImageInner">
                <Image src={room.image} alt={room.label} fill sizes="(max-width: 900px) 100vw, 72vw" />
                <div className="layerRoomShade" />
              </div>
              <div className="layerRoomMeta">
                <span>{room.number}</span>
                <span>{room.label}</span>
                <strong>{room.title}</strong>
              </div>
            </article>
          ))}
        </div>

        <div ref={finale} className="layeredRoomsFinale">
          <span>THE PRIVATE SUITE</span>
          <h3>Nothing outside<br />needs your attention.</h3>
          <p>Only forest, fog and warm light remain in the frame.</p>
        </div>

        <div className="layeredRoomsProgress"><i ref={rail} /></div>
        <div className="layeredRoomsCounter"><span>01</span><span>02</span><span>03</span></div>
      </div>
    </section>
  );
}
