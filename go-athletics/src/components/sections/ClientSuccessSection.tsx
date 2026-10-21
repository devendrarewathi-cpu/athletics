'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import { SAMPLE_TESTIMONIALS } from '../../content/home';
import { IMAGES } from '../../content/images';
import { Avatar } from '../ui/Avatar';
import { Reveal } from '../ui/Reveal';

const SWIPE_THRESHOLD = 60;

export function ClientSuccessSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const count = SAMPLE_TESTIMONIALS.length;
  const testimonial = SAMPLE_TESTIMONIALS[index];

  const go = (step: 1 | -1) => {
    setDirection(step);
    setIndex((current) => (current + step + count) % count);
  };

  return (
    <section id="results" className="success" aria-labelledby="success-title">
      <Reveal className="success__media">
        <Image sizes="(min-width: 960px) 50vw, 100vw"
          src={IMAGES.successRopes.src}
          alt={IMAGES.successRopes.alt}
          width={1200}
          height={900}
        />
      </Reveal>

      <div className="success__content">
        <Reveal>
          <p className="eyebrow">Real people. Real progress.</p>
          <h2 id="success-title" className="section-title">
            Client Success
          </h2>
          <p className="success__lead">
            We’re proud to help athletes reach their goals and become the best version of themselves.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="success__slider">
          <div className="success__card" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`}>
            <span className="sample-tag">Sample testimonial</span>
            <Quote className="success__quote-icon" size={34} aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={index}
                className="success__figure"
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                }}
              >
                <blockquote>
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="person">
                  <Avatar name={testimonial.name} />
                  <span>
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.location}</small>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="success__controls">
            <button type="button" className="round-btn" onClick={() => go(-1)} aria-label="Previous testimonial">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <div className="carousel__dots carousel__dots--inline">
              {SAMPLE_TESTIMONIALS.map((item, dot) => (
                <button
                  key={item.name}
                  type="button"
                  className={`carousel__dot${dot === index ? ' is-active' : ''}`}
                  aria-label={`Show testimonial ${dot + 1} of ${count}`}
                  aria-current={dot === index ? 'true' : undefined}
                  onClick={() => {
                    setDirection(dot > index ? 1 : -1);
                    setIndex(dot);
                  }}
                />
              ))}
            </div>
            <button type="button" className="round-btn" onClick={() => go(1)} aria-label="Next testimonial">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
