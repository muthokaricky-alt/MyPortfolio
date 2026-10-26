import { useEffect, useRef, useState } from 'react';
import { also, stack, contact, interests } from '../data.js';
import { gsap, reduceMotion, finePointer } from '../lib/motion.js';
import { useResume } from '../lib/resume.js';
import Scramble from './rb/Scramble.jsx';
import Magnetic from './rb/Magnetic.jsx';

export function Sec({ n, label }) {
  return (
    <div className="sec" data-r>
      <b>{n}</b><i /><span>{label}</span>
    </div>
  );
}

export function Also() {
  return (
    <section className="also" id="more">
      <div>
        <Sec n="03" label="More" />
        <h2 data-r>In progress, and in a team.</h2>
        <div className="list">
          {also.map((a) => (
            <div className="item" data-r key={a.name}>
              <h4>{a.label}</h4>
              <div>
                <h5>{a.name}</h5>
                <p>{a.blurb}</p>
                {a.stack && <div className="meta">{a.stack.join(' / ')}</div>}
                <div className="links">
                  {a.links.map((l) => (
                    <Magnetic key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    </Magnetic>
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
        <Sec n="04" label="Stack" />
        <h2 data-r>What I work with</h2>
        <div className="rows">
          {stack.map(([label, items]) => (
            <div className="row" data-r key={label}>
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
      <ul className="interests" data-r>
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
        <Sec n="05" label="About" />
        <div className="about-top">
          <h2 data-r>Code is one half of it.</h2>
          <p data-r>
            I'm a computer scientist from Strathmore University who likes building software and learning new things. Outside the editor it's:
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
          <Sec n="06" label="Contact" />
          <h2 data-r>Get in touch.</h2>
          <ul data-r>
            {rows.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Scramble text={c.label} /> <small>{c.hint}</small>
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
