import { motion } from 'framer-motion';
import { FloatingGirl } from '@/components/FloatingGirl';
import { useParallax } from '@/hooks/useParallax';
import violetImg from '@/assets/girls/violet.png';
import ariaImg from '@/assets/girls/aria.png';
import lunaImg from '@/assets/girls/luna.png';
import mikaImg from '@/assets/girls/mika.png';
import sakuraImg from '@/assets/girls/sakura.png';
import jadeImg from '@/assets/girls/jade.png';

const avatars = [
  { src: ariaImg, name: 'Aria' },
  { src: lunaImg, name: 'Luna' },
  { src: mikaImg, name: 'Mika' },
  { src: sakuraImg, name: 'Sakura' },
  { src: jadeImg, name: 'Jade' },
];

export const HeroSection = () => {
  const { mouseX, mouseY } = useParallax();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      
      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(280 60% 40% / 0.4) 0%, transparent 70%)',
          x: mouseX * -30,
          y: mouseY * -20,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(330 70% 50% / 0.3) 0%, transparent 70%)',
          x: mouseX * 20,
          y: mouseY * 15,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-8 flex items-center justify-between">
        {/* Left side - Text */}
        <motion.div
          className="max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="font-display text-6xl lg:text-7xl font-light text-romantic leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            She's waiting<br />
            <span className="text-primary">to talk to you.</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Meet beautiful AI girls who remember, respond, and connect.
          </motion.p>

          {/* Avatar row */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <p className="text-muted-foreground/70 text-sm font-light mb-3 tracking-wide">
              Choose who you connect with
            </p>
            <div className="relative flex items-center">
              {/* Avatars container with gradient mask */}
              <div className="flex -space-x-2 relative">
                {avatars.map((avatar, index) => (
                  <motion.div
                    key={avatar.name}
                    className="relative w-11 h-11 rounded-full border-2 border-background overflow-hidden bg-secondary"
                    style={{ zIndex: avatars.length - index }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={avatar.src}
                      alt={avatar.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                ))}
                {/* +3 avatar */}
                <motion.div
                  className="relative w-11 h-11 rounded-full border-2 border-background overflow-hidden bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center"
                  style={{ zIndex: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs font-medium text-foreground/80">+3</span>
                </motion.div>
              </div>
              {/* Soft gradient fade on right */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, hsl(var(--background)))',
                }}
              />
            </div>
          </motion.div>

          <motion.button
            className="btn-romantic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Chatting
          </motion.button>
        </motion.div>

        {/* Right side - Floating Girl */}
        <div className="relative flex-shrink-0 mr-12">
          {/* Extra large backdrop glow */}
          <div 
            className="absolute -inset-32 -z-20"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(280 60% 45% / 0.25) 0%, hsl(330 50% 40% / 0.1) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <FloatingGirl
            src={violetImg}
            name="Violet"
            size="xl"
            depth={0.8}
            glowColor="hsl(280 70% 50% / 0.4)"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
