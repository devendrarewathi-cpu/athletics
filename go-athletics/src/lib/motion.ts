import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});
