'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { NAV_ITEMS, SECTION_IDS, type NavItem } from '../../content/navigation';
import { SITE } from '../../content/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { useSectionHref } from '../../hooks/useSectionHref';
import { useModal } from '../../modals/modalContext';
import { ActionLink } from '../ui/ActionLink';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

/** `active` is the current homepage section id, or '' on other pages. */
function isItemActive(item: NavItem, active: string): boolean {
  if (!active) return false;
  if (item.section === 'contact') return active === 'facility';
  if (item.section === 'training') return active === 'training' || active === 'who-we-train';
  return item.section === active;
}

function NavDropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={containerRef}
      className="nav__item nav__item--dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`nav__link${active ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          // A mouse that can hover already opened the menu on enter; keyboard (detail 0) and touch toggle.
          const hoverOpened = event.detail > 0 && window.matchMedia('(hover: hover)').matches;
          setOpen((value) => (hoverOpened ? true : !value));
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() =>
              containerRef.current?.querySelector<HTMLElement>('.dropdown__link')?.focus(),
            );
          }
        }}
      >
        {item.label}
        <ChevronDown size={14} aria-hidden="true" className={`nav__chevron${open ? ' is-open' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            className="dropdown"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            {item.children?.map((child) => (
              <li key={child.label}>
                <ActionLink action={child.action} className="dropdown__link" onActivate={() => setOpen(false)}>
                  {child.label}
                </ActionLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileMenu({ onClose, active }: { onClose: () => void; active: string }) {
  const { openModal } = useModal();
  const sectionHref = useSectionHref();
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
  }, []);

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      className="mobile-menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
    >
      <nav aria-label="Mobile">
        <ul className="mobile-menu__list">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  type="button"
                  className={`mobile-menu__link${isItemActive(item, active) ? ' is-active' : ''}`}
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded((value) => (value === item.label ? null : item.label))}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`nav__chevron${expanded === item.label ? ' is-open' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expanded === item.label && (
                    <motion.ul
                      className="mobile-menu__sublist"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <ActionLink action={child.action} className="mobile-menu__sublink" onActivate={onClose}>
                            {child.label}
                          </ActionLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href={sectionHref(item.section)}
                  className={`mobile-menu__link${isItemActive(item, active) ? ' is-active' : ''}`}
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="mobile-menu__footer">
        <Button
          block
          arrow
          onClick={() => {
            onClose();
            openModal({ type: 'assessment' });
          }}
        >
          Book an Assessment
        </Button>
        <a className="mobile-menu__phone" href={SITE.phone.href}>
          <Phone size={16} aria-hidden="true" /> {SITE.phone.display}
        </a>
      </div>
    </motion.div>
  );
}

export function Header() {
  const { openModal } = useModal();
  const sectionHref = useSectionHref();
  const isHome = usePathname() === '/';
  const scrolled = useScrolled(40);
  const homeSection = useActiveSection(SECTION_IDS);
  const active = isHome ? homeSection : '';
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Close the menu if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia('(min-width: 1080px)');
    const onChange = () => desktop.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
      <div className="container site-header__inner">
        <a href={sectionHref('top')} className="site-header__brand" aria-label={`${SITE.brand} — home`}>
          <Logo decorative />
        </a>

        <nav aria-label="Primary" className="nav">
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => {
              const itemActive = isItemActive(item, active);
              return item.children ? (
                <NavDropdown key={item.label} item={item} active={itemActive} />
              ) : (
                <li key={item.label} className="nav__item">
                  <a
                    href={sectionHref(item.section)}
                    className={`nav__link${itemActive ? ' is-active' : ''}`}
                    aria-current={itemActive ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button size="sm" arrow className="site-header__cta" onClick={() => openModal({ type: 'assessment' })}>
          Book an Assessment
        </Button>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} active={active} />}
      </AnimatePresence>
    </header>
  );
}
