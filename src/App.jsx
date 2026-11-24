import { useAmbientMotion } from "./motion.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Toolkit from "./components/Toolkit.jsx";
import Credentials from "./components/Credentials.jsx";
import Community from "./components/Community.jsx";
import Contact from "./components/Contact.jsx";
import {
  person,
  contact,
  projects,
  projectFilters,
  experience,
  education,
  families,
  evidence,
  toolkit,
  certifications,
  events,
  community,
} from "./data.js";

export default function App() {
  useAmbientMotion();

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="orb orb--one" />
        <span className="orb orb--two" />
        <span className="orb orb--three" />
        <span className="grain" />
      </div>

      <a className="skip" href="#projects">
        Skip to projects
      </a>
      <Nav name={person.name} />

      <main>
        <Hero
          person={person}
          contact={contact}
          evidence={evidence}
          families={families}
          projects={projects}
          experience={experience}
        />
        <Projects projects={projects} filters={projectFilters} />
        <Experience experience={experience} education={education} />
        <Toolkit toolkit={toolkit} families={families} />
        <Credentials certifications={certifications} events={events} />
        <Community community={community} />
        <Contact person={person} contact={contact} />
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p>© {new Date().getFullYear()} {person.name}. Built with React.</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
