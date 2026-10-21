import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import HomePage from '../app/page';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SiteProviders } from '../components/layout/SiteProviders';
import { LegalPage } from '../components/pages/LegalPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';

/** Mirrors app/layout.tsx without the <html>/<body> wrapper. */
function renderPage(path: string, page: ReactNode) {
  window.history.replaceState(null, '', path);
  const user = userEvent.setup();
  render(
    <SiteProviders>
      <div id="site-root">
        <Header />
        <main id="main">{page}</main>
        <Footer />
      </div>
    </SiteProviders>,
  );
  return user;
}

const renderApp = () => renderPage('/', <HomePage />);
const SUBMIT_TIMEOUT = { timeout: 4000 };

const dialog = () => screen.getByRole('dialog');

describe('homepage', () => {
  it('renders every major section', () => {
    renderApp();
    for (const name of [
      /built different/i,
      /your performance starts with understanding you/i,
      /three feature pillars/i,
      /who we train/i,
      /the game changer athletics difference/i,
      /client success/i,
      /our courses & programs/i,
      /your performance starts here/i,
      /^testimonials$/i,
      /frequently asked questions/i,
      /visit our facility/i,
      /join us on social media/i,
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
  });

  it('toggles FAQ answers with accessible expanded state', async () => {
    const user = renderApp();
    const question = screen.getByRole('button', { name: /what is your cancellation policy/i });
    expect(question).toHaveAttribute('aria-expanded', 'false');
    await user.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/current cancellation and rescheduling terms/i)).toBeInTheDocument();
  });
});

describe('CTA modals', () => {
  it.each([
    ['assessment', () => screen.getAllByRole('button', { name: /book an assessment/i })[0], /request my assessment/i],
    ['program', () => screen.getByRole('button', { name: /^explore programs$/i }), /get program information/i],
    [
      'service',
      () => screen.getByRole('button', { name: /learn more about sports performance training/i }),
      /send my inquiry/i,
    ],
    ['enrollment', () => screen.getByRole('button', { name: /^youth — ages 7–12/i }), /start my enrollment inquiry/i],
    ['contact', () => screen.getByRole('button', { name: /contact our team/i }), /send message/i],
    ['newsletter', () => screen.getByRole('button', { name: /get email updates/i }), /subscribe/i],
  ])('opens the %s modal from its CTA', async (_type, getTrigger, submitLabel) => {
    const user = renderApp();
    await user.click(getTrigger());
    expect(within(dialog()).getByRole('button', { name: submitLabel })).toBeInTheDocument();
  });

  it('preselects the program from the clicked program card', async () => {
    const user = renderApp();
    await user.click(screen.getByRole('button', { name: /explore mental performance/i }));
    expect(within(dialog()).getByLabelText(/program of interest/i)).toHaveValue('Mental Performance');
  });

  it('preselects the service from the clicked pillar card', async () => {
    const user = renderApp();
    await user.click(screen.getByRole('button', { name: /learn more about sports therapy & recovery/i }));
    expect(within(dialog()).getByLabelText(/service of interest/i)).toHaveValue('Sports Therapy & Recovery');
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = renderApp();
    const trigger = screen.getByRole('button', { name: /^explore programs$/i });
    await user.click(trigger);
    expect(dialog()).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes with the close button', async () => {
    const user = renderApp();
    await user.click(screen.getByRole('button', { name: /get email updates/i }));
    await user.click(within(dialog()).getByRole('button', { name: /close dialog/i }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('shows inline errors and does not submit an invalid form', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const user = renderApp();
    await user.click(screen.getAllByRole('button', { name: /book an assessment/i })[0]);
    const modal = dialog();

    await user.type(within(modal).getByLabelText(/email address/i), 'not-an-email');
    await user.type(within(modal).getByLabelText(/phone number/i), '123');
    await user.click(within(modal).getByRole('button', { name: /request my assessment/i }));

    expect(within(modal).getByText('Full name is required.')).toBeInTheDocument();
    expect(within(modal).getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(within(modal).getByText('Please enter a valid phone number.')).toBeInTheDocument();
    expect(within(modal).getByText('Please check this box to continue.')).toBeInTheDocument();
    expect(within(modal).getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(within(modal).getByLabelText(/email address/i)).toHaveValue('not-an-email');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows the loading state, then an honest demo success message', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const user = renderApp();
    await user.click(screen.getByRole('button', { name: /get email updates/i }));
    const modal = dialog();

    await user.type(within(modal).getByLabelText(/email address/i), 'fan@example.com');
    await user.click(within(modal).getByRole('checkbox'));
    await user.click(within(modal).getByRole('button', { name: /subscribe/i }));

    expect(within(modal).getByRole('button', { name: /submitting/i })).toBeDisabled();
    expect(await within(modal).findByText(/frontend demo/i, {}, SUBMIT_TIMEOUT)).toBeInTheDocument();
    expect(within(modal).getByText(/not been added to any mailing list/i)).toBeInTheDocument();
    expect(within(modal).getByRole('button', { name: /^close$/i })).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows a retryable error when offline, keeps values, and prevents double submission', async () => {
    const onLine = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    const user = renderApp();
    await user.click(screen.getByRole('button', { name: /contact our team/i }));
    const modal = dialog();

    await user.type(within(modal).getByLabelText(/full name/i), 'Jordan Athlete');
    await user.type(within(modal).getByLabelText(/email address/i), 'jordan@example.com');
    await user.type(within(modal).getByLabelText(/phone number/i), '2032831045');
    await user.selectOptions(within(modal).getByLabelText(/inquiry subject/i), 'Scheduling');
    await user.type(within(modal).getByLabelText(/^message/i), 'When can I come in?');
    await user.click(within(modal).getByRole('checkbox'));

    const submit = within(modal).getByRole('button', { name: /send message/i });
    await user.click(submit);
    expect(within(modal).getByRole('button', { name: /submitting/i })).toBeDisabled();
    await user.click(submit); // second click while submitting must be ignored

    expect(await within(modal).findByRole('alert', {}, SUBMIT_TIMEOUT)).toHaveTextContent(/offline/i);
    expect(within(modal).getByLabelText(/full name/i)).toHaveValue('Jordan Athlete');
    expect(within(modal).getByLabelText(/phone number/i)).toHaveValue('(203) 283-1045');

    onLine.mockReturnValue(true);
    await user.click(within(modal).getByRole('button', { name: /send message/i }));
    expect(await within(modal).findByText(/your inquiry has not been sent or saved/i, {}, SUBMIT_TIMEOUT)).toBeInTheDocument();
  });

  it('resets the inline contact form when starting a new message', async () => {
    const user = renderApp();
    const form = document.getElementById('contact') as HTMLElement;
    await user.type(within(form).getByLabelText(/^name/i), 'Sam Runner');
    await user.type(within(form).getByLabelText(/^email/i), 'sam@example.com');
    await user.type(within(form).getByLabelText(/^phone/i), '2035550123');
    await user.type(within(form).getByLabelText(/^message/i), 'Hello');
    await user.click(within(form).getByRole('checkbox'));
    await user.click(within(form).getByRole('button', { name: /send message/i }));

    await user.click(await within(form).findByRole('button', { name: /send another message/i }, SUBMIT_TIMEOUT));
    expect(within(form).getByLabelText(/^name/i)).toHaveValue('');
    expect(within(form).getByRole('checkbox')).not.toBeChecked();
  });
});

describe('other pages', () => {
  it('renders the 404 page', () => {
    renderPage('/does-not-exist', <NotFoundPage />);
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('renders the privacy policy placeholder without inventing a policy', () => {
    renderPage('/privacy-policy', <LegalPage kind="privacy" />);
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/has not been published yet/i)).toBeInTheDocument();
  });
});
