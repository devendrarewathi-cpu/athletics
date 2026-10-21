import { Phone } from 'lucide-react';
import { ANNOUNCEMENT_LINKS } from '../../content/navigation';
import { SITE, SOCIAL_LINKS } from '../../content/site';
import { ActionLink } from '../ui/ActionLink';
import { SocialIcons } from './SocialIcons';

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement__inner">
        <nav aria-label="Client resources" className="announcement__nav">
          <ul>
            {ANNOUNCEMENT_LINKS.map((link) => (
              <li key={link.label}>
                <ActionLink action={link.action} className="announcement__link">
                  {link.label}
                </ActionLink>
              </li>
            ))}
          </ul>
        </nav>
        {SOCIAL_LINKS.length > 0 ? (
          <SocialIcons className="announcement__social" size={14} />
        ) : (
          <a className="announcement__phone" href={SITE.phone.href}>
            <Phone size={13} aria-hidden="true" />
            {SITE.phone.display}
          </a>
        )}
      </div>
    </div>
  );
}
