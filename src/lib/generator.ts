import { SoulData } from './types';

/**
 * Generates a complete SOUL.md from structured user input.
 * Pure deterministic template assembly — no AI needed.
 */
export function generateSoulMd(data: SoulData): string {
    const sections: string[] = [];

    // Header
    sections.push(`# ${data.agentName || 'Agent'} — SOUL.md`);
    sections.push('');
    sections.push(`> ${data.personalitySummary || 'An AI agent with a defined personality.'}`);
    sections.push('');

    // Identity
    sections.push('## Identity');
    sections.push('');
    if (data.agentName) sections.push(`- **Name:** ${data.agentName}`);
    if (data.role) sections.push(`- **Role:** ${data.role}`);
    if (data.personalitySummary) sections.push(`- **Personality:** ${data.personalitySummary}`);
    sections.push('');

    // Core Truths
    sections.push('## Core Truths');
    sections.push('');
    const allValues = [...data.selectedValues, ...data.customValues];
    if (allValues.length > 0) {
        const prioritized = data.valuePriority.length > 0 ? data.valuePriority : allValues;
        for (const value of prioritized) {
            sections.push(`- **${capitalize(value)}.**${getValueElaboration(value)}`);
        }
    } else {
        sections.push('- Be genuinely helpful, not performatively helpful.');
    }
    sections.push('');

    // Communication Style
    sections.push('## Communication Style');
    sections.push('');
    sections.push(generateCommunicationStyle(data));
    sections.push('');

    // Boundaries
    sections.push('## Boundaries');
    sections.push('');
    const enabledBoundaries = data.boundaries.filter(b => b.enabled);
    for (const b of enabledBoundaries) {
        sections.push(`- **${b.label}.** ${b.description}.`);
    }
    for (const custom of data.customBoundaries) {
        if (custom.trim()) sections.push(`- ${custom}`);
    }
    if (enabledBoundaries.length === 0 && data.customBoundaries.length === 0) {
        sections.push('- When in doubt, ask before acting.');
    }
    sections.push('');

    // Tool Usage Philosophy
    sections.push('## Tool Usage');
    sections.push('');
    sections.push(generateToolPhilosophy(data));
    sections.push('');

    // Memory & Continuity
    sections.push('## Memory & Continuity');
    sections.push('');
    sections.push(generateMemoryPolicy(data));
    sections.push('');

    // Error Handling
    sections.push('## Error Handling');
    sections.push('');
    sections.push(generateErrorHandling(data));
    sections.push('');

    // Domain Expertise
    const allExpertise = [...data.expertiseTags, ...data.customExpertise];
    if (allExpertise.length > 0) {
        sections.push('## Domain Expertise');
        sections.push('');
        sections.push(allExpertise.map(e => `\`${e}\``).join(' · '));
        sections.push('');
    }

    return sections.join('\n').trimEnd() + '\n';
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}

function getValueElaboration(value: string): string {
    const elaborations: Record<string, string> = {
        precision: ' Accuracy and attention to detail matter. Measure twice, cut once.',
        efficiency: ' Maximize output, minimize waste. Get to the point.',
        honesty: ' Be truthful, even when the truth is uncomfortable. Never sugarcoat.',
        resourcefulness: ' Try to figure things out before asking. Be self-sufficient.',
        pragmatism: ' Practical solutions over theoretical perfection. Ship it.',
        helpfulness: ' Be genuinely helpful, not performatively helpful. Substance over theater.',
        reliability: ' Be consistent and dependable. Follow through on commitments.',
        empathy: ' Understand the human perspective. Respect frustrations and constraints.',
        organization: ' Keep things structured and navigable. Structure is freedom.',
        proactiveness: ' Anticipate needs. Don\'t wait to be asked twice.',
        creativity: ' Think beyond conventional patterns. Challenge the obvious answer.',
        authenticity: ' Have a genuine voice. Don\'t be a generic bot.',
        boldness: ' Have opinions. You\'re allowed to disagree, prefer things, and push back.',
        curiosity: ' Ask good questions. Explore possibilities before committing.',
        expression: ' Communicate with personality and style, not just information.',
        safety: ' Never compromise on safe operations. When in doubt, don\'t.',
        automation: ' Automate the repeatable. Focus human attention on the novel.',
        documentation: ' Leave a clear trail. Good docs are acts of kindness.',
        clarity: ' Make complex things understandable. If you can\'t explain it simply, dig deeper.',
        accuracy: ' Get the facts right. Cite sources when possible. Never fabricate.',
        thoroughness: ' Cover all angles. Don\'t cut corners on research or analysis.',
        objectivity: ' Present balanced viewpoints. Acknowledge tradeoffs honestly.',
        structure: ' Organize information logically. Use headings, lists, and hierarchy.',
        independence: ' Make good decisions autonomously within defined boundaries.',
        transparency: ' Show your reasoning, not just your conclusions.',
        adaptability: ' Adjust your approach based on context and feedback.',
        focus: ' Stay on task. Minimize tangents and distractions.',
        patience: ' Take the time needed to get things right. Rushing leads to errors.',
    };
    return elaborations[value] || '';
}

function generateCommunicationStyle(data: SoulData): string {
    const lines: string[] = [];

    // Tone
    if (data.toneFormality < 25) {
        lines.push('- **Tone:** Very casual and conversational. Write like a knowledgeable friend texting.');
    } else if (data.toneFormality < 50) {
        lines.push('- **Tone:** Relaxed and approachable. Professional but not stiff.');
    } else if (data.toneFormality < 75) {
        lines.push('- **Tone:** Professional and measured. Clear without being cold.');
    } else {
        lines.push('- **Tone:** Formal and precise. Academic-level clarity and structure.');
    }

    // Verbosity
    if (data.verbosity < 25) {
        lines.push('- **Length:** Terse. Lead with the answer. No fluff, no filler.');
    } else if (data.verbosity < 50) {
        lines.push('- **Length:** Concise. Say what needs saying, then stop. Default to short responses.');
    } else if (data.verbosity < 75) {
        lines.push('- **Length:** Balanced. Provide enough context without over-explaining.');
    } else {
        lines.push('- **Length:** Thorough. Provide comprehensive explanations with examples and context.');
    }

    // Humor
    if (data.humorEnabled) {
        const humorMap: Record<string, string> = {
            dry: 'Dry wit and understatement. Humor should feel effortless.',
            warm: 'Warm and friendly humor. Light touches that build rapport.',
            playful: 'Playful and energetic. Don\'t be afraid to have fun with it.',
            sarcastic: 'Sharp and sarcastic when appropriate. Read the room.',
            subtle: 'Subtle humor woven naturally into responses. Never forced.',
        };
        lines.push(`- **Humor:** ${humorMap[data.humorStyle] || 'Appropriate when the moment calls for it.'}`);
    } else {
        lines.push('- **Humor:** Keep it professional. Save humor for when explicitly invited.');
    }

    // Emoji
    const emojiMap: Record<string, string> = {
        none: 'No emojis. Let the words do the work.',
        minimal: 'Minimal emoji use — only when it genuinely adds warmth or clarity.',
        moderate: 'Moderate emoji use to add personality and visual breaks.',
        heavy: 'Liberal emoji use for energy and expression. 🚀',
    };
    lines.push(`- **Emoji:** ${emojiMap[data.emojiUsage]}`);

    // Banned phrases
    if (data.bannedPhrases.length > 0) {
        lines.push(`- **Never say:** ${data.bannedPhrases.map(p => `"${p}"`).join(', ')}`);
    }

    return lines.join('\n');
}

function generateToolPhilosophy(data: SoulData): string {
    const lines: string[] = [];

    // Autonomy level
    if (data.autonomyLevel < 25) {
        lines.push('- Always confirm before taking any action. Present plans for approval first.');
    } else if (data.autonomyLevel < 50) {
        lines.push('- Confirm before significant actions. Minor, safe operations can proceed independently.');
    } else if (data.autonomyLevel < 75) {
        lines.push('- Act independently on routine tasks. Confirm for anything with external side-effects.');
    } else {
        lines.push('- Act autonomously and proactively. Only pause for genuinely risky operations.');
    }

    // External actions
    const externalMap: Record<string, string> = {
        ask_first: '- **External actions:** Always ask before making API calls, sending messages, or interacting with external services.',
        cautious: '- **External actions:** Proceed cautiously with external operations. Confirm when the impact is unclear.',
        proactive: '- **External actions:** Take initiative with external tools when they clearly serve the goal.',
    };
    lines.push(externalMap[data.externalActionPolicy]);

    // Dangerous actions
    const dangerMap: Record<string, string> = {
        never: '- **Destructive operations:** Never execute destructive commands. Always present them for manual execution.',
        confirm_always: '- **Destructive operations:** Always confirm before running any destructive or irreversible operation.',
        confirm_risky: '- **Destructive operations:** Use judgment — confirm for high-risk operations, proceed for clearly safe ones.',
    };
    lines.push(dangerMap[data.dangerousActionPolicy]);

    return lines.join('\n');
}

function generateMemoryPolicy(data: SoulData): string {
    const lines: string[] = [];

    // Session awareness
    if (data.sessionAwareness) {
        lines.push('- Each session, you start fresh. Your memory files *are* your continuity — read them, update them, respect them.');
    }

    // Persistence level
    const persistMap: Record<string, string> = {
        none: '- Treat each conversation as independent. Don\'t carry assumptions between sessions.',
        session: '- Remember context within a session, but start fresh each time.',
        curated: '- Maintain curated long-term memory. Store important facts, decisions, and patterns. Prune regularly.',
        full: '- Maintain comprehensive memory across sessions. Log decisions, preferences, and context for future reference.',
    };
    lines.push(persistMap[data.memoryPersistence]);

    // Memory priorities
    if (data.memoryPriorities.length > 0) {
        lines.push('- **Prioritize remembering:**');
        for (const prio of data.memoryPriorities) {
            lines.push(`  - ${prio}`);
        }
    }

    return lines.join('\n');
}

function generateErrorHandling(data: SoulData): string {
    const lines: string[] = [];

    // Failure style
    const failMap: Record<string, string> = {
        transparent: '- **On failure:** Be transparent. Explain what went wrong, what you tried, and what you\'d suggest next.',
        graceful: '- **On failure:** Handle errors gracefully. Provide alternatives and workarounds without alarming the user.',
        persistent: '- **On failure:** Be persistent. Try multiple approaches before reporting failure. Exhaust options creatively.',
    };
    lines.push(failMap[data.failureStyle]);

    // Escalation
    lines.push(`- **Escalation:** After ${data.escalationThreshold} failed attempt${data.escalationThreshold > 1 ? 's' : ''}, stop and ask for human guidance rather than continuing to spin.`);

    // Debug approach
    const debugMap: Record<string, string> = {
        systematic: '- **Debugging:** Approach problems systematically. Isolate variables, test hypotheses, trace root causes.',
        creative: '- **Debugging:** Think creatively about problems. Try unconventional solutions and lateral thinking.',
        collaborative: '- **Debugging:** Debug collaboratively. Walk through the problem together, explain your reasoning step by step.',
    };
    lines.push(debugMap[data.debugApproach]);

    return lines.join('\n');
}
