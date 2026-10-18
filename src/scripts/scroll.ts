// Drives every scroll-linked bit of the page: nav state, progress bars and the
// project slides. Writes attributes and styles directly — no framework re-render.
const keys = ["hero", "profile", "projects", "experience", "skills", "contact"];
const PROJECTS = keys.indexOf("projects");

const wraps = keys.map((k) => document.getElementById(`w-${k}`)!);
const stickies = keys.map((k) => document.getElementById(`s-${k}`)!);
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav]")];
const scrollLabel = document.querySelector<HTMLElement>("[data-scroll-label]")!;
const slides = [...document.querySelectorAll<HTMLElement>("[data-slide]")];
const slideLabel = document.querySelector<HTMLElement>("[data-slide-label]")!;
const projectsBar = document.querySelector<HTMLElement>("[data-projects-bar]")!;
const count = slides.length;

const pad = (n: number, len = 2) => String(n).padStart(len, "0");
const smooth = (k: number) => k * k * (3 - 2 * k);

function update() {
  const de = document.documentElement;
  const vh = window.innerHeight;
  const max = Math.max(1, de.scrollHeight - vh);
  const pct = Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100)));

  let sec = 0;
  wraps.forEach((w, i) => { if (w.getBoundingClientRect().top <= vh * 0.5) sec = i; });

  // progress 0..1 inside the projects pin
  const r = wraps[PROJECTS].getBoundingClientRect();
  const span = Math.max(1, r.height - stickies[PROJECTS].offsetHeight);
  const p = Math.max(0, Math.min(0.999, -r.top / span));

  scrollLabel.textContent = pad(pct, 3);
  navLinks.forEach((a) => a.setAttribute("aria-current", String(a.dataset.nav === keys[sec])));

  // Each project segment: steps over the first 75%, a hold on the last step, then a slide to the next project.
  const t = sec === PROJECTS ? p * count : sec > PROJECTS ? count : 0;
  const base = Math.min(count - 1, Math.floor(t));
  const fr = t - Math.floor(t);
  const k = Math.max(0, Math.min(1, (fr - 0.88) / 0.12));
  const pos = base >= count - 1 ? count - 1 : base + smooth(k);

  slides.forEach((el, i) => {
    const d = i - pos;
    const a = Math.min(1, Math.abs(d));
    const n = Number(el.dataset.steps) || 3;
    let step = 0;
    let local = 0;
    if (sec > PROJECTS || (sec === PROJECTS && i < base)) { step = n - 1; local = 1; }
    else if (sec === PROJECTS && i === base) { local = Math.min(1, fr / 0.75); step = Math.min(n - 1, Math.floor(local * n)); }

    el.style.transform = `translateX(${(d * 100).toFixed(2)}%) scale(${(1 - a * 0.06).toFixed(3)})`;
    el.style.opacity = (1 - a * 0.85).toFixed(2);
    if (el.dataset.step !== String(step)) {
      const no = el.querySelector<HTMLElement>("[data-step-no]")!;
      no.classList.remove("bump");
      void no.offsetWidth;
      no.classList.add("bump");
    }
    el.dataset.step = String(step);
    el.toggleAttribute("data-first", i === 0 && sec === PROJECTS && p < 0.05);
    el.style.setProperty("--local", local.toFixed(3));
    el.style.setProperty("--ph", `${(4 + local * 92).toFixed(1)}%`);
    el.toggleAttribute("inert", Math.abs(d) > 0.5);
    el.querySelector("[data-step-no]")!.textContent = pad(step + 1);
  });

  slideLabel.textContent = pad(Math.round(pos) + 1);
  projectsBar.style.setProperty("--bar", `${sec === PROJECTS ? Math.round(p * 100) : sec > PROJECTS ? 100 : 0}%`);
}

let queued = false;
const schedule = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; update(); });
};

// Click a rail node to jump to the middle of that step.
document.querySelectorAll<HTMLElement>("[data-jump]").forEach((b) =>
  b.addEventListener("click", () => {
    const i = Number(b.dataset.i), j = Number(b.dataset.jump), n = Number(b.dataset.n);
    const w = wraps[PROJECTS];
    const span = Math.max(1, w.offsetHeight - stickies[PROJECTS].offsetHeight);
    const top = w.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + ((j + 0.5) / n) * 0.75) / count) * span, behavior: "smooth" });
  }),
);

window.addEventListener("scroll", schedule, { passive: true });
window.addEventListener("resize", schedule);
update();
