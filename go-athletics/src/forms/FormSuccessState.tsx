'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { SITE } from '../content/site';
import type { FormConfig } from './formConfigs';

interface FormSuccessStateProps {
  config: FormConfig;
  actionLabel: string;
  onAction: () => void;
}

export function FormSuccessState({ config, actionLabel, onAction }: FormSuccessStateProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => headingRef.current?.focus(), []);

  return (
    <motion.div
      className="form-success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <svg className="form-success__check" viewBox="0 0 52 52" aria-hidden="true">
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.path
          d="M15 27l7 7 15-16"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: 0.4, ease: 'easeOut' }}
        />
      </svg>

      <h3 className="form-success__title" tabIndex={-1} ref={headingRef}>
        {config.success.title}
      </h3>
      <p className="form-success__message">{config.success.message}</p>

      {config.type !== 'newsletter' && (
        <div className="form-notice" role="note">
          <Info size={18} aria-hidden="true" />
          <p>
            To reach our team now, call <a href={SITE.phone.href}>{SITE.phone.display}</a> or email{' '}
            <a href={SITE.email.href}>{SITE.email.display}</a>.
          </p>
        </div>
      )}

      <Button size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    </motion.div>
  );
}
