import { useEffect } from 'react';
import { gsap, ScrollTrigger, reduceMotion, startSmoothScroll, scrollToEl } from './lib/motion.js';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import { Also, Stack, About, Contact } from './components/Sections.jsx';

const links = [['Work', '#work'], ['Stack', '#stack'], ['About', '#about'], ['Contact', '#contact']];

function Nav() {
  return (
    <nav>
      <b>Rick Muthoka</b>
      <ul>
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href} onClick={(e) => { e.preventDefault(); scrollToEl(href); }}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function App() {
  useEffect(() => {
    if (reduceMotion()) return;
    const stopScroll = startSmoothScroll();

    const mm = gsap.matchMedia();

    // Desktop: each project pins, and the screenshot grows into place as you scroll.
    mm.add('(min-width:900px)', () => {
      gsap.utils.toArray('.chapter').forEach((ch) => {
        const frame = ch.querySelector('.frame');
        const kids = ch.querySelector('.copy').children;
        gsap.timeline({ scrollTrigger: { trigger: ch, start: 'top top', end: '+=95%', pin: true, scrub: 0.6 } })
          .fromTo(frame, { scale: 0.76, yPercent: 16, rotateX: 9 }, { scale: 1, yPercent: 0, rotateX: 0, ease: 'none', duration: 1 }, 0)
          .fromTo(kids, { opacity: 0, y: 44 }, { opacity: 1, y: 0, ease: 'none', stagger: 0.1, duration: 0.6 }, 0)
          .to({}, { duration: 0.5 });
      });
    });

    // Mobile: plain reveal, no pinning.
    mm.add('(max-width:899px)', () => {
      gsap.utils.toArray('.chapter .copy, .chapter .frame').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-r]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 36, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    });

    const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh);
    if (document.readyState === 'complete') refresh();

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
      mm.revert();
      stopScroll();
    };
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Also />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
