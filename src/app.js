import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const h = React.createElement;

const profile = {
  name: "Abu Taha",
  title: "Python & Django Developer | AI Enthusiast | Data Science",
  email: "tahaabu930@gmail.com",
  phone: "6206483270",
  location: "Kolkata, West Bengal",
};

const skills = [
  ["Python", 92],
  ["Django", 88],
  ["JavaScript", 78],
  ["SQL", 76],
  ["HTML", 90],
  ["CSS", 86],
  ["Git & GitHub", 80],
  ["DSA", 72],
  ["VS Code", 88],
  ["ChatGPT", 86],
  ["Claude AI", 78],
  ["Perplexity AI", 76],
  ["Blackbox AI", 74],
  ["Agentic AI", 87],
  ["RAG Pipleline", 87],
];

const projects = [
  {
    name: "Gym Fitness App",
    description: "AI-powered body analysis and fitness tracking application for measurable progress.",
    tech: ["Python", "Django", "AI"],
    features: ["Fitness progress tracking", "Body improvement analysis", "AI-based recommendations"],
  },
  {
    name: "Student Management System",
    description: "Responsive academic data platform for managing student records with clarity.",
    tech: ["Python", "Django", "SQL"],
    features: ["Student record management", "Academic data organization", "Responsive interface"],
  },
];

const navItems = ["About", "Skills", "Projects", "Education", "Contact"];

function ParticleField() {
  useEffect(() => {
    const canvas = document.querySelector(".particle-canvas");
    const context = canvas.getContext("2d");
    const pointer = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      particles = Array.from({ length: Math.min(92, Math.floor(window.innerWidth / 14)) }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.36,
        vy: (Math.random() - 0.5) * 0.36,
        size: 1.2 + Math.random() * 2.4,
        hue: index % 3 === 0 ? 176 : index % 3 === 1 ? 272 : 43,
      }));
    };

    const move = (event) => {
      pointer.x = event.clientX * window.devicePixelRatio;
      pointer.y = event.clientY * window.devicePixelRatio;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      particles.forEach((particle, index) => {
        particle.x += particle.vx * window.devicePixelRatio;
        particle.y += particle.vy * window.devicePixelRatio;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        const pulse = Math.sin(frame * 0.018 + index) * 0.5 + 0.5;
        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 95%, 66%, ${0.26 + pulse * 0.25})`;
        context.arc(particle.x, particle.y, particle.size * window.devicePixelRatio, 0, Math.PI * 2);
        context.fill();

        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170 * window.devicePixelRatio) {
          context.strokeStyle = `hsla(${particle.hue}, 95%, 70%, ${1 - distance / (170 * window.devicePixelRatio)})`;
          context.lineWidth = 0.8 * window.devicePixelRatio;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
      });
      frame += 1;
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return h("canvas", { className: "particle-canvas", "aria-hidden": "true" });
}

function Header({ theme, setTheme }) {
  return h("header", { className: "site-header" },
    h("a", { className: "brand", href: "#top", "aria-label": "Abu Taha home" }, "AT"),
    h("nav", { className: "nav-links", "aria-label": "Primary navigation" },
      navItems.map((item) => h("a", { key: item, href: `#${item.toLowerCase()}` }, item))
    ),
    h("button", {
      className: "icon-button",
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      "aria-label": "Toggle color mode",
      title: "Toggle color mode",
    }, theme === "dark" ? "Dark" : "Light")
  );
}

function Hero() {
  const roles = useMemo(() => ["Python Developer", "Django Builder", "AI App Explorer", "Web Developer"], []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 1900);
    return () => clearInterval(timer);
  }, [roles.length]);

  return h("section", { id: "top", className: "hero section" },
    h("div", { className: "hero-copy reveal" },
      h("p", { className: "eyebrow" }, "B.Tech ECE Student - JIS College of Engineering"),
      h("h1", null, profile.name),
      h("p", { className: "hero-title" }, profile.title),
      h("div", { className: "typing-line" },
        h("span", null, "Currently crafting: "),
        h("strong", null, roles[roleIndex])
      ),
      h("div", { className: "hero-actions" },
        h("a", { className: "button primary", href: "#projects" }, "Explore Projects"),
        h("a", { className: "button ghost", href: "mailto:tahaabu930@gmail.com?subject=Resume request" }, "Download Resume"),
        h("a", { className: "button subtle", href: "#contact" }, "Contact Me")
      )
    ),
    h("div", { className: "hero-orbit reveal" },
      ["Python", "AI", "Django", "SQL", "JS", "Git"].map((label, index) =>
        h("span", { key: label, className: `orbital orbital-${index + 1}` }, label)
      ),
      h("div", { className: "profile-core" },
        h("span", null, "AI"),
        h("strong", null, "Software"),
        h("small", null, "Builder")
      )
    )
  );
}

function About() {
  return h("section", { id: "about", className: "section split reveal" },
    h("div", null,
      h("p", { className: "eyebrow" }, "About"),
      h("h2", null, "Engineer mindset, product curiosity, clear communication."),
      h("p", null, "I am a B.Tech ECE student at JIS College of Engineering focused on building practical software with Python, Django, AI-powered workflows, and modern web technologies.")
    ),
    h("div", { className: "stat-grid" },
      [["7.34", "Current CGPA"], ["3+", "Core interests"], ["13", "Tools & skills"], ["2", "Featured projects"]].map(([value, label]) =>
        h("div", { className: "stat-card", key: label }, h("strong", null, value), h("span", null, label))
      )
    )
  );
}

function Skills() {
  return h("section", { id: "skills", className: "section reveal" },
    h("div", { className: "section-heading" },
      h("p", { className: "eyebrow" }, "Skills"),
      h("h2", null, "A practical stack for backend logic, web interfaces, and AI-assisted development.")
    ),
    h("div", { className: "skills-grid" },
      skills.map(([name, level]) =>
        h("article", { className: "skill-card", key: name },
          h("div", { className: "skill-top" }, h("strong", null, name), h("span", null, `${level}%`)),
          h("div", { className: "progress", "aria-label": `${name} skill level` },
            h("span", { style: { "--level": `${level}%` } })
          )
        )
      )
    )
  );
}

function Projects() {
  return h("section", { id: "projects", className: "section reveal" },
    h("div", { className: "section-heading" },
      h("p", { className: "eyebrow" }, "Projects"),
      h("h2", null, "Recruiter-ready work with a clear backend foundation.")
    ),
    h("div", { className: "project-grid" },
      projects.map((project) =>
        h("article", { className: "project-card", key: project.name },
          h("div", { className: "project-shine" }),
          h("h3", null, project.name),
          h("p", null, project.description),
          h("div", { className: "tag-row" }, project.tech.map((tag) => h("span", { key: tag }, tag))),
          h("ul", null, project.features.map((feature) => h("li", { key: feature }, feature))),
          h("div", { className: "card-actions" },
            h("a", { href: "#contact" }, "GitHub"),
            h("a", { href: "#contact" }, "Live Demo")
          )
        )
      )
    )
  );
}

function Education() {
  return h("section", { id: "education", className: "section reveal" },
    h("div", { className: "timeline" },
      h("div", { className: "timeline-line" }),
      h("article", null,
        h("p", { className: "eyebrow" }, "Education"),
        h("h2", null, "B.Tech in Electronics and Communication Engineering"),
        h("p", null, "JIS College of Engineering"),
        h("strong", null, "CGPA: 7.34")
      ),
      h("article", null,
        h("p", { className: "eyebrow" }, "Certification"),
        h("h2", null, "Python with Django AI Data Science Engineer Certification"),
        h("p", null, "A focused credential combining backend development, AI concepts, and data science foundations.")
      )
    )
  );
}

function Contact() {
  return h("section", { id: "contact", className: "section contact reveal" },
    h("div", null,
      h("p", { className: "eyebrow" }, "Contact"),
      h("h2", null, "Let's build useful software and thoughtful AI experiences."),
      h("div", { className: "contact-list" },
        h("a", { href: `mailto:${profile.email}` }, profile.email),
        h("a", { href: `tel:${profile.phone}` }, profile.phone),
        h("span", null, profile.location)
      )
    ),
    h("form", { className: "contact-form", onSubmit: (event) => event.preventDefault() },
      h("input", { placeholder: "Your name", "aria-label": "Your name" }),
      h("input", { placeholder: "Your email", type: "email", "aria-label": "Your email" }),
      h("textarea", { placeholder: "Tell me about the opportunity", "aria-label": "Message" }),
      h("button", { className: "button primary", type: "submit" }, "Send Message")
    )
  );
}

function Footer() {
  return h("footer", { className: "footer" },
    h("span", null, "(c) 2026 Abu Taha"),
    h("div", null,
      h("a", { href: "#top" }, "Back to top"),
      h("a", { href: `mailto:${profile.email}` }, "Email"),
      h("a", { href: "#projects" }, "Projects")
    )
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.18 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return h(React.Fragment, null,
    h(ParticleField),
    h("div", { className: "cursor-glow", "aria-hidden": "true" }),
    h(Header, { theme, setTheme }),
    h("main", null,
      h(Hero),
      h(About),
      h(Skills),
      h(Projects),
      h(Education),
      h(Contact)
    ),
    h(Footer)
  );
}

createRoot(document.getElementById("root")).render(h(App));
