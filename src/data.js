// All portfolio content lives here. Edit this file to update the site.
// Anything marked TODO is a detail still to confirm or fill in.

const GITHUB = "https://github.com/Coutts007";
const LINKEDIN = "https://www.linkedin.com/in/peter-shemaya-357248339";

// The CV link is hidden in the hosted preview, where PDFs cannot open.
// eslint-disable-next-line no-undef
const IS_PREVIEW = typeof __PREVIEW__ !== "undefined" && __PREVIEW__;

export const person = {
  name: "Peter Shemaya",
  role: "Computer Science student specialising in software engineering",
  location: "Nairobi, Kenya",
  status: "Open to software engineering internships",
  intro:
    "I build AI and web applications in Python, Django and React, from the database schema to " +
    "deployment on GCP and Render. AI training work with Mercor has taught me to read model output " +
    "closely, spot where an answer goes wrong and explain why in writing.",
  cvUrl: IS_PREVIEW ? null : "/Peter_Shemaya_CV.pdf",
};

export const contact = {
  email: "petershemaya007@gmail.com",
  phone: "+254 115 945 361",
  socials: [
    { id: "github", label: "GitHub", handle: "github.com/Coutts007", href: GITHUB },
    { id: "linkedin", label: "LinkedIn", handle: "in/peter-shemaya-357248339", href: LINKEDIN },
    { id: "email", label: "Email", handle: "petershemaya007@gmail.com", href: "mailto:petershemaya007@gmail.com" },
    { id: "phone", label: "Phone", handle: "+254 115 945 361", href: "tel:+254115945361" },
  ],
};

// Project links: replace each GITHUB placeholder with the project's own repository
// or live demo URL. TODO: add repo and live links.
export const projects = [
  {
    id: "skillproof",
    name: "SkillProof",
    kicker: "Evidence-first developer assessment",
    period: "2026", // TODO: add the month
    role: "Built for Zinduathon 3.0, Noise vs Signal",
    categories: ["hackathon"],
    featured: true,
    tagline: "CVs are noise. Commits are signal.",
    summary:
      "Turns a developer’s public GitHub activity into an explainable skill card, with detected " +
      "technical skills, a Signal Score from 0 to 100 and links to the repositories behind each result.",
    points: [
      "Developers can show real work instead of listing self-reported skills.",
      "Recruiters can review, search and discuss technical evidence, with every result traced back to observable public work.",
    ],
    stack: [], // TODO: add the tech stack
    links: [{ label: "On GitHub", href: GITHUB }],
  },
  {
    id: "mazaox",
    name: "MazaoX",
    kicker: "Agricultural produce marketplace",
    period: "2026", // TODO: add the month
    role: "Academic prototype, full stack",
    categories: ["fullstack"],
    featured: true,
    summary:
      "A marketplace for Kenyan farm produce: farmers publish listings and manage stock, buyers " +
      "search, order and pay, and administrators moderate the platform.",
    points: [
      "Django REST Framework API backed by PostgreSQL and Redis.",
      "React and TypeScript client built with Vite. Payments are simulated for the prototype.",
    ],
    stack: ["Django", "Django REST Framework", "PostgreSQL", "Redis", "React", "TypeScript", "Vite"],
    links: [{ label: "On GitHub", href: GITHUB }],
  },
  {
    id: "magivents",
    name: "MagiVents",
    kicker: "Hybrid event management system",
    period: "Sept–Oct 2026",
    role: "Lead software developer",
    categories: ["fullstack"],
    summary:
      "Lets organisers run a single event for both in-person and online attendees from one platform.",
    points: [
      "Built event creation, attendee registration and management of who attends physically and who joins virtually.",
    ],
    stack: ["Python", "Django", "DRF", "React", "TypeScript"],
    links: [{ label: "On GitHub", href: GITHUB }],
  },
  {
    id: "altastudy",
    name: "AltaStudy",
    kicker: "Academic copilot",
    period: "June 2026",
    role: "Creator and core architect",
    categories: ["ai"],
    summary:
      "A study assistant that uses retrieval-augmented generation to turn course PDFs and lecture " +
      "slides into question-and-answer sessions that stay within the course material, with a study chat interface.",
    points: [
      "Fixed a blocked GCP deployment by tracing the fault to the local container configuration and debugging it on Ubuntu.",
    ],
    stack: ["Python", "RAG", "Google Cloud Platform"],
    links: [{ label: "On GitHub", href: GITHUB }],
  },
  {
    id: "hefi",
    name: "Citizen Energy Fairness Portal",
    kicker: "HEFI",
    period: "March 2026",
    role: "Lead software developer",
    categories: ["ai", "fullstack"],
    summary:
      "A Streamlit app that scores each household on a Household Energy Fairness Index and uses the " +
      "score to suggest a fair electricity tariff based on family size and income.",
    points: [
      "FastAPI and SQLAlchemy backend around a Random Forest model, with responses under 180 ms so tariffs update in real time.",
    ],
    stack: ["Python", "Streamlit", "FastAPI", "SQLAlchemy", "Random Forest"],
    links: [{ label: "On GitHub", href: GITHUB }],
  },
  {
    id: "tailoring",
    name: "AI-Powered Remote Tailoring",
    kicker: "Virtual measurement system",
    period: "2026, in progress",
    role: "Final-year project",
    categories: ["ai"],
    summary:
      "A web app that estimates a customer’s body measurements from smartphone photos using MediaPipe " +
      "pose estimation, so small tailoring businesses in Kenya can serve clients who cannot come in for a fitting.",
    points: [],
    stack: ["MediaPipe", "Progressive web app"],
    links: [{ label: "On GitHub", href: GITHUB }],
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI and ML" },
  { id: "fullstack", label: "Full stack" },
  { id: "hackathon", label: "Hackathon" },
];

export const experience = [
  {
    id: "mercor",
    title: "AI Training Contributor",
    org: "Mercor",
    place: "Remote",
    summary: "Reviewed and rated AI model responses to technical and coding prompts.",
    points: [
      "Reviewed and rated AI model responses to technical and coding prompts against detailed rubrics, checking for correctness, sound reasoning and clean code.",
      "Wrote prompts and reference answers aimed at the places models tend to fail, and explained every rating in writing.",
      "Worked to strict task guidelines and quality checks.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Mount Kenya University, Thika",
  period: "2024 to present", // TODO: add expected graduation month and year
  coursework: [
    "Software Engineering Principles",
    "Data Structures & Algorithms",
    "Application Architecture",
    "Relational Database Design",
  ],
};

// Skill families double as the colours of the beads in the evidence case.
export const families = {
  backend: { label: "Backend", tone: "dark" },
  frontend: { label: "Frontend", tone: "milk" },
  ai: { label: "AI and ML", tone: "caramel" },
  cloud: { label: "Cloud and ops", tone: "white" },
};

// Each row is a skill; each bead marks a project where it was used.
export const evidence = {
  columns: [
    { id: "mazaox", label: "MazaoX" },
    { id: "magivents", label: "MagiVents" },
    { id: "altastudy", label: "AltaStudy" },
    { id: "hefi", label: "HEFI" },
    { id: "tailoring", label: "Tailoring" },
    { id: "mercor", label: "Mercor", target: "experience" },
  ],
  rows: [
    { skill: "Python", family: "backend", in: ["mazaox", "magivents", "altastudy", "hefi"] },
    { skill: "Django and DRF", family: "backend", in: ["mazaox", "magivents"] },
    { skill: "FastAPI and SQLAlchemy", family: "backend", in: ["hefi"] },
    { skill: "PostgreSQL and Redis", family: "backend", in: ["mazaox"] },
    { skill: "React and TypeScript", family: "frontend", in: ["mazaox", "magivents"] },
    { skill: "Streamlit", family: "frontend", in: ["hefi"] },
    { skill: "Retrieval-augmented generation", family: "ai", in: ["altastudy"] },
    { skill: "Random Forest models", family: "ai", in: ["hefi"] },
    { skill: "Pose estimation", family: "ai", in: ["tailoring"] },
    { skill: "Model evaluation", family: "ai", in: ["mercor"] },
    { skill: "GCP and Linux", family: "cloud", in: ["altastudy"] },
  ],
};

export const toolkit = [
  {
    family: "backend",
    title: "Languages and frameworks",
    items: ["Python", "Java", "TypeScript", "SQL", "HTML", "CSS", "Django", "Django REST Framework", "FastAPI", "Streamlit", "React", "Vite"],
  },
  {
    family: "backend",
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MariaDB", "Redis (caching)", "SQLAlchemy", "Paginated queries", "3NF relational design"],
  },
  {
    family: "ai",
    title: "AI and ML",
    items: ["Retrieval-augmented generation", "Prompt engineering", "Random Forest models", "Model evaluation", "MediaPipe pose estimation"],
  },
  {
    family: "cloud",
    title: "Tools and platforms",
    items: ["Git", "GitHub", "Docker", "Google Cloud Platform", "Render", "Linux (Ubuntu)", "Windows PowerShell"],
  },
  {
    family: "frontend",
    title: "Practices",
    items: ["Agile Scrum", "DevOps and DevSecOps fundamentals", "Data structures and algorithms"],
  },
];

export const certifications = [
  { name: "Introduction to DevOps and DevSecOps", issuer: "Simplilearn SkillUp", date: "Nov 2026" },
  {
    name: "AI Essentials for Professionals",
    issuer: "Moringa School",
    date: "June 2026",
    note: "Responsible AI pipelines and prompt engineering",
  },
  { name: "Data Analytics Training", issuer: "ICT Kenya and Sigma", date: "" },
  { name: "Agile Scrum Foundations", issuer: "Simplilearn SkillUp", date: "" },
];

// Newest first.
export const events = [
  {
    name: "Pre-Summit MasterClass: Enterprise AI & Data Architecture for Electoral Processes and Civic Transformation",
    host: "@iLabAfrica, Strathmore University, with the Electoral Law and Governance Institute for Africa (ELGIA)",
    place: "Nairobi",
    date: "18 Nov 2026",
  },
  {
    name: "Founding.dev Design Hackathon",
    host: "Founding.dev",
    place: "Online",
    date: "6–9 Nov 2026",
    note: "Shipped a landing page built on Founding.dev.",
    link: { label: "Verify certificate", href: "https://founding.dev/hackathon/design/certificate/U2RLXS6A" },
  },
  {
    name: "Google Africa Virtual Algorithms Workshop",
    host: "Google",
    place: "Online",
    date: "Oct 2026",
    note: "Core algorithms and data structures, and how to design efficient solutions.",
  },
  {
    name: "Zinduathon 3.0, Noise vs Signal",
    host: "Hackathon",
    place: "",
    date: "2026", // TODO: add the date
    note: "Built SkillProof, an evidence-first developer assessment platform.",
    project: "skillproof",
  },
];

export const community = [
  {
    title: "Google Gemini Student Ambassador",
    detail: "Introducing fellow students to Gemini and how to use it in their studies and projects.",
  },
  { title: "Member, Google Developer Groups", detail: "Part of the GDG developer community." },
  {
    title: "Peer Counsellor, Ramba Boys High School",
    detail: "Guidance and Counselling Club, 2020 to 2023. Ran academic and personal counselling sessions.",
  },
];
