import { useEffect, useRef } from 'react';
import { gsap, reduceMotion, finePointer } from '../../lib/motion.js';

// 3D tilt that follows the pointer.
export default function Tilt({ children, max = 6 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reduceMotion()) return;
    gsap.set(el, { transformPerspective: 1000 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
    };
    const leave = () => { rx(0); ry(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { rotationX: 0, rotationY: 0 });
    };
  }, [max]);

  return <div ref={ref} className="tilt">{children}</div>;
}
