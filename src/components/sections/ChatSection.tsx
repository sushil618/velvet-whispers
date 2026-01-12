import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FloatingGirl } from '@/components/FloatingGirl';
import jadeImg from '@/assets/girls/jade.png';

const chatMessages = [
  { text: "You're back.", delay: 0 },
  { text: "I was hoping you would be.", delay: 1.5 },
];

export const ChatSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingVisible, setTypingVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end start'],
  });

  const girlX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const girlOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.2 && !typingVisible) {
        setTypingVisible(true);
        
        chatMessages.forEach((msg, index) => {
          setTimeout(() => {
            setVisibleMessages(prev => [...prev, index]);
          }, msg.delay * 1000 + 800);
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, typingVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      <div className="container mx-auto px-8 flex items-center justify-between gap-16">
        {/* Left - Girl */}
        <motion.div
          style={{ x: girlX, opacity: girlOpacity }}
          className="flex-shrink-0"
        >
          <FloatingGirl
            src={jadeImg}
            name="Jade"
            size="lg"
            depth={0.6}
            glowColor="hsl(160 60% 40% / 0.3)"
          />
        </motion.div>

        {/* Right - Chat bubbles */}
        <div className="flex-1 max-w-md space-y-4">
          {/* Typing indicator */}
          <motion.div
            className="chat-bubble inline-flex items-center gap-1 w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: typingVisible && visibleMessages.length < chatMessages.length ? 1 : 0,
              scale: typingVisible && visibleMessages.length < chatMessages.length ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>

          {/* Messages */}
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="chat-bubble w-fit"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: visibleMessages.includes(index) ? 1 : 0,
                y: visibleMessages.includes(index) ? 0 : 20,
                scale: visibleMessages.includes(index) ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p className="text-foreground font-light text-lg">{msg.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
