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
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      const observeAll = () => targets().forEach((el) => revealObserver.observe(el));
      observeAll();
      // Panels added later (for example after filtering projects) are picked up too.
      const domWatcher = new MutationObserver(observeAll);
      domWatcher.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => {
        revealObserver.disconnect();
        domWatcher.disconnect();
      });
    }

    // 2. Scroll progress and parallax depth.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight || 1;
        root.style.setProperty("--progress", String(Math.min(1, window.scrollY / max)));
        root.style.setProperty("--scroll", String(window.scrollY));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (reduced()) return () => cleanups.forEach((fn) => fn());

    // 3. A warm light follows the pointer across the lacquer backdrop.
    let lightFrame = 0;
    const onPointer = (e) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(lightFrame);
      lightFrame = requestAnimationFrame(() => {
        root.style.setProperty("--px", `${e.clientX}px`);
        root.style.setProperty("--py", `${e.clientY}px`);
        root.style.setProperty("--pxn", String(e.clientX / window.innerWidth - 0.5));
        root.style.setProperty("--pyn", String(e.clientY / window.innerHeight - 0.5));
        root.classList.add("has-pointer");
      });
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    // 4. Magnetic buttons lean toward the pointer, then settle back.
    const onMagnet = (e) => {
      const el = e.target.closest && e.target.closest(".btn, .icon-btn, .link-pill");
      document.querySelectorAll(".is-magnet").forEach((m) => {
        if (m !== el) {
          m.classList.remove("is-magnet");
          m.style.removeProperty("--tx");
          m.style.removeProperty("--ty");
        }
      });
      if (!el || e.pointerType === "touch") return;
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
