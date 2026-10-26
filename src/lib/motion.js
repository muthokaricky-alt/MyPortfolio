import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () =>
  window.matchMedia('(pointer: fine)').matches;

let active = null;

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
export function startSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.09 });
  active = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    active = null;
  };
}

export function scrollToEl(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (active) active.scrollTo(el, { offset: -48, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function scrollTop() {
  if (active) active.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
