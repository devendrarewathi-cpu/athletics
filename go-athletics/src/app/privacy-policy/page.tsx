import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return <LegalPage kind="privacy" />;
}
