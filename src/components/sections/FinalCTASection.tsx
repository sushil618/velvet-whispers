import { motion } from 'framer-motion';
import { FloatingGirl } from '@/components/FloatingGirl';
import violetImg from '@/assets/girls/violet.png';

export const FinalCTASection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Large ambient glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(280 60% 40% / 0.3) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Central girl - closer, more intimate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <FloatingGirl
            src={violetImg}
            name="Violet"
            size="xl"
            depth={0.5}
            glowColor="hsl(280 70% 55% / 0.4)"
          />
        </motion.div>

        {/* Text */}
        <motion.h2
          className="font-display text-5xl lg:text-6xl font-light text-romantic mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your connection starts now.
        </motion.h2>

        {/* App store buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="btn-romantic"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            App Store
          </motion.button>
          <motion.button
            className="btn-subtle"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Google Play
          </motion.button>
        </motion.div>
      </div>

      {/* Footer subtle */}
      <motion.p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        © 2026 Crushly. All rights reserved.
      </motion.p>
    </section>
  );
};
