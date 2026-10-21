'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROGRAM_CARDS } from '../../content/home';
import { useModal } from '../../modals/modalContext';
import { fadeUp } from '../../lib/motion';
import { Stagger } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function ProgramsSection() {
  const { openModal } = useModal();

  return (
    <section id="programs" className="section programs" aria-labelledby="programs-title">
      <div className="container">
        <SectionHeading
          id="programs-title"
          accent
          title="Our Courses & Programs"
          subtitle="Comprehensive programs to help you train, recover and perform at your best."
        />
        <Stagger className="programs__grid">
          {PROGRAM_CARDS.map((program) => (
            <motion.article key={program.title} variants={fadeUp} className="program-card">
              <div className="program-card__media">
                <Image sizes="(min-width: 1080px) 200px, (min-width: 640px) 33vw, 100vw"
                  src={program.image.src}
                  alt={program.image.alt}
                  width={800}
                  height={560}
                />
              </div>
              <div className="program-card__body">
                <h3 className="program-card__title">{program.title}</h3>
                <p className="program-card__text">{program.description}</p>
                <button
                  type="button"
                  className="text-link"
                  aria-haspopup="dialog"
                  aria-label={`Explore ${program.title}`}
                  onClick={() => openModal(program.cta)}
                >
                  Explore <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
