/**
 * Form schema: option lists, field rules and validation messages for the six
 * CTA forms. Everything runs in the browser; there is no server-side contract.
 */

export const FORM_TYPES = [
  'assessment',
  'program',
  'service',
  'enrollment',
  'contact',
  'newsletter',
] as const;

export type FormType = (typeof FORM_TYPES)[number];

export function isFormType(value: string): value is FormType {
  return (FORM_TYPES as readonly string[]).includes(value);
}

/* ------------------------------------------------------------------ */
/* Option lists                                                        */
/* ------------------------------------------------------------------ */

export const PROGRAMS = [
  'Sports Performance',
  'Sports Therapy & Recovery',
  'Athletic Development Camps',
  'Adult Performance',
  'Mental Performance',
  'Student Athlete Assessment',
] as const;

export const SERVICES = [
  'Sports Performance Training',
  'Sports Therapy & Recovery',
  'Mental Performance',
  'Performance Testing',
  'Athlete Education',
  'Assessments',
] as const;

export const ATHLETE_TYPES = [
  'Youth Athlete',
  'Middle School Athlete',
  'High School Athlete',
  'College Athlete',
  'Professional Athlete',
  'Adult / Fitness',
] as const;

export const AGE_GROUPS = [
  'Ages 7–12',
  'Ages 11–14',
  'Ages 14–18',
  'College (18+)',
  'Adult (18+)',
] as const;

export const PRIMARY_GOALS = [
  'Speed & Agility',
  'Strength & Power',
  'Injury Prevention',
  'Recovery & Return to Play',
  'Mental Performance',
  'Sport-Specific Performance',
  'General Fitness & Health',
] as const;

export const CONTACT_METHODS = ['Phone Call', 'Text Message', 'Email'] as const;

export const START_TIMEFRAMES = [
  'As soon as possible',
  'Within 2 weeks',
  'Within 1 month',
  'In 1–3 months',
  'Just exploring',
] as const;

export const INQUIRY_SUBJECTS = [
  'General Question',
  'Scheduling',
  'Programs & Training',
  'Liability Waiver',
  'Membership Request',
  'Client Forms',
  'Other',
] as const;

/* ------------------------------------------------------------------ */
/* Limits & patterns                                                   */
/* ------------------------------------------------------------------ */

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  shortTextMax: 120,
  messageMax: 2000,
  phoneMinDigits: 10,
  phoneMaxDigits: 15,
} as const;

/** Allowed phone characters: digits, spaces, dashes, dots, parentheses and a leading +. */
export const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function countDigits(value: string): number {
  return value.replace(/\D/g, '').length;
}

export function isValidPhone(value: string): boolean {
  const digits = countDigits(value);
  return (
    PHONE_PATTERN.test(value.trim()) &&
    digits >= LIMITS.phoneMinDigits &&
    digits <= LIMITS.phoneMaxDigits
  );
}

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.emailMax && EMAIL_PATTERN.test(value.trim());
}

/* ------------------------------------------------------------------ */
/* Field rules per form                                                */
/* ------------------------------------------------------------------ */

export type RuleKind = 'name' | 'email' | 'phone' | 'select' | 'text' | 'longText' | 'date' | 'consent';

export interface FieldRule {
  kind: RuleKind;
  label: string;
  required: boolean;
  options?: readonly string[];
}

export type FormValues = Record<string, string | boolean>;
export type FormErrors = Record<string, string>;

const fullName: FieldRule = { kind: 'name', label: 'Full name', required: true };
const email: FieldRule = { kind: 'email', label: 'Email address', required: true };
const phone: FieldRule = { kind: 'phone', label: 'Phone number', required: true };
const privacyConsent: FieldRule = { kind: 'consent', label: 'Privacy acknowledgment', required: true };

export const FORM_RULES: Record<FormType, Record<string, FieldRule>> = {
  assessment: {
    fullName,
    email,
    phone,
    athleteType: { kind: 'select', label: 'Athlete type', required: true, options: ATHLETE_TYPES },
    ageGroup: { kind: 'select', label: 'Age group', required: true, options: AGE_GROUPS },
    primaryGoal: { kind: 'select', label: 'Primary goal', required: true, options: PRIMARY_GOALS },
    contactMethod: { kind: 'select', label: 'Preferred contact method', required: true, options: CONTACT_METHODS },
    message: { kind: 'longText', label: 'Additional message', required: false },
    consent: privacyConsent,
  },
  program: {
    fullName,
    email,
    phone,
    program: { kind: 'select', label: 'Program of interest', required: true, options: PROGRAMS },
    athleteType: { kind: 'select', label: 'Athlete type', required: true, options: ATHLETE_TYPES },
    startTimeframe: { kind: 'select', label: 'Preferred start timeframe', required: true, options: START_TIMEFRAMES },
    message: { kind: 'longText', label: 'Additional questions', required: false },
    consent: privacyConsent,
  },
  service: {
    fullName,
    email,
    phone,
    service: { kind: 'select', label: 'Service of interest', required: true, options: SERVICES },
    question: { kind: 'longText', label: 'Your question', required: true },
    consent: privacyConsent,
  },
  enrollment: {
    fullName,
    email,
    phone,
    participantName: { kind: 'text', label: 'Participant name', required: false },
    ageGroup: { kind: 'select', label: 'Participant age group', required: true, options: AGE_GROUPS },
    program: { kind: 'select', label: 'Program of interest', required: true, options: PROGRAMS },
    startDate: { kind: 'date', label: 'Preferred start date', required: false },
    message: { kind: 'longText', label: 'Additional message', required: false },
    consent: privacyConsent,
  },
  contact: {
    fullName,
    email,
    phone,
    subject: { kind: 'select', label: 'Inquiry subject', required: true, options: INQUIRY_SUBJECTS },
    ageGroup: { kind: 'select', label: 'Athlete age / group', required: false, options: AGE_GROUPS },
    message: { kind: 'longText', label: 'Message', required: true },
    consent: privacyConsent,
  },
  newsletter: {
    email,
    marketingConsent: { kind: 'consent', label: 'Subscription consent', required: true },
  },
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

export const MESSAGES = {
  required: (label: string) => `${label} is required.`,
  name: `Please enter a name between ${LIMITS.nameMin} and ${LIMITS.nameMax} characters.`,
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  select: (label: string) => `Please select a valid ${label.toLowerCase()}.`,
  text: `Please keep this under ${LIMITS.shortTextMax} characters.`,
  longText: `Please keep this under ${LIMITS.messageMax} characters.`,
  date: 'Please choose a valid date that is not in the past.',
  consent: 'Please check this box to continue.',
} as const;

/** Today's date in the visitor's timezone, as YYYY-MM-DD. */
export function localToday(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function validateField(rule: FieldRule, raw: string | boolean | undefined): string | undefined {
  if (rule.kind === 'consent') {
    return rule.required && raw !== true ? MESSAGES.consent : undefined;
  }

  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) {
    if (!rule.required) return undefined;
    return rule.kind === 'select' ? MESSAGES.select(rule.label) : MESSAGES.required(rule.label);
  }

  switch (rule.kind) {
    case 'name':
      return value.length < LIMITS.nameMin || value.length > LIMITS.nameMax ? MESSAGES.name : undefined;
    case 'email':
      return isValidEmail(value) ? undefined : MESSAGES.email;
    case 'phone':
      return isValidPhone(value) ? undefined : MESSAGES.phone;
    case 'select':
      return rule.options?.includes(value) ? undefined : MESSAGES.select(rule.label);
    case 'text':
      return value.length > LIMITS.shortTextMax ? MESSAGES.text : undefined;
    case 'longText':
      return value.length > LIMITS.messageMax ? MESSAGES.longText : undefined;
    case 'date':
      return DATE_PATTERN.test(value) && !Number.isNaN(Date.parse(value)) && value >= localToday()
        ? undefined
        : MESSAGES.date;
    default:
      return undefined;
  }
}

export function validateForm(type: FormType, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const [name, rule] of Object.entries(FORM_RULES[type])) {
    const error = validateField(rule, values[name]);
    if (error) errors[name] = error;
  }
  return errors;
}
