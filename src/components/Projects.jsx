import { useState } from "react";
import { flushSync } from "react-dom";
import { withViewTransition } from "../motion.js";
import Glass from "./Glass.jsx";
import { ExternalIcon } from "./Icons.jsx";

function ProjectSlab({ p }) {
  return (
    <Glass
      as="article"
      id={p.id}
      tilt
      tint={p.featured ? "cocoa" : undefined}
      className={`slab${p.featured ? " slab--featured" : ""}`}
      style={{ viewTransitionName: `slab-${p.id}` }}
    >
      <div className="slab__id">
        <h3 className="slab__name">{p.name}</h3>
        <p className="slab__kicker">{p.kicker}</p>
        <dl className="slab__meta">
          <div>
            <dt>When</dt>
            <dd>{p.period}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
        </dl>
      </div>

      <div className="slab__body">
        {p.tagline && <p className="slab__tagline">“{p.tagline}”</p>}
        <p>{p.summary}</p>
        {p.points.length > 0 && (
          <ul className="ticks">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}
        {p.stack.length > 0 && (
          <ul className="chips chips--static" aria-label="Built with">
            {p.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="slab__links">
          {p.links.map((l) => (
            <a key={l.label} className="link-pill" href={l.href} target="_blank" rel="noreferrer">
              {l.label} <ExternalIcon />
            </a>
          ))}
        </div>
      </div>
    </Glass>
  );
}

export default function Projects({ projects, filters }) {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  return (
    <section id="projects" className="band">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Selected projects</h2>
          <p>Six builds from 2026, from hackathon entries to my final-year project.</p>
        </div>

        <div className="chips" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip chip--button"
              aria-pressed={filter === f.id}
              onClick={() => withViewTransition(() => flushSync(() => setFilter(f.id)))}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} of {projects.length} projects
        </p>

        <div className="shelf">
          {shown.map((p) => (
            <ProjectSlab key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
