"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerBridge() {
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
