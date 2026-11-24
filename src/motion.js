import { useEffect } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Page-wide motion: scroll reveals, scroll progress, the pointer-following
// light behind the glass, and magnetic buttons. All of it switches off when
// the visitor prefers reduced motion.
export function useAmbientMotion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const cleanups = [];

    // 1. Reveal: glass panels and headings clear like frosted glass as they enter.
    const targets = () => document.querySelectorAll("[data-reveal]:not(.is-in)");
    if (reduced() || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 6% 0px" }
      );
      const observeAll = () => targets().forEach((el) => revealObserver.observe(el));
      observeAll();
      // Panels added later (for example after filtering projects) are picked up too.
      let watchFrame = 0;
      const domWatcher = new MutationObserver(() => {
        cancelAnimationFrame(watchFrame);
        watchFrame = requestAnimationFrame(observeAll);
      });
      domWatcher.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => {
        revealObserver.disconnect();
        domWatcher.disconnect();
      });
    }

    // 2. Scroll progress and parallax depth. These values are written only to the
    // few elements that use them (not the whole page), so a scroll frame never
    // forces the browser to re-style every element in the document.
    const backdrop = document.querySelector(".backdrop");
    const nav = document.querySelector(".nav");
    let maxScroll = 1;
    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    };
    measure();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (resizeObserver) resizeObserver.observe(document.body);
    window.addEventListener("resize", measure, { passive: true });
    cleanups.push(() => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    });

    let ticking = false;
    let lastY = -1;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;
      const progress = String(Math.min(1, y / maxScroll));
      if (backdrop) {
        backdrop.style.setProperty("--progress", progress);
        backdrop.style.setProperty("--scroll", String(y));
      }
      if (nav) nav.style.setProperty("--progress", progress);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Touch screens have no hover, so skip all pointer effects there entirely.
    const finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced() || !finePointer) return () => cleanups.forEach((fn) => fn());

    // 3. A warm light follows the pointer across the backdrop.
    let lightFrame = 0;
    const onPointer = (e) => {
      cancelAnimationFrame(lightFrame);
      lightFrame = requestAnimationFrame(() => {
        if (!backdrop) return;
        backdrop.style.setProperty("--px", `${e.clientX}px`);
        backdrop.style.setProperty("--py", `${e.clientY}px`);
        backdrop.style.setProperty("--pxn", String(e.clientX / window.innerWidth - 0.5));
        backdrop.style.setProperty("--pyn", String(e.clientY / window.innerHeight - 0.5));
        backdrop.classList.add("has-pointer");
      });
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    // 4. Magnetic buttons lean toward the pointer, then settle back.
    let magnet = null;
    const onMagnet = (e) => {
      const el = e.target.closest && e.target.closest(".btn, .icon-btn, .link-pill");
      if (magnet && magnet !== el) {
        magnet.classList.remove("is-magnet");
        magnet.style.removeProperty("--tx");
        magnet.style.removeProperty("--ty");
        magnet = null;
      }
      if (!el) return;
      magnet = el;
      const r = el.getBoundingClientRect();
      el.classList.add("is-magnet");
      el.style.setProperty("--tx", `${(e.clientX - (r.left + r.width / 2)) * 0.22}px`);
      el.style.setProperty("--ty", `${(e.clientY - (r.top + r.height / 2)) * 0.3}px`);
    };
    window.addEventListener("pointermove", onMagnet, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onMagnet));

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

// Wraps a state change in a view transition where the browser supports it,
// so filtered project panels glide to their new places.
export function withViewTransition(update) {
  if (!reduced() && document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}
