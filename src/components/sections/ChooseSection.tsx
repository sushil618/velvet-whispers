import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FloatingGirl } from '@/components/FloatingGirl';
import violetImg from '@/assets/girls/violet.png';
import ariaImg from '@/assets/girls/aria.png';
import lunaImg from '@/assets/girls/luna.png';
import mikaImg from '@/assets/girls/mika.png';
import sakuraImg from '@/assets/girls/sakura.png';
import jadeImg from '@/assets/girls/jade.png';

const orbitGirls = [
  { src: violetImg, name: 'Violet', angle: 0, distance: 280, depth: 0.9, size: 'md' as const },
  { src: ariaImg, name: 'Aria', angle: 60, distance: 320, depth: 0.7, size: 'sm' as const },
  { src: lunaImg, name: 'Luna', angle: 120, distance: 260, depth: 1, size: 'md' as const },
  { src: mikaImg, name: 'Mika', angle: 180, distance: 300, depth: 0.6, size: 'sm' as const },
  { src: sakuraImg, name: 'Sakura', angle: 240, distance: 340, depth: 0.8, size: 'sm' as const },
  { src: jadeImg, name: 'Jade', angle: 300, distance: 280, depth: 0.5, size: 'md' as const },
];

export const ChooseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex items-center justify-center overflow-hidden"
    >
      {/* Central glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(280 60% 50%) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Header */}
      <motion.h2
        className="absolute top-20 left-1/2 -translate-x-1/2 font-display text-5xl lg:text-6xl font-light text-romantic text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Choose who feels right.
      </motion.h2>

      {/* Orbiting girls */}
      <motion.div
        className="relative w-[700px] h-[700px]"
        style={{ rotate: rotation }}
      >
        {orbitGirls.map((girl, index) => {
          const angleRad = (girl.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * girl.distance;
          const y = Math.sin(angleRad) * girl.distance;

          return (
            <motion.div
              key={girl.name}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: Math.round(girl.depth * 10),
              }}
              // Counter-rotate to keep girls upright
              initial={{ rotate: 0 }}
            >
              <motion.div style={{ rotate: useTransform(rotation, v => -v) }}>
                <FloatingGirl
                  src={girl.src}
                  name={girl.name}
                  size={girl.size}
                  depth={girl.depth}
                  showNameOnHover
                  floatDelay={index * 0.1}
                  glowColor={`hsl(${280 + index * 15} 55% 45% / 0.25)`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
