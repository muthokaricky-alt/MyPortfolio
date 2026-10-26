import { useEffect, useRef } from 'react';
import { gsap, reduceMotion, finePointer } from '../../lib/motion.js';

// Pulls its child toward the pointer, then springs back.
export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reduceMotion()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1,0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1,0.4)' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return <span ref={ref} className={className} style={{ display: 'inline-block' }}>{children}</span>;
}
