import Glass from "./Glass.jsx";
import { ExternalIcon } from "./Icons.jsx";

export default function Credentials({ certifications, events }) {
  return (
    <section id="credentials" className="band">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Certifications and events</h2>
        </div>

        <div className="creds">
          <Glass as="section" className="panel" aria-labelledby="certs-title">
            <h3 id="certs-title" className="panel__title">
              Certifications
            </h3>
            <ul className="cert-list">
              {certifications.map((c) => (
                <li key={c.name}>
                  <p className="cert-list__name">{c.name}</p>
                  <p className="cert-list__meta">
                    {c.issuer}
                    {c.date && <span className="nowrap">, {c.date}</span>}
                  </p>
                  {c.note && <p className="cert-list__note">{c.note}</p>}
                </li>
              ))}
            </ul>
          </Glass>

          <section className="rail-wrap" aria-labelledby="events-title">
            <h3 id="events-title" className="panel__title">
              Hackathons, workshops and masterclasses
            </h3>
            <ol className="rail" data-reveal="">
              {events.map((ev) => (
                <li key={ev.name} className="rail__item">
                  <span className="bead bead--milk bead--sm rail__node" aria-hidden="true" />
                  <p className="rail__date">{ev.date}</p>
                  <Glass className="rail__card">
                    <p className="rail__name">{ev.name}</p>
                    <p className="rail__host">
                      {ev.host}
                      {ev.place && `, ${ev.place}`}
                    </p>
                    {ev.note && <p className="rail__note">{ev.note}</p>}
                    {ev.link && (
                      <a className="link-pill" href={ev.link.href} target="_blank" rel="noreferrer">
                        {ev.link.label} <ExternalIcon />
                      </a>
                    )}
                    {ev.project && (
                      <a className="link-pill" href={`#${ev.project}`}>
                        See the project
                      </a>
                    )}
                  </Glass>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
