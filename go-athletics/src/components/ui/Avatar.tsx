import { UserRound } from 'lucide-react';

/** Neutral avatar used for testimonials until approved client portraits are available. */
export function Avatar({ name }: { name: string }) {
  return (
    <span className="avatar" aria-hidden="true" title={name}>
      <UserRound size={20} />
    </span>
  );
}
