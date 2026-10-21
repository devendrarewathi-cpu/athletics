'use client';

import { motion } from 'framer-motion';
import { DIFFERENTIATORS } from '../../content/home';
import { fadeUp } from '../../lib/motion';
import { Stagger } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function DifferentiatorsSection() {
  return (
    <section id="difference" className="section difference" aria-labelledby="difference-title">
      <div className="container">
        <SectionHeading
          id="difference-title"
          accent
          title="The Game Changer Athletics Difference"
          subtitle="More than just training — a complete system for long-term success."
        />
        <Stagger as="ul" className="difference__grid">
          {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
            <motion.li key={title} variants={fadeUp} className="feature-card">
              <span className="feature-card__icon" aria-hidden="true">
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{description}</p>
            </motion.li>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
