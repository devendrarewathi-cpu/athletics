'use client';

import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { MAPS_EMBED_URL, MAPS_URL, SITE } from '../../content/site';
import { INLINE_CONTACT_CONFIG } from '../../forms/formConfigs';
import { InquiryForm } from '../../forms/InquiryForm';
import { Reveal } from '../ui/Reveal';

/** Map loads only on request, so no third-party content is fetched without consent. */
function FacilityMap() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        className="facility-map__frame"
        title={`Map showing ${SITE.address.mapsQuery}`}
        src={MAPS_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="facility-map__placeholder">
      <div className="facility-map__pin" aria-hidden="true">
        <MapPin size={30} />
      </div>
      <p className="facility-map__address">
        <strong>{SITE.address.line1}</strong>
        <span>{SITE.address.line2}</span>
      </p>
      <div className="facility-map__actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={() => setLoaded(true)}>
          <span>Load interactive map</span>
        </button>
        <a className="btn btn--light btn--sm" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          <span>Get directions</span>
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="facility-map__note">The interactive map is provided by Google Maps.</p>
    </div>
  );
}

export function FacilityContactSection() {
  return (
    <section id="facility" className="section section--light facility" aria-labelledby="facility-title">
      <div className="container facility__grid">
        <Reveal className="facility__info">
          <h2 id="facility-title" className="facility__title">
            Visit our facility
          </h2>
          <p className="facility__subtitle">Conveniently located in Milford, CT.</p>
          <ul className="facility__details">
            <li>
              <MapPin size={20} aria-hidden="true" />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </a>
            </li>
            <li>
              <Phone size={20} aria-hidden="true" />
              <a href={SITE.phone.href}>{SITE.phone.display}</a>
            </li>
            <li>
              <Mail size={20} aria-hidden="true" />
              <a href={SITE.email.href}>{SITE.email.display}</a>
            </li>
            <li>
              <Clock size={20} aria-hidden="true" />
              <span>Hours: {SITE.hours}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal className="facility-map" delay={0.05}>
          <FacilityMap />
        </Reveal>

        <Reveal className="facility__form" delay={0.1}>
          <div id="contact" className="contact-panel">
            <h2 className="facility__title">Get in touch</h2>
            <p className="facility__subtitle">Have questions? Send us a message.</p>
            <InquiryForm config={INLINE_CONTACT_CONFIG} successAction={{ label: 'Send another message' }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
