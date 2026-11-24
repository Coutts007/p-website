import { useRef } from "react";

// A glass panel. Its glossy highlight follows the pointer, and with `tilt`
// the panel leans toward the pointer in 3D. `data-reveal` lets it frost in on scroll.
export default function Glass({ as: Tag = "div", className = "", tint, tilt = false, reveal = true, children, ...rest }) {
  const ref = useRef(null);
  const frame = useRef(0);

  function onPointerMove(e) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      if (tilt) {
        el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
      }
    });
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const classes = ["glass", tint ? `glass--${tint}` : "", tilt ? "glass--tilt" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...(reveal ? { "data-reveal": "" } : {})}
      {...rest}
    >
      <span className="glass__sheen" aria-hidden="true" />
      <span className="glass__glint" aria-hidden="true" />
      {children}
    </Tag>
  );
}
