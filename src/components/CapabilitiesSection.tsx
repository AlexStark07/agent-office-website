import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code2, TrendingUp, FileText, ShieldCheck, GitFork, ArrowUpRight, Check, Users } from 'lucide-react';
import { CAPABILITIES, AGENTS } from '../data/agents';
import { CapabilityItem, AgentRole } from '../types';

interface CapabilitiesSectionProps {
  onAgentSelect?: (id: AgentRole) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onAgentSelect }) => {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem>(CAPABILITIES[0]);

  const getCapabilityIcon = (id: string) => {
    switch (id) {
      case 'research-synthesis':
        return Search;
      case 'software-dev':
        return Code2;
      case 'analysis-decisions':
        return TrendingUp;
      case 'content-creation':
        return FileText;
      case 'review-verification':
        return ShieldCheck;
      case 'coordinated-workflows':
        return GitFork;
      default:
        return FileText;
    }
  };

  return (
    <section className="capabilities-section" aria-label="Capabilities and Services">
      <div className="section-header-block text-center">
        <div className="section-eyebrow">
          <span className="eyebrow-accent-dot" />
          <span>Core Competencies</span>
        </div>
        <h2 className="section-main-heading">
          Precision Capabilities, Unified Flow
        </h2>
        <p className="section-description">
          Engineered to resolve complex multi-step technical and analytical challenges through synchronized multi-agent delegation.
        </p>
      </div>

      {/* Capabilities Master-Detail Layout */}
      <div className="capabilities-layout-grid">
        {/* Left Column: Capability Interactive Cards List */}
        <div className="capabilities-list-col">
          {CAPABILITIES.map((cap) => {
            const Icon = getCapabilityIcon(cap.id);
            const isSelected = selectedCap.id === cap.id;

            return (
              <button
                key={cap.id}
                onClick={() => setSelectedCap(cap)}
                className={`capability-pill-card ${isSelected ? 'is-selected' : ''}`}
                aria-selected={isSelected}
              >
                <div className="cap-icon-box" aria-hidden="true">
                  <Icon size={18} className="cap-icon" />
                </div>
                <div className="cap-meta-info">
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-short-desc">{cap.shortDescription}</p>
                </div>
                <div className="cap-arrow-indicator" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Glass Inspector */}
        <div className="capabilities-detail-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCap.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="capability-detail-glass"
            >
              <div className="detail-header-row">
                <div>
                  <span className="detail-eyebrow">Operational Pillar</span>
                  <h3 className="detail-title">{selectedCap.title}</h3>
                </div>
              </div>

              <p className="detail-description">{selectedCap.detailedDescription}</p>

              {/* Participating Specialist Agents */}
              <div className="detail-team-row">
                <span className="team-row-label">
                  <Users size={14} className="mr-1 inline" />
                  Collaborating Specialists:
                </span>
                <div className="team-chips-group">
                  {selectedCap.participatingAgents.map((roleId) => {
                    const agent = AGENTS.find((a) => a.id === roleId);
                    if (!agent) return null;
                    return (
                      <button
                        key={roleId}
                        onClick={() => onAgentSelect && onAgentSelect(roleId)}
                        className="agent-chip-pill"
                        style={{
                          borderColor: agent.color,
                          color: agent.color
                        }}
                        title={`View ${agent.name}`}
                      >
                        <span
                          className="chip-color-bullet"
                          style={{ backgroundColor: agent.color }}
                          aria-hidden="true"
                        />
                        <span>{agent.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tangible Key Outputs */}
              <div className="detail-section-block">
                <h4 className="detail-subhead">Standard Deliverable Formats</h4>
                <div className="detail-outputs-grid">
                  {selectedCap.keyOutputs.map((output, i) => (
                    <div key={i} className="output-bullet-item">
                      <Check size={14} className="output-check-icon" />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Use Cases */}
              <div className="detail-section-block">
                <h4 className="detail-subhead">Demonstrated Use Cases</h4>
                <ul className="use-cases-list">
                  {selectedCap.sampleUseCases.map((useCase, i) => (
                    <li key={i} className="use-case-item">
                      <span className="use-case-dash">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
