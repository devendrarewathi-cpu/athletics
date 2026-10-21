import type {
  AGE_GROUPS,
  ATHLETE_TYPES,
  FormType,
  INQUIRY_SUBJECTS,
  PROGRAMS,
  SERVICES,
} from '@/forms/schema';

/** Values that may be preselected when a CTA opens a modal. */
export interface ModalPrefill {
  program?: (typeof PROGRAMS)[number];
  service?: (typeof SERVICES)[number];
  athleteType?: (typeof ATHLETE_TYPES)[number];
  ageGroup?: (typeof AGE_GROUPS)[number];
  subject?: (typeof INQUIRY_SUBJECTS)[number];
}

export interface ModalRequest {
  type: FormType;
  prefill?: ModalPrefill;
  /** Optional eyebrow override describing why the modal was opened. */
  context?: string;
}
