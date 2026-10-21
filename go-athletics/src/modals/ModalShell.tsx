'use client';

import { motion, useIsPresent } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { EASE } from '../lib/motion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalShellProps {
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  /** Whether Escape / the close button may close the dialog (false while submitting). */
  canClose: boolean;
  /** Whether clicking the backdrop closes the dialog (false when the form has unsaved input). */
  closeOnBackdrop: boolean;
  size?: 'default' | 'compact';
  children: ReactNode;
}

/** Accessible dialog: focus trap, Escape to close, scroll lock and an inert background. */
export function ModalShell({
  labelledBy,
  describedBy,
  onClose,
  canClose,
  closeOnBackdrop,
  size = 'default',
  children,
}: ModalShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const canCloseRef = useRef(canClose);
  canCloseRef.current = canClose;

  // Lock page scroll and hide the rest of the page from assistive tech. Released as soon as
  // the exit animation starts, so focus can return to the trigger when it completes.
  const isPresent = useIsPresent();
  useEffect(() => {
    if (!isPresent) return;
    const { body } = document;
    const root = document.getElementById('site-root');
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    root?.setAttribute('inert', '');

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      root?.removeAttribute('inert');
    };
  }, [isPresent]);

  // Initial focus: first field for mouse/keyboard users, the dialog itself on touch devices
  // (so the on-screen keyboard does not pop up over the form immediately).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const prefersFieldFocus = window.matchMedia('(pointer: fine)').matches;
    const firstField = dialog.querySelector<HTMLElement>('input, select, textarea');
    (prefersFieldFocus && firstField ? firstField : dialog).focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (event.key === 'Escape') {
        event.stopPropagation();
        if (canCloseRef.current) onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && closeOnBackdrop && canClose) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button type="button" className="modal__close" onClick={onClose} disabled={!canClose} aria-label="Close dialog">
          <X size={22} aria-hidden="true" />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
