import type { FormType } from '@/forms/schema';
import { IMAGES, type SiteImage } from '../content/images';

export type Control = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date' | 'checkbox';

export interface FieldConfig {
  /** Must match a key in FORM_RULES[formType]; required flags and options come from there. */
  name: string;
  label: string;
  control: Control;
  placeholder?: string;
  autoComplete?: string;
  /** Span both columns of the form grid. */
  full?: boolean;
  rows?: number;
  /** Checkbox copy: privacy acknowledgment or newsletter marketing consent. */
  consent?: 'privacy' | 'marketing';
}

export interface FormConfig {
  type: FormType;
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  image: SiteImage;
  submitLabel: string;
  fields: FieldConfig[];
  /** Confirmation shown after the simulated submission. Must not claim anything was sent or saved. */
  success: { title: string; message: string };
  /** Values submitted without a visible field (e.g. the inline contact form's subject). */
  hiddenDefaults?: Record<string, string>;
  compact?: boolean;
}

const fullName: FieldConfig = {
  name: 'fullName',
  label: 'Full Name',
  control: 'text',
  placeholder: 'Enter full name',
  autoComplete: 'name',
};
const email: FieldConfig = {
  name: 'email',
  label: 'Email Address',
  control: 'email',
  placeholder: 'you@example.com',
  autoComplete: 'email',
};
const phone: FieldConfig = {
  name: 'phone',
  label: 'Phone Number',
  control: 'tel',
  placeholder: '(203) 555-0123',
  autoComplete: 'tel',
  full: true,
};
const privacy: FieldConfig = { name: 'consent', label: 'Privacy acknowledgment', control: 'checkbox', consent: 'privacy', full: true };

const DEFAULT_SUCCESS = {
  title: 'Thank You!',
  message: 'Your form has been completed successfully. This is a frontend demo; your inquiry has not been sent or saved.',
};

export const FORM_CONFIGS: Record<FormType, FormConfig> = {
  assessment: {
    type: 'assessment',
    eyebrow: 'Take the first step',
    titleTop: 'Book your',
    titleAccent: 'Assessment',
    description: 'Tell us about your goals. Our team will contact you to discuss the next step.',
    image: IMAGES.modals.assessment,
    submitLabel: 'Request my assessment',
    fields: [
      fullName,
      email,
      phone,
      { name: 'athleteType', label: 'Athlete Type', control: 'select', placeholder: 'Select athlete type' },
      { name: 'ageGroup', label: 'Age Group', control: 'select', placeholder: 'Select age group' },
      { name: 'primaryGoal', label: 'Primary Goal', control: 'select', placeholder: 'Select your goal', full: true },
      {
        name: 'contactMethod',
        label: 'Preferred Contact Method',
        control: 'select',
        placeholder: 'Select an option',
        full: true,
      },
      {
        name: 'message',
        label: 'Additional Message',
        control: 'textarea',
        placeholder: 'Share your goals or questions...',
        full: true,
        rows: 3,
      },
      privacy,
    ],
    success: DEFAULT_SUCCESS,
  },
  program: {
    type: 'program',
    eyebrow: 'Discover your potential',
    titleTop: 'Explore our',
    titleAccent: 'Programs',
    description: 'Learn more about our training programs and find the right fit for your goals.',
    image: IMAGES.modals.program,
    submitLabel: 'Get program information',
    fields: [
      fullName,
      email,
      phone,
      { name: 'program', label: 'Program of Interest', control: 'select', placeholder: 'Select a program' },
      { name: 'athleteType', label: 'Athlete Type', control: 'select', placeholder: 'Select athlete type' },
      {
        name: 'startTimeframe',
        label: 'Preferred Start Timeframe',
        control: 'select',
        placeholder: 'Select timeframe',
        full: true,
      },
      {
        name: 'message',
        label: 'Additional Questions',
        control: 'textarea',
        placeholder: 'Tell us more about what you’re looking for...',
        full: true,
        rows: 3,
      },
      privacy,
    ],
    success: DEFAULT_SUCCESS,
  },
  service: {
    type: 'service',
    eyebrow: 'Have questions?',
    titleTop: 'Learn more',
    titleAccent: 'About our services',
    description: 'Get more information about our training, recovery and performance services.',
    image: IMAGES.modals.service,
    submitLabel: 'Send my inquiry',
    fields: [
      fullName,
      email,
      phone,
      { name: 'service', label: 'Service of Interest', control: 'select', placeholder: 'Select a service', full: true },
      {
        name: 'question',
        label: 'Your Question',
        control: 'textarea',
        placeholder: 'Ask your question here...',
        full: true,
        rows: 4,
      },
      privacy,
    ],
    success: DEFAULT_SUCCESS,
  },
  enrollment: {
    type: 'enrollment',
    eyebrow: 'Be part of the journey',
    titleTop: 'Join our',
    titleAccent: 'Labs',
    description: 'Start your enrollment inquiry and our team will guide you through the next steps.',
    image: IMAGES.modals.enrollment,
    submitLabel: 'Start my enrollment inquiry',
    fields: [
      fullName,
      email,
      { ...phone, full: false },
      {
        name: 'participantName',
        label: 'Participant Name',
        control: 'text',
        placeholder: 'Enter name (if different)',
        autoComplete: 'off',
      },
      { name: 'ageGroup', label: 'Participant Age Group', control: 'select', placeholder: 'Select age group' },
      { name: 'program', label: 'Program of Interest', control: 'select', placeholder: 'Select a program' },
      { name: 'startDate', label: 'Preferred Start Date', control: 'date', full: true },
      {
        name: 'message',
        label: 'Additional Message',
        control: 'textarea',
        placeholder: 'Any additional information...',
        full: true,
        rows: 3,
      },
      privacy,
    ],
    success: DEFAULT_SUCCESS,
  },
  contact: {
    type: 'contact',
    eyebrow: 'We’re here to help',
    titleTop: 'Get in',
    titleAccent: 'Touch',
    description: 'Have a question? Send us a message and our team will get back to you.',
    image: IMAGES.modals.contact,
    submitLabel: 'Send message',
    fields: [
      fullName,
      email,
      phone,
      { name: 'subject', label: 'Inquiry Subject', control: 'select', placeholder: 'Select a subject', full: true },
      {
        name: 'message',
        label: 'Message',
        control: 'textarea',
        placeholder: 'Type your message here...',
        full: true,
        rows: 4,
      },
      privacy,
    ],
    success: DEFAULT_SUCCESS,
  },
  newsletter: {
    type: 'newsletter',
    eyebrow: 'Stay connected',
    titleTop: 'Join our',
    titleAccent: 'Community',
    description: 'Get the latest updates, training tips, events and athlete highlights.',
    image: IMAGES.modals.newsletter,
    submitLabel: 'Subscribe',
    compact: true,
    fields: [
      { ...email, full: true },
      { name: 'marketingConsent', label: 'Subscription consent', control: 'checkbox', consent: 'marketing', full: true },
    ],
    success: {
      title: 'Thank You!',
      message:
        'Your subscription form has been completed successfully. This is a frontend demo; your email address has not been added to any mailing list.',
    },
  },
};

/** The "Get in touch" form embedded in the Facility & Contact section. */
export const INLINE_CONTACT_CONFIG: FormConfig = {
  ...FORM_CONFIGS.contact,
  fields: [
    { ...fullName, label: 'Name' },
    { ...email, label: 'Email' },
    { ...phone, label: 'Phone', full: false },
    { name: 'ageGroup', label: 'Athlete Age / Group', control: 'select', placeholder: 'Select (optional)' },
    { name: 'message', label: 'Message', control: 'textarea', placeholder: 'How can we help?', full: true, rows: 3 },
    privacy,
  ],
  hiddenDefaults: { subject: 'General Question' },
};
