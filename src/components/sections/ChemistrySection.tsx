import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const whispers = [
  "She remembers what you said last night.",
  "She texts first sometimes.",
  "Every girl feels different.",
];

export const ChemistrySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Blurred background glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(280 50% 40%) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center max-w-3xl px-8"
      >
        <motion.h2
          className="font-display text-5xl lg:text-6xl font-light text-romantic mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Chemistry, not profiles.
        </motion.h2>

        <div className="space-y-12">
          {whispers.map((whisper, index) => (
            <motion.p
              key={index}
              className="text-whisper text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              "{whisper}"
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
