import { useEffect, useRef, useState } from 'react';
import { gsap, reduceMotion } from '../lib/motion.js';
import RevealText from './RevealText.jsx';
import { scrollToEl } from '../lib/motion.js';

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
      gsap.from('[data-hero]', { opacity: 0, y: 12, filter: 'blur(6px)', duration: 0.7, ease: 'expo.out', stagger: 0.07, delay: 0.35, clearProps: 'filter' });
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
          color: 0xff8a3d, color2: 0x5a3a22, backgroundColor: 0x0c0907,
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
      <div className="glow" aria-hidden="true" />
      <div className="hero-in">
        <a className="status" data-hero href="https://github.com/muthokaricky-alt/Touchline" target="_blank" rel="noopener noreferrer">
          <span className="live" /><span>Now building <b>Touchline</b>, a football manager game</span>
        </a>
        <RevealText text="I build the software I actually want to use." />
        <p data-hero>
          I'm <strong>Rick Muthoka</strong>, a full-stack developer studying Computer Science at Strathmore
          University. I ship real apps with live demos: an anime tracker, an event booking system, a learning
          platform, and an ad blocker built from scratch.
        </p>
        <ul className="chips" data-hero>
          <li>React &amp; TypeScript</li><li>Node &amp; Postgres</li><li>React Native</li><li>Open to internships</li>
        </ul>
        <div className="cta" data-hero>
          <a className="btn primary" href="#work" onClick={(e) => { e.preventDefault(); scrollToEl('#work'); }}>See my work</a>
          <a className="btn" href="mailto:muthokaricky@gmail.com">Email me</a>
        </div>
      </div>
      <div className="hero-foot" data-hero>
        <span>Mombasa, Kenya · <Clock /></span>
        <span>Scroll</span>
      </div>
    </header>
  );
}
