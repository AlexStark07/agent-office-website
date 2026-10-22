import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, GitMerge, Layers, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { NavPage } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  onRequestAccess: () => void;
}

interface NavItemDef {
  id: NavPage;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  shortLabel: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'team', label: 'Team & Office', icon: Users, shortLabel: 'Team' },
  { id: 'workflow', label: 'Workflow & Demo', icon: GitMerge, shortLabel: 'Workflow' },
  { id: 'capabilities', label: 'Capabilities', icon: Layers, shortLabel: 'Capabilities' }
];

export const Navigation: React.FC<NavigationProps> = ({
  activePage,
  onNavigate,
  onRequestAccess
}) => {
  const { toggleTheme, isDark } = useTheme();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<NavPage, HTMLButtonElement | null>>({
    team: null,
    workflow: null,
    capabilities: null
  });

  const [spotlightPos, setSpotlightPos] = useState({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Measure position of active nav item
  const updateSpotlightPosition = () => {
    const activeEl = itemRefs.current[activePage];
    const container = navContainerRef.current;
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const relativeLeft = elRect.left - containerRect.left;
      setSpotlightPos({
        left: relativeLeft,
        width: elRect.width
      });
    }
  };

  useEffect(() => {
    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition);
    return () => window.removeEventListener('resize', updateSpotlightPosition);
  }, [activePage]);

  // Scroll detection for slight nav glass depth changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <header className={`nav-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-header-content">
        {/* Brand Mark */}
        <button
          onClick={() => onNavigate('team')}
          className="nav-brand-button"
          aria-label="NOVA AI Agent Office Home"
        >
          <div className="nav-brand-icon-wrapper" aria-hidden="true">
            {/* Golden Triangle glyph representing the Manager */}
            <svg viewBox="0 0 24 24" className="nav-brand-triangle" fill="none">
              <polygon points="12,3 21,20 3,20" fill="url(#brandGoldGrad)" stroke="#F59E0B" strokeWidth="1.5" />
              <defs>
                <linearGradient id="brandGoldGrad" x1="12" y1="3" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBBF24" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-title">NOVA</span>
            <span className="nav-brand-subtitle">AGENT OFFICE</span>
          </div>
        </button>

        {/* Central Nav Container with Dark-Mode Moving Spotlight */}
        <nav
          ref={navContainerRef}
          className="nav-menu-bar"
          role="tablist"
          aria-label="Main Navigation"
        >
          {/* DARK MODE ONLY: Moving Spotlight Beam */}
          {isDark && (
            <motion.div
              className="nav-spotlight-beam-container"
              aria-hidden="true"
              initial={false}
              animate={{
                x: spotlightPos.left,
                width: spotlightPos.width,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 360, damping: 32, mass: 0.8 }
              }
            >
              {/* Soft illuminated strip at the top edge */}
              <div className="nav-spotlight-top-strip" />

              {/* Conical light beam shining downward */}
              <div className="nav-spotlight-cone" />

              {/* Soft white glow around and beneath the active icon */}
              <div className="nav-spotlight-glow" />
            </motion.div>
          )}

          {/* LIGHT MODE ONLY: Crisp Minimal Indicator */}
          {!isDark && (
            <motion.div
              className="nav-light-indicator"
              aria-hidden="true"
              initial={false}
              animate={{
                x: spotlightPos.left,
                width: spotlightPos.width,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 380, damping: 32 }
              }
            />
          )}

          {/* Nav Items */}
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[item.id] = el; }}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`nav-item-button ${isActive ? 'is-active' : ''}`}
              >
                <span className="nav-item-icon-wrapper" aria-hidden="true">
                  <Icon size={18} className="nav-item-icon" />
                </span>
                <span className="nav-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Early Access CTA */}
        <div className="nav-actions-group">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="nav-theme-toggle-btn"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun size={18} className="theme-toggle-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-toggle-icon moon-icon" />
            )}
          </button>

          {/* Early Access Action */}
          <button
            onClick={onRequestAccess}
            className="nav-cta-pill-btn"
          >
            <Sparkles size={14} className="nav-cta-sparkle" aria-hidden="true" />
            <span>Early Access</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-toggle-btn"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="nav-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="nav-mobile-list">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`nav-mobile-item ${isActive ? 'is-active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  onRequestAccess();
                  setMobileMenuOpen(false);
                }}
                className="nav-mobile-cta"
              >
                <Sparkles size={16} />
                <span>Request Early Access</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
