"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Faq.module.css";

export default function Faq({ items, defaultOpenIndex = -1 }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const detailsEls = Array.from(root.querySelectorAll("details"));
    const cleanups = [];

    detailsEls.forEach((d) => {
      const summary = d.querySelector("summary");
      const ans = d.querySelector("[data-faq-answer]");
      const inner = ans.firstElementChild;
      const sign = d.querySelector("[data-faq-sign]");

      if (d.open) {
        gsap.set(ans, { height: "auto", opacity: 1 });
        gsap.set(inner, { y: 0, opacity: 1 });
        sign.style.transform = "rotate(45deg)";
      } else {
        gsap.set(ans, { height: 0, opacity: 0 });
      }

      const handleClick = (e) => {
        e.preventDefault();
        if (d._anim) return;
        d._anim = true;
        sign.style.transform = d.open ? "rotate(0deg)" : "rotate(45deg)";
        if (d.open) {
          gsap.to(inner, { y: -6, opacity: 0, duration: 0.25, ease: "power2.in" });
          gsap.to(ans, {
            height: 0,
            opacity: 0,
            duration: 0.42,
            ease: "power3.inOut",
            onComplete: () => {
              d.open = false;
              d._anim = false;
            },
          });
        } else {
          d.open = true;
          gsap.set(ans, { height: "auto", opacity: 1 });
          const h = ans.offsetHeight;
          gsap.fromTo(
            ans,
            { height: 0, opacity: 0 },
            {
              height: h,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(ans, { height: "auto" });
                d._anim = false;
              },
            }
          );
          gsap.fromTo(
            inner,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.06 }
          );
        }
      };

      summary.addEventListener("click", handleClick);
      cleanups.push(() => summary.removeEventListener("click", handleClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [items]);

  return (
    <div ref={rootRef} className={styles.list}>
      {items.map((item, i) => (
        <details key={i} className={styles.faq} open={i === defaultOpenIndex}>
          <summary className={styles.summary}>
            <div className={styles.summaryInner}>
              <span>{item.q}</span>
              <span data-faq-sign className={styles.sign}>
                +
              </span>
            </div>
          </summary>
          <div data-faq-answer className={styles.answer}>
            <div className={styles.answerInner}>
              <div className={styles.answerText}>{item.a}</div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
