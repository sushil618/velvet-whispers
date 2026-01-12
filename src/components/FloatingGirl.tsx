import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParallax, getParallaxStyle } from '@/hooks/useParallax';

interface FloatingGirlProps {
  src: string;
  name?: string;
  className?: string;
  depth?: number;
  glowColor?: string;
  showNameOnHover?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  floatDelay?: number;
}

const sizeClasses = {
  sm: 'w-48 h-auto',
  md: 'w-72 h-auto',
  lg: 'w-96 h-auto',
  xl: 'w-[500px] h-auto',
};

export const FloatingGirl = ({
  src,
  name,
  className = '',
  depth = 1,
  glowColor = 'hsl(280 60% 50% / 0.3)',
  showNameOnHover = false,
  size = 'lg',
  floatDelay = 0,
}: FloatingGirlProps) => {
  const { mouseX, mouseY } = useParallax();
  const [isHovered, setIsHovered] = useState(false);

  const parallaxStyle = getParallaxStyle(mouseX, mouseY, depth);

  return (
    <motion.div
      className={`relative ${className}`}
      style={parallaxStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: floatDelay }}
    >
      {/* Glow aura behind */}
      <div
        className="absolute -inset-16 -z-10 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Main image */}
      <motion.img
        src={src}
        alt={name || 'Beautiful AI companion'}
        className={`${sizeClasses[size]} object-contain rounded-2xl`}
        style={{
          filter: 'drop-shadow(0 0 30px hsl(280 60% 40% / 0.5))',
        }}
        animate={{
          y: [0, -8, 0],
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          y: {
            duration: 5 + floatDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: 0.4,
            ease: 'easeOut',
          },
        }}
      />

      {/* Name whisper on hover */}
      {showNameOnHover && name && (
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-whisper text-lg tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.span>
      )}
    </motion.div>
  );
};
