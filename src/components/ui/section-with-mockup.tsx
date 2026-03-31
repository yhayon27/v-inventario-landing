'use client';
import React from "react";
import { motion } from "framer-motion";

interface Props {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  reverseLayout?: boolean;
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function SectionWithMockup({ title, description, children, reverseLayout = false }: Props) {
  return (
    <section className="relative py-24 md:py-36 bg-vi-bg overflow-hidden">
      <div className="max-w-[1220px] w-full px-6 md:px-10 mx-auto">
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center ${reverseLayout ? 'md:grid-flow-col-dense' : ''}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className={`flex flex-col items-start gap-4 max-w-[540px] ${reverseLayout ? 'md:col-start-2' : ''}`} variants={itemVariants}>
            <h2 className="text-white text-3xl md:text-[40px] font-display font-bold leading-tight">{title}</h2>
            <div className="text-[#555] text-sm md:text-[15px] leading-relaxed">{description}</div>
          </motion.div>
          <motion.div className={`relative ${reverseLayout ? 'md:col-start-1' : ''}`} variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
