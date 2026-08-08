

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
      loader.classList.add("loader-complete");
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
  const menuWillOpen = !mobileMenu.classList.contains("show-menu");

  mobileMenu.classList.toggle("show-menu");
  menuOverlay.classList.toggle("show-overlay");
  document.body.classList.toggle("menu-open", menuWillOpen);
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
// ================================================
// GLASS ORBS HERO PARALLAX
// ================================================

const heroSection = document.querySelector(".hero");
const heroOrbs = document.querySelectorAll(".glass-orb");

if (heroSection && heroOrbs.length) {
  heroSection.addEventListener("mousemove", (event) => {
    const heroRect = heroSection.getBoundingClientRect();

    const mouseX =
      (event.clientX - heroRect.left) / heroRect.width - 0.5;

    const mouseY =
      (event.clientY - heroRect.top) / heroRect.height - 0.5;

    heroOrbs.forEach((orb) => {
      const depth = Number(orb.dataset.depth) || 20;

      orb.style.marginLeft = `${mouseX * depth}px`;
      orb.style.marginTop = `${mouseY * depth}px`;
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    heroOrbs.forEach((orb) => {
      orb.style.marginLeft = "0px";
      orb.style.marginTop = "0px";
    });
  });
}
// ================================================
// FLOATING MENU BUTTON AFTER SCROLL STOPS
// ================================================

const floatingMenuBtn = document.getElementById("floatingMenuBtn");

let scrollStopTimer;

function openNavigationMenu() {
  mobileMenu.classList.add("show-menu");
  menuOverlay.classList.add("show-overlay");
  document.body.classList.add("menu-open");

  floatingMenuBtn.classList.remove("show");
}

function closeNavigationMenu() {
  mobileMenu.classList.remove("show-menu");
  menuOverlay.classList.remove("show-overlay");
  document.body.classList.remove("menu-open");
}

floatingMenuBtn.addEventListener("click", openNavigationMenu);

/* Keep your original top menu button working */
menuToggle.addEventListener("click", () => {
  document.body.classList.toggle(
    "menu-open",
    mobileMenu.classList.contains("show-menu")
  );
});

/* Update existing close actions */
closeMenu.addEventListener("click", closeNavigationMenu);
menuOverlay.addEventListener("click", closeNavigationMenu);

window.addEventListener(
  "scroll",
  () => {
    clearTimeout(scrollStopTimer);

    floatingMenuBtn.classList.remove("show");

    /* Do not show it near the top or while menu is open */
    if (window.scrollY < 180 || document.body.classList.contains("menu-open")) {
      return;
    }

    scrollStopTimer = setTimeout(() => {
      if (!document.body.classList.contains("menu-open")) {
        floatingMenuBtn.classList.add("show");
      }
    }, 500);
  },
  { passive: true }
);
// ================================================
// HOW I BUILD - INTERACTIVE PIPELINE
// ================================================

const buildSteps = document.querySelectorAll(".build-step");
const pipelineProof = document.getElementById("pipelineProof");
const pipelineHint = document.querySelector(".pipeline-hint");

const pipelineContent = {
  understand: {
    label: "UNDERSTAND",
    title: "Product Analysis",
    description:
      "I start by understanding the business problem, requirements, use cases, and stakeholder expectations before defining what should be built.",
    tags: [
      "PRODUCT ANALYSIS",
      "REQUIREMENTS",
      "CLIENT DISCUSSIONS",
      "STAKEHOLDERS"
    ],
    linkText: "VIEW EXPERIENCE →",
    link: "#experience"
  },

  design: {
    label: "DESIGN",
    title: "UI/UX & Product Design",
    description:
      "I translate requirements into structured user journeys, product flows, and interface designs before development begins.",
    tags: [
      "UI/UX",
      "FIGMA",
      "USER FLOWS",
      "PRODUCT DESIGN"
    ],
    linkText: "VIEW DESIGN WORK ↗",
    link: "https://www.behance.net/98f2ad75",
    external: true
  },

  build: {
    label: "BUILD",
    title: "Backend + Generative AI",
    description:
      "I can take a defined solution into implementation using backend systems, APIs, databases, and AI-powered workflows.",
    tags: [
      "PYTHON",
      "FASTAPI",
      "POSTGRESQL",
      "APIs",
      "RAG",
      "LLMs"
    ],
    linkText: "VIEW PROJECTS →",
    link: "#projects"
  },

  test: {
    label: "TEST",
    title: "QA & Edge-Case Thinking",
    description:
      "I validate features through happy paths, failure scenarios, edge cases, API behaviour, and requirement checks before considering the solution complete.",
    tags: [
      "QA",
      "EDGE CASES",
      "API TESTING",
      "VALIDATION"
    ]
  },

  ship: {
    label: "SHIP",
    title: "Cross-functional Delivery",
    description:
      "I work across Product, Design, Engineering, and QA to move requirements from discussion toward implementation and release.",
    tags: [
      "PRODUCT",
      "DESIGN",
      "ENGINEERING",
      "QA",
      "DELIVERY"
    ],
    linkText: "VIEW EXPERIENCE →",
    link: "#experience"
  }
};

buildSteps.forEach(step => {
  step.addEventListener("click", () => {
    const stage = step.dataset.stage;
    const content = pipelineContent[stage];

    if (!content) return;
    // If the same stage is clicked again, close it
if (step.classList.contains("active")) {

  step.classList.remove("active");
  pipelineProof.classList.remove("show");

  if (pipelineHint) {
    pipelineHint.textContent = "CLICK TO EXPLORE";
  }

  return;
}

    // Remove active state from all stages
    buildSteps.forEach(item => {
      item.classList.remove("active");
    });

    // Highlight clicked stage
    step.classList.add("active");

    // Change hint
    if (pipelineHint) {
      pipelineHint.textContent = "EXPLORE ANOTHER STAGE";
    }

    // Create tags
    const tagsHTML = content.tags
      .map(tag => `<span>${tag}</span>`)
      .join("");

    // Create link only if the stage has one
    let linkHTML = "";

    if (content.link) {
      const target = content.external
        ? `target="_blank" rel="noopener noreferrer"`
        : "";

      linkHTML = `
        <a
          href="${content.link}"
          class="pipeline-proof-link"
          ${target}
        >
          ${content.linkText}
        </a>
      `;
    }

    // Update proof panel
    // Update proof panel
pipelineProof.innerHTML = `
 <p class="pipeline-proof-label">${content.label}</p>
  <h3>${content.title}</h3>

  <p class="pipeline-proof-description">
    ${content.description}
  </p>

  <div class="pipeline-proof-tags">
    ${tagsHTML}
  </div>

  ${linkHTML}
`;

pipelineProof.classList.add("show");

  });
});