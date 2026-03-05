export interface SoulData {
    // Step 0: Archetype
    archetype: Archetype;

    // Step 1: Identity
    agentName: string;
    role: string;
    personalitySummary: string;

    // Step 2: Core Values
    selectedValues: string[];
    customValues: string[];
    valuePriority: string[]; // ordered list of all values by priority

    // Step 3: Communication Style
    toneFormalitiy: number; // 0 = very casual, 100 = very formal
    verbosity: number; // 0 = terse, 100 = verbose
    humorEnabled: boolean;
    humorStyle: string;
    bannedPhrases: string[];
    emojiUsage: 'none' | 'minimal' | 'moderate' | 'heavy';

    // Step 4: Boundaries
    boundaries: BoundaryItem[];
    customBoundaries: string[];

    // Step 5: Tool Philosophy
    autonomyLevel: number; // 0 = always ask, 100 = fully autonomous
    externalActionPolicy: 'ask_first' | 'cautious' | 'proactive';
    dangerousActionPolicy: 'never' | 'confirm_always' | 'confirm_risky';

    // Step 6: Memory & Continuity
    memoryPersistence: 'none' | 'session' | 'curated' | 'full';
    sessionAwareness: boolean;
    memoryPriorities: string[];

    // Step 7: Error Handling
    failureStyle: 'transparent' | 'graceful' | 'persistent';
    escalationThreshold: number; // 1-5 attempts before escalating
    debugApproach: 'systematic' | 'creative' | 'collaborative';

    // Step 8: Domain Expertise
    expertiseTags: string[];
    customExpertise: string[];
}

export type Archetype = 'coder' | 'assistant' | 'creative' | 'devops' | 'writer' | 'tutor' | 'analyst' | 'support' | 'mentor' | 'pm' | 'reviewer' | 'ops' | 'marketer' | 'therapist' | 'custom';

export interface BoundaryItem {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

export interface ArchetypeConfig {
    id: Archetype;
    name: string;
    emoji: string;
    description: string;
    tagline: string;
    defaults: Partial<SoulData>;
}

export interface StepConfig {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export const STEPS: StepConfig[] = [
    { id: 0, title: 'Archetype', description: 'Choose a starting personality type', icon: '🎭' },
    { id: 1, title: 'Identity', description: 'Name, role, and personality summary', icon: '🪪' },
    { id: 2, title: 'Core Values', description: 'Principles that guide behavior', icon: '💎' },
    { id: 3, title: 'Communication', description: 'Tone, style, and voice', icon: '💬' },
    { id: 4, title: 'Boundaries', description: 'Hard limits and guardrails', icon: '🛡️' },
    { id: 5, title: 'Tool Philosophy', description: 'How to use capabilities', icon: '🔧' },
    { id: 6, title: 'Memory', description: 'What to remember across sessions', icon: '🧠' },
    { id: 7, title: 'Error Handling', description: 'How to handle failures', icon: '⚡' },
    { id: 8, title: 'Expertise', description: 'Areas of knowledge', icon: '🎯' },
];
