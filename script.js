const percentEl = document.getElementById("percentage");

const loader = document.getElementById("loader");
const homepage = document.getElementById("homepage");

const totalDuration = 3500;
const interval = 20;

let elapsed = 0;


function easeOut(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

const counter = setInterval(() => {
  elapsed += interval;

  let percentProgress = Math.min(elapsed / totalDuration, 1);
  percentProgress = easeOut(percentProgress);

  percentEl.textContent = Math.floor(percentProgress * 100);

  if (elapsed >= totalDuration) {
    clearInterval(counter);

    percentEl.textContent = 100;

    setTimeout(() => {
      loader.classList.add("fade-out");

      setTimeout(() => {
        loader.style.display = "none";
        homepage.style.display = "block";
        document.querySelector(".hero").classList.add("show");
      }, 500);
    }, 200);
  }
}, interval);

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀";
  } else {
    themeToggle.textContent = "☾";
  }
});

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show-menu");
  menuOverlay.classList.toggle("show-overlay");
});

menuOverlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show-menu");
  menuOverlay.classList.remove("show-overlay");
});

const projectsGrid = document.getElementById("projectsGrid");

projectsGrid.innerHTML = `<p class="projects-status">Loading featured projects...</p>`;

const featuredProjects = [
  {
    repo: "AskDocs-ai-rag",
    title: "AskDocs AI RAG",
    type: "AI Knowledge Assistant",
    description:
      "Production-style RAG system for intelligent PDF question answering using FastAPI, ChromaDB, Sentence Transformers, and local LLMs.",
    tech: ["Python", "FastAPI", "ChromaDB", "Ollama"],
  },
  {
    repo: "fastapi-postgresql-crud-dashboard",
    title: "Employee Management API",
    type: "Full Stack Dashboard",
    description:
      "A backend CRUD dashboard with FastAPI, PostgreSQL, JWT auth, and clean data management flows.",
    tech: ["FastAPI", "PostgreSQL", "JWT", "Dashboard"],
  },
  {
    repo: "trustguard-agent",
    title: "TrustGuard Agent",
    type: "AI Safety Tool",
    description:
      "A FastAPI prototype that evaluates AI agent and API trust scores using identity, reputation, and risk signals.",
    tech: ["Python", "FastAPI", "AI Agents", "Risk"],
  },
  {
    repo: "weather-news-chatbot",
    title: "Weather & News Chatbot",
    type: "API Data App",
    description:
      "A Flask app that provides real-time weather updates and latest news using external APIs.",
    tech: ["Python", "Flask", "APIs", "Chatbot"],
  },
  {
    title: "UI/UX Design Portfolio",
    type: "Design Showcase",
    description:
      "A collection of UI/UX design work, product screens, visual concepts, and interface explorations showcased on Behance.",
    tech: ["UI/UX", "Product Design", "Behance", "Prototyping"],
    url: "https://www.behance.net/98f2ad75",
    external: true,
  },
];

fetch("https://api.github.com/users/ashishkumar246/repos")
  .then(res => res.json())
  .then(data => {
    const filtered = featuredProjects
      .map(project => {
        if (project.external) {
          return project;
        }

        const repo = data.find(item => item.name === project.repo);
        return repo ? { ...project, url: repo.html_url } : null;
      })
      .filter(Boolean);

    projectsGrid.innerHTML = "";

    if (!filtered.length) {
      projectsGrid.innerHTML = `<p class="projects-status">No featured projects found right now.</p>`;
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-pill">${tech}</span>`).join("")}
        </div>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn">${project.external ? "VIEW DESIGN" : "VIEW CODE"}</a>
      `;

      projectsGrid.appendChild(card);
    });
  })
  .catch(err => {
    console.log(err);
    projectsGrid.innerHTML = `<p class="projects-status">Unable to load projects right now. Please try again later.</p>`;
  });

document.getElementById("year").textContent = new Date().getFullYear();
const closeMenu = document.getElementById("closeMenu");

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("show-menu");
  menuOverlay.classList.remove("show-overlay");
});
