import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';
type Size = 'md' | 'lg' | 'sm';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow used on CTAs throughout the design. */
  arrow?: boolean;
  block?: boolean;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function classes(
  { variant = 'primary', size = 'md', block }: Pick<CommonProps, 'variant' | 'size' | 'block'>,
  extra?: string,
): string {
  return ['btn', `btn--${variant}`, `btn--${size}`, block ? 'btn--block' : '', extra ?? '']
    .filter(Boolean)
    .join(' ');
}

/** Reusable CTA button. Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant, size, arrow = false, block, children, className, ...rest } = props;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" size={16} strokeWidth={2.5} />}
    </>
  );
  const cls = classes({ variant, size, block }, className);

  if (typeof rest.href === 'string') {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={cls} {...buttonProps}>
      {content}
    </button>
  );
}
