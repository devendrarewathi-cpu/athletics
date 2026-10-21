'use client';

import { Star } from 'lucide-react';
import { SAMPLE_TESTIMONIALS } from '../../content/home';
import { Avatar } from '../ui/Avatar';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section section--light testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          tone="light"
          accent
          title="Testimonials"
          subtitle="Hear from athletes and parents who have experienced the Game Changer difference."
        />
        <p className="sample-note">
          Sample testimonials shown for design purposes — they will be replaced with approved client reviews.
        </p>
        <Reveal>
          <Carousel
            tone="light"
            label="Testimonials"
            className="testimonials__carousel"
            items={SAMPLE_TESTIMONIALS}
            getKey={(item) => item.name}
            renderItem={(item) => (
              <figure className="testimonial-card">
                <div className="stars" role="img" aria-label="5 out of 5 stars (sample)">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} size={16} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="person person--light">
                  <Avatar name={item.name} />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.location}</small>
                  </span>
                </figcaption>
              </figure>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
