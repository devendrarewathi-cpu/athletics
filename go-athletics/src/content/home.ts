import {
  Activity,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  Dumbbell,
  Layers,
  ScanSearch,
  Target,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ModalRequest } from '../modals/types';
import { IMAGES, type SiteImage } from './images';
import { SITE } from './site';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BENEFITS: IconItem[] = [
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Assessment Driven',
    description: 'Understand your strengths, identify opportunities and build the right plan.',
  },
  {
    icon: Dumbbell,
    title: 'Customized Training',
    description: 'Individualized programs based on your goals, sport and needs.',
  },
  {
    icon: Users,
    title: 'Expert Coaching',
    description: 'Experienced coaches and specialists who care about your development.',
  },
  {
    icon: Trophy,
    title: 'Long-Term Growth',
    description: 'Build strength, improve athletic performance and reach your full potential.',
  },
];

export const METHOD_STEPS: (IconItem & { number: string })[] = [
  {
    number: '01',
    icon: ScanSearch,
    title: 'Assess',
    description: 'Evaluate movement, strength and performance baseline.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Build Your Plan',
    description: 'Create a customized program based on assessment results.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Train & Progress',
    description: 'Track results and evolve your training over time.',
  },
];

export interface ImageCard {
  title: string;
  description: string;
  image: SiteImage;
  cta: ModalRequest;
}

export const PILLARS: ImageCard[] = [
  {
    title: 'Sports Performance Training',
    description: 'Build speed, strength, power and agility for your sport.',
    image: IMAGES.pillars.performance,
    cta: { type: 'service', prefill: { service: 'Sports Performance Training' } },
  },
  {
    title: 'Sports Therapy & Recovery',
    description: 'Move better, recover faster and stay in the game.',
    image: IMAGES.pillars.recovery,
    cta: { type: 'service', prefill: { service: 'Sports Therapy & Recovery' } },
  },
  {
    title: 'Mental Performance',
    description: 'Build confidence, focus and a stronger mindset on and off the field.',
    image: IMAGES.pillars.mental,
    cta: { type: 'service', prefill: { service: 'Mental Performance' } },
  },
];

export interface AthleteCategory {
  title: string;
  detail: string;
  image: SiteImage;
  cta: ModalRequest;
}

export const ATHLETE_CATEGORIES: AthleteCategory[] = [
  {
    title: 'Youth',
    detail: 'Ages 7–12',
    image: IMAGES.athletes.youth,
    cta: { type: 'enrollment', prefill: { ageGroup: 'Ages 7–12' }, context: 'Youth athletes · Ages 7–12' },
  },
  {
    title: 'Middle School',
    detail: 'Ages 11–14',
    image: IMAGES.athletes.middleSchool,
    cta: { type: 'enrollment', prefill: { ageGroup: 'Ages 11–14' }, context: 'Middle school · Ages 11–14' },
  },
  {
    title: 'High School',
    detail: 'Ages 14–18',
    image: IMAGES.athletes.highSchool,
    cta: { type: 'enrollment', prefill: { ageGroup: 'Ages 14–18' }, context: 'High school · Ages 14–18' },
  },
  {
    title: 'College',
    detail: 'Athletes',
    image: IMAGES.athletes.college,
    cta: { type: 'enrollment', prefill: { ageGroup: 'College (18+)' }, context: 'College athletes' },
  },
  {
    title: 'Professional',
    detail: 'Athletes',
    image: IMAGES.athletes.professional,
    cta: { type: 'enrollment', prefill: { ageGroup: 'Adult (18+)' }, context: 'Professional athletes' },
  },
  {
    title: 'Adult',
    detail: 'Fitness & Performance',
    image: IMAGES.athletes.adult,
    cta: { type: 'enrollment', prefill: { ageGroup: 'Adult (18+)' }, context: 'Adult fitness & performance' },
  },
];

export const DIFFERENTIATORS: IconItem[] = [
  {
    icon: Layers,
    title: 'All-in-One Approach',
    description: 'Training, recovery, mental preparation and education in one place.',
  },
  {
    icon: Target,
    title: 'Individualized Coaching',
    description: 'Programs tailored to your goals, sport and needs.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Coaches, therapists and specialists with real experience.',
  },
  {
    icon: Activity,
    title: 'Performance Testing',
    description: 'Data-driven assessments to track progress.',
  },
  {
    icon: BookOpen,
    title: 'Athlete Education',
    description: 'Learn the “why” behind the training and how to apply it long term.',
  },
];

export const PROGRAM_CARDS: ImageCard[] = [
  {
    title: 'Sports Performance',
    description: 'Speed, strength, power and agility training.',
    image: IMAGES.programs.sportsPerformance,
    cta: { type: 'program', prefill: { program: 'Sports Performance' } },
  },
  {
    title: 'Sports Therapy & Recovery',
    description: 'Injury prevention, recovery and movement optimization.',
    image: IMAGES.programs.therapyRecovery,
    cta: { type: 'program', prefill: { program: 'Sports Therapy & Recovery' } },
  },
  {
    title: 'Athletic Development Camps',
    description: 'Focused training for continuous improvement.',
    image: IMAGES.programs.camps,
    cta: { type: 'enrollment', prefill: { program: 'Athletic Development Camps' } },
  },
  {
    title: 'Adult Performance',
    description: 'Training for fitness, performance and long-term health.',
    image: IMAGES.programs.adult,
    cta: { type: 'program', prefill: { program: 'Adult Performance' } },
  },
  {
    title: 'Mental Performance',
    description: 'Build confidence, focus and resilience.',
    image: IMAGES.programs.mental,
    cta: { type: 'program', prefill: { program: 'Mental Performance' } },
  },
  {
    title: 'Student Athlete Assessment',
    description: 'Comprehensive testing to guide your program.',
    image: IMAGES.programs.studentAssessment,
    cta: { type: 'program', prefill: { program: 'Student Athlete Assessment' } },
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}

/**
 * SAMPLE CONTENT: placeholder testimonials for layout only. They are labelled
 * as samples in the UI and must be replaced with approved client reviews.
 */
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The training at Game Changers has made a huge difference in my performance. The coaching, support and environment are incredible.',
    name: 'High School Athlete',
    role: 'Sample testimonial',
    location: 'Milford, CT',
  },
  {
    quote:
      'The coaches are knowledgeable, supportive and truly care about each athlete’s development. Highly recommend!',
    name: 'Parent',
    role: 'Sample testimonial',
    location: 'Milford, CT',
  },
  {
    quote:
      'This program has helped me get faster, stronger and more confident. The environment is amazing and the results speak for themselves.',
    name: 'College Athlete',
    role: 'Sample testimonial',
    location: 'Milford, CT',
  },
  {
    quote:
      'Having training, recovery and mental performance under one roof keeps everything connected. I finally have a plan that makes sense.',
    name: 'Adult Athlete',
    role: 'Sample testimonial',
    location: 'Milford, CT',
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How does the assessment work?',
    answer:
      'Your assessment evaluates movement, strength and your current performance baseline. Our team reviews the results with you and uses them to build a customized plan around your goals, sport and experience level.',
  },
  {
    question: 'Do I need to be a competitive athlete?',
    answer:
      'No. We work with athletes of all levels — from youth athletes just getting started to adults focused on fitness, performance and long-term health.',
  },
  {
    question: 'What age groups can join?',
    answer:
      'Our programs are designed for youth (ages 7–12), middle school (ages 11–14), high school (ages 14–18), college, professional and adult athletes.',
  },
  {
    question: 'How do I schedule an appointment?',
    answer: `Sessions are ${SITE.hours.toLowerCase()}. Book an assessment online, call ${SITE.phone.display} or email ${SITE.email.display} and our team will follow up to find a time that works for you.`,
  },
  {
    question: 'Do you offer group training?',
    answer:
      'Alongside individualized coaching we run Athletic Development Camps. Contact us to find out which group and individual options are currently available for your age group.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: `Please contact our team at ${SITE.phone.display} or ${SITE.email.display} for our current cancellation and rescheduling terms. We’ll confirm them with you when you schedule.`,
  },
];
