'use client';

import { Button } from '../ui/Button';
import { useModal } from '../../modals/modalContext';

export function NotFoundPage() {
  const { openModal } = useModal();

  return (
    <section className="page-simple page-simple--center" aria-labelledby="not-found-title">
      <div className="container container--narrow">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="page-simple__title">
          Page not found
        </h1>
        <p className="page-simple__lead">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="page-simple__actions">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button variant="outline" aria-haspopup="dialog" onClick={() => openModal({ type: 'contact' })}>
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
