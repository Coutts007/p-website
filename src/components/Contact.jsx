import { useState } from "react";
import Glass from "./Glass.jsx";
import { CheckIcon, CopyIcon, PinIcon, socialIcons } from "./Icons.jsx";

function CopyRow({ label, value }) {
  const [state, setState] = useState("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <div className="copy-row">
      <dt>{label}</dt>
      <dd>
        <span className="copy-row__value">{value}</span>
        <button type="button" className="icon-btn" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>
          {state === "copied" ? <CheckIcon /> : <CopyIcon />}
        </button>
        <span className="copy-row__status" aria-live="polite">
          {state === "copied" && "Copied"}
          {state === "failed" && "Select the text to copy it"}
        </span>
      </dd>
    </div>
  );
}

export default function Contact({ person, contact }) {
  return (
    <section id="contact" className="band band--last">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Get in touch</h2>
          <p>{person.status}. The quickest way to reach me is email or LinkedIn.</p>
        </div>

        <div className="contact">
          <Glass className="card-lacquer" tint="lacquer" tilt>
            <p className="card-lacquer__name">{person.name}</p>
            <p className="card-lacquer__role">Software engineering</p>
            <dl className="card-lacquer__rows">
              <CopyRow label="Email" value={contact.email} />
              <CopyRow label="Phone" value={contact.phone} />
            </dl>
            <p className="card-lacquer__place">
              <PinIcon /> {person.location}
            </p>
          </Glass>

          <ul className="socials" aria-label="Socials and links">
            {contact.socials.map((s) => {
              const Icon = socialIcons[s.id];
              const external = s.href.startsWith("http");
              return (
                <li key={s.id}>
                  <Glass
                    as="a"
                    tilt
                    className="social"
                    href={s.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="social__icon">
                      <Icon width="22" height="22" />
                    </span>
                    <span className="social__label">{s.label}</span>
                    <span className="social__handle">{s.handle}</span>
                  </Glass>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
