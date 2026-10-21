'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGES } from '../../content/images';
import { useModal } from '../../modals/modalContext';
import { Button } from '../ui/Button';
import { EASE, fadeUp, stagger } from '../../lib/motion';

export function HeroSection() {
  const { openModal } = useModal();

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero__media"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image sizes="100vw"
          className="hero__image"
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          width={1800}
          height={1040}
          priority
        />
      </motion.div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.25, 0.12)}>
          <motion.p variants={fadeUp} className="eyebrow hero__eyebrow">
            Train. Develop. Perform.
          </motion.p>
          <motion.h1 variants={fadeUp} id="hero-title" className="hero__title">
            Built Different.
            <span>Train With Purpose.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="hero__lead">
            Personalized athletic development and sports training in Milford, CT. Assessments, performance training,
            recovery and mental preparation for athletes of all levels.
          </motion.p>
          <motion.div variants={fadeUp} className="hero__actions">
            <Button size="lg" arrow aria-haspopup="dialog" onClick={() => openModal({ type: 'assessment' })}>
              Book an Assessment
            </Button>
            <Button size="lg" variant="outline" aria-haspopup="dialog" onClick={() => openModal({ type: 'program' })}>
              Explore Programs
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
