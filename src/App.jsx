import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, gsap, reduceMotion, startSmoothScroll, scrollToEl, scrollTop } from './lib/motion.js';
import { usePath, navigate, pending, Link } from './lib/router.jsx';
import { projects } from './data.js';
import Hero from './components/Hero.jsx';
import Rail from './components/Rail.jsx';
import Activity from './components/Activity.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import Cursor from './components/rb/Cursor.jsx';
import Scramble from './components/rb/Scramble.jsx';
import { Also, Stack, About, Contact } from './components/Sections.jsx';

const links = [['Work', '#work'], ['Stack', '#stack'], ['About', '#about'], ['Contact', '#contact']];

function Nav({ path }) {
  const home = path === '/';
  const [active, setActive] = useState('');
  const prog = useRef(null);

  // Thin reading-progress line under the bar.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      prog.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path]);

  // Highlight the section currently in view.
  useEffect(() => {
    setActive('');
    if (!home) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(([, h]) => { const el = document.getElementById(h.slice(1)); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [path, home]);

  const go = (hash) => (e) => {
    e.preventDefault();
    if (home) scrollToEl(hash);
    else { pending.hash = hash; navigate('/'); }
  };

  return (
    <nav>
      <a href="/" className="brand" onClick={(e) => { e.preventDefault(); home ? scrollToEl('#hero') : navigate('/'); }}>
        <b>Rick Muthoka</b>
      </a>
      <ul>
        {links.map(([label, hash]) => (
          <li key={hash}>
            <a href={`/${hash}`} className={active === hash.slice(1) ? 'on' : ''} onClick={go(hash)}>
              <Scramble text={label} />
            </a>
          </li>
        ))}
      </ul>
      <i className="prog" ref={prog} />
    </nav>
  );
}

function Home() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduceMotion()) return;
      gsap.utils.toArray('[data-r]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 36, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    }, root);

    const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh);
    requestAnimationFrame(refresh);

    if (pending.hash) {
      const hash = pending.hash;
      pending.hash = null;
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToEl(hash)));
    }

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <Hero />
      <Rail />
      <Activity />
      <Also />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}

function NotFound() {
  return (
    <main className="nf">
      <div>
        <div className="sec"><b>404</b><i /><span>Not found</span></div>
        <h1>That page isn't here.</h1>
        <p><Link to="/">Back to the portfolio</Link></p>
      </div>
    </main>
  );
}

export default function App() {
  const path = usePath();
  const match = path.match(/^\/projects\/([\w-]+)\/?$/);
  const project = match && projects.find((p) => p.id === match[1]);
  const first = useRef(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (reduceMotion()) return;
    return startSmoothScroll();
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    scrollTop();
  }, [path]);

  useEffect(() => {
    document.title = project
      ? `${project.name} — Rick Muthoka`
      : path === '/' ? 'Rick Muthoka — Software Engineer' : 'Not found — Rick Muthoka';
  }, [path, project]);

  return (
    <>
      <Cursor />
      <Nav path={path} />
      {project ? <ProjectPage key={project.id} p={project} /> : path === '/' ? <Home /> : <NotFound />}
    </>
  );
}
