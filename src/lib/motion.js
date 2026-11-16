import gsap from 'gsap';

export { gsap };
export const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () =>
  window.matchMedia('(pointer: fine) and (hover: hover)').matches;

// Native scrolling only: no smooth-scroll library, no scroll-jacking.
export function scrollToEl(selector, instant = false) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: instant || reduceMotion() ? 'auto' : 'smooth' });
}

export function scrollTop() {
  window.scrollTo(0, 0);
}
