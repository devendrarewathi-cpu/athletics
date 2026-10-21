'use client';

import { createContext, useContext } from 'react';
import type { ModalRequest } from './types';

interface ModalContextValue {
  openModal: (request: ModalRequest) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used inside <ModalProvider>.');
  return context;
}
