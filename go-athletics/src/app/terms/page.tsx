import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return <LegalPage kind="terms" />;
}
