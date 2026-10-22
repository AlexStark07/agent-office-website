import { AgentData, CapabilityItem, WorkflowPromptOption } from '../types';

export const AGENTS: AgentData[] = [
  {
    id: 'manager',
    name: 'Manager',
    role: 'Orchestrator & Synthesizer',
    tagline: 'Coordinates tasks, assigns work, and consolidates final deliverables.',
    color: '#F59E0B',
    colorLight: '#D97706',
    bgGlow: 'rgba(245, 158, 11, 0.25)',
    accentRgb: '245, 158, 11',
    iconName: 'Crown',
    shape: 'Golden Triangle',
    description: 'Seated at the center-back executive station. Evaluates incoming user requirements, breaks complex objectives into specialized sub-tasks, delegates across specialists, and synthesizes unified deliverables.',
    responsibilities: [
      'Deconstruct complex requests into structured sub-tasks',
      'Route work to optimal specialist workstations',
      'Resolve cross-agent dependencies and conflicts',
      'Consolidate multi-agent findings into coherent deliverables'
    ],
    workstation: {
      desk: 'Center-back executive desk overlooking office partition',
      laptopStatus: 'Dispatch console active • 4 downstream streams connected',
      currentTask: 'Synthesizing verified multi-agent milestone deliverable',
      metrics: [
        { label: 'Delegation Speed', value: '42ms' },
        { label: 'Active Specialists', value: '4 / 4' },
        { label: 'Consolidation Accuracy', value: '99.8%' }
      ]
    },
    sampleOutput: {
      title: 'Executive Deliverable Synthesis',
      content: 'Consolidated report: Multi-tenant auth architecture approved. Research identified RFC 8693 token exchange standards; Analysis validated 34% lower memory footprint; Development authored zero-allocation JWT middleware; Verification confirmed 100% test coverage and audit requirements.'
    }
  },
  {
    id: 'research',
    name: 'Research Specialist',
    role: 'Information Gathering & Synthesis',
    tagline: 'Gathers deep contextual data and prepares concise findings.',
    color: '#A855F7',
    colorLight: '#9333EA',
    bgGlow: 'rgba(168, 85, 247, 0.25)',
    accentRgb: '168, 85, 247',
    iconName: 'Search',
    shape: 'Purple Sphere',
    description: 'Seated at the left-front station beside architectural foliage. Explores source material, indexes market intelligence, cross-references documentation, and extracts high-confidence factual kernels.',
    responsibilities: [
      'Query authoritative documentation and repositories',
      'Filter noise and synthesize key factual takeaways',
      'Uncover technical edge cases and industry benchmarks',
      'Provide structured briefing notes to Analysis and Development'
    ],
    workstation: {
      desk: 'Left-front desk beside ceramic ficus planter',
      laptopStatus: 'Knowledge crawlers synchronized • 12 sources indexed',
      currentTask: 'Compiling low-latency token exchange protocols',
      metrics: [
        { label: 'Sources Indexed', value: '184k docs' },
        { label: 'Signal-to-Noise', value: '98.4%' },
        { label: 'Extraction Latency', value: '110ms' }
      ]
    },
    sampleOutput: {
      title: 'Technical Investigation Dossier',
      content: 'Documented 4 architectural paradigms for distributed state. Pattern A (CRDT) reduces sync roundtrips by 60ms vs traditional locking. Identified 3 security advisories in upstream dependency v1.4.2.'
    }
  },
  {
    id: 'analysis',
    name: 'Analysis Specialist',
    role: 'Data Evaluation & Patterns',
    tagline: 'Evaluates data, compares options, and identifies patterns.',
    color: '#06B6D4',
    colorLight: '#0891B2',
    bgGlow: 'rgba(6, 182, 212, 0.25)',
    accentRgb: '6, 182, 212',
    iconName: 'TrendingUp',
    shape: 'Cyan-Blue Prism',
    description: 'Seated at the mid-left station. Evaluates quantitative metrics, builds comparative matrices, models trade-offs, and ensures data-driven decision trees before execution.',
    responsibilities: [
      'Compare algorithmic complexity and performance trade-offs',
      'Conduct statistical comparisons and resource projections',
      'Detect anomalous patterns in user workflows',
      'Provide objective scoring criteria for proposed solutions'
    ],
    workstation: {
      desk: 'Mid-left station with matte dual-monitor glass divider',
      laptopStatus: 'Vector evaluation engine running • 0 anomalies detected',
      currentTask: 'Comparing memory consumption of streaming vs batch parsing',
      metrics: [
        { label: 'Evaluation Matrix', value: '16 variables' },
        { label: 'Confidence Score', value: '99.4%' },
        { label: 'Optimization Delta', value: '+38.2%' }
      ]
    },
    sampleOutput: {
      title: 'Architectural Trade-Off Matrix',
      content: 'Benchmarked Solution A vs B across 1,000,000 synthetic payloads. Solution B demonstrates O(1) space complexity and 4.2x throughput resilience under memory pressure.'
    }
  },
  {
    id: 'development',
    name: 'Development Specialist',
    role: 'Software Construction & Code',
    tagline: 'Helps build, modify, and explain software systems.',
    color: '#10B981',
    colorLight: '#059669',
    bgGlow: 'rgba(16, 185, 129, 0.25)',
    accentRgb: '16, 185, 129',
    iconName: 'Code',
    shape: 'Mint-Green Cube',
    description: 'Seated at the mid-right station. Translates requirements and analytical specifications into clean, idiomatic, typed source code with elegant abstractions and zero technical debt.',
    responsibilities: [
      'Write modular, well-typed application code',
      'Refactor legacy modules with test-backed guarantees',
      'Implement API contracts and real-time state machines',
      'Provide inline explanations and architectural documentation'
    ],
    workstation: {
      desk: 'Mid-right station beside frosted partition and desk lamp',
      laptopStatus: 'Compiler daemon running • 0 errors • 0 warnings',
      currentTask: 'Implementing resilient WebSocket heartbeat reconnect hook',
      metrics: [
        { label: 'Type Strictness', value: '100% strict' },
        { label: 'Bundle Footprint', value: '< 14 kB' },
        { label: 'Linter Cleanliness', value: 'Zero defects' }
      ]
    },
    sampleOutput: {
      title: 'Production Implementation Snippet',
      content: 'export const useHeartbeatSocket = ({ endpoint, retryBackoff }: SocketConfig) => {\n  // Resilient exponential backoff with jitter and abort signals\n  const [state, dispatch] = useReducer(socketReducer, initialSocketState);\n  return { state, send: dispatch };\n};'
    }
  },
  {
    id: 'verification',
    name: 'Verification Specialist',
    role: 'Quality Assurance & Audit',
    tagline: 'Reviews results, checks requirements, and identifies problems.',
    color: '#F97316',
    colorLight: '#EA580C',
    bgGlow: 'rgba(249, 115, 22, 0.25)',
    accentRgb: '249, 115, 22',
    iconName: 'ShieldCheck',
    shape: 'Orange Diamond',
    description: 'Seated at the right-front station. Rigorously tests deliverables against specifications, simulates edge-case failure modes, checks security invariants, and enforces uncompromising standards.',
    responsibilities: [
      'Audit generated outputs against initial requirements',
      'Conduct boundary and security vulnerability assessments',
      'Verify accessibility, responsiveness, and performance budgets',
      'Issue actionable pass/fail reports before Manager signs off'
    ],
    workstation: {
      desk: 'Right-front workstation overlooking sunlit terrace',
      laptopStatus: 'Automated test suite passing • 142/142 tests green',
      currentTask: 'Fuzzing payload edge cases and boundary conditions',
      metrics: [
        { label: 'Coverage Rate', value: '100%' },
        { label: 'Vulnerabilities', value: '0 identified' },
        { label: 'Requirement Match', value: 'Strict 1:1' }
      ]
    },
    sampleOutput: {
      title: 'Verification & Integrity Certificate',
      content: 'Requirement checklist: 8 of 8 criteria fulfilled. Security scan passed with 0 CVE warnings. Performance audit: 60 FPS under simulated 4x CPU slowdown. Result approved for release.'
    }
  }
];

export const WORKFLOW_PROMPTS: WorkflowPromptOption[] = [
  {
    id: 'fullstack-arch',
    title: 'Distributed Real-Time Sync Engine',
    category: 'Full-Stack Architecture',
    description: 'Design and implement an offline-first synchronization protocol with conflict resolution and cryptographic verification.',
    task: 'Create an offline-first distributed sync protocol for multi-device workspaces with automatic vector clock conflict resolution and E2E encryption.',
    expectedDeliverable: {
      summary: 'Delivered complete offline-first sync protocol architecture, tested against 100,000 simulated conflict forks with zero data divergence.',
      researchSummary: 'Synthesized RFC 6902 JSON Patch specifications and CRDT State-based replication benchmarks.',
      analysisVerdict: 'Selected hybrid Vector Clock + Last-Write-Wins with cryptographic audit trail. 42% reduced network bandwidth.',
      codePreview: `interface SyncNode {\n  nodeId: string;\n  vectorClock: Record<string, number>;\n  mergeState(incoming: RemotePatch): ConflictResolutionResult;\n}`,
      verificationNotes: 'Simulated 500 network partitions; 100% recovery with invariant assertions satisfied.'
    }
  },
  {
    id: 'market-intel',
    title: 'Enterprise AI Market Synthesis',
    category: 'Market Intelligence & Analysis',
    description: 'Evaluate competitive landscape, regulatory compliance frameworks, and deployment cost models across 12 AI platforms.',
    task: 'Analyze the total cost of ownership (TCO) and data privacy guarantees for on-premise vs sovereign cloud agent deployments.',
    expectedDeliverable: {
      summary: 'Comprehensive 18-page decision framework highlighting cost tipping points, air-gapped security protocols, and ROI forecast.',
      researchSummary: 'Indexed 45 enterprise compliance whitepapers across EU AI Act, HIPAA, and SOC2 Type II requirements.',
      analysisVerdict: 'Identified 3.4x TCO reduction for hybrid sovereign cluster once monthly token volume exceeds 850M.',
      codePreview: `const calculateTCO = (monthlyTokens: number, infraTier: InfraSpec): TCOComparison => {\n  return { onPremise: computeFixedCapex(infraTier), managedCloud: tokenMultiplier(monthlyTokens) };\n};`,
      verificationNotes: 'Cross-verified financial projections against three tier-1 cloud pricing calculators.'
    }
  },
  {
    id: 'security-audit',
    title: 'Smart Contract & API Security Hardening',
    category: 'Security & Quality Audit',
    description: 'Perform static code analysis, re-entrancy prevention, and zero-trust perimeter auditing on a microservices suite.',
    task: 'Audit critical payment gateway webhooks against race conditions, replay attacks, and timing leaks.',
    expectedDeliverable: {
      summary: 'Zero vulnerabilities remaining. Hardened webhook validator with cryptographic nonce verification and constant-time comparison.',
      researchSummary: 'Gathered CVE database records for HMAC timing attacks and webhook relay vulnerabilities.',
      analysisVerdict: 'Replaced standard string equality with crypto.timingSafeEqual. Enforced 5-minute replay expiry window.',
      codePreview: `export function verifyWebhookSignature(payload: Buffer, signature: string, secret: string): boolean {\n  const expected = crypto.createHmac('sha256', secret).update(payload).digest();\n  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), expected);\n}`,
      verificationNotes: 'Fuzzed with 250,000 malformed headers; rejected 100% of forged signatures with zero timing variance.'
    }
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'research-synthesis',
    title: 'Research & Information Synthesis',
    shortDescription: 'Deep contextual extraction from vast datasets, API documentation, and technical literature.',
    detailedDescription: 'The Research specialist crawls internal documentation, code repositories, and external resources, filtering signal from noise and presenting distilled, verifiable facts.',
    participatingAgents: ['research', 'analysis', 'manager'],
    keyOutputs: [
      'Comprehensive factual briefing dossiers',
      'Cross-referenced technical citations',
      'Identified risk areas and upstream advisories',
      'Competitor intelligence matrices'
    ],
    sampleUseCases: [
      'Investigating new RFC specifications before adoption',
      'Synthesizing customer feedback across thousands of support threads',
      'Auditing third-party libraries for license and security compliance'
    ]
  },
  {
    id: 'software-dev',
    title: 'Software Development Assistance',
    shortDescription: 'Architecting, building, and explaining production-grade software with zero boilerplate.',
    detailedDescription: 'The Development specialist translates high-level architectural requirements into clean, idiomatic, fully-typed code with robust error handling and elegant interfaces.',
    participatingAgents: ['development', 'verification', 'manager'],
    keyOutputs: [
      'Production-ready React, Node, and TypeScript components',
      'API schema contracts with strict runtime validation',
      'Database migration strategies and query optimization',
      'Self-documenting architectural blueprints'
    ],
    sampleUseCases: [
      'Scaffolding modular design system components',
      'Building stateful synchronization pipelines and WebSockets',
      'Refactoring monolithic routines into testable pure functions'
    ]
  },
  {
    id: 'analysis-decisions',
    title: 'Analysis & Decision Support',
    shortDescription: 'Data evaluation, algorithmic benchmarking, trade-off matrices, and scenario modeling.',
    detailedDescription: 'The Analysis specialist evaluates multiple potential architectures, weighing memory footprints, computational complexity, and maintenance overhead to deliver clear recommendations.',
    participatingAgents: ['analysis', 'research', 'manager'],
    keyOutputs: [
      'Multi-variable decision matrices with weighted scoring',
      'Performance benchmarking curves and telemetry projections',
      'Root-cause anomaly diagnostic reports',
      'Cost-efficiency optimization proposals'
    ],
    sampleUseCases: [
      'Choosing between competing cloud database architectures',
      'Benchmarking client-side rendering vs server-side streaming',
      'Predicting infrastructure scaling costs under 10x traffic surges'
    ]
  },
  {
    id: 'content-creation',
    title: 'Document & Content Creation',
    shortDescription: 'Polished technical documentation, executive summaries, release briefs, and user guides.',
    detailedDescription: 'The team coordinates to turn raw engineering artifacts into articulate, structured deliverables tailored for both executive leadership and engineering teams.',
    participatingAgents: ['manager', 'research', 'development'],
    keyOutputs: [
      'Clear technical specifications and RFCs',
      'Interactive API reference documentation',
      'Executive milestone status summaries',
      'Customer-facing product release playbooks'
    ],
    sampleUseCases: [
      'Generating release notes from git commit histories and PR reviews',
      'Drafting enterprise SLA compliance summaries',
      'Authoring developer onboarding guides with verified code samples'
    ]
  },
  {
    id: 'review-verification',
    title: 'Review & Quality Verification',
    shortDescription: 'Automated auditing, edge-case fuzzing, accessibility checks, and requirement validation.',
    detailedDescription: 'The Verification specialist acts as the team’s uncompromising gatekeeper, testing every output against strict acceptance criteria before the Manager consolidates the final result.',
    participatingAgents: ['verification', 'development', 'manager'],
    keyOutputs: [
      'Comprehensive requirement traceability audits',
      'Automated test suites with high coverage benchmarks',
      'Security boundary assessment checklists',
      'WCAG 2.1 AA accessibility audit verifications'
    ],
    sampleUseCases: [
      'Pre-deployment sanity checks and regression tests',
      'Verifying that code changes adhere to strict company style guidelines',
      'Fuzz-testing API endpoints for timing leaks and injection vectors'
    ]
  },
  {
    id: 'coordinated-workflows',
    title: 'Coordinated Multi-Step Workflows',
    shortDescription: 'End-to-end task decomposition, parallel execution, and unified synthesis.',
    detailedDescription: 'Rather than operating as disconnected tools, the five agents execute in orchestrated synchronization. Tasks flow from Manager to Specialists, verify with the Verifier, and return complete.',
    participatingAgents: ['manager', 'research', 'analysis', 'development', 'verification'],
    keyOutputs: [
      'Synchronized multi-agent execution timelines',
      'Continuous progress telemetry and state checkpoints',
      'Automatic conflict resolution across specialized streams',
      'Unified single-source deliverables with audit trails'
    ],
    sampleUseCases: [
      'Full feature lifecycle: from market research to code and verification',
      'Automated incident triage, root cause diagnosis, and patch authoring',
      'Quarterly system refactoring and modernization sprints'
    ]
  }
];
