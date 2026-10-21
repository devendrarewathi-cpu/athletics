'use client';

import { FORM_RULES, validateField, type FormErrors, type FormValues } from '@/forms/schema';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { simulateSubmission, SubmissionError } from '../lib/simulateSubmission';
import type { ModalPrefill } from '../modals/types';
import type { FormConfig } from './formConfigs';
import { FormField } from './FormField';
import { FormSuccessState } from './FormSuccessState';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface FormActivity {
  dirty: boolean;
  submitting: boolean;
}

interface InquiryFormProps {
  config: FormConfig;
  prefill?: ModalPrefill;
  /** Label and handler for the button shown after a successful submission. */
  successAction: { label: string; onClick?: () => void };
  onActivityChange?: (activity: FormActivity) => void;
}

function initialValues(config: FormConfig, prefill?: ModalPrefill): FormValues {
  const values: FormValues = { ...config.hiddenDefaults };
  for (const field of config.fields) {
    values[field.name] = field.control === 'checkbox' ? false : '';
  }
  for (const [name, value] of Object.entries(prefill ?? {})) {
    // Only prefill fields this form actually shows, with a value its rule accepts.
    const rule = FORM_RULES[config.type][name];
    if (name in values && rule && value && validateField(rule, value) === undefined) values[name] = value;
  }
  return values;
}

function formatUsPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}` : value;
}

/** Generic, config-driven form used by all six CTA modals and the inline contact form. */
export function InquiryForm({ config, prefill, successAction, onActivityChange }: InquiryFormProps) {
  const idPrefix = useId();
  const rules = FORM_RULES[config.type];
  const startValues = useMemo(() => initialValues(config, prefill), [config, prefill]);

  const [values, setValues] = useState<FormValues>(startValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const fieldRefs = useRef(new Map<string, FieldElement>());
  const inFlight = useRef(false);

  const dirty = config.fields.some((field) => values[field.name] !== startValues[field.name]);
  useEffect(() => {
    onActivityChange?.({ dirty: dirty && status !== 'success', submitting: status === 'submitting' });
  }, [dirty, status, onActivityChange]);

  const validateVisible = (current: FormValues): FormErrors => {
    const next: FormErrors = {};
    for (const field of config.fields) {
      const error = validateField(rules[field.name], current[field.name]);
      if (error) next[field.name] = error;
    }
    return next;
  };

  const setFieldError = (name: string, error: string | undefined) =>
    setErrors((previous) => {
      if (previous[name] === error) return previous;
      const next = { ...previous };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });

  const handleChange = (name: string, value: string | boolean) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    // Re-validate live once the visitor has seen an error for this field.
    if (errors[name] || submitAttempted || typeof value === 'boolean') {
      setFieldError(name, validateField(rules[name], value));
    }
    if (status === 'error') setStatus('idle');
  };

  const handleBlur = (name: string) => {
    let value = values[name];
    if (name === 'phone' && typeof value === 'string') {
      value = formatUsPhone(value);
      if (value !== values[name]) setValues((previous) => ({ ...previous, [name]: value }));
    }
    // Do not flag untouched empty fields while someone is simply tabbing through.
    if (value !== '' || submitAttempted) setFieldError(name, validateField(rules[name], value));
  };

  const focusField = (name: string) => fieldRefs.current.get(name)?.focus();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    setSubmitAttempted(true);

    const clientErrors = validateVisible(values);
    setErrors(clientErrors);
    const invalid = config.fields.filter((field) => clientErrors[field.name]);
    if (invalid.length > 0) {
      setAnnouncement(
        `Please correct ${invalid.length} highlighted ${invalid.length === 1 ? 'field' : 'fields'} and try again.`,
      );
      focusField(invalid[0].name);
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    setServerMessage('');
    setAnnouncement('Submitting your form…');

    const payload: FormValues = {};
    for (const [name, value] of Object.entries(values)) {
      payload[name] = typeof value === 'string' ? value.trim() : value;
    }

    try {
      await simulateSubmission(config.type, payload);
      setStatus('success');
      setAnnouncement('');
    } catch (error) {
      const message =
        error instanceof SubmissionError ? error.message : 'Something went wrong. Please try again.';
      setServerMessage(message);
      setStatus('error');
      setAnnouncement(`Your form was not completed. ${message}`);
    } finally {
      inFlight.current = false;
    }
  };

  const reset = () => {
    setValues(startValues);
    setErrors({});
    setSubmitAttempted(false);
    setServerMessage('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <FormSuccessState
        config={config}
        actionLabel={successAction.label}
        onAction={successAction.onClick ?? reset}
      />
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className="inquiry-form" noValidate onSubmit={handleSubmit} aria-busy={submitting}>
      <div className="inquiry-form__grid">
        {config.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            rule={rules[field.name]}
            id={`${idPrefix}-${field.name}`}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            registerRef={(name, element) => {
              if (element) fieldRefs.current.set(name, element);
              else fieldRefs.current.delete(name);
            }}
          />
        ))}
      </div>

      {status === 'error' && serverMessage && (
        <div className="form-alert" role="alert">
          <CircleAlert size={18} aria-hidden="true" />
          <p>
            <strong>We couldn’t complete your form.</strong> {serverMessage} Your answers are still here — you can try
            again.
          </p>
        </div>
      )}

      <Button type="submit" block arrow={!submitting} disabled={submitting} className="inquiry-form__submit">
        {submitting ? (
          <span className="btn__loading">
            <LoaderCircle className="spinner" size={18} aria-hidden="true" />
            Submitting...
          </span>
        ) : (
          config.submitLabel
        )}
      </Button>

      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </form>
  );
}
