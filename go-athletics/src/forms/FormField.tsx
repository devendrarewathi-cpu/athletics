'use client';

import { localToday, type FieldRule } from '@/forms/schema';
import { CircleAlert } from 'lucide-react';
import type { ChangeEvent, ReactNode } from 'react';
import { SITE } from '../content/site';
import type { FieldConfig } from './formConfigs';

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface FormFieldProps {
  field: FieldConfig;
  rule: FieldRule;
  id: string;
  value: string | boolean;
  error?: string;
  onChange: (name: string, value: string | boolean) => void;
  onBlur: (name: string) => void;
  registerRef: (name: string, element: FieldElement | null) => void;
}

function ConsentText({ kind }: { kind: FieldConfig['consent'] }): ReactNode {
  if (kind === 'marketing') {
    return (
      <>
        Yes, I want to receive email updates about programs, events and news from {SITE.legalName}. I understand I can
        unsubscribe at any time.
      </>
    );
  }
  return (
    <>
      I agree to be contacted about my inquiry and acknowledge the{' '}
      <a href="/privacy-policy" target="_blank" rel="noopener">
        Privacy Policy
      </a>
      .
    </>
  );
}

function ErrorMessage({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="field__error">
      <CircleAlert size={14} aria-hidden="true" />
      <span>{error}</span>
    </p>
  );
}

export function FormField({ field, rule, id, value, error, onChange, onBlur, registerRef }: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': rule.required || undefined,
    onBlur: () => onBlur(field.name),
    ref: (element: FieldElement | null) => registerRef(field.name, element),
  };
  const handleText = (event: ChangeEvent<FieldElement>) => onChange(field.name, event.target.value);
  const className = `field${field.full ? ' field--full' : ''}${error ? ' field--error' : ''}`;

  if (field.control === 'checkbox') {
    return (
      <div className={`${className} field--checkbox`}>
        <label className="checkbox" htmlFor={id}>
          <input
            {...shared}
            type="checkbox"
            checked={value === true}
            onChange={(event) => onChange(field.name, event.target.checked)}
          />
          <span className="checkbox__box" aria-hidden="true" />
          <span className="checkbox__label">
            <ConsentText kind={field.consent} />
            {rule.required && <span className="sr-only"> (required)</span>}
          </span>
        </label>
        <ErrorMessage id={errorId} error={error} />
      </div>
    );
  }

  const text = typeof value === 'string' ? value : '';
  let control: ReactNode;
  switch (field.control) {
    case 'select':
      control = (
        <div className="select">
          <select {...shared} value={text} onChange={handleText} data-empty={text === '' || undefined}>
            <option value="">{field.placeholder ?? 'Select an option'}</option>
            {rule.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case 'textarea':
      control = (
        <textarea {...shared} value={text} onChange={handleText} placeholder={field.placeholder} rows={field.rows ?? 4} />
      );
      break;
    case 'date':
      control = <input {...shared} type="date" value={text} min={localToday()} onChange={handleText} />;
      break;
    default:
      control = (
        <input
          {...shared}
          type={field.control}
          value={text}
          onChange={handleText}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.control === 'tel' ? 'tel' : field.control === 'email' ? 'email' : undefined}
        />
      );
  }

  return (
    <div className={className}>
      <label className="field__label" htmlFor={id}>
        {field.label}
        {rule.required ? (
          <span className="field__required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="field__optional"> (optional)</span>
        )}
      </label>
      {control}
      <ErrorMessage id={errorId} error={error} />
    </div>
  );
}
