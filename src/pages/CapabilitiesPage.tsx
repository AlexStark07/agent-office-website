import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Zap, Check, GitMerge } from 'lucide-react';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { GatewayFlow } from '../components/GatewayFlow';
import { LiquidMetalButton } from '../components/LiquidMetalButton';
import { AgentRole, NavPage } from '../types';

interface CapabilitiesPageProps {
  onNavigate: (page: NavPage) => void;
  onRequestAccess: () => void;
  onSelectAgent?: (id: AgentRole) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({
  onNavigate,
  onRequestAccess,
  onSelectAgent
}) => {
  const [activeAgentFilter, setActiveAgentFilter] = useState<AgentRole | null>(null);

  return (
    <div className="page-capabilities-container">
      {/* Page Header */}
      <section className="capabilities-hero-section">
        <div className="section-header-block text-center">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span>SCENE E • Operational Matrix</span>
          </div>
          <h1 className="section-main-heading">
            Enterprise Capabilities & Services
          </h1>
          <p className="section-description">
            Six foundational competencies engineered to deliver production-grade results through coordinated specialist intelligence.
          </p>
        </div>

        {/* Ambient Matrix GatewayFlow Mesh */}
        <div className="capabilities-matrix-flow-wrapper" aria-hidden="true">
          <GatewayFlow
            variant="matrix"
            height={260}
            activeAgent={activeAgentFilter}
            interactive={false}
          />
        </div>
      </section>

      {/* SCENE E: Detailed Capabilities Section */}
      <CapabilitiesSection
        onAgentSelect={(id) => {
          setActiveAgentFilter(id);
          if (onSelectAgent) onSelectAgent(id);
        }}
      />

      {/* Enterprise Deployment Architecture Guarantees */}
      <section className="enterprise-security-section" aria-label="Security and Privacy Guarantees">
        <div className="security-inner-container">
          <div className="section-header-block text-center mb-8">
            <h2 className="section-sub-heading">Operational Integrity Guarantees</h2>
            <p className="section-sub-desc">
              Every workflow adheres to strict security, privacy, and least-privilege principles.
            </p>
          </div>

          <div className="security-cards-grid">
            <div className="security-glass-card glass-panel">
              <div className="sec-card-icon-box">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <h3 className="sec-card-title">Sandboxed Tool Execution</h3>
              <p className="sec-card-desc">
                Specialists run in isolated compute containers. State-changing actions require explicit user authorization, preventing unintended side effects.
              </p>
            </div>

            <div className="security-glass-card glass-panel">
              <div className="sec-card-icon-box">
                <Zap size={20} className="text-amber-400" />
              </div>
              <h3 className="sec-card-title">Zero Silent Execution</h3>
              <p className="sec-card-desc">
                No silent external API calls, financial transactions, or data modifications. Full audit transparency across all five workstations.
              </p>
            </div>

            <div className="security-glass-card glass-panel">
              <div className="sec-card-icon-box">
                <Layers size={20} className="text-cyan-400" />
              </div>
              <h3 className="sec-card-title">Memory Isolation</h3>
              <p className="sec-card-desc">
                Strict boundaries between ephemeral task scratchpads and persistent preferences. Untrusted inputs are never treated as instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE F: Calm, Premium Early Access CTA Section */}
      <section className="early-access-cta-section" aria-label="Early Access Application">
        <div className="early-access-banner glass-panel text-center">
          <div className="banner-sparkle-pill">
            <Sparkles size={14} className="text-amber-400" />
            <span>SCENE F • Private Access Cohort</span>
          </div>

          <h2 className="banner-heading">
            Move Work Forward with Coordinated AI
          </h2>

          <p className="banner-subtext">
            Experience an operating layer where intelligence translates into verifiable action. Join engineering and research organizations in our early access program.
          </p>

          <div className="banner-action-row flex items-center justify-center gap-4 flex-wrap">
            {/* Liquid Metal Button for Primary CTA */}
            <LiquidMetalButton
              size="lg"
              glowColor="gold"
              onClick={onRequestAccess}
              icon={<ArrowRight size={18} />}
              ariaLabel="Open early access request modal"
            >
              Request Early Access
            </LiquidMetalButton>

            <button
              onClick={() => onNavigate('workflow')}
              className="hero-secondary-btn"
              aria-label="Test workflow orchestration sandbox"
            >
              <GitMerge size={16} className="text-amber-400" />
              <span>Test Workflow Sandbox</span>
            </button>
          </div>

          <div className="banner-guarantees-row">
            <span className="guarantee-chip">
              <Check size={14} className="text-emerald-400 mr-1" /> No Credit Card Required
            </span>
            <span className="guarantee-chip">
              <Check size={14} className="text-emerald-400 mr-1" /> Direct Engineering Onboarding
            </span>
            <span className="guarantee-chip">
              <Check size={14} className="text-emerald-400 mr-1" /> SOC2-Ready Architecture
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
