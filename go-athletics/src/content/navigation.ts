import type { ModalRequest } from '../modals/types';
import { PROGRAM_CARDS } from './home';

/** Every navigational element resolves to a section, a modal or a route — never a dead link. */
export type NavAction =
  | { kind: 'section'; id: string }
  | { kind: 'modal'; request: ModalRequest }
  | { kind: 'route'; path: string };

export interface NavLink {
  label: string;
  action: NavAction;
}

export interface NavItem {
  label: string;
  section: string;
  children?: NavLink[];
}

const section = (id: string): NavAction => ({ kind: 'section', id });
const modal = (request: ModalRequest): NavAction => ({ kind: 'modal', request });

/** Section ids used for active-link highlighting, in page order. */
export const SECTION_IDS = ['top', 'about', 'training', 'who-we-train', 'results', 'programs', 'faq', 'facility'] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', section: 'top' },
  { label: 'About', section: 'about' },
  {
    label: 'Programs',
    section: 'programs',
    children: [
      { label: 'All Programs', action: section('programs') },
      ...PROGRAM_CARDS.map((card) => ({ label: card.title, action: modal(card.cta) })),
    ],
  },
  {
    label: 'Training',
    section: 'training',
    children: [
      { label: 'Feature Pillars', action: section('training') },
      { label: 'Who We Train', action: section('who-we-train') },
      { label: 'The GC Difference', action: section('difference') },
      { label: 'Performance Testing', action: modal({ type: 'service', prefill: { service: 'Performance Testing' } }) },
    ],
  },
  { label: 'Results', section: 'results' },
  { label: 'Facility', section: 'facility' },
  { label: 'Contact', section: 'contact' },
];

const ADULT_ASSESSMENT: ModalRequest = {
  type: 'assessment',
  prefill: { athleteType: 'Adult / Fitness', ageGroup: 'Adult (18+)' },
  context: 'Adult assessment',
};
const STUDENT_ASSESSMENT: ModalRequest = {
  type: 'program',
  prefill: { program: 'Student Athlete Assessment' },
  context: 'Student athlete assessment',
};
const CLIENT_FORM: ModalRequest = { type: 'contact', prefill: { subject: 'Client Forms' }, context: 'Client forms' };

export const ANNOUNCEMENT_LINKS: NavLink[] = [
  { label: 'Assessment (A)', action: modal(ADULT_ASSESSMENT) },
  { label: 'Assessment (S)', action: modal(STUDENT_ASSESSMENT) },
  {
    label: 'Liability Waiver',
    action: modal({ type: 'contact', prefill: { subject: 'Liability Waiver' }, context: 'Liability waiver' }),
  },
  {
    label: 'Membership Request',
    action: modal({ type: 'contact', prefill: { subject: 'Membership Request' }, context: 'Membership request' }),
  },
  { label: 'Client Form', action: modal(CLIENT_FORM) },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'About Us', action: section('about') },
  { label: 'Programs', action: section('programs') },
  { label: 'Training', action: section('training') },
  { label: 'Assessment (A)', action: modal(ADULT_ASSESSMENT) },
  { label: 'Assessment (S)', action: modal(STUDENT_ASSESSMENT) },
  { label: 'Client Form', action: modal(CLIENT_FORM) },
];

export const FOOTER_PROGRAM_LINKS: NavLink[] = PROGRAM_CARDS.map((card) => ({
  label: card.title,
  action: modal(card.cta),
}));
