const { useEffect, useState } = React;
const { createRoot } = ReactDOM;
const { motion, AnimatePresence } = Motion;

const profile = {
  name: "Saptarshi Roy",
  role: "Computer Science Engineer | Python Developer | Data Systems Builder",
  address: "Barasat, North 24 PGS, Pin: 700127",
  email: "saptarshiroy016@gmail.com",
  phone: "+91 6290302859",
  positioning:
    "Python developer building data-heavy web systems, geospatial search pipelines, and practical analytics tools.",
  summary:
    "Final-year Computer Science student with strong foundations in programming, DSA, OOP, SDLC, and AI prompt engineering. Proficient in Python and SQL, with hands-on experience deploying web apps and building backend systems. Quick learner with strong problem-solving ability, team collaboration, and an innovation-first mindset.",
};

const sections = [
  ["hero", "Home"],
  ["about", "About"],
  ["education", "Education"],
  ["experience", "Internship"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["leadership", "Leadership"],
  ["certifications", "Courses"],
  ["interests", "Interests"],
  ["contact", "Contact"],
];

const education = [
  { title: "B.Tech in Computer Science and Engineering", place: "BPPIMT (MAKAUT)", meta: "2022-2026, ongoing", score: "CGPA 8.55" },
  { title: "Class 12, Science", place: "Adamas World School (CBSE)", meta: "2022", score: "86.8%" },
  { title: "Class 10", place: "Adamas World School (CBSE)", meta: "2020", score: "96%" },
];

const skills = [
  { group: "Programming", items: ["Python", "Java basics", "C basics"] },
  { group: "Web Development", items: ["HTML", "CSS", "JavaScript basics", "Flask"] },
  { group: "Databases", items: ["SQL", "DDL", "DML", "Joins", "Queries", "MongoDB basics"] },
  { group: "Data Analytics", items: ["Advanced Excel", "Pivot Tables", "VLOOKUP", "Dashboards", "Power BI", "Tableau basics"] },
  { group: "Computer Science", items: ["DSA", "OOP", "System Design basics", "CN", "OS", "SDLC"] },
  { group: "Tools", items: ["VS Code", "Replit", "Git", "GitHub", "Render", "Jupyter Notebook", "Docker"] },
];

const internship = {
  company: "ISRO (Indian Space Research Organization)",
  title: "Python Developer Intern",
  period: "Nov 2025 - Jan 2026",
  points: [
    "Working on NAS-based search and indexing of large-scale satellite imagery datasets.",
    "Built backend modules for automated data ingestion, metadata extraction, and high-speed querying using Python, SQLite, Rasterio, Fiona, Shapely, and geospatial libraries.",
    "Optimized a search pipeline to scan and process more than 100TB of satellite data within 40 minutes, significantly improving retrieval speed and system throughput.",
  ],
};

const projects = [
  {
    name: "Stock Price Predictor",
    stack: ["Python", "SQLite", "Pandas", "NumPy", "Matplotlib", "Flask", "Render"],
    link: "https://stock-price-predictor-uqss.onrender.com",
    impact: "Built a deployed forecasting tool that transforms historical stock data into clean visual insights and prediction-ready outputs.",
    points: [
      "Cleaned and structured market datasets using Pandas and NumPy for reliable model input.",
      "Implemented regression-based prediction workflows and connected them to a Flask application.",
      "Added Matplotlib visualizations and SQLite-backed storage so users can inspect results through a live web interface.",
    ],
  },
  {
    name: "Personal Expense Tracker",
    stack: ["Python", "Flask", "SQLite", "Pandas", "Matplotlib", "HTML/CSS", "Render"],
    link: "https://personal-expense-tracker-python.onrender.com",
    impact: "Built a full-stack personal finance product that helps users record spending, analyze habits, and export usable expense data.",
    points: [
      "Designed expense categorization, filtering, CSV import/export, and analytics workflows.",
      "Created pie and bar chart dashboards with Pandas and Matplotlib to make spending patterns easier to understand.",
      "Deployed the application on Render and maintained the code through GitHub version control.",
    ],
  },
];

const courses = [
  "Machine Learning using Python | 2025",
  "Python and Statistics for Financial Analysis | 2025",
  "Prompt Engineering with ChatGPT | 2025",
  "Power BI for Beginners | 2026",
];

const leadership = [
  "Led the organization of a Chess Competition with 200+ participants at College Tech Fest.",
  "Team Leader in College Final Year Project.",
  "Semester Topper twice, in 6th and 7th Semester.",
  "Qualified for Smart India Hackathon at college level.",
  "Runner Up in Inter-school Chess Competition.",
  "Volunteer in NGO Helping Hands.",
  "Built and managed a YouTube channel with 3.3K+ subscribers and 7,60,000+ views. (https://www.youtube.com/@ClarityEducation)",
];

const interests = ["Financial Markets", "Economics", "Chess", "Yoga", "Geopolitics"];
const languages = ["English", "Hindi", "Bengali"];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useTyping(words) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const atEnd = text === word;
    const atStart = text === "";
    const delay = atEnd && !deleting ? 1150 : deleting ? 32 : 62;

    const timer = setTimeout(() => {
      if (atEnd) setDeleting(true);
      else if (atStart && deleting) {
        setDeleting(false);
        setIndex((value) => value + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [words, index, text, deleting]);

  return text;
}

function Counter({ value, suffix = "", label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.max(0, Math.min((now - start) / duration, 1));
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return h(
    motion.div,
    {
      whileHover: { scale: 1.025, y: -4 },
      transition: { type: "spring", stiffness: 260, damping: 20 },
      className: "glass rounded-lg p-5 shadow-glass",
    },
    h("div", { className: "font-display text-3xl font-bold text-aurora" }, count.toLocaleString("en-IN") + suffix),
    h("div", { className: "mt-1 text-sm text-white/68 light:text-ink/68" }, label)
  );
}

function Reveal({ children, className = "", delay = 0, card = false }) {
  return h(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      whileHover: card ? { scale: 1.025, y: -4 } : undefined,
      viewport: { once: true, amount: 0.22 },
      transition: card ? { type: "spring", stiffness: 260, damping: 20, delay } : { duration: 0.65, delay, ease: "easeOut" },
      className,
    },
    children
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return h(
    "section",
    { id, className: cn("relative z-10 scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10", className) },
    h(
      "div",
      { className: "mx-auto max-w-7xl" },
      h(
        Reveal,
        { className: "mb-10 max-w-3xl" },
        h("p", { className: "mb-3 text-sm font-bold uppercase tracking-[0.28em] text-aurora" }, eyebrow),
        h("h2", { className: "font-display text-3xl font-bold text-white light:text-ink sm:text-5xl" }, title)
      ),
      children
    )
  );
}

function Navbar({ active, darkMode, setDarkMode }) {
  return h(
    "header",
    { className: "fixed inset-x-0 top-4 z-50 px-4" },
    h(
      "nav",
      { className: "glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 shadow-glass" },
      h("div", { className: "hidden w-0 lg:block", "aria-hidden": "true" }),
      h(
        "div",
        { className: "hidden items-center gap-1 lg:flex" },
        sections.map(([id, label]) =>
          h(
            "a",
            {
              key: id,
              href: `#${id}`,
              className: cn(
                "rounded-full px-3 py-2 text-sm font-semibold transition",
                active === id ? "bg-white text-ink" : "text-white/72 hover:bg-white/10 hover:text-white light:text-ink/70 light:hover:bg-ink/8"
              ),
            },
            label
          )
        )
      ),
      h(
        "div",
        { className: "flex items-center gap-2" },
        h(
          "button",
          {
            type: "button",
            onClick: () => setDarkMode((value) => !value),
            className: "grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-lg transition hover:bg-white/18 light:border-ink/10 light:bg-ink/5",
            "aria-label": "Toggle dark and light mode",
          },
            darkMode ? "LT" : "DK"
        )
      )
    )
  );
}

function Hero() {
  const typed = useTyping(["Python Developer", "Problem Solver", "Data Systems Builder", "Future Tech Leader"]);

  return h(
    "section",
    { id: "hero", className: "relative z-10 flex min-h-screen scroll-mt-24 items-center px-5 pb-20 pt-32 sm:px-8 lg:px-10" },
    h(
      "div",
      { className: "mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]" },
      h(
        motion.div,
        { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } },
        h("p", { className: "mb-4 inline-flex rounded-full border border-aurora/40 bg-aurora/10 px-4 py-2 text-sm font-bold text-aurora" }, "Final-year CSE student | ISRO Python Developer Intern"),
        h("h1", { className: "font-display text-5xl font-bold leading-tight text-white light:text-ink sm:text-7xl lg:text-8xl" }, profile.name),
        h(
          "div",
          { className: "mt-5 min-h-[3rem] text-2xl font-bold text-white/86 light:text-ink/80 sm:text-3xl" },
          h("span", { className: "bg-gradient-to-r from-aurora via-signal to-ember bg-clip-text text-transparent" }, typed),
          h("span", { className: "typing-cursor ml-1 text-aurora" }, "|")
        ),
        h("p", { className: "mt-5 max-w-2xl text-xl font-semibold leading-8 text-white/86 light:text-ink/80" }, profile.positioning),
        h("p", { className: "mt-6 max-w-2xl text-lg leading-8 text-white/70 light:text-ink/70" }, profile.summary),
        h(
          "div",
          { className: "mt-8 flex flex-wrap gap-3" },
          h("a", { href: "#projects", className: "rounded-full bg-white px-6 py-3 font-bold text-ink transition hover:-translate-y-1 hover:shadow-glow" }, "View Projects"),
          h("a", { href: "#contact", className: "rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10 light:border-ink/15 light:text-ink" }, "Contact")
        )
      ),
      h(
        Reveal,
        { className: "relative" },
        h(
          "div",
          { className: "glass rounded-lg p-6 shadow-glass" },
          h("div", { className: "rounded-lg bg-gradient-to-br from-aurora/24 via-signal/16 to-ember/20 p-6" },
            h("p", { className: "text-sm font-bold uppercase tracking-[0.24em] text-white/65 light:text-ink/60" }, "Candidate Signal"),
            h("div", { className: "mt-6 grid grid-cols-2 gap-4" },
              h(Counter, { value: 100, suffix: "TB+", label: "Satellite data pipeline scale" }),
              h(Counter, { value: 40, label: "Minute processing target" }),
              h(Counter, { value: 200, suffix: "+", label: "Tech Fest participants led" }),
              h(Counter, { value: 760000, suffix: "+", label: "YouTube views managed" })
            )
          )
        )
      )
    )
  );
}

function About() {
  const abilities = [
    "Strong problem-solving and analytical thinking with a continuous improvement mindset.",
    "Quick, eager learner who adapts fast to new technologies and team environments.",
    "Writes clean, efficient, testable, and maintainable code.",
    "Interpersonal strength in team collaboration, leadership, communication, and documentation.",
  ];

  return h(
    Section,
    { id: "about", eyebrow: "About Me", title: "Engineering foundation with leadership momentum." },
    h(
      "div",
      { className: "grid gap-6 lg:grid-cols-[.9fr_1.1fr]" },
      h(
        Reveal,
        { card: true, className: "glass rounded-lg p-7 shadow-glass" },
        h("p", { className: "text-lg leading-8 text-white/74 light:text-ink/72" },
          "Saptarshi brings the balance recruiters look for: computer science fundamentals, shipped applications, data-oriented thinking, and real leadership experience. His work connects backend engineering, analytics, and practical product delivery, with the discipline of a student who has topped semesters and the ownership of someone already operating in high-scale technical environments."
        )
      ),
      h(
        "div",
        { className: "grid gap-4 sm:grid-cols-2" },
        abilities.map((ability, index) =>
          h(Reveal, { key: ability, card: true, delay: index * 0.08, className: "glass rounded-lg p-5 shadow-glass" },
            h("span", { className: "mb-4 inline-grid h-9 w-9 place-items-center rounded-lg bg-aurora/15 font-bold text-aurora" }, `0${index + 1}`),
            h("p", { className: "text-white/75 light:text-ink/70" }, ability)
          )
        )
      )
    )
  );
}

function Education() {
  return h(
    Section,
    { id: "education", eyebrow: "Education Timeline", title: "Consistent academic excellence." },
    h("div", { className: "relative border-l border-white/15 pl-6 light:border-ink/15" },
      education.map((item, index) =>
        h(Reveal, { key: item.title, card: true, delay: index * 0.1, className: "relative mb-8 last:mb-0" },
          h("span", { className: "absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-ink bg-aurora light:border-pearl" }),
          h("div", { className: "glass rounded-lg p-6 shadow-glass" },
            h("div", { className: "flex flex-wrap items-start justify-between gap-3" },
              h("div", null,
                h("h3", { className: "font-display text-xl font-bold text-white light:text-ink" }, item.title),
                h("p", { className: "mt-1 text-white/65 light:text-ink/65" }, item.place)
              ),
              h("span", { className: "rounded-full bg-aurora/15 px-3 py-1 text-sm font-bold text-aurora" }, item.score)
            ),
            h("p", { className: "mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/45 light:text-ink/45" }, item.meta)
          )
        )
      )
    )
  );
}

function Experience() {
  return h(
    Section,
    { id: "experience", eyebrow: "Internship Experience", title: "Building for real-world data scale at ISRO." },
    h(Reveal, { card: true, className: "glass overflow-hidden rounded-lg shadow-glass" },
      h("div", { className: "grid lg:grid-cols-[.34fr_.66fr]" },
        h("div", { className: "bg-gradient-to-br from-aurora/24 via-signal/18 to-ember/20 p-8" },
          h("p", { className: "text-sm font-bold uppercase tracking-[0.24em] text-aurora" }, internship.period),
          h("h3", { className: "mt-4 font-display text-3xl font-bold text-white light:text-ink" }, internship.title),
          h("p", { className: "mt-3 text-white/70 light:text-ink/70" }, internship.company),
          h("div", { className: "mt-10 flex gap-4" },
            h("span", { className: "mt-2 h-3 w-3 shrink-0 rounded-full bg-aurora shadow-glow" }),
            h("p", { className: "leading-7 text-white/78 light:text-ink/72" }, internship.points[0])
          ),
          h("div", { className: "mt-6 flex gap-4" },
            h("span", { className: "mt-2 h-3 w-3 shrink-0 rounded-full bg-aurora shadow-glow" }),
            h("p", { className: "leading-7 text-white/78 light:text-ink/72" }, "Contributed to a geospatial data workflow where metadata quality, retrieval speed, and reliable indexing were critical.")
          )
        ),
        h("div", { className: "grid gap-6 p-8 xl:grid-cols-[.95fr_1.05fr]" },
          h("div", { className: "overflow-hidden rounded-lg border border-white/14 bg-white/8 shadow-glass light:border-ink/12 light:bg-ink/5" },
            h("img", {
              src: "./isro-photo.jpeg",
              alt: "Saptarshi Roy at ISRO during his Python Developer internship",
              className: "h-full min-h-[360px] w-full object-cover object-center transition duration-500 hover:scale-105",
              loading: "lazy",
            })
          ),
          h("div", { className: "self-center" },
            internship.points.slice(1).map((point) =>
              h("div", { key: point, className: "mb-5 flex gap-4 last:mb-0" },
                h("span", { className: "mt-1 h-3 w-3 shrink-0 rounded-full bg-aurora shadow-glow" }),
                h("p", { className: "leading-7 text-white/74 light:text-ink/72" }, point)
              )
            )
          )
        )
      )
    )
  );
}

function Skills() {
  return h(
    Section,
    { id: "skills", eyebrow: "Technical Skills", title: "A practical stack for data-backed software." },
    h("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3" },
      skills.map((skill, index) =>
        h(Reveal, { key: skill.group, card: true, delay: index * 0.05, className: "glass rounded-lg p-6 shadow-glass" },
          h("h3", { className: "font-display text-xl font-bold text-white light:text-ink" }, skill.group),
          h("div", { className: "mt-5 flex flex-wrap gap-2" },
            skill.items.map((item) => h("span", { key: item, className: "rounded-full bg-white/8 px-3 py-1 text-sm text-white/72 light:bg-ink/6 light:text-ink/72" }, item))
          )
        )
      )
    )
  );
}

function Projects() {
  return h(
    Section,
    { id: "projects", eyebrow: "Featured Projects", title: "Shipped tools, not classroom demos." },
    h("div", { className: "grid gap-6 lg:grid-cols-2" },
      projects.map((project, index) =>
        h(Reveal, { key: project.name, card: true, delay: index * 0.1, className: "group glass rounded-lg p-7 shadow-glass hover:shadow-glow" },
          h("div", { className: "flex flex-wrap items-start justify-between gap-4" },
            h("div", null,
              h("h3", { className: "font-display text-2xl font-bold text-white light:text-ink" }, project.name),
              h("p", { className: "mt-3 leading-7 text-white/72 light:text-ink/70" }, project.impact)
            ),
            h("a", { href: project.link, target: "_blank", rel: "noreferrer", className: "rounded-full bg-aurora px-4 py-2 text-sm font-bold text-ink transition group-hover:-translate-y-1" }, "Hosted using Render")
          ),
          h("ul", { className: "mt-6 space-y-3" }, project.points.map((point) => h("li", { key: point, className: "flex gap-3 text-white/70 light:text-ink/68" }, h("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-signal" }), point))),
          h("div", { className: "mt-6 flex flex-wrap gap-2" }, project.stack.map((item) => h("span", { key: item, className: "rounded-full border border-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/58 light:border-ink/12 light:text-ink/58" }, item)))
        )
      )
    )
  );
}

function Leadership() {
  return h(
    Section,
    { id: "leadership", eyebrow: "Leadership & Achievements", title: "Proof of initiative under pressure." },
    h("div", { className: "grid gap-4 md:grid-cols-2" },
      leadership.map((item, index) =>
        h(Reveal, { key: item, card: true, delay: index * 0.04, className: "glass rounded-lg p-5 shadow-glass" },
          h("div", { className: "flex gap-4" },
            h("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ember/18 font-bold text-ember" }, index + 1),
            h("p", { className: "leading-7 text-white/74 light:text-ink/72" }, item)
          )
        )
      )
    )
  );
}

function Certifications() {
  return h(
    Section,
    { id: "certifications", eyebrow: "Certifications & Courses", title: "Continuous learning across ML, analytics, and AI." },
    h("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" },
      courses.map((course, index) =>
        h(Reveal, { key: course, card: true, delay: index * 0.08, className: "glass rounded-lg p-6 shadow-glass" },
          h("span", { className: "mb-6 inline-block rounded-full bg-signal/16 px-3 py-1 text-sm font-bold text-signal" }, "Course"),
          h("h3", { className: "font-display text-xl font-bold text-white light:text-ink" }, course)
        )
      )
    )
  );
}

function Interests() {
  return h(
    Section,
    { id: "interests", eyebrow: "Hobbies & Interests", title: "A broad lens for better technology decisions." },
    h("div", { className: "grid gap-6 lg:grid-cols-[1fr_.7fr]" },
      h(Reveal, { card: true, className: "glass rounded-lg p-7 shadow-glass" },
        h("div", { className: "flex flex-wrap gap-3" }, interests.map((item) => h("span", { key: item, className: "rounded-full bg-white/10 px-5 py-3 font-semibold text-white/78 light:bg-ink/6 light:text-ink/72" }, item))),
        h("p", { className: "mt-7 leading-8 text-white/70 light:text-ink/70" },
          "Financial markets, economics, chess, yoga, and geopolitics give Saptarshi a rare mix of systems thinking, strategic patience, and calm decision-making."
        )
      ),
      h(Reveal, { card: true, className: "glass rounded-lg p-7 shadow-glass" },
        h("h3", { className: "font-display text-2xl font-bold text-white light:text-ink" }, "Languages"),
        h("div", { className: "mt-5 flex flex-wrap gap-3" }, languages.map((item) => h("span", { key: item, className: "rounded-full border border-aurora/30 px-4 py-2 font-semibold text-aurora" }, item)))
      )
    )
  );
}

function Contact() {
  return h(
    Section,
    { id: "contact", eyebrow: "Contact", title: "Ready for software engineering opportunities." },
    h(Reveal, { card: true, className: "glass rounded-lg p-8 shadow-glass" },
      h("div", { className: "grid gap-8 lg:grid-cols-[1fr_.8fr]" },
        h("div", null,
          h("h3", { className: "font-display text-3xl font-bold text-white light:text-ink" }, "Let's build high-impact technology."),
          h("p", { className: "mt-4 max-w-2xl leading-8 text-white/70 light:text-ink/70" },
            "For recruiters, technical interviewers, and committee members: Saptarshi combines strong fundamentals, deployed software, measurable internship impact, and leadership energy."
          )
        ),
        h("div", { className: "space-y-3" },
          h("a", { href: `mailto:${profile.email}`, className: "flex items-center justify-between rounded-lg bg-white px-5 py-4 font-bold text-ink transition hover:-translate-y-1" }, h("span", null, profile.email), h("span", null, "Open")),
          h("a", { href: `tel:${profile.phone.replace(/\s/g, "")}`, className: "flex items-center justify-between rounded-lg border border-white/14 px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10 light:border-ink/12 light:text-ink" }, h("span", null, profile.phone), h("span", null, "Call")),
          h("p", { className: "rounded-lg bg-white/8 px-5 py-4 text-white/70 light:bg-ink/5 light:text-ink/70" }, profile.address)
        )
      )
    )
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return h(AnimatePresence, null,
    visible &&
      h(motion.a, {
        href: "#hero",
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 18 },
        className: "fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-aurora font-bold text-ink shadow-glow",
        "aria-label": "Back to top",
      }, "Top")
  );
}

function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return h(
    motion.div,
    {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: { duration: 0.35, delay: 0.35 },
      className: "pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-ink text-white",
      "data-loader": true,
    },
    h("div", { className: "text-center" },
      h(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, className: "mx-auto h-14 w-14 rounded-full border-4 border-white/12 border-t-aurora" }),
      h("p", { className: "mt-5 font-display text-2xl font-bold" }, "Preparing Saptarshi Roy")
    )
  );
}

function Background() {
  return h(
    "div",
    { className: "site-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(135deg,rgba(255,210,63,.14),transparent_30%,rgba(255,138,0,.15)_58%,rgba(255,59,48,.11))]" },
    h("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.1),transparent_35%)]" }),
    h("div", { className: "site-backdrop-grid absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:72px_72px]" })
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const active = useActiveSection();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
    document.body.className = darkMode
      ? "noise bg-ink text-white antialiased"
      : "noise bg-pearl text-ink antialiased";
  }, [darkMode]);

  return h(
    React.Fragment,
    null,
    h(Loader),
    h(Background),
    h(Navbar, { active, darkMode, setDarkMode }),
    h("main", null,
      h(Hero),
      h(About),
      h(Education),
      h(Experience),
      h(Skills),
      h(Projects),
      h(Leadership),
      h(Certifications),
      h(Interests),
      h(Contact)
    ),
    h("footer", { className: "relative z-10 px-5 py-8 text-center text-sm text-white/48 light:text-ink/48" }, "Built from the resume of Saptarshi Roy."),
    h(BackToTop)
  );
}

function h(type, props, ...children) {
  return React.createElement(type, props, ...children.flat());
}

createRoot(document.getElementById("root")).render(h(App));
