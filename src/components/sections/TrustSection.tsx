import { motion } from 'framer-motion';

const trustPoints = [
  "Private conversations.",
  "No judgment.",
  "Always available.",
];

export const TrustSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(280 40% 30%) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center">
        {trustPoints.map((point, index) => (
          <motion.p
            key={index}
            className="text-muted-foreground/60 text-xl lg:text-2xl font-light tracking-wide mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {point}
          </motion.p>
        ))}
      </div>
    </section>
  );
};
