'use client';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { FOOTER_PROGRAM_LINKS, FOOTER_QUICK_LINKS, type NavLink } from '../../content/navigation';
import { MAPS_URL, SITE } from '../../content/site';
import { useSectionHref } from '../../hooks/useSectionHref';
import { useModal } from '../../modals/modalContext';
import { ActionLink } from '../ui/ActionLink';
import { Logo } from '../ui/Logo';
import { SocialIcons } from './SocialIcons';

function LinkColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <nav className="footer__column" aria-label={title}>
      <h2 className="footer__heading">{title}</h2>
      <ul className="footer__links">
        {links.map((link) => (
          <li key={link.label}>
            <ActionLink action={link.action} className="footer__link">
              {link.label}
            </ActionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { openModal } = useModal();
  const sectionHref = useSectionHref();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="footer__brand">
          <a href={sectionHref('top')} aria-label={`${SITE.brand} — back to top`}>
            <Logo className="footer__logo" decorative />
          </a>
          <p>{SITE.description}</p>
          <SocialIcons className="footer__social" size={18} />
          <button type="button" className="footer__newsletter" onClick={() => openModal({ type: 'newsletter' })}>
            Subscribe for updates →
          </button>
        </div>

        <LinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
        <LinkColumn title="Our Programs" links={FOOTER_PROGRAM_LINKS} />

        <div className="footer__column">
          <h2 className="footer__heading">Contact Us</h2>
          <ul className="footer__contact">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={SITE.phone.href}>{SITE.phone.display}</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={SITE.email.href}>{SITE.email.display}</a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </a>
            </li>
            <li>
              <Clock size={16} aria-hidden="true" />
              <span>Hours: {SITE.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <ul className="footer__legal">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
