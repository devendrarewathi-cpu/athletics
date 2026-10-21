import type { FormType, FormValues } from '@/forms/schema';

/**
 * FRONTEND DEMO: there is no backend. Submissions are simulated in the browser
 * and nothing is sent, emailed or stored. Replace this module with a real
 * submission call when a delivery service is approved.
 */

export class SubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SubmissionError';
  }
}

export interface SimulatedSubmission {
  formType: FormType;
}

const SIMULATED_DELAY_MS = 1200;

/** Waits briefly to mimic a network request, then resolves without sending anything. */
export async function simulateSubmission(formType: FormType, values: FormValues): Promise<SimulatedSubmission> {
  void values; // Intentionally unused: the demo never transmits form data.
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  // Mirror the one failure a real submission would hit, so the retry path is reachable.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new SubmissionError('You appear to be offline. Please check your connection and try again.');
  }
  return { formType };
}
