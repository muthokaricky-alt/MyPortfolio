import { useEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion.js';
import RevealText from './RevealText.jsx';

export default function Hero() {
  const root = useRef(null);
  const bg = useRef(null);

  // Fade in the supporting copy.
  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);

  // Vanta dot field: desktop only, lazy-loaded, and only running while the hero is on screen.
  useEffect(() => {
    if (reduceMotion() || window.innerWidth < 900) return;
    let fx = null;
    let visible = false;
    let gone = false;

    const start = async () => {
      if (fx) return;
      const [{ default: DOTS }, THREE] = await Promise.all([
        import('vanta/dist/vanta.dots.min'),
        import('three'),
      ]);
      if (gone || !visible || fx) return;
      window.THREE = window.THREE || THREE;
      fx = DOTS({
        el: bg.current, THREE,
        mouseControls: true, touchControls: false, gyroControls: false,
        minHeight: 200, minWidth: 200, scale: 1,
        color: 0xf5f5f7, color2: 0x6e6e73, backgroundColor: 0x000000,
        size: 2.6, spacing: 36, showLines: false,
      });
    };
    const stop = () => { if (fx) { fx.destroy(); fx = null; } };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0.05 });
    io.observe(root.current);

    return () => { gone = true; io.disconnect(); stop(); };
  }, []);

  return (
    <header id="hero" ref={root}>
      <div id="vanta" ref={bg} />
      <div className="hero-in">
        <div className="eyebrow" data-hero>Rick Muthoka</div>
        <RevealText text="Software, from the database to the pixel." />
        <p data-hero>
          Computer Science at Strathmore University. Full-stack web apps, a browser extension, and a QR encoder written from scratch.
        </p>
      </div>
      <div className="cue" data-hero>Scroll</div>
    </header>
  );
}
