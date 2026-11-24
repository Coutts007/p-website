import Glass from "./Glass.jsx";

export default function Community({ community }) {
  return (
    <section id="community" className="band">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>Leadership and community</h2>
        </div>
        <Glass className="community" tint="grey">
          {community.map((c) => (
            <div key={c.title} className="community__item">
              <h3>{c.title}</h3>
              <p>{c.detail}</p>
            </div>
          ))}
        </Glass>
      </div>
    </section>
  );
}
