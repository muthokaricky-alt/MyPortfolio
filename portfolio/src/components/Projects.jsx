import { useState } from 'react';
import { projects } from '../data.js';

function Chapter({ p, dark }) {
  const [broken, setBroken] = useState(false);
  return (
    <section className={`chapter ${dark ? 'dark' : 'light flip'}`}>
      <div className="inner">
        <div className="copy">
          <div className="kind">{p.kind}</div>
          <h3>{p.name}</h3>
          <p>{p.blurb}</p>
          <div className="meta">{p.stack.join(' / ')}</div>
          <div className="links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="fig">
          <div className={`frame${broken ? ' nofig' : ''}`} data-name={p.name}>
            <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" onError={() => setBroken(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <>
      <div className="head" id="work" data-r>
        <h2>Selected work</h2>
        <p>Five shipped projects, all open source.</p>
      </div>
      {projects.map((p, i) => <Chapter key={p.id} p={p} dark={i % 2 === 0} />)}
    </>
  );
}
