import { also, stack, contact } from '../data.js';

export function Also() {
  return (
    <section className="also" id="more">
      <div>
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

export function About() {
  return (
    <section className="about" id="about">
      <div>
        <h2 data-r>Code is one half of it.</h2>
        <p data-r>
          I'm a computer scientist from Strathmore University who likes building software and learning new things. Outside the editor it's movies, series, music, anime and manga, and sports.
        </p>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div>
          <h2 data-r>Get in touch.</h2>
          <ul data-r>
            {contact.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {c.label} <small>{c.hint}</small>
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
