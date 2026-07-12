'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
  light?: boolean;
}

export function AnimatedCounter({ value, suffix = '', label, light = false }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState('0');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse numeric part
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const hasComma = value.includes(',');
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.round(eased * numeric);

      if (hasComma) {
        setDisplayed(current.toLocaleString('en-IN'));
      } else {
        setDisplayed(current.toString());
      }

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplayed(value);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-display text-5xl lg:text-6xl font-bold leading-none ${
          light ? 'text-cream-100' : 'text-maroon-700'
        }`}
      >
        {displayed}
        <span className={light ? 'text-gold-400' : 'text-gold-500'}>{suffix}</span>
      </div>
      <p className={`mt-2 text-sm font-medium tracking-wide uppercase ${
        light ? 'text-cream-300/70' : 'text-charcoal-muted'
      }`}>
        {label}
      </p>
    </div>
  );
}
