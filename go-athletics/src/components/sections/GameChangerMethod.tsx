'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { METHOD_STEPS } from '../../content/home';
import { IMAGES } from '../../content/images';
import { useModal } from '../../modals/modalContext';
import { Button } from '../ui/Button';
import { fadeUp } from '../../lib/motion';
import { Reveal, Stagger } from '../ui/Reveal';

export function GameChangerMethod() {
  const { openModal } = useModal();

  return (
    <section id="about" className="method" aria-labelledby="method-title">
      <Reveal className="method__media">
        <Image sizes="(min-width: 960px) 50vw, 100vw" src={IMAGES.method.src} alt={IMAGES.method.alt} width={1200} height={900} />
      </Reveal>

      <div className="method__content">
        <Reveal>
          <p className="eyebrow">The Game Changer Method</p>
          <h2 id="method-title" className="section-title">
            Your performance starts with understanding you.
          </h2>
          <p className="method__lead">
            We take a comprehensive and individualized approach to athletic development, combining assessment, training,
            recovery and mental preparation to help you become a stronger, faster and more confident athlete.
          </p>
        </Reveal>

        <Stagger as="ol" className="method__steps">
          {METHOD_STEPS.map(({ number, icon: Icon, title, description }) => (
            <motion.li key={number} variants={fadeUp} className="step-card">
              <div className="step-card__top">
                <span className="step-card__number">{number}</span>
                <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="step-card__title">{title}</h3>
              <p className="step-card__text">{description}</p>
            </motion.li>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Button arrow aria-haspopup="dialog" onClick={() => openModal({ type: 'service', context: 'Our approach' })}>
            Learn more about our approach
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
