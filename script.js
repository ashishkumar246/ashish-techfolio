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

const selectedRepos = [
  "trustguard-agent",
  "weather-news-chatbot",
  "postgres-data-manager"
];

fetch("https://api.github.com/users/ashishkumar246/repos")
  .then(res => res.json())
  .then(data => {
    const filtered = data.filter(repo =>
      selectedRepos.includes(repo.name)
    );

    filtered.forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${repo.name.replaceAll("-", " ")}</h3>
        <p>${repo.description || "No description available"}</p>
        <span>${repo.language || "Tech not specified"}</span>
        <br><br>
        <a href="${repo.html_url}" target="_blank" class="btn">VIEW CODE</a>
      `;

      projectsGrid.appendChild(card);
    });
  })
  .catch(err => console.log(err));

document.getElementById("year").textContent = new Date().getFullYear();