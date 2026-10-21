'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PILLARS } from '../../content/home';
import { useModal } from '../../modals/modalContext';
import { fadeUp } from '../../lib/motion';
import { Stagger } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function FeaturePillars() {
  const { openModal } = useModal();

  return (
    <section id="training" className="section pillars" aria-labelledby="pillars-title">
      <div className="container">
        <SectionHeading
          id="pillars-title"
          eyebrow="Our core services"
          title="Three Feature Pillars"
          subtitle="A complete approach to athletic development."
        />
        <Stagger className="pillars__grid">
          {PILLARS.map((pillar) => (
            <motion.article key={pillar.title} variants={fadeUp} className="image-card">
              <div className="image-card__media">
                <Image sizes="(min-width: 900px) 33vw, 100vw"
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  width={900}
                  height={640}
                />
              </div>
              <div className="image-card__content">
                <h3 className="image-card__title">{pillar.title}</h3>
                <p className="image-card__text">{pillar.description}</p>
                <button
                  type="button"
                  className="text-link"
                  aria-haspopup="dialog"
                  aria-label={`Learn more about ${pillar.title}`}
                  onClick={() => openModal(pillar.cta)}
                >
                  Learn more <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
