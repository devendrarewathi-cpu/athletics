'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

/** Link to a homepage section from any page: a plain hash on "/", "/#id" elsewhere. */
export function useSectionHref(): (id: string) => string {
  const isHome = usePathname() === '/';
  return useCallback((id: string) => (isHome ? `#${id}` : `/#${id}`), [isHome]);
}
