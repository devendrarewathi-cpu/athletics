'use client';

import Image from 'next/image';
import { useCallback, useId, useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { FORM_CONFIGS } from '../forms/formConfigs';
import { InquiryForm, type FormActivity } from '../forms/InquiryForm';
import { ModalShell } from './ModalShell';
import type { ModalRequest } from './types';

interface CtaModalProps {
  request: ModalRequest;
  onClose: () => void;
}

/** One modal layout shared by all six purpose-specific form configurations. */
export function CtaModal({ request, onClose }: CtaModalProps) {
  const config = FORM_CONFIGS[request.type];
  const titleId = useId();
  const descriptionId = useId();
  const [activity, setActivity] = useState<FormActivity>({ dirty: false, submitting: false });
  const handleActivity = useCallback((next: FormActivity) => setActivity(next), []);

  return (
    <ModalShell
      labelledBy={titleId}
      describedBy={descriptionId}
      onClose={onClose}
      canClose={!activity.submitting}
      closeOnBackdrop={!activity.dirty}
      size={config.compact ? 'compact' : 'default'}
    >
      <div className={`cta-modal cta-modal--${config.type}`}>
        <aside className="cta-modal__intro">
          <Image sizes="(min-width: 768px) 420px, 100vw" className="cta-modal__image" src={config.image.src} alt="" width={800} height={1000} />
          <div className="cta-modal__intro-content">
            <Logo className="cta-modal__logo" decorative />
            <p className="eyebrow">{request.context ?? config.eyebrow}</p>
            <h2 id={titleId} className="cta-modal__title">
              {config.titleTop} <span>{config.titleAccent}</span>
            </h2>
            <p id={descriptionId} className="cta-modal__description">
              {config.description}
            </p>
          </div>
        </aside>
        <div className="cta-modal__body">
          <InquiryForm
            config={config}
            prefill={request.prefill}
            successAction={{ label: 'Close', onClick: onClose }}
            onActivityChange={handleActivity}
          />
        </div>
      </div>
    </ModalShell>
  );
}
