import React from 'react';
import { NavPage } from '../types';
import { AGENTS } from '../data/agents';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onRequestAccess: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestAccess }) => {
  return (
    <footer className="site-footer-wrapper" aria-label="Site Footer">
      <div className="footer-inner-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand-mark">
              <svg viewBox="0 0 24 24" className="footer-brand-triangle" fill="none">
                <polygon points="12,3 21,20 3,20" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              </svg>
              <div className="footer-brand-name">
                <span className="brand-primary">NOVA</span>
                <span className="brand-secondary">AGENT OFFICE</span>
              </div>
            </div>
            <p className="footer-tagline">
              A coordinated team of five AI agents working together in a contemporary office to move work forward.
            </p>
            <div className="footer-system-status">
              <span className="status-indicator-dot" />
              <span>Architecture Preview • Operating Layer</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('team')} className="footer-link-btn">
                  Team & Office Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workflow')} className="footer-link-btn">
                  Orchestration & Workflow Demo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('capabilities')} className="footer-link-btn">
                  Core Capabilities
                </button>
              </li>
              <li>
                <button onClick={onRequestAccess} className="footer-link-btn highlight-link">
                  Request Early Access
                </button>
              </li>
            </ul>
          </div>

          {/* Five Agents Directory */}
          <div className="footer-agents-col">
            <h4 className="footer-col-title">Agent Directory</h4>
            <div className="footer-agents-list">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="footer-agent-row">
                  <span
                    className="footer-agent-bullet"
                    style={{ backgroundColor: agent.color }}
                    aria-hidden="true"
                  />
                  <span className="footer-agent-name">{agent.name}</span>
                  <span className="footer-agent-role">({agent.role.split('&')[0]})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} NOVA AI Agent Office. Designed & engineered for coordinated intelligence.
          </p>
          <div className="footer-bottom-badges">
            <span className="footer-badge">Cinematic 100svh Hero</span>
            <span className="footer-badge">WebGL Liquid Metal</span>
            <span className="footer-badge">Moving Spotlight Navigation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
