import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion.js';
import { Link } from '../lib/router.jsx';
import Tilt from './rb/Tilt.jsx';
import { projects } from '../data.js';
import { Sec } from './Sections.jsx';

export function Shot({ p }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`shot${broken ? ' nofig' : ''}`} data-name={p.name}>
      <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" draggable="false" onError={() => setBroken(true)} />
    </div>
  );
}

function Card({ p, i }) {
  return (
    <Link to={`/projects/${p.id}`} className="card" data-cursor="Open" draggable="false">
      <Tilt><Shot p={p} /></Tilt>
      <div className="cm">
        <span className="no">{String(i + 1).padStart(2, '0')}</span>
        <h3>{p.name}</h3>
        <span className="go">View project ›</span>
        <p>{p.tagline}</p>
        <div className="tags">{p.stack.slice(0, 4).join(' / ')}</div>
      </div>
    </Link>
  );
}

// Desktop: the section pins and vertical scroll slides the cards sideways.
// Touch / small screens / reduced motion: a plain swipeable row.
export default function Rail() {
  const sec = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width:900px) and (prefers-reduced-motion: no-preference)', () => {
      const s = sec.current;
      const t = track.current;
      s.classList.add('pinned');
      const dist = () => Math.max(0, t.scrollWidth - s.clientWidth);
      gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: s, start: 'top top', end: () => '+=' + dist(),
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => { bar.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
      return () => s.classList.remove('pinned');
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="rail" id="work" ref={sec}>
      <div className="rail-head">
        <Sec n="01" label="Work" />
        <h2>Selected work</h2>
        <p>Five shipped projects, all open source. Open any one for the full story.</p>
      </div>
      <div className="viewport">
        <div className="track" ref={track}>
          {projects.map((p, i) => <Card key={p.id} p={p} i={i} />)}
        </div>
      </div>
      <div className="bar"><i ref={bar} /></div>
    </section>
  );
}
