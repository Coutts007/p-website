import { useEffect, useState } from "react";

const links = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "credentials", label: "Credentials" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ name }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
    return () => sectionObserver.disconnect();
  }, []);

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Sections">
        <a className="nav__mark" href="#top" aria-label={`${name}, back to top`}>
          <span className="bead bead--dark bead--sm" aria-hidden="true" />
          <span>{initials}</span>
        </a>
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
