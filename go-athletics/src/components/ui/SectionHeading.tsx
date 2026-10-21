import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  /** Render the title in brand red (used by several centered headings). */
  accent?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  accent = false,
}: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className={`section-title${accent ? ' section-title--accent' : ''}`}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  );
}
