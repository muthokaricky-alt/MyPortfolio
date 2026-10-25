import { Fragment, useEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion.js';

// Word-by-word rise. Stand-in for ReactBits' SplitText (see README to swap it).
export default function RevealText({ text, as: Tag = 'h1', className, delay = 0.15, stagger = 0.07 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.i', { yPercent: 115, duration: 1.3, ease: 'expo.out', stagger, delay });
    }, ref);
    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true"><span className="i">{word}</span></span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
