import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Search, TrendingUp, Code, ShieldCheck, Laptop, CheckCircle2, Cpu } from 'lucide-react';
import { AGENTS } from '../data/agents';
import { AgentData, AgentRole } from '../types';

interface AgentShowcaseProps {
  activeAgentId?: AgentRole;
  onSelectAgent?: (id: AgentRole) => void;
}

export const AgentShowcase: React.FC<AgentShowcaseProps> = ({
  activeAgentId,
  onSelectAgent
}) => {
  const [selectedId, setSelectedId] = useState<AgentRole>(activeAgentId || 'manager');

  const currentAgent = AGENTS.find((a) => a.id === selectedId) || AGENTS[0];

  const handleAgentClick = (agent: AgentData) => {
    setSelectedId(agent.id);
    if (onSelectAgent) {
      onSelectAgent(agent.id);
    }
  };

  const getAgentIcon = (id: AgentRole) => {
    switch (id) {
      case 'manager':
        return Crown;
      case 'research':
        return Search;
      case 'analysis':
        return TrendingUp;
      case 'development':
        return Code;
      case 'verification':
        return ShieldCheck;
    }
  };

  return (
    <section id="agents-section" className="agent-showcase-section" aria-label="Meet the AI Agent Team">
      <div className="section-header-block text-center">
        <div className="section-eyebrow">
          <span className="eyebrow-accent-dot" />
          <span>The Five Specialists</span>
        </div>
        <h2 className="section-main-heading">
          Engineered for Specialized Depth
        </h2>
        <p className="section-description">
          Each character occupies a dedicated workstation in the office, operating on a private laptop with tailored tools and responsibilities.
        </p>
      </div>

      {/* Agent Selector Ribbon */}
      <div className="agent-selector-ribbon" role="tablist" aria-label="Select an agent">
        {AGENTS.map((agent) => {
          const isSelected = selectedId === agent.id;
          const Icon = getAgentIcon(agent.id);

          return (
            <button
              key={agent.id}
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => handleAgentClick(agent)}
              className={`agent-tab-card ${isSelected ? 'is-selected' : ''}`}
              style={{
                '--agent-color': agent.color,
                '--agent-glow': agent.bgGlow
              } as React.CSSProperties}
            >
              {/* Agent Shape Symbol */}
              <div className="agent-avatar-glyph" aria-hidden="true">
                <div
                  className={`agent-shape-symbol shape-${agent.id}`}
                  style={{ backgroundColor: agent.color }}
                />
                <Icon size={16} className="agent-glyph-icon" />
              </div>

              <div className="agent-tab-meta">
                <span className="agent-tab-name">{agent.name}</span>
                <span className="agent-tab-role">{agent.role.split('&')[0]}</span>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="agentActiveIndicator"
                  className="agent-tab-active-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Agent Detailed Workstation Inspector */}
      <div className="agent-inspector-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAgent.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="agent-inspector-card"
            style={{
              '--agent-color': currentAgent.color,
              '--agent-glow': currentAgent.bgGlow
            } as React.CSSProperties}
          >
            {/* Left Column: Visual Character Identity & Role */}
            <div className="inspector-left-pane">
              <div className="agent-badge-tag-row">
                <span
                  className="agent-color-chip"
                  style={{ backgroundColor: currentAgent.color }}
                  aria-hidden="true"
                />
                <span className="agent-shape-label">{currentAgent.shape}</span>
                <span className="agent-station-pill">Desk: {currentAgent.id.toUpperCase()}</span>
              </div>

              <h3 className="inspector-agent-name">{currentAgent.name}</h3>
              <p className="inspector-agent-tagline">{currentAgent.tagline}</p>
              <p className="inspector-agent-desc">{currentAgent.description}</p>

              {/* Core Responsibilities */}
              <div className="inspector-responsibilities">
                <h4 className="inspector-subheading">Core Responsibilities</h4>
                <ul className="responsibilities-list">
                  {currentAgent.responsibilities.map((resp, i) => (
                    <li key={i} className="responsibility-item">
                      <CheckCircle2 size={15} className="resp-check-icon" style={{ color: currentAgent.color }} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Workstation & Live Console Telemetry */}
            <div className="inspector-right-pane">
              {/* Laptop & Workstation Status */}
              <div className="workstation-status-panel">
                <div className="workstation-header">
                  <div className="workstation-title-group">
                    <Laptop size={16} className="workstation-icon" />
                    <span className="workstation-title">Workstation Telemetry</span>
                  </div>
                  <span className="workstation-live-pulse">
                    <span className="pulse-dot" style={{ backgroundColor: currentAgent.color }} />
                    Active Stream
                  </span>
                </div>

                <div className="workstation-desk-loc">
                  <span className="loc-label">Physical Location:</span>
                  <span className="loc-value">{currentAgent.workstation.desk}</span>
                </div>

                {/* Laptop Screen Console Simulation */}
                <div className="laptop-screen-mock">
                  <div className="laptop-screen-header">
                    <div className="laptop-screen-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <span className="laptop-screen-tab">session-{currentAgent.id}.sh</span>
                    <Cpu size={12} className="laptop-cpu-icon" />
                  </div>
                  <div className="laptop-screen-body">
                    <div className="console-line">
                      <span className="console-prompt">&gt;</span>
                      <span className="console-cmd">status --telemetry</span>
                    </div>
                    <div className="console-output">
                      {currentAgent.workstation.laptopStatus}
                    </div>
                    <div className="console-line mt-2">
                      <span className="console-prompt">&gt;</span>
                      <span className="console-cmd">current_task</span>
                    </div>
                    <div className="console-task-highlight" style={{ color: currentAgent.color }}>
                      {currentAgent.workstation.currentTask}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="workstation-metrics-grid">
                  {currentAgent.workstation.metrics.map((metric, idx) => (
                    <div key={idx} className="metric-chip">
                      <span className="metric-label">{metric.label}</span>
                      <span className="metric-value" style={{ color: currentAgent.color }}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Deliverable Output */}
              <div className="sample-output-panel">
                <div className="sample-output-header">
                  <span className="sample-output-title">Sample Output Extract</span>
                  <span className="sample-output-badge">Verified</span>
                </div>
                <div className="sample-output-content">
                  <strong className="sample-output-strong">{currentAgent.sampleOutput.title}:</strong>
                  <p className="sample-output-text">{currentAgent.sampleOutput.content}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
