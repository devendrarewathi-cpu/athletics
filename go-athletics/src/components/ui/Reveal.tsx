'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, fadeUp, stagger } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

/** Fades content up once when it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: fadeUp.hidden,
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
  role?: string;
}

/** Container whose `motion` children using `fadeUp` variants appear one after another. */
export function Stagger({ children, className, as = 'div', role }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      role={role}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger()}
    >
      {children}
    </Component>
  );
}
