const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let w = canvas.width;
let h = canvas.height;
let t = 0;

// Handle resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  w = canvas.width;
  h = canvas.height;
});

// === Draw Analytics Style Elements ===
function drawBars() {
  const barCount = 8;
  const barWidth = 40;
  const gap = 20;
  const baseY = h * 0.8;

  for (let i = 0; i < barCount; i++) {
    const height = 80 + Math.sin(t / 20 + i) * 50;
    ctx.fillStyle = "rgba(102, 252, 241, 0.25)"; // teal glow
    ctx.fillRect(100 + i * (barWidth + gap), baseY - height, barWidth, height);
  }
}

function drawLineChart() {
  ctx.beginPath();
  ctx.moveTo(100, h * 0.5);
  for (let x = 100; x < w - 100; x += 40) {
    const y = h * 0.5 + Math.sin((x / 80) + t / 40) * 50;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "rgba(102, 252, 241, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawPieChart() {
  const radius = 80;
  const cx = w - 200, cy = 200;
  const slices = 5;

  for (let i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(
      cx,
      cy,
      radius,
      (i * 2 * Math.PI / slices) + t / 100,
      ((i + 1) * 2 * Math.PI / slices) + t / 100
    );
    ctx.closePath();
    ctx.fillStyle = `hsla(${i * 60}, 70%, 60%, 0.2)`;
    ctx.fill();
  }
}

// === Animate Loop ===
function animate() {
  ctx.clearRect(0, 0, w, h);

  // dark overlay background
  ctx.fillStyle = "rgba(11,14,18,0.85)";
  ctx.fillRect(0, 0, w, h);

  drawBars();
  drawLineChart();
  drawPieChart();

  t++;
  requestAnimationFrame(animate);
}

animate();

const backToTopBtn = document.getElementById("backToTop");

// Show button when scrolled down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.pointerEvents = "auto";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
  }
});

// Smooth scroll to top when clicked
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


