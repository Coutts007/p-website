import EvidenceCase from "./EvidenceCase.jsx";
import { GitHubIcon, LinkedInIcon } from "./Icons.jsx";

// The name is set letter by letter so it can rise into place and catch a sheen.
function GlossyName({ text }) {
  let i = 0;
  const words = text.split(" ");
  return (
    <h1 className="hero__name" aria-label={text}>
      {words.map((word, w) => (
        <span key={word + w}>
          {w > 0 && " "}
          <span className="w" aria-hidden="true">
            {[...word].map((ch) => {
              const idx = i++;
              return (
                <span className="ch" style={{ "--i": idx }} key={idx}>
                  {ch}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ person, contact, evidence, families, projects, experience }) {
  const gh = contact.socials.find((s) => s.id === "github");
  const li = contact.socials.find((s) => s.id === "linkedin");

  return (
    <section className="hero band" id="top">
      <div className="wrap">
        <p className="hero__status" data-reveal="" style={{ "--d": "0.2s" }}>
          <span className="bead bead--caramel bead--xs pulse" aria-hidden="true" />
          {person.status}
        </p>
        <GlossyName text={person.name} />

        <div className="hero__grid">
          <div className="hero__text" data-reveal="" style={{ "--d": "0.55s" }}>
            <p className="hero__role">
              {person.role}, based in {person.location}.
            </p>
            <p className="hero__intro">{person.intro}</p>

            <div className="hero__actions">
              <a className="btn btn--gloss" href="#projects">
                See my projects
              </a>
              <a className="btn btn--glass" href="#contact">
                Get in touch
              </a>
              {person.cvUrl && (
                <a className="btn btn--glass" href={person.cvUrl} target="_blank" rel="noreferrer">
                  View CV
                </a>
              )}
            </div>

            <ul className="hero__social" aria-label="Profiles">
              <li>
                <a href={gh.href} target="_blank" rel="noreferrer">
                  <GitHubIcon /> {gh.handle}
                </a>
              </li>
              <li>
                <a href={li.href} target="_blank" rel="noreferrer">
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <EvidenceCase
            evidence={evidence}
            families={families}
            projects={projects}
            experience={experience}
          />
        </div>
      </div>
    </section>
  );
}
