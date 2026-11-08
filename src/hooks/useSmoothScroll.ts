import { useEffect } from 'react';
import { useIsDesktop, usePrefersReducedMotion } from './useMediaQuery';

export function useSmoothScroll() {
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    // Only enable Lenis inertia smooth scroll on desktop when reduced motion is not preferred
    if (!isDesktop || prefersReduced) return;

    let lenisInstance: any = null;
    let animationFrameId: number;
    let isDisposed = false;

    // Dynamically load Lenis so mobile bundles don't incur overhead
    import('lenis')
      .then(({ default: Lenis }) => {
        if (isDisposed) return;

        try {
          const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
          });

          lenisInstance = lenis;

          function raf(time: number) {
            if (lenisInstance) {
              try {
                lenisInstance.raf(time);
              } catch (e) {
                console.warn('Lenis raf error:', e);
              }
              animationFrameId = requestAnimationFrame(raf);
            }
          }

          animationFrameId = requestAnimationFrame(raf);

          // Expose lenis instance globally for route change scroll resetting
          (window as any).__lenis = lenis;
        } catch (err) {
          console.warn('Lenis smooth scroll initialization skipped:', err);
        }
      })
      .catch((err) => {
        console.warn('Could not load Lenis module:', err);
      });

    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      delete (window as any).__lenis;
    };
  }, [isDesktop, prefersReduced]);
}
