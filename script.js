document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- Smooth Scroll ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /* ---------------- Sticky Header ---------------- */
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ---------------- Mobile Hamburger Toggle ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  }

  /* ---------------- Scroll To Top ---------------- */
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Active Link Highlight ---------------- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href").includes(current));
    });
  });

  /* ---------------- Reveal Animation ---------------- */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ---------------- Skill Bar Animation ---------------- */
  const skillFills = document.querySelectorAll(".skill-bar-fill");
  const skillsSection = document.querySelector("#skill");
  let skillsStarted = false;

  function animateSkills() {
    skillFills.forEach((fill, index) => {
      const targetWidth = fill.getAttribute("data-width");
      const percentage = parseInt(targetWidth);
      const counter = fill.querySelector(".counter");

      fill.style.width = "0";
      setTimeout(() => { fill.style.width = targetWidth; }, 150 * index);

      let current = 0;
      const updateCounter = () => {
        if (current <= percentage) {
          counter.textContent = current + "%";
          current++;
          setTimeout(updateCounter, 20);
        }
      };
      updateCounter();
    });
  }

  if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !skillsStarted) {
        skillsStarted = true;
        animateSkills();
      }
    }, { threshold: 0.5 });
    observer.observe(skillsSection);
  }

  /* ---------------- Theme Toggle ---------------- */
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", saved);
  toggleBtn.innerHTML = saved === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

  toggleBtn.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.innerHTML = newTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  /* ---------------- Typewriter Effect ---------------- */
  const roles = ["Web Developer", "ML Enthusiast", "Data Scientist"];
  let i = 0, j = 0, current = roles[i];
  const h2 = document.querySelector(".hero-right h2:last-of-type");
  function type() {
    if (j < current.length) {
      h2.textContent = current.substring(0, j + 1);
      j++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }
  function erase() {
    if (j > 0) {
      h2.textContent = current.substring(0, j - 1);
      j--;
      setTimeout(erase, 50);
    } else {
      i = (i + 1) % roles.length;
      current = roles[i];
      setTimeout(type, 500);
    }
  }
  if (h2) type();

  /* ---------------- Modal ---------------- */
  document.querySelectorAll(".open-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modal).style.display = "flex";
    });
  });
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });
  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) e.target.style.display = "none";
  });

  /* ---------------- Project Filtering ---------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        card.style.display = filter === "all" || card.classList.contains(filter) ? "block" : "none";
      });
    });
  });

  /* ---------------- Particles.js ---------------- */
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 45, density: { enable: true, value_area: 900 } },
        color: { value: "#bfa76f" },
        shape: { type: ["circle", "triangle", "edge"] },
        opacity: { value: 0.15, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 0.8, out_mode: "out" },
        line_linked: { enable: false }
      },
      interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
      retina_detect: true
    });
  }

});
