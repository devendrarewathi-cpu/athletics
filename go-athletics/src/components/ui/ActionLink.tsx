'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { NavAction } from '../../content/navigation';
import { useSectionHref } from '../../hooks/useSectionHref';
import { useModal } from '../../modals/modalContext';

interface ActionLinkProps {
  action: NavAction;
  className?: string;
  children: ReactNode;
  /** Called after the action runs (e.g. to close the mobile menu). */
  onActivate?: () => void;
  role?: string;
  'aria-current'?: 'page' | 'location' | undefined;
}

/** Renders a NavAction as the right element: an anchor for sections/routes, a button for modals. */
export function ActionLink({ action, className, children, onActivate, ...rest }: ActionLinkProps) {
  const { openModal } = useModal();
  const sectionHref = useSectionHref();

  if (action.kind === 'modal') {
    return (
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        {...rest}
        onClick={() => {
          onActivate?.();
          openModal(action.request);
        }}
      >
        {children}
      </button>
    );
  }

  if (action.kind === 'route') {
    return (
      <Link className={className} href={action.path} onClick={onActivate} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={sectionHref(action.id)} onClick={onActivate} {...rest}>
      {children}
    </a>
  );
}
