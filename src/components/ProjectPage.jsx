import { useEffect, useRef, useState } from 'react';
import { gsap, reduceMotion } from '../lib/motion.js';
import { Link, navigate, pending } from '../lib/router.jsx';
import { projects } from '../data.js';
import RevealText from './RevealText.jsx';
import { Shot } from './Rail.jsx';
import { Contact } from './Sections.jsx';

// Runs the live project inside a browser-style frame. Loads only when asked.
function LiveEmbed({ url, name }) {
  const [on, setOn] = useState(false);
  return (
    <div className="pp-embed">
      <h2>Try it</h2>
      <p className="embed-note">It runs right here in the page.</p>
      <div className="browser">
        <div className="browser-bar">
          <span>{url.replace('https://', '')}</span>
          <a href={url} target="_blank" rel="noopener noreferrer">Open in a tab</a>
        </div>
        <div className="browser-body">
          {on ? (
            <iframe
              title={`${name} live demo`}
              src={url}
              allow="camera; clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"
            />
          ) : (
            <button type="button" onClick={() => setOn(true)}>Load the live demo</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage({ p }) {
  const root = useRef(null);
  const i = projects.findIndex((x) => x.id === p.id);
  const next = projects[(i + 1) % projects.length];
  const hasExtras = p.embed || (p.gallery && p.gallery.length > 0);

  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-in]', { opacity: 0, y: 12, duration: 0.7, ease: 'expo.out', stagger: 0.07, delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, [p.id]);

  const backToWork = (e) => {
    e.preventDefault();
    pending.hash = '#work';
    navigate('/');
  };

  return (
    <main className="pp" ref={root}>
      <section className="pp-top">
        <a href="/#work" className="back" onClick={backToWork}>All work</a>
        <RevealText as="h1" className="p-title" text={p.name} delay={0.1} />
        <p className="tagline" data-in>{p.tagline}</p>
        <p className="kind" data-in>{p.kind}</p>
        <div className="links" data-in>
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </section>

      <section className="pp-shot">
        <Shot p={p} eager />
      </section>

      <section className="pp-body">
        <div>
          <div>
            <h2>The idea</h2>
            <p className="story">{p.story}</p>
            <div className="pp-stack">
              <h2>Built with</h2>
              <p>{p.stack.map((s) => <span key={s}>{s}</span>)}</p>
            </div>
          </div>
          <div>
            <h2>Highlights</h2>
            <ul className="hl">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </div>
      </section>

      {hasExtras && (
        <section className="pp-extras">
          {p.embed && <LiveEmbed url={p.embed} name={p.name} />}
          {p.gallery && p.gallery.length > 0 && (
            <div className="pp-gallery">
              {p.gallery.map((g) => (
                <figure key={g.src}>
                  <div className="shot"><img src={g.src} alt={g.caption || `${p.name} screenshot`} loading="lazy" /></div>
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      <Link to={`/projects/${next.id}`} className="pp-next">
        <div>
          <small>Next project</small>
          <b>{next.name}</b>
        </div>
      </Link>

      <Contact />
    </main>
  );
}
