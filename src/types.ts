export type AgentRole = 'manager' | 'research' | 'analysis' | 'development' | 'verification';

export interface AgentData {
  id: AgentRole;
  name: string;
  role: string;
  tagline: string;
  color: string;
  colorLight: string;
  bgGlow: string;
  accentRgb: string;
  iconName: string;
  shape: string;
  description: string;
  responsibilities: string[];
  workstation: {
    desk: string;
    laptopStatus: string;
    currentTask: string;
    metrics: { label: string; value: string }[];
  };
  sampleOutput: {
    title: string;
    content: string;
  };
}

export type NavPage = 'team' | 'workflow' | 'capabilities';

export type DemoStepStatus = 'idle' | 'running' | 'completed';

export interface WorkflowPromptOption {
  id: string;
  title: string;
  category: string;
  description: string;
  task: string;
  expectedDeliverable: {
    summary: string;
    researchSummary: string;
    analysisVerdict: string;
    codePreview: string;
    verificationNotes: string;
  };
}

export interface CapabilityItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  participatingAgents: AgentRole[];
  keyOutputs: string[];
  sampleUseCases: string[];
}
