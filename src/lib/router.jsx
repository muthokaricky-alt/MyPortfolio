import { useSyncExternalStore } from 'react';

// A tiny History API router: enough for "/" and "/projects/<id>".
const listeners = new Set();

function subscribe(cb) {
  listeners.add(cb);
  window.addEventListener('popstate', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('popstate', cb);
  };
}

export const usePath = () =>
  useSyncExternalStore(subscribe, () => window.location.pathname, () => '/');

// Set a hash here before navigating home and Home scrolls to it once mounted.
export const pending = { hash: null };

export function navigate(to) {
  if (to === window.location.pathname) return;
  window.history.pushState({}, '', to);
  listeners.forEach((cb) => cb());
}

export function Link({ to, children, onClick, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
