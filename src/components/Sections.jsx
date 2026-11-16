import { useEffect, useRef, useState } from 'react';
import { also, stack, contact, interests } from '../data.js';
import { gsap, reduceMotion, finePointer } from '../lib/motion.js';
import { useResume } from '../lib/resume.js';

export function Also() {
  return (
    <section className="also" id="more">
      <div>
        <h2>Building now, and <em>with a team</em>.</h2>
        <div className="list">
          {also.map((a) => (
            <div className="item" key={a.name}>
              <div>
                <h3>{a.name}</h3>
                <p className="status">{a.label}</p>
                <p>{a.blurb}</p>
                {a.stack && <div className="meta">{a.stack.join(' · ')}</div>}
                <div className="links">
                  {a.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section className="stack" id="stack">
      <div>
        <h2>What I <em>build with</em></h2>
        <div className="rows">
          {stack.map(([label, items]) => (
            <div className="row" key={label}>
              <h4>{label}</h4>
              <p>{items.map((i) => <span key={i}>{i}</span>)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hovering an interest floats its image (if it has one) next to the cursor.
function Interests() {
  const box = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!finePointer() || reduceMotion()) return;
    const x = gsap.quickTo(box.current, 'x', { duration: 0.55, ease: 'power3' });
    const y = gsap.quickTo(box.current, 'y', { duration: 0.55, ease: 'power3' });
    const move = (e) => { x(e.clientX); y(e.clientY); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const img = active != null ? interests[active].image : '';

  return (
    <>
      <ul className="interests">
        {interests.map((it, i) => (
          <li key={it.name} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}>
            {it.name}
          </li>
        ))}
      </ul>
      <div className={`preview${img ? ' show' : ''}`} ref={box} aria-hidden="true">
        <div className="preview-in">{img && <img src={img} alt="" />}</div>
      </div>
    </>
  );
}

export function About() {
  return (
    <section className="about" id="about">
      <div>
        <div className="about-top">
          <h2>Code is <em>one half</em> of it.</h2>
          <p>
            I study Computer Science at Strathmore University. Most of my side projects start with something I care about outside the editor: AniTrack came from anime, Touchline from football. The rest of the time it's:
          </p>
        </div>
        <Interests />
      </div>
    </section>
  );
}

export function Contact() {
  const hasResume = useResume();
  const rows = hasResume
    ? [{ label: 'Résumé', hint: 'PDF', href: '/resume.pdf', external: true }, ...contact]
    : contact;
  return (
    <>
      <section className="contact" id="contact">
        <div>
          <h2>Let's <em>build something</em>.</h2>
          <p className="contact-lede">I'm open to software engineering internships and junior roles. Email is the fastest way to reach me.</p>
          <ul>
            {rows.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span>{c.label}</span> <small>{c.hint}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <footer>
        <div><span>© 2026 Rick Muthoka</span><span>Mombasa, Kenya</span></div>
      </footer>
    </>
  );
}
