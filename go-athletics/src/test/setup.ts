import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// jsdom does not implement these browser APIs.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver;

globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

window.matchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;

window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
Element.prototype.scrollBy = () => {};

// Next.js runtime modules that need the framework's router/image server.
vi.mock('next/navigation', () => ({ usePathname: () => window.location.pathname }));
vi.mock('next/image', async () => {
  const { createElement } = await import('react');
  return {
    default: ({ priority, sizes, ...props }: Record<string, unknown>) => {
      void priority;
      void sizes;
      return createElement('img', props);
    },
  };
});
vi.mock('next/link', async () => {
  const { createElement } = await import('react');
  return { default: (props: Record<string, unknown>) => createElement('a', props) };
});
