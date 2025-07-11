// // Force dark theme for mobile on first visit
// (function () {
//   const isMobile = new RegExp("Mobi|Android|iPhone|iPad", "i").test(navigator.userAgent);
//   const savedTheme = localStorage.getItem("preferredTheme");

//   if (isMobile && !savedTheme) {
//     localStorage.setItem("preferredTheme", "dark");
//     document.body.className = "dark-theme";
//   }
// })();



// In script.js, modify the DOMContentLoaded event listener:
document.addEventListener("DOMContentLoaded", () => {
  // Mobile detection first
  const isMobile = new RegExp("Mobi|Android|iPhone|iPad", "i").test(navigator.userAgent);
  const savedTheme = localStorage.getItem("preferredTheme");
  
  // Force dark theme only for mobile on first visit
  if (isMobile && !savedTheme) {
    localStorage.setItem("preferredTheme", "dark");
  }

  // Then proceed with normal theme initialization
  const themeSelect = document.getElementById("themeSelect");
  const finalTheme = localStorage.getItem("preferredTheme") || "dark";
  
  document.body.className = finalTheme + "-theme";
  themeSelect.value = finalTheme;
  toggleBackgroundEffect(finalTheme);
  
  // Rest of your existing code...
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach((reveal) => {
    const top = reveal.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;
    if (top < trigger) {
      reveal.classList.add("active");
    }
  });
});
setTimeout(() => {
  reveals.forEach((reveal) => {
    const top = reveal.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;
    if (top < trigger) {
      reveal.classList.add("active");
    }
  });
}, 100);

// Typewriter Animation
const words = [
  "Debugger", "Architect", "SpringBooter", "TechSeeker",
  "JavaWiz", "CodeWhisperer", "LogicTamer", "BugSquasher"
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typewriter = document.getElementById("typewriter");

function typeLoop() {
  const currentWord = words[wordIndex];
  if (deleting) {
    typewriter.textContent = currentWord.substring(0, charIndex--);
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex++);
  }

  if (!deleting && charIndex === currentWord.length) {
    setTimeout(() => deleting = true, 800);
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = deleting ? 140 : 120;
  setTimeout(typeLoop, speed);
}
typeLoop();
typewriter.style.minHeight = "1.5em"; // Fix height shift

// Canvas Setup
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Stars Animation (Dark Mode)
let stars = [];
function initStars() {
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.2 - 0.1,
    dy: Math.random() * 0.5 + 0.2,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();

    s.x += s.dx;
    s.y += s.dy;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
    if (s.x > canvas.width || s.x < 0) {
      s.dx *= -1;
    }
  });
}

// Paper Plane Animation (Light Mode)
let planes = [];
function initPlanes() {
  planes = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 1.5 + 0.5,
    dy: Math.random() * 0.5 + 0.2,
    size: 5 + Math.random() * 2,
  }));
}

function drawPlanes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  planes.forEach((p) => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.size, p.y + p.size / 2);
    ctx.lineTo(p.x - p.size, p.y - p.size / 2);
    ctx.closePath();
    ctx.fillStyle = "#2980b9";
    ctx.shadowColor = "#b9daef";
    ctx.shadowBlur = 100;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x > canvas.width) {
      p.x = -50;
      p.y = Math.random() * canvas.height;
    }
  });
}

// Animation Loop Controller
let animationMode = "dark"; // will be set properly in DOMContentLoaded

function animateCanvas() {
  if (animationMode === "dark") {
    drawStars();
  } else {
    drawPlanes();
  }
  requestAnimationFrame(animateCanvas);
}

// Theme Switch Background Logic
function toggleBackgroundEffect(theme) {
  if (theme === "dark") {
    animationMode = "dark";
    initStars();
  } else {
    animationMode = "light";
    initPlanes();
  }
}

// Start background animation (only this, do NOT force a theme)
animateCanvas();

// Scroll-to-section logic
function scrollToSection(id) {
  const sectionMap = {
    about: document.querySelector('.section:nth-of-type(1)'),
    experience: document.querySelector('.section:nth-of-type(2)'),
    skills: document.querySelector('.section:nth-of-type(3)'),
    projects: document.querySelector('.section:nth-of-type(4)'),
    connect: document.querySelector('.section:nth-of-type(5)')
  };
  if (sectionMap[id]) {
    sectionMap[id].scrollIntoView({ behavior: "smooth" });
  }
}

// Skills Carousel Logic
const carousel = document.querySelector('.skills-carousel');
const slides = document.querySelectorAll('.skill-slide');
let currentIndex = 0;

document.querySelector('.left-arrow').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});
document.querySelector('.right-arrow').addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
