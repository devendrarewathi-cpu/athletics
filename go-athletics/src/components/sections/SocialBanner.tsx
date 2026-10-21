'use client';

import Image from 'next/image';
import { IMAGES } from '../../content/images';
import { SOCIAL_LINKS } from '../../content/site';
import { useModal } from '../../modals/modalContext';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function SocialBanner() {
  const { openModal } = useModal();
  const primary = SOCIAL_LINKS.find((link) => link.name === 'Instagram') ?? SOCIAL_LINKS[0];

  return (
    <section className="social-banner" aria-labelledby="social-title">
      <div className="social-banner__collage" aria-hidden="true">
        {IMAGES.social.map((image) => (
          <Image sizes="(min-width: 768px) 25vw, 50vw" key={image.src} src={image.src} alt="" width={700} height={600} />
        ))}
      </div>
      <div className="social-banner__overlay" aria-hidden="true" />
      <Reveal className="container social-banner__content">
        <div>
          <h2 id="social-title" className="social-banner__title">
            Join us on social media
          </h2>
          <p className="social-banner__text">Get the latest updates, events and athlete highlights.</p>
        </div>
        <div className="social-banner__actions">
          {primary && (
            <Button href={primary.href} target="_blank" rel="noopener noreferrer" arrow>
              Follow us
            </Button>
          )}
          <Button
            variant={primary ? 'outline' : 'primary'}
            arrow={!primary}
            aria-haspopup="dialog"
            onClick={() => openModal({ type: 'newsletter' })}
          >
            Get email updates
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
