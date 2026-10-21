/**
 * Photography used across the site.
 *
 * PLACEHOLDERS: no original GO Athletics photography was supplied with the
 * project, so these are licensed Unsplash photos (unsplash.com/license) chosen
 * to match the reference design. Replace the files in /public/images with
 * official photography using the same file names, or update the paths here.
 */
export interface SiteImage {
  src: string;
  alt: string;
}

const img = (file: string, alt: string): SiteImage => ({ src: `/images/${file}.webp`, alt });

export const IMAGES = {
  hero: img('hero-sprint-start', 'Athlete in a sprint start position on a running track'),
  method: img('method-coaching', 'Coach guiding an athlete through a push-up drill'),
  successRopes: img('success-battle-ropes', 'Athlete training with battle ropes'),
  performanceBanner: img('banner-performance', 'Athlete preparing to lift a barbell'),
  pillars: {
    performance: img('pillar-performance', 'Athlete training in a performance gym'),
    recovery: img('pillar-recovery', 'Therapist performing soft-tissue work on an athlete'),
    mental: img('pillar-mental', 'Focused athlete preparing mentally before training'),
  },
  athletes: {
    youth: img('who-youth', 'Coach working with a youth soccer team'),
    middleSchool: img('who-middle-school', 'Middle school soccer player kicking the ball'),
    highSchool: img('who-high-school', 'Basketball dropping through the hoop'),
    college: img('who-college', 'College athletes running at dusk'),
    professional: img('who-professional', 'Professional athlete lifting weights'),
    adult: img('who-adult', 'Adult athlete doing push-ups on dumbbells'),
  },
  programs: {
    sportsPerformance: img('program-sports-performance', 'Athlete preparing for a heavy deadlift'),
    therapyRecovery: img('program-therapy-recovery', 'Athlete stretching during a mobility session'),
    camps: img('program-camps', 'Group of athletes training together with resistance bands'),
    adult: img('program-adult', 'Adults training together with dumbbells'),
    mental: img('program-mental', 'Athlete holding a balance pose at sunset'),
    studentAssessment: img('program-student-assessment', 'Athlete performing a barbell squat assessment'),
  },
  social: [
    img('social-boxing', 'Boxer training in gloves'),
    img('social-basketball', 'Rack of basketballs'),
    img('social-soccer', 'Soccer player striking the ball'),
    img('social-ropes', 'Athlete training with battle ropes'),
  ],
  modals: {
    assessment: img('modal-assessment', 'Athlete training in the gym'),
    program: img('modal-program', 'Athlete performing a dumbbell row'),
    service: img('modal-service', 'Therapist working with an athlete'),
    enrollment: img('modal-enrollment', 'Coach leading a youth team'),
    contact: img('modal-contact', 'Battle ropes training'),
    newsletter: img('modal-newsletter', 'Basketball falling through the hoop'),
  },
} as const;
