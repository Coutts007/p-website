import Glass from "./Glass.jsx";

export default function Toolkit({ toolkit, families }) {
  return (
    <section id="toolkit" className="band">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Toolkit</h2>
          <p>Everything I work with, grouped the way the beads above are coloured.</p>
        </div>
        <div className="drawers">
          {toolkit.map((group) => (
            <Glass as="section" key={group.title} className="drawer" aria-label={group.title}>
              <h3 className="drawer__title">
                <span className={`bead bead--${families[group.family].tone} bead--sm`} aria-hidden="true" />
                {group.title}
              </h3>
              <ul className="chips chips--static">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}
