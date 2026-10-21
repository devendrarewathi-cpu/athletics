import { Facebook, Instagram, Youtube, type LucideIcon } from 'lucide-react';
import { SOCIAL_LINKS, type SocialLink } from '../../content/site';

const ICONS: Record<SocialLink['name'], LucideIcon> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
};

/** Renders nothing until verified social URLs are configured (see .env.example). */
export function SocialIcons({ className, size = 16 }: { className?: string; size?: number }) {
  if (SOCIAL_LINKS.length === 0) return null;
  return (
    <ul className={['social-icons', className].filter(Boolean).join(' ')}>
      {SOCIAL_LINKS.map(({ name, href }) => {
        const Icon = ICONS[name];
        return (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`GO Athletics on ${name}`}>
              <Icon size={size} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
