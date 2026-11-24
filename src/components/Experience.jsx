import Glass from "./Glass.jsx";

export default function Experience({ experience, education }) {
  return (
    <section id="experience" className="band">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Experience and education</h2>
        </div>

        <div className="pair">
          {experience.map((job) => (
            <Glass as="article" key={job.id} className="panel">
              <h3 className="panel__title">{job.title}</h3>
              <p className="panel__sub">
                {job.org}, {job.place.toLowerCase()}
              </p>
              <ul className="ticks">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </Glass>
          ))}

          <Glass as="article" className="panel" tint="grey">
            <h3 className="panel__title">{education.degree}</h3>
            <p className="panel__sub">
              {education.school}, {education.period}
            </p>
            <p className="panel__label">Coursework</p>
            <ul className="chips chips--static">
              {education.coursework.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </Glass>
        </div>
      </div>
    </section>
  );
}
