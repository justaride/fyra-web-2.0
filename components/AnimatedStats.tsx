'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, Hotel, Users } from 'lucide-react';

interface AnimatedStatsProps {
  supplierCount: number;
  caseStudyCount: number;
  consultantCount: number;
}

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);

            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing: easeOutExpo
              const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

              setCount(Math.round(end * easeOut));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return { count, ref };
}

export function AnimatedStats({ supplierCount, caseStudyCount, consultantCount }: AnimatedStatsProps) {
  const suppliers = useCountUp(supplierCount);
  const caseStudies = useCountUp(caseStudyCount);
  const consultants = useCountUp(consultantCount);

  return (
    <div ref={suppliers.ref} className="flex flex-wrap justify-center gap-8 text-sm">
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-teal-400" />
        <span>
          <strong className="tabular-nums">{suppliers.count}</strong> Verified Suppliers
        </span>
      </div>
      <div ref={caseStudies.ref} className="flex items-center gap-2">
        <Hotel className="w-4 h-4 text-teal-400" />
        <span>
          <strong className="tabular-nums">{caseStudies.count}</strong> Case Studies
        </span>
      </div>
      <div ref={consultants.ref} className="flex items-center gap-2">
        <Users className="w-4 h-4 text-teal-400" />
        <span>
          <strong className="tabular-nums">{consultants.count}</strong> Expert Consultants
        </span>
      </div>
    </div>
  );
}
