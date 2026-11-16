import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { projects } from '../data.js';

// Screenshot, or a branded poster when there isn't a usable one.
export function Shot({ p, eager = false }) {
  const [broken, setBroken] = useState(!p.image);
  return (
    <div className={`shot${broken ? ' nofig' : ''}`} data-name={p.name}>
      {p.image && (
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          width="1600"
          height="1000"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}

function Card({ p }) {
  const live = p.links.some((l) => l.label.startsWith('Live'));
  return (
    <Link to={`/projects/${p.id}`} className="card">
      <Shot p={p} />
      <div className="cm">
        <h3>{p.name}{live && <span className="pill-live">Live</span>}</h3>
        <p>{p.tagline}</p>
        <div className="tags">{p.stack.slice(0, 4).join(' · ')}</div>
      </div>
    </Link>
  );
}

export default function Rail() {
  return (
    <section className="rail" id="work">
      <div className="rail-head">
        <h2>Things I've <em>shipped</em></h2>
        <p>{projects.length} projects, all open source, most with a live demo. Open one for the full story.</p>
      </div>
      <div className="grid">
        {projects.map((p) => <Card key={p.id} p={p} />)}
      </div>
    </section>
  );
}
