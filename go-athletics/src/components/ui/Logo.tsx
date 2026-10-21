interface LogoProps {
  className?: string;
  /** Decorative logos (next to visible brand text) are hidden from assistive tech. */
  decorative?: boolean;
}

/**
 * SVG recreation of the GO Athletics wordmark from the design reference.
 * Replace with the official logo file when it becomes available.
 */
export function Logo({ className, decorative = false }: LogoProps) {
  return (
    <svg
      className={['logo', className].filter(Boolean).join(' ')}
      viewBox="0 0 132 72"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'GO Athletics'}
    >
      <text
        x="66"
        y="44"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-display)' }}
        fontSize="54"
        fontStyle="italic"
        fontWeight="800"
        letterSpacing="-1"
        fill="#e10b17"
        stroke="#ffffff"
        strokeWidth="1.6"
        paintOrder="stroke"
      >
        GO
      </text>
      <rect x="10" y="50" width="112" height="2.5" fill="#e10b17" />
      <text
        x="66"
        y="68"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="14.5"
        fontWeight="700"
        letterSpacing="2.6"
        fill="#ffffff"
      >
        ATHLETICS
      </text>
    </svg>
  );
}
