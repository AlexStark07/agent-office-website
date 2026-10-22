import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, Loader2, AlertCircle, FileText, Code2, ShieldCheck, Cpu } from 'lucide-react';
import { WORKFLOW_PROMPTS } from '../data/agents';
import { WorkflowPromptOption, AgentRole } from '../types';
import { LiquidMetalButton } from './LiquidMetalButton';

interface WorkflowDemoProps {
  onAgentFocus?: (role: AgentRole | null) => void;
}

type DemoPhase = 'idle' | 'decomposing' | 'executing' | 'verifying' | 'completed';

export const WorkflowDemo: React.FC<WorkflowDemoProps> = ({ onAgentFocus }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<WorkflowPromptOption>(WORKFLOW_PROMPTS[0]);
  const [customTask, setCustomTask] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'summary' | 'code' | 'verification'>('summary');
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, []);

  const runSimulation = () => {
    if (phase !== 'idle' && phase !== 'completed') return;

    // Reset timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    setPhase('decomposing');
    setProgress(15);
    if (onAgentFocus) onAgentFocus('manager');

    // Phase 1 -> Phase 2 (Specialists working)
    const t1 = setTimeout(() => {
      setPhase('executing');
      setProgress(55);
      if (onAgentFocus) onAgentFocus('development');
    }, 1800);

    // Phase 2 -> Phase 3 (Verification)
    const t2 = setTimeout(() => {
      setPhase('verifying');
      setProgress(85);
      if (onAgentFocus) onAgentFocus('verification');
    }, 4200);

    // Phase 3 -> Phase 4 (Completed)
    const t3 = setTimeout(() => {
      setPhase('completed');
      setProgress(100);
      if (onAgentFocus) onAgentFocus('manager');
    }, 6200);

    timerRef.current = [t1, t2, t3];
  };

  const resetSimulation = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setPhase('idle');
    setProgress(0);
    if (onAgentFocus) onAgentFocus(null);
  };

  const isRunning = phase !== 'idle' && phase !== 'completed';

  return (
    <div className="workflow-demo-wrapper" aria-label="Interactive Workflow Simulation">
      {/* Simulation Control Bar */}
      <div className="demo-config-panel">
        <div className="demo-config-header">
          <div className="demo-config-title-group">
            <Cpu size={16} className="text-amber-400" />
            <h3 className="demo-config-title">Task Orchestration Sandbox</h3>
          </div>
          <span className="demo-simulated-pill">
            <AlertCircle size={12} />
            <span>Simulated Demonstration</span>
          </span>
        </div>

        {/* Prompt Selection Options */}
        <div className="demo-prompts-selector">
          <label className="demo-selector-label">Select Sample Enterprise Objective:</label>
          <div className="demo-prompts-grid">
            {WORKFLOW_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                disabled={isRunning}
                onClick={() => {
                  setSelectedPrompt(prompt);
                  setIsCustomMode(false);
                }}
                className={`prompt-chip-btn ${selectedPrompt.id === prompt.id && !isCustomMode ? 'is-active' : ''}`}
              >
                <span className="prompt-chip-category">{prompt.category}</span>
                <span className="prompt-chip-title">{prompt.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Task Preview & Custom Task Toggle */}
        <div className="demo-task-box">
          <div className="demo-task-header">
            <span className="task-header-label">Objective Directive:</span>
            <button
              disabled={isRunning}
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="custom-task-toggle"
            >
              {isCustomMode ? 'Use Preset Directive' : 'Type Custom Directive'}
            </button>
          </div>
          {isCustomMode ? (
            <textarea
              disabled={isRunning}
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              placeholder="e.g. Architect an event-driven telemetry ingestion engine with automated anomaly detection..."
              className="custom-task-input"
              rows={2}
            />
          ) : (
            <p className="task-display-text">{selectedPrompt.task}</p>
          )}
        </div>

        {/* Demo Execution Actions */}
        <div className="demo-actions-bar">
          <div className="demo-run-group">
            <LiquidMetalButton
              size="md"
              glowColor="gold"
              disabled={isRunning}
              onClick={runSimulation}
              icon={isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              ariaLabel="Execute workflow demonstration"
            >
              {isRunning ? 'Orchestrating Agents...' : phase === 'completed' ? 'Rerun Demo' : 'Run Demo'}
            </LiquidMetalButton>

            <button
              onClick={resetSimulation}
              disabled={phase === 'idle'}
              className="demo-reset-btn"
              aria-label="Reset simulation"
              title="Reset simulation to initial state"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>

          {/* Real-time Status Badge */}
          <div className="demo-status-pill">
            <span
              className={`demo-status-indicator status-${phase}`}
              aria-hidden="true"
            />
            <span className="demo-status-text">
              {phase === 'idle' && 'Ready for Task Input'}
              {phase === 'decomposing' && 'Manager: Decomposing Objectives'}
              {phase === 'executing' && 'Specialists: Processing in Parallel'}
              {phase === 'verifying' && 'Verification: Checking Criteria'}
              {phase === 'completed' && 'Completed • Deliverable Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="demo-timeline-track" aria-hidden="true">
        <div className="timeline-bar-bg">
          <motion.div
            className="timeline-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          />
        </div>
      </div>

      {/* Agent Workstation Sequence Illuminated States */}
      <div className="demo-agent-matrix">
        {/* Manager Workstation */}
        <div className={`matrix-agent-card ${phase === 'decomposing' || phase === 'completed' ? 'is-active manager-active' : ''}`}>
          <div className="matrix-card-header">
            <span className="matrix-dot dot-manager" />
            <span className="matrix-agent-name">Manager</span>
          </div>
          <span className="matrix-agent-status">
            {phase === 'idle' && 'Awaiting Directive'}
            {phase === 'decomposing' && 'Breaking down subtasks...'}
            {phase === 'executing' && 'Monitoring parallel threads'}
            {phase === 'verifying' && 'Preparing synthesis schema'}
            {phase === 'completed' && 'Final Deliverable Assembled'}
          </span>
        </div>

        {/* Research Workstation */}
        <div className={`matrix-agent-card ${phase === 'executing' ? 'is-active research-active' : ''}`}>
          <div className="matrix-card-header">
            <span className="matrix-dot dot-research" />
            <span className="matrix-agent-name">Research</span>
          </div>
          <span className="matrix-agent-status">
            {phase === 'idle' && 'Idle'}
            {phase === 'decomposing' && 'Standby for specs'}
            {phase === 'executing' && 'Indexing 14 RFCs & papers...'}
            {phase === 'verifying' || phase === 'completed' ? 'Context Kernel Extracted' : ''}
          </span>
        </div>

        {/* Analysis Workstation */}
        <div className={`matrix-agent-card ${phase === 'executing' ? 'is-active analysis-active' : ''}`}>
          <div className="matrix-card-header">
            <span className="matrix-dot dot-analysis" />
            <span className="matrix-agent-name">Analysis</span>
          </div>
          <span className="matrix-agent-status">
            {phase === 'idle' && 'Idle'}
            {phase === 'decomposing' && 'Standby for criteria'}
            {phase === 'executing' && 'Benchmarking trade-offs...'}
            {phase === 'verifying' || phase === 'completed' ? 'Vector Matrix Computed' : ''}
          </span>
        </div>

        {/* Development Workstation */}
        <div className={`matrix-agent-card ${phase === 'executing' ? 'is-active development-active' : ''}`}>
          <div className="matrix-card-header">
            <span className="matrix-dot dot-dev" />
            <span className="matrix-agent-name">Development</span>
          </div>
          <span className="matrix-agent-status">
            {phase === 'idle' && 'Idle'}
            {phase === 'decomposing' && 'Standby for specs'}
            {phase === 'executing' && 'Authoring verified code...'}
            {phase === 'verifying' || phase === 'completed' ? 'Implementation Complete' : ''}
          </span>
        </div>

        {/* Verification Workstation */}
        <div className={`matrix-agent-card ${phase === 'verifying' ? 'is-active verification-active' : ''}`}>
          <div className="matrix-card-header">
            <span className="matrix-dot dot-verification" />
            <span className="matrix-agent-name">Verification</span>
          </div>
          <span className="matrix-agent-status">
            {phase === 'idle' && 'Idle'}
            {phase === 'decomposing' || phase === 'executing' ? 'Awaiting test candidate' : ''}
            {phase === 'verifying' && 'Fuzzing boundary constraints...'}
            {phase === 'completed' && '100% Invariants Passed'}
          </span>
        </div>
      </div>

      {/* Deliverable Result Preview (Revealed on Completion) */}
      <AnimatePresence>
        {phase === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="demo-deliverable-card"
          >
            <div className="deliverable-header">
              <div className="deliverable-title-row">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <div>
                  <h4 className="deliverable-title">Consolidated Deliverable Package</h4>
                  <span className="deliverable-meta">Signed off by Manager • Certified by Verification</span>
                </div>
              </div>

              {/* Deliverable Sub-tabs */}
              <div className="deliverable-tabs-row" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'summary'}
                  onClick={() => setActiveTab('summary')}
                  className={`deliv-tab ${activeTab === 'summary' ? 'is-active' : ''}`}
                >
                  <FileText size={14} />
                  <span>Executive Summary</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'code'}
                  onClick={() => setActiveTab('code')}
                  className={`deliv-tab ${activeTab === 'code' ? 'is-active' : ''}`}
                >
                  <Code2 size={14} />
                  <span>Technical Code</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'verification'}
                  onClick={() => setActiveTab('verification')}
                  className={`deliv-tab ${activeTab === 'verification' ? 'is-active' : ''}`}
                >
                  <ShieldCheck size={14} />
                  <span>Audit Certificate</span>
                </button>
              </div>
            </div>

            {/* Deliverable Tab Content */}
            <div className="deliverable-body">
              {activeTab === 'summary' && (
                <div className="deliv-summary-content">
                  <p className="deliv-p-strong">{selectedPrompt.expectedDeliverable.summary}</p>
                  <div className="deliv-breakdown-grid">
                    <div className="breakdown-item">
                      <span className="breakdown-tag tag-purple">Research Kernel</span>
                      <p className="breakdown-text">{selectedPrompt.expectedDeliverable.researchSummary}</p>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-tag tag-cyan">Analysis Verdict</span>
                      <p className="breakdown-text">{selectedPrompt.expectedDeliverable.analysisVerdict}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="deliv-code-content">
                  <pre className="deliv-code-block">
                    <code>{selectedPrompt.expectedDeliverable.codePreview}</code>
                  </pre>
                  <span className="deliv-code-note">
                    Authored by Development Specialist • Checked for strict TypeScript conformance
                  </span>
                </div>
              )}

              {activeTab === 'verification' && (
                <div className="deliv-verification-content">
                  <div className="verification-badge-box">
                    <ShieldCheck size={28} className="text-orange-400" />
                    <div>
                      <h5 className="verif-box-title">Audit Protocol Passed</h5>
                      <p className="verif-box-desc">{selectedPrompt.expectedDeliverable.verificationNotes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
