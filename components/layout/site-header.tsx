"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);

  useGSAP(() => {
    let last = 0;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const current = self.scroll();
        if (current > 120 && current > last + 3) gsap.to(header.current, { y: -58, duration: 0.4, ease: "power3.out" });
        if (current < last - 3) gsap.to(header.current, { y: 0, duration: 0.4, ease: "power3.out" });
        last = current;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <header ref={header} className="floatingHeader">
      <Link className="headerLogo" href="#top" aria-label="The Hidden Retreat home">
        <svg viewBox="0 0 22 22" aria-hidden="true">
          <path d="M11 2 4 9v9h14V9l-7-7Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8.5 18v-6h5v6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </Link>
      <nav className="floatingNav" aria-label="Primary navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="headerContact" href="#viewing"><i />Private viewing</Link>
    </header>
  );
}
