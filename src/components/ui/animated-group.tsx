'use client';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

type PresetType = 'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide';

const defaultContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const presets: Record<PresetType, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(4px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
  'blur-slide': { hidden: { opacity: 0, filter: 'blur(4px)', y: 20 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
};

interface Props {
  children: ReactNode;
  className?: string;
  preset?: PresetType;
  stagger?: number;
}

export function AnimatedGroup({ children, className, preset = 'blur-slide', stagger = 0.1 }: Props) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={container} className={cn(className)}>
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={presets[preset]}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
