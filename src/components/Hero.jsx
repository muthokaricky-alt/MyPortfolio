import { useEffect, useRef, useState } from 'react';
import { gsap, reduceMotion } from '../lib/motion.js';
import RevealText from './RevealText.jsx';

const fmtTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date());

function Clock() {
  const [t, setT] = useState(fmtTime());
  useEffect(() => {
    const id = setInterval(() => setT(fmtTime()), 20000);
    return () => clearInterval(id);
  }, []);
  return <span>{t} EAT</span>;
}

// three r134 + Vanta come from a CDN as plain scripts (Vanta targets that exact three release,
// and the script route avoids ES-module interop problems). Loaded once, in order, on demand.
const VENDOR = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.dots.min.js',
];
let vendorReady = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(s);
  });
}

function loadVanta() {
  if (!vendorReady) {
    vendorReady = (async () => { for (const src of VENDOR) await loadScript(src); })();
    vendorReady.catch(() => { vendorReady = null; });
  }
  return vendorReady;
}

export default function Hero() {
  const root = useRef(null);
  const bg = useRef(null);

  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);

  // Vanta dot field: desktop only, and only running while the hero is on screen.
  useEffect(() => {
    if (reduceMotion() || window.innerWidth < 900) return;
    let fx = null;
    let visible = false;
    let gone = false;

    const start = async () => {
      if (fx) return;
      try {
        await loadVanta();
        if (gone || !visible || fx) return;
        fx = window.VANTA.DOTS({
          el: bg.current,
          mouseControls: true, touchControls: false, gyroControls: false,
          minHeight: 200, minWidth: 200, scale: 1,
          color: 0xf5f5f7, color2: 0x6e6e73, backgroundColor: 0x000000,
          size: 2.6, spacing: 36, showLines: false,
        });
      } catch (err) {
        console.error('Hero dot field failed to start:', err);
      }
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
      <div className="hero-foot" data-hero>
        <span>Mombasa, Kenya · <Clock /></span>
        <span>Scroll</span>
      </div>
    </header>
  );
}
