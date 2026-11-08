import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia(query).matches;
      }
    } catch {
      // fallback
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    try {
      const mediaQueryList = window.matchMedia(query);
      const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

      // Initial sync
      setMatches(mediaQueryList.matches);

      if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
      } else if (typeof (mediaQueryList as any).addListener === 'function') {
        (mediaQueryList as any).addListener(listener);
        return () => (mediaQueryList as any).removeListener(listener);
      }
    } catch {
      // ignore
    }
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
