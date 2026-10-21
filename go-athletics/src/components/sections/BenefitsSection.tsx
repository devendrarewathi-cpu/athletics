'use client';

import { motion } from 'framer-motion';
import { BENEFITS } from '../../content/home';
import { fadeUp } from '../../lib/motion';
import { Stagger } from '../ui/Reveal';

export function BenefitsSection() {
  return (
    <section className="benefits" aria-label="Why train with GO Athletics">
      <Stagger as="ul" className="container benefits__grid">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <motion.li key={title} variants={fadeUp} className="benefit">
            <span className="icon-ring" aria-hidden="true">
              <Icon size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="benefit__title">{title}</h3>
              <p className="benefit__text">{description}</p>
            </div>
          </motion.li>
        ))}
      </Stagger>
    </section>
  );
}
