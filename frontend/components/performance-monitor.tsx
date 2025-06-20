"use client";
import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              console.log(`⚡ FCP: ${entry.startTime.toFixed(2)}ms`);
            }
          }
        });
        fcpObserver.observe({ type: 'paint', buffered: true });

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`⚡ LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const delay = entry.processingStart - entry.startTime;
            console.log(`⚡ FID: ${delay.toFixed(2)}ms`);
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              console.log(`⚡ CLS: ${clsValue.toFixed(4)}`);
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Long Tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.warn(`⚠️  Long Task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
        longTaskObserver.observe({ type: 'longtask', buffered: true });

      } catch (e) {
        console.error('Failed to observe performance:', e);
      }
    }

    // Monitor React renders
    if (window.React && window.React.Profiler) {
      console.log('🔍 React Profiler enabled - check React DevTools for render performance');
    }

    // Log performance marks
    const logPerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.group('📊 Page Load Performance');
        console.log(`DNS: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
        console.log(`TCP: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
        console.log(`Request: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`);
        console.log(`Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`);
        console.log(`DOM Processing: ${(navigation.domComplete - navigation.domLoading).toFixed(2)}ms`);
        console.log(`Total Load Time: ${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`);
        console.groupEnd();
      }
    };

    // Log after page load
    if (document.readyState === 'complete') {
      logPerformance();
    } else {
      window.addEventListener('load', logPerformance);
    }

    return () => {
      window.removeEventListener('load', logPerformance);
    };
  }, []);

  return null;
}