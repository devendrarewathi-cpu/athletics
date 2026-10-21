'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ATHLETE_CATEGORIES } from '../../content/home';
import { useModal } from '../../modals/modalContext';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function AthleteCategories() {
  const { openModal } = useModal();

  return (
    <section id="who-we-train" className="section athletes" aria-labelledby="athletes-title">
      <div className="container">
        <SectionHeading
          id="athletes-title"
          eyebrow="Athletes of all levels"
          title="Who We Train"
          subtitle="Programs designed for athletes at every stage of their journey."
        />
        <Reveal>
          <Carousel
            label="Athlete categories"
            items={ATHLETE_CATEGORIES}
            getKey={(category) => category.title}
            renderItem={(category) => (
              <button
                type="button"
                className="athlete-card"
                aria-haspopup="dialog"
                aria-label={`${category.title} — ${category.detail}. Start an enrollment inquiry`}
                onClick={() => openModal(category.cta)}
              >
                <span className="athlete-card__media">
                  <Image sizes="(min-width: 1080px) 200px, (min-width: 640px) 33vw, 60vw"
                    src={category.image.src}
                    alt=""
                    width={600}
                    height={480}
                  />
                </span>
                <span className="athlete-card__body">
                  <span className="athlete-card__title">{category.title}</span>
                  <span className="athlete-card__detail">{category.detail}</span>
                  <span className="athlete-card__cta" aria-hidden="true">
                    Get started <ArrowRight size={12} />
                  </span>
                </span>
              </button>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
