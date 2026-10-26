import { useEffect, useRef } from 'react';
import { reduceMotion } from '../../lib/motion.js';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789/<>_-';

// Text that scrambles into place when its parent link is hovered or focused.
export default function Scramble({ text, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    el.textContent = text;
    if (reduceMotion()) return;
    const host = el.closest('a,button') || el;
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const dur = 450;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const settled = Math.floor(p * text.length);
        el.textContent = text
          .split('')
          .map((c, i) => (c === ' ' || i < settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join('');
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(tick);
    };

    host.addEventListener('pointerenter', run);
    host.addEventListener('focus', run);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener('pointerenter', run);
      host.removeEventListener('focus', run);
    };
  }, [text]);

  return <span ref={ref} className={className} aria-label={text} />;
}
