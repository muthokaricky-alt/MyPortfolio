import { useEffect, useRef } from 'react';
import { gsap, reduceMotion, finePointer } from '../../lib/motion.js';

// Dot + trailing ring. The ring grows over links and shows a label over [data-cursor].
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!finePointer() || reduceMotion()) return;
    const html = document.documentElement;
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });

    const move = (e) => {
      html.classList.add('cursor-live');
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    };
    const over = (e) => {
      const el = e.target;
      if (!el.closest) return;
      const lbl = el.closest('[data-cursor]');
      const hit = el.closest('a,button,[data-cursor]');
      ring.current.className = 'cur-ring' + (lbl ? ' lbl' : hit ? ' on' : '');
      ring.current.dataset.label = lbl ? lbl.dataset.cursor : '';
    };

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      html.classList.remove('cursor-live');
    };
  }, []);

  return (
    <>
      <div className="cur-ring" ref={ring} aria-hidden="true" />
      <div className="cur-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
