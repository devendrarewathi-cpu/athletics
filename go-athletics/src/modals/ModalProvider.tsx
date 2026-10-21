'use client';

import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { CtaModal } from './CtaModal';
import { ModalContext } from './modalContext';
import type { ModalRequest } from './types';

/** CTA modal manager: any component can open one of the six forms via useModal(). */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ModalRequest | null>(null);
  const [openCount, setOpenCount] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((next: ModalRequest) => {
    const active = document.activeElement;
    triggerRef.current = active instanceof HTMLElement && active !== document.body ? active : null;
    setRequest(next);
    setOpenCount((count) => count + 1);
  }, []);

  const closeModal = useCallback(() => setRequest(null), []);

  // Return focus to the CTA that opened the modal once the exit animation finishes.
  const restoreFocus = useCallback(() => {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }, []);

  const value = useMemo(() => ({ openModal }), [openModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={restoreFocus}>
        {request && <CtaModal key={openCount} request={request} onClose={closeModal} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
