import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, Sparkles } from 'lucide-react';
import { LiquidMetalButton } from './LiquidMetalButton';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('Full-Stack Engineering & Architecture');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const mailtoLink = `mailto:alexp@example.com?subject=${encodeURIComponent(
    'NOVA Early Access Request'
  )}&body=${encodeURIComponent(
    `Hello NOVA Team,\n\nI would like to request early access for our team.\n\nWork Email: ${email}\nPrimary Use Case: ${useCase}\n\nBest regards,\n`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-backdrop-click-catcher" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="early-access-modal-card"
          >
            {/* Modal Header */}
            <div className="modal-header-row">
              <div className="modal-header-title-group">
                <div className="modal-sparkle-pill">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Private Cohort</span>
                </div>
                <h3 id="modal-title" className="modal-main-title">
                  Request Early Access
                </h3>
              </div>
              <button
                onClick={onClose}
                className="modal-close-btn"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="modal-form-body">
                <p className="modal-body-subtext">
                  Join our initial cohort of engineering organizations testing coordinated multi-agent orchestration.
                </p>

                <div className="form-field-group">
                  <label htmlFor="early-access-email" className="form-field-label">
                    Work Email Address
                  </label>
                  <input
                    id="early-access-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="form-text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="early-access-usecase" className="form-field-label">
                    Primary Workflow Focus
                  </label>
                  <select
                    id="early-access-usecase"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="form-select-input"
                  >
                    <option value="Full-Stack Engineering & Architecture">Full-Stack Engineering & Architecture</option>
                    <option value="Research & Market Intelligence">Research & Market Intelligence</option>
                    <option value="Security Audit & Compliance">Security Audit & Compliance</option>
                    <option value="Multi-Agent Coordinated Operations">Multi-Agent Coordinated Operations</option>
                  </select>
                </div>

                <div className="modal-actions-row">
                  <LiquidMetalButton
                    type="submit"
                    size="md"
                    glowColor="gold"
                    className="w-full justify-center"
                  >
                    Submit Access Application
                  </LiquidMetalButton>
                </div>

                <div className="modal-mailto-fallback">
                  <span>Prefer standard email client?</span>{' '}
                  <a href={mailtoLink} className="mailto-link">
                    Send via mailto <Mail size={12} className="inline ml-1" />
                  </a>
                </div>
              </form>
            ) : (
              <div className="modal-success-pane">
                <CheckCircle size={44} className="text-emerald-400 success-icon" />
                <h4 className="success-heading">Application Registered</h4>
                <p className="success-message">
                  Thank you for your interest in the NOVA AI Agent Office. Your intake record for{' '}
                  <strong>{email}</strong> has been logged. Our deployment team evaluates applicant cohorts weekly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="modal-done-btn"
                >
                  Return to Workspace
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
