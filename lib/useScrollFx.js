"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Scroll-reveal built on IntersectionObserver — deliberately NOT GSAP
 * ScrollTrigger.
 *
 * ScrollTrigger stores its scroll measurements on a global singleton that
 * survives Next.js client-side navigations and goes stale: after navigating
 * (rather than hard-refreshing) to a page, [data-reveal] / [data-stagger]
 * elements stayed pinned at opacity:0 and their videos never appeared until a
 * manual refresh. A fresh IntersectionObserver per mount carries no
 * cross-navigation state, and we additionally reveal whatever is already on
 * screen synchronously at mount (positions are correct here — the effect runs
 * after layout), so the critical content never waits on async trigger timing.
 *
 * Conventions inside the root element:
 *   [data-hero]    fades in immediately on mount
 *   [data-reveal]  fades in when scrolled into view
 *   [data-stagger] fades in its direct children, staggered, when in view
 *
 * clearProps:'transform' is required so CSS :hover transforms aren't blocked
 * by the transform GSAP would otherwise leave inline after the reveal.
 */
export function useScrollFx(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let observer;

    const ctx = gsap.context(() => {
      const q = (sel) => Array.from(root.querySelectorAll(sel));

      // Hero — reveals immediately on mount, independent of scroll.
      gsap.from(q("[data-hero]"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });

      const reveals = q("[data-reveal]");
      const staggers = q("[data-stagger]");
      const targets = [...reveals, ...staggers];
      if (!targets.length) return;

      // Hidden start state.
      gsap.set(reveals, { opacity: 0, y: 40 });
      staggers.forEach((grp) =>
        gsap.set(Array.from(grp.children), { opacity: 0, y: 28 })
      );

      const reveal = (el) => {
        if (el.dataset.fxDone) return;
        el.dataset.fxDone = "1";
        if (el.hasAttribute("data-stagger")) {
          gsap.to(Array.from(el.children), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            clearProps: "transform",
          });
        } else {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
          });
        }
      };

      const supportsIO = typeof IntersectionObserver !== "undefined";
      if (supportsIO) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              observer.unobserve(entry.target);
              reveal(entry.target);
            });
          },
          { rootMargin: "0px 0px -8% 0px" }
        );
      }

      // Reveal what's on screen right now; observe the rest for scroll-in.
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        const onScreen = r.top < vh * 0.92 && r.bottom > 0;
        if (onScreen || !supportsIO) reveal(el);
        else observer.observe(el);
      });
    }, root);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, [rootRef]);
}
