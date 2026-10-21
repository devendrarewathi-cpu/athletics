'use client';

import Image from 'next/image';
import { IMAGES } from '../../content/images';
import { useModal } from '../../modals/modalContext';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function PerformanceBanner() {
  const { openModal } = useModal();

  return (
    <section className="cta-banner" aria-labelledby="cta-banner-title">
      <Image sizes="100vw"
        className="cta-banner__image"
        src={IMAGES.performanceBanner.src}
        alt=""
        width={1800}
        height={700}
      />
      <div className="cta-banner__overlay" aria-hidden="true" />
      <div className="container cta-banner__content">
        <Reveal>
          <h2 id="cta-banner-title" className="cta-banner__title">
            Your performance starts here.
          </h2>
          <p className="cta-banner__text">Take the first step toward a stronger, faster and more confident you.</p>
          <Button size="lg" arrow aria-haspopup="dialog" onClick={() => openModal({ type: 'assessment' })}>
            Book your assessment
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
