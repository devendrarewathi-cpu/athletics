'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { ModalProvider } from '../../modals/ModalProvider';

/** Client-side context for the whole site: reduced-motion handling and the CTA modal manager. */
export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ModalProvider>{children}</ModalProvider>
    </MotionConfig>
  );
}
