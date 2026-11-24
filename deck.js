/**
 * Moteur du deck : un seul conteneur, un routeur par hash, cinq modes.
 *
 *   #/s/3          présentation, slide 3
 *   #/speaker/3    présentateur (slide + script privé)
 *   #/rehearsal    chronomètre total + repères
 *   #/print        toutes les slides empilées, une par page
 *   #/notes        le script en document lisible
 *   ?mode=print    même chose au chargement : c'est ce que Chrome imprime en PDF
 *
 * Aucune dépendance : modules ES natifs, servis par l'application.
 */

import { CUE_TIMES, SLIDES, TOTAL_SECONDS } from "./slides.js";
import { NOTES } from "./notes.js";

const stage = document.getElementById("stage");
const hud = document.getElementById("hud");
const printStack = document.getElementById("print");
const notesDoc = document.getElementById("notes-doc");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Rendu d'une slide dans un conteneur donné. */
function renderSlide(slide, index, container) {
  const section = document.createElement("section");
  // La variante sombre (ouverture, clôture) vient des données, pas du moteur.
  section.className = slide.tone === "dark" ? "slide title-slide" : "slide";
  section.dataset.id = slide.id;
  section.setAttribute("aria-label", `${index + 1}. ${slide.title}`);
  section.innerHTML = slide.html();
  container.append(section);
  return section;
}

const slides = SLIDES.map((slide, index) => renderSlide(slide, index, stage));

/** HUD : section, compteur, progression et navigation. */
function paintHud(index) {
  const slide = SLIDES[index];
  hud.querySelector(".section").textContent = slide.section;
  hud.querySelector(".counter").textContent = `${index + 1} / ${SLIDES.length}`;
  hud.querySelector(".progress i").style.width = `${((index + 1) / SLIDES.length) * 100}%`;
  hud.querySelector("[data-prev]").disabled = index === 0;
  hud.querySelector("[data-next]").disabled = index === SLIDES.length - 1;
  document.title = `${slide.title} · LeadGuard AI`;
}

function show(index, { animate = true } = {}) {
  const target = clamp(index, 0, SLIDES.length - 1);
  slides.forEach((section, position) => {
    section.hidden = position !== target;
  });
  const current = slides[target];
  if (animate) {
    current.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 260, easing: "cubic-bezier(.22,.61,.36,1)" },
    );
  }
  paintHud(target);
  return target;
}

// --------------------------------------------------------------------- modes

let mode = "presentation";
let index = 0;

function setMode(nextMode, nextIndex = index) {
  mode = nextMode;
  document.body.classList.toggle("speaker", mode === "speaker");
  document.body.classList.toggle("print", mode === "print");
  notesDoc.hidden = mode !== "notes";
  printStack.hidden = mode !== "print";
  stage.hidden = mode === "print" || mode === "notes";
  hud.hidden = mode === "print" || mode === "notes";
  if (mode === "print") renderPrint();
  if (mode === "notes") renderNotes();
  if (mode === "speaker") renderNotesPanel(nextIndex);
  index = show(nextIndex, { animate: mode === "presentation" });
  if (mode !== "rehearsal") stopTimer();
  if (mode === "rehearsal") startTimer();
}

function renderPrint() {
  if (printStack.dataset.ready === "1") return;
  SLIDES.forEach((slide, position) => {
    const section = document.createElement("section");
    section.className = "print-slide";
    const tone = slide.tone === "dark" ? " title-slide" : "";
    section.innerHTML = `<div class="slide${tone}" style="position:absolute;inset:0;padding:48px 56px">${slide.html()}</div>`;
    printStack.append(section);
  });
  printStack.dataset.ready = "1";
}

function renderNotes() {
  if (notesDoc.dataset.ready === "1") return;
  notesDoc.innerHTML = [
    `<h1 style="color:#fff;margin:0 0 6px">Script · LeadGuard AI</h1>`,
    `<p style="color:#94a3b8;margin:0 0 26px">${SLIDES.length} slides · ${format(TOTAL_SECONDS)} au total</p>`,
    ...SLIDES.map((slide, position) => {
      const note = NOTES[slide.id] || {};
      return `
        <article style="background:#fff;color:#1e293b;border-radius:12px;padding:18px 22px;margin-bottom:14px">
          <h2 style="font-size:16px;margin:0 0 4px;color:#0f172a">
            ${position + 1}. ${slide.title}
            <span style="font-weight:500;color:#64748b;font-size:13px"> — ${slide.section} · ${format(slide.seconds)}</span>
          </h2>
          <p style="margin:6px 0;font-size:14px"><strong>Montrer :</strong> ${(note.show || []).join(" · ") || "—"}</p>
          <p style="margin:6px 0;font-size:14px">${note.speech || ""}</p>
          <p style="margin:6px 0;font-size:13.5px;border-left:3px solid #7c3aed;padding-left:10px"><strong>À retenir :</strong> ${note.key || "—"}</p>
          <p style="margin:6px 0;font-size:13px;color:#b45309"><strong>Éviter :</strong> ${(note.avoid || []).join(" · ") || "—"}</p>
        </article>`;
    }),
  ].join("");
  notesDoc.dataset.ready = "1";
}

// ---------------------------------------------------------------- présentateur

let panel;

function renderNotesPanel(position) {
  if (!panel) {
    panel = document.createElement("aside");
    panel.className = "notes-panel";
    document.querySelector(".app").append(panel);
  }
  const slide = SLIDES[position];
  const note = NOTES[slide.id] || {};
  panel.innerHTML = `
    <h3>${position + 1}. ${slide.title}</h3>
    <p><strong>Montrer :</strong> ${(note.show || []).join(" · ") || "—"}</p>
    <p>${note.speech || ""}</p>
    <p class="key">À retenir : ${note.key || "—"}</p>
    <p style="color:#b45309"><strong>Éviter :</strong> ${(note.avoid || []).join(" · ") || "—"}</p>
    <p class="tiny">Suivant : ${note.next || "fin"} · ${format(slide.seconds)} prévues</p>`;
}

// ----------------------------------------------------------------- chronomètre

let timerId = null;
let startedAt = 0;

function format(seconds) {
  const value = Math.max(0, Math.round(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function startTimer() {
  stopTimer();
  startedAt = performance.now();
  const badge = document.createElement("div");
  badge.className = "timer";
  badge.id = "timer";
  document.body.append(badge);
  timerId = setInterval(() => {
    const elapsed = (performance.now() - startedAt) / 1000;
    const remaining = TOTAL_SECONDS - elapsed;
    const cue = CUE_TIMES.filter((cueTime) => cueTime <= elapsed).length;
    badge.textContent = `${format(elapsed)} écoulées · ${format(remaining)} restantes · slide ${clamp(cue + 1, 1, SLIDES.length)}/${SLIDES.length}`;
    badge.className = "timer" + (remaining < 0 ? " over" : remaining < 60 ? " warn" : "");
  }, 250);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  document.getElementById("timer")?.remove();
}

// -------------------------------------------------------------------- routeur

function route() {
  const query = new URLSearchParams(location.search);
  if (query.get("mode") === "print") {
    setMode("print", 0);
    return;
  }
  const [, kind, value] = location.hash.replace(/^#\/?/, "/").split("/");
  const position = Number.parseInt(value || "0", 10);
  switch (kind) {
    case "speaker":
      setMode("speaker", Number.isFinite(position) ? position - 1 : index);
      break;
    case "rehearsal":
      setMode("rehearsal", 0);
      break;
    case "print":
      setMode("print", 0);
      break;
    case "notes":
      setMode("notes", 0);
      break;
    case "s":
      setMode("presentation", Number.isFinite(position) ? position - 1 : index);
      break;
    default:
      setMode("presentation", 0);
  }
}

function go(delta) {
  const target = clamp(index + delta, 0, SLIDES.length - 1);
  if (target === index) return;
  if (mode === "print" || mode === "notes") setMode("presentation", target);
  else {
    index = show(target);
    if (mode === "speaker") renderNotesPanel(index);
  }
  history.replaceState(null, "", `#/s/${index + 1}`);
}

// ------------------------------------------------------------------ entrées

document.addEventListener("keydown", (event) => {
  const keys = ["ArrowRight", "ArrowLeft", " ", "PageDown", "PageUp", "Home", "End"];
  if (keys.includes(event.key)) event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
      go(1);
      break;
    case "ArrowLeft":
    case "PageUp":
    case "Backspace":
      go(-1);
      break;
    case "Home":
      setMode(mode === "speaker" ? "speaker" : "presentation", 0);
      break;
    case "End":
      setMode(mode === "speaker" ? "speaker" : "presentation", SLIDES.length - 1);
      break;
    case "f":
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
      break;
    case "s":
      location.hash = `#/speaker/${index + 1}`;
      break;
    case "r":
      location.hash = "#/rehearsal";
      break;
    case "p":
      location.hash = "#/print";
      break;
    case "n":
      location.hash = "#/notes";
      break;
    case "Escape":
      if (location.hash) location.hash = "";
      break;
    case "?":
      alert(
        "Flèches / espace : naviguer\nHome / Fin : début, fin\nf : plein écran\ns : mode présentateur\nr : répétition chronométrée\np : mode impression (PDF)\nn : script complet",
      );
      break;
    default:
      break;
  }
});

hud.querySelector("[data-prev]").addEventListener("click", () => go(-1));
hud.querySelector("[data-next]").addEventListener("click", () => go(1));
window.addEventListener("hashchange", route);

route();
