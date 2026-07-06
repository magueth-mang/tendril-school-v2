"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

/**
 * Wires up the site's three GSAP scroll conventions within a root element:
 * [data-hero] fades in once on mount, [data-reveal] fades in on scroll,
 * [data-stagger] fades in its direct children on scroll, staggered.
 * clearProps:'transform' is required so CSS :hover transforms aren't
 * blocked by the transform GSAP leaves inline after the reveal animation.
 */
export function useScrollFx(rootRef) {
  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const q = (sel) => Array.from(root.querySelectorAll(sel));

      gsap.from(q("[data-hero]"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });

      q("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      q("[data-stagger]").forEach((grp) => {
        gsap.from(Array.from(grp.children), {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform",
          scrollTrigger: { trigger: grp, start: "top 86%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
