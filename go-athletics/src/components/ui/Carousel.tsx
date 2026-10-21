'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

interface CarouselProps<T> {
  items: T[];
  label: string;
  getKey: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  tone?: 'dark' | 'light';
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * Scroll-snap carousel: native touch swiping, arrow buttons, page dots and
 * arrow-key support. Controls hide automatically when every item fits.
 */
export function Carousel<T>({ items, label, getKey, renderItem, className, tone = 'dark' }: CarouselProps<T>) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ page: 0, pages: 1, canPrev: false, canNext: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    const pages = clientWidth > 0 ? Math.max(1, Math.ceil((scrollWidth - 4) / clientWidth)) : 1;
    const maxScroll = scrollWidth - clientWidth;
    const page = maxScroll <= 0 ? 0 : Math.round((scrollLeft / maxScroll) * (pages - 1));
    setState((previous) => {
      const next = { page, pages, canPrev: scrollLeft > 4, canNext: scrollLeft < maxScroll - 4 };
      return previous.page === next.page &&
        previous.pages === next.pages &&
        previous.canPrev === next.canPrev &&
        previous.canNext === next.canNext
        ? previous
        : next;
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, [measure]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: scrollBehavior() });
  };

  const goToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const left = state.pages > 1 ? (maxScroll * page) / (state.pages - 1) : 0;
    track.scrollTo({ left, behavior: scrollBehavior() });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const track = trackRef.current;
    const firstItem = track?.firstElementChild as HTMLElement | null;
    const step = firstItem ? firstItem.offsetWidth + 16 : 240;
    track?.scrollBy({ left: event.key === 'ArrowRight' ? step : -step, behavior: scrollBehavior() });
  };

  const hasControls = state.pages > 1;

  return (
    <div
      className={['carousel', `carousel--${tone}`, hasControls ? 'has-controls' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => scrollByPage(-1)}
        disabled={!state.canPrev}
        aria-label="Previous"
        hidden={!hasControls}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <ul ref={trackRef} className="carousel__track" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label} items`}>
        {items.map((item, index) => (
          <li key={getKey(item)} className="carousel__item" aria-label={`${index + 1} of ${items.length}`}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => scrollByPage(1)}
        disabled={!state.canNext}
        aria-label="Next"
        hidden={!hasControls}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      {hasControls && (
        <div className="carousel__dots">
          {Array.from({ length: state.pages }, (_, page) => (
            <button
              key={page}
              type="button"
              className={`carousel__dot${page === state.page ? ' is-active' : ''}`}
              aria-label={`Go to page ${page + 1} of ${state.pages}`}
              aria-current={page === state.page ? 'true' : undefined}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
