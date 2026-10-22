import React, { useRef, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { HeroVideo } from '../components/HeroVideo';
import { AgentShowcase } from '../components/AgentShowcase';
import { GatewayFlow } from '../components/GatewayFlow';
import { LiquidMetalButton } from '../components/LiquidMetalButton';
import { AgentRole, NavPage } from '../types';

interface TeamPageProps {
  onNavigate: (page: NavPage) => void;
  onRequestAccess: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate, onRequestAccess }) => {
  const [activeAgent, setActiveAgent] = useState<AgentRole>('manager');
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-team-container">
      {/* SCENE A: Full-Screen Cinematic Video Hero */}
      <HeroVideo
        onMeetTeam={scrollToTeam}
        onSeeHowItWorks={() => onNavigate('workflow')}
      />

      {/* Transition Scrim & Ambient Gateway Particle Flow */}
      <div className="team-ambient-gateway-wrapper" aria-hidden="true">
        <GatewayFlow
          variant="ambient"
          height={380}
          activeAgent={activeAgent}
          interactive={false}
        />
      </div>

      {/* SCENE B: Meet the Team & Interactive Agent Showcase */}
      <div ref={teamSectionRef} className="team-showcase-wrapper">
        <AgentShowcase
          activeAgentId={activeAgent}
          onSelectAgent={(id) => setActiveAgent(id)}
        />
      </div>

      {/* Office Environment & Architectural Atmosphere Section */}
      <section className="office-environment-section" aria-label="Office Architectural Environment">
        <div className="office-env-inner">
          <div className="section-header-block text-center">
            <div className="section-eyebrow">
              <span className="eyebrow-accent-dot" />
              <span>Tactile Physicality</span>
            </div>
            <h2 className="section-main-heading">
              Designed for Natural Depth
            </h2>
            <p className="section-description">
              Moving beyond synthetic HUDs and generic dashboards. NOVA operates in a tactile contemporary environment built around white office desks, ceramic planters, and warm architectural lighting.
            </p>
          </div>

          <div className="office-pillars-grid">
            <div className="office-pillar-card glass-panel">
              <div className="pillar-icon-box">
                <Cpu size={20} className="text-amber-400" />
              </div>
              <h3 className="pillar-title">Independent Laptops</h3>
              <p className="pillar-desc">
                Each agent operates on a dedicated black laptop, preserving private memory contexts, process isolation, and distinct operational tools.
              </p>
            </div>

            <div className="office-pillar-card glass-panel">
              <div className="pillar-icon-box">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <h3 className="pillar-title">Physical Co-Location</h3>
              <p className="pillar-desc">
                Seated across glass partitions and natural foliage, agents hand off tasks seamlessly through low-latency local dispatch queues.
              </p>
            </div>

            <div className="office-pillar-card glass-panel">
              <div className="pillar-icon-box">
                <Zap size={20} className="text-cyan-400" />
              </div>
              <h3 className="pillar-title">Warm Architectural Light</h3>
              <p className="pillar-desc">
                A restrained, calm visual tone that fosters focus and trust, calibrated to eliminate screen fatigue and jarring neon glare.
              </p>
            </div>
          </div>

          {/* Interactive Callout to Orchestration */}
          <div className="team-callout-banner glass-panel">
            <div className="callout-copy">
              <span className="callout-badge">
                <Sparkles size={13} className="text-amber-400" />
                <span>Next Chapter</span>
              </span>
              <h3 className="callout-title">See How The Team Coordinates Work</h3>
              <p className="callout-subtext">
                Explore the delegation workflow from initial prompt decomposition to specialist execution and verification audit.
              </p>
            </div>
            <div className="callout-actions flex items-center gap-3 flex-wrap">
              <LiquidMetalButton
                size="md"
                glowColor="gold"
                onClick={() => onNavigate('workflow')}
                icon={<ArrowRight size={16} />}
                ariaLabel="Navigate to workflow and orchestration demonstration"
              >
                Launch Workflow Engine
              </LiquidMetalButton>
              <button
                onClick={onRequestAccess}
                className="hero-secondary-btn"
                aria-label="Request Early Access"
              >
                Request Access
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
