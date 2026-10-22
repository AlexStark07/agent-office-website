import React, { useState } from 'react';
import { GitMerge, ChevronRight } from 'lucide-react';
import { GatewayFlow } from '../components/GatewayFlow';
import { WorkflowDemo } from '../components/WorkflowDemo';
import { LiquidMetalButton } from '../components/LiquidMetalButton';
import { AgentRole, NavPage } from '../types';

interface WorkflowPageProps {
  onNavigate: (page: NavPage) => void;
  onRequestAccess: () => void;
}

export const WorkflowPage: React.FC<WorkflowPageProps> = ({ onNavigate, onRequestAccess }) => {
  const [activeFocusAgent, setActiveFocusAgent] = useState<AgentRole | null>(null);

  const orchestrationSteps = [
    {
      num: '01',
      title: 'Task Submission',
      agent: 'User to Manager',
      desc: 'The user submits an objective or problem statement via prompt or API.'
    },
    {
      num: '02',
      title: 'Decomposition',
      agent: 'Manager Hub',
      desc: 'The Golden Manager parses intent, establishes constraints, and creates specialized work parcels.'
    },
    {
      num: '03',
      title: 'Specialist Execution',
      agent: 'Research • Analysis • Development',
      desc: 'Workstations execute concurrently in parallel streams, indexing data, scoring models, and generating code.'
    },
    {
      num: '04',
      title: 'Quality Verification',
      agent: 'Verification Specialist',
      desc: 'The Orange Verifier audits results against invariants, security guidelines, and edge-case boundaries.'
    },
    {
      num: '05',
      title: 'Unified Synthesis',
      agent: 'Manager to User',
      desc: 'The Manager synthesizes the verified components into a unified, executive-grade deliverable package.'
    }
  ];

  return (
    <div className="page-workflow-container">
      {/* Page Header */}
      <section className="workflow-hero-section">
        <div className="section-header-block text-center">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-dot" />
            <span>SCENE C • Orchestration Engine</span>
          </div>
          <h1 className="section-main-heading">
            How The Team Coordinates Work
          </h1>
          <p className="section-description">
            Autonomous execution without chaos. The Golden Manager routes high-level intent to specialist workstations, enforcing rigorous quality verification before deliverable sign-off.
          </p>
        </div>

        {/* Live GatewayFlow Particle Dispatch Canvas */}
        <div className="gateway-flow-featured-card glass-panel">
          <div className="gateway-card-header">
            <div className="gateway-title-group">
              <GitMerge size={16} className="text-amber-400" />
              <span className="gateway-title">Live Dispatch Topology</span>
            </div>
            <div className="gateway-legend-chips">
              <span className="legend-chip chip-gold">Manager</span>
              <span className="legend-chip chip-purple">Research</span>
              <span className="legend-chip chip-cyan">Analysis</span>
              <span className="legend-chip chip-mint">Development</span>
              <span className="legend-chip chip-orange">Verification</span>
            </div>
          </div>

          {/* Integrated GatewayFlow Component */}
          <div className="gateway-canvas-container">
            <GatewayFlow
              variant="orchestration"
              activeAgent={activeFocusAgent}
              height={380}
              showNodes={true}
              interactive={true}
            />
          </div>

          <div className="gateway-card-footer">
            <span className="gateway-footer-hint">
              Hover to deflect particle trajectories • Streams indicate active data handoffs between Manager and Specialist stations
            </span>
          </div>
        </div>
      </section>

      {/* Step-by-Step Orchestration Process */}
      <section className="orchestration-steps-section" aria-label="Five Step Orchestration Process">
        <div className="steps-container-inner">
          <div className="section-header-block text-center mb-8">
            <h2 className="section-sub-heading">The Five-Phase Delivery Protocol</h2>
            <p className="section-sub-desc">
              Every request undergoes structured decomposition, parallel specialist execution, and mandatory audit validation.
            </p>
          </div>

          <div className="steps-cards-grid">
            {orchestrationSteps.map((step, idx) => (
              <div key={idx} className="step-process-card glass-panel">
                <div className="step-card-top">
                  <span className="step-number">{step.num}</span>
                  <span className="step-agent-pill">{step.agent}</span>
                </div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE D: Interactive Workflow Simulation Demo */}
      <section className="workflow-sandbox-section" aria-label="Simulated Task Workflow Demonstration">
        <div className="sandbox-inner">
          <div className="section-header-block text-center mb-6">
            <div className="section-eyebrow">
              <span className="eyebrow-accent-dot" />
              <span>SCENE D • Work In Progress</span>
            </div>
            <h2 className="section-main-heading">
              Interactive Execution Sandbox
            </h2>
            <p className="section-description">
              Trigger a simulated end-to-end task workflow. Observe workstations illuminate as sub-tasks dispatch, progress tracks in real time, and consolidated deliverables compile.
            </p>
          </div>

          {/* Fully Interactive Workflow Demo */}
          <WorkflowDemo onAgentFocus={(agent) => setActiveFocusAgent(agent)} />

          {/* Callout to Capabilities Page */}
          <div className="workflow-next-banner glass-panel">
            <div className="next-banner-copy">
              <h3 className="next-title">Explore Production Capabilities</h3>
              <p className="next-desc">
                Review the six core operational competencies supported across research, code generation, decision modeling, and compliance.
              </p>
            </div>
            <div className="next-banner-action flex items-center gap-3 flex-wrap">
              <LiquidMetalButton
                size="md"
                glowColor="gold"
                onClick={() => onNavigate('capabilities')}
                icon={<ChevronRight size={18} />}
                ariaLabel="Navigate to capabilities section"
              >
                View All Capabilities
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
