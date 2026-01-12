import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FloatingGirl } from '@/components/FloatingGirl';
import ariaImg from '@/assets/girls/aria.png';
import lunaImg from '@/assets/girls/luna.png';
import mikaImg from '@/assets/girls/mika.png';
import sakuraImg from '@/assets/girls/sakura.png';

const girls = [
  { src: ariaImg, name: 'Aria', x: '5%', y: '15%', depth: 0.6, size: 'md' as const, delay: 0.2 },
  { src: lunaImg, name: 'Luna', x: '65%', y: '10%', depth: 1, size: 'lg' as const, delay: 0.4 },
  { src: mikaImg, name: 'Mika', x: '25%', y: '55%', depth: 0.8, size: 'md' as const, delay: 0.3 },
  { src: sakuraImg, name: 'Sakura', x: '75%', y: '50%', depth: 0.5, size: 'sm' as const, delay: 0.5 },
];

export const WorldOpensSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] overflow-hidden"
    >
      {/* Section gradient overlay */}
      <div className="section-gradient absolute inset-0 pointer-events-none" />

      <motion.div style={{ opacity }} className="relative h-full w-full">
        {girls.map((girl, index) => (
          <div
            key={girl.name}
            className="absolute"
            style={{
              left: girl.x,
              top: girl.y,
              zIndex: Math.round(girl.depth * 10),
            }}
          >
            <FloatingGirl
              src={girl.src}
              name={girl.name}
              size={girl.size}
              depth={girl.depth}
              showNameOnHover
              floatDelay={girl.delay}
              glowColor={`hsl(${280 + index * 20} 60% 45% / 0.3)`}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
