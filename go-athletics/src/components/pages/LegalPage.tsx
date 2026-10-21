import { Button } from '../ui/Button';
import { SITE } from '../../content/site';

interface LegalPageProps {
  kind: 'privacy' | 'terms';
}

const TITLES = { privacy: 'Privacy Policy', terms: 'Terms & Conditions' } as const;

/**
 * Placeholder legal pages. They describe how this website currently handles
 * data, and state clearly that the official policy has not been published yet.
 */
export function LegalPage({ kind }: LegalPageProps) {
  const title = TITLES[kind];

  return (
    <section className="page-simple" aria-labelledby="legal-title">
      <div className="container container--narrow">
        <p className="eyebrow">{SITE.legalName}</p>
        <h1 id="legal-title" className="page-simple__title">
          {title}
        </h1>

        <div className="page-simple__notice" role="note">
          The official {title.toLowerCase()} for {SITE.legalName} has not been published yet. This page will be updated
          with the approved policy. Until then, please contact us with any questions.
        </div>

        {kind === 'privacy' ? (
          <>
            <h2>How this website handles form submissions</h2>
            <ul>
              <li>
                This version of the website is a frontend demo. Details entered in the assessment, program, service,
                enrollment, contact and newsletter forms are checked in your browser only — they are not sent, emailed
                or stored.
              </li>
              <li>
                Newsletter consent is collected separately from every inquiry form and is never implied by submitting an
                inquiry.
              </li>
              <li>
                The interactive facility map is provided by Google Maps and only loads if you choose to load it.
              </li>
            </ul>
          </>
        ) : (
          <>
            <h2>Website use</h2>
            <ul>
              <li>Content on this website is for general information about our programs and services.</li>
              <li>
                Completing an enrollment or program inquiry form does not confirm enrollment, scheduling or pricing.
                Please call or email us to arrange these.
              </li>
            </ul>
          </>
        )}

        <h2>Contact</h2>
        <p>
          Call <a href={SITE.phone.href}>{SITE.phone.display}</a> or email{' '}
          <a href={SITE.email.href}>{SITE.email.display}</a>.
        </p>

        <Button href="/" variant="outline" arrow>
          Back to home
        </Button>
      </div>
    </section>
  );
}
