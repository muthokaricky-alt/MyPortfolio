import { useEffect, useState } from 'react';

// Shows the résumé link only once a real file exists at public/resume.pdf.
export function useResume() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let dead = false;
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((r) => {
        if (!dead && r.ok && (r.headers.get('content-type') || '').includes('pdf')) setOk(true);
      })
      .catch(() => {});
    return () => { dead = true; };
  }, []);
  return ok;
}
