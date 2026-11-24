import { useMemo, useState } from "react";

// A lacquered display case: skills down the side, projects across the top,
// and a glossy bead wherever a skill was used in that project.
export default function EvidenceCase({ evidence, families, projects, experience }) {
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const current = hover || pinned;

  const summaries = useMemo(() => {
    const map = {};
    projects.forEach((p) => (map[p.id] = p.summary));
    experience.forEach((e) => (map[e.id] = e.summary));
    return map;
  }, [projects, experience]);

  const { columns, rows } = evidence;
  const usedCount = rows.reduce((n, r) => n + r.in.length, 0);

  let order = 0;
  const caption = current ? (
    <>
      <strong>
        {rows[current.r].skill} in {columns[current.c].label}.
      </strong>{" "}
      {summaries[columns[current.c].id]}{" "}
      <a href={`#${columns[current.c].target || columns[current.c].id}`}>
        See {columns[current.c].target ? "the experience" : "the project"}
      </a>
    </>
  ) : (
    <>Each bead marks a skill I have used in real work. Hover or tap one to see where.</>
  );

  return (
    <figure className="case" aria-labelledby="case-title" data-reveal="" style={{ "--d": "0.35s" }}>
      <div className="case__lid">
        <figcaption id="case-title" className="case__title">
          Skills, traced to the work
        </figcaption>
        <p className="case__count">
          {rows.length} skills across {columns.length} pieces of work, {usedCount} proofs
        </p>
      </div>

      <div className="case__scroll">
        <div
          className="case__grid"
          style={{ "--cols": columns.length }}
          onMouseLeave={() => setHover(null)}
        >
          <span className="case__corner" aria-hidden="true" />
          {columns.map((col, c) => (
            <a
              key={col.id}
              href={`#${col.target || col.id}`}
              className={`case__col${current && current.c === c ? " is-lit" : ""}`}
            >
              <span>{col.label}</span>
            </a>
          ))}

          {rows.map((row, r) => (
            <div className="case__row" key={row.skill} role="presentation">
              <span className={`case__skill${current && current.r === r ? " is-lit" : ""}`}>
                <span className={`bead bead--${families[row.family].tone} bead--xs`} aria-hidden="true" />
                {row.skill}
              </span>
              {columns.map((col, c) => {
                const used = row.in.includes(col.id);
                if (!used) return <span key={col.id} className="well" aria-hidden="true" />;
                const i = order++;
                const isOn = current && current.r === r && current.c === c;
                return (
                  <span key={col.id} className="well well--full">
                    <button
                      type="button"
                      className={`bead bead--${families[row.family].tone} bead--set${isOn ? " is-on" : ""}`}
                      style={{ "--i": i }}
                      aria-label={`${row.skill}, used in ${col.label}`}
                      aria-pressed={pinned && pinned.r === r && pinned.c === c ? "true" : "false"}
                      onMouseEnter={() => setHover({ r, c })}
                      onFocus={() => setHover({ r, c })}
                      onBlur={() => setHover(null)}
                      onClick={() =>
                        setPinned((p) => (p && p.r === r && p.c === c ? null : { r, c }))
                      }
                    />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="case__caption" aria-live="polite">
        {caption}
      </p>

      <ul className="case__legend" aria-label="Bead colours">
        {Object.entries(families).map(([key, f]) => (
          <li key={key}>
            <span className={`bead bead--${f.tone} bead--xs`} aria-hidden="true" />
            {f.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
