'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { FAQS, type Faq } from '../../content/home';
import { useModal } from '../../modals/modalContext';
import { Button } from '../ui/Button';
import { EASE } from '../../lib/motion';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

function FaqItem({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <h3 className="faq-item__heading">
        <button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span>{faq.question}</span>
          <Plus className="faq-item__icon" size={18} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="faq-item__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const { openModal } = useModal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const columns = [FAQS.filter((_, i) => i % 2 === 0), FAQS.filter((_, i) => i % 2 === 1)];

  return (
    <section id="faq" className="section section--light faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeading
          id="faq-title"
          tone="light"
          accent
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our programs, assessments and training."
        />
        <Reveal className="faq__grid">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="faq__column">
              {column.map((faq) => {
                const index = FAQS.indexOf(faq);
                return (
                  <FaqItem
                    key={faq.question}
                    faq={faq}
                    open={openIndex === index}
                    onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
                  />
                );
              })}
            </div>
          ))}
        </Reveal>
        <Reveal className="faq__more">
          <p>Still have questions?</p>
          <Button variant="light" arrow aria-haspopup="dialog" onClick={() => openModal({ type: 'contact' })}>
            Contact our team
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
