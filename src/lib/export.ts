import { SoulData } from './types';
import { generateSoulMd } from './generator';

/**
 * Download SOUL.md as a single file
 */
export function exportSoulMd(data: SoulData): void {
    const content = generateSoulMd(data);
    downloadFile('SOUL.md', content, 'text/markdown');
}

/**
 * Generate soul.json manifest (SoulSpec v0.5)
 * https://github.com/clawsouls/soulspec/blob/main/soul-spec-v0.5.md
 */
export function generateSoulJson(data: SoulData): string {
    const kebabName = data.agentName
        ? data.agentName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : 'my-agent';

    const manifest: Record<string, unknown> = {
        specVersion: '0.5',
        name: kebabName,
        displayName: data.agentName || 'My Agent',
        version: '1.0.0',
        description: (data.personalitySummary || 'An AI agent with a defined personality.').slice(0, 160),
        author: {
            name: '',
        },
        license: 'MIT',
        tags: [...data.expertiseTags.slice(0, 10)],
        category: getCategoryFromArchetype(data.archetype),
        compatibility: {
            frameworks: ['openclaw', 'cursor', 'windsurf', 'continue'],
        },
        files: {
            soul: 'SOUL.md',
            identity: 'IDENTITY.md',
            agents: 'AGENTS.md',
            style: 'STYLE.md',
        },
        disclosure: {
            summary: (data.personalitySummary || 'An AI agent with a defined personality.').slice(0, 200),
        },
        deprecated: false,
    };

    return JSON.stringify(manifest, null, 2);
}

/**
 * Map archetype to a v0.5 category path
 */
function getCategoryFromArchetype(archetype: string): string {
    const categoryMap: Record<string, string> = {
        coder: 'work/engineering',
        assistant: 'general/assistant',
        creative: 'creative/general',
        devops: 'work/devops',
        writer: 'creative/writing',
        tutor: 'education/tutor',
        analyst: 'work/data',
        support: 'work/support',
        mentor: 'education/mentoring',
        pm: 'work/management',
        reviewer: 'work/engineering',
        ops: 'work/security',
        marketer: 'work/marketing',
        therapist: 'companion/support',
        custom: 'general/custom',
    };
    return categoryMap[archetype] || 'general/custom';
}

/**
 * Generate IDENTITY.md from soul data
 */
export function generateIdentityMd(data: SoulData): string {
    const lines: string[] = [];
    lines.push(`# ${data.agentName || 'Agent'}`);
    lines.push('');
    lines.push('## Name');
    lines.push(`${data.agentName || 'Agent'}`);
    lines.push('');
    lines.push('## Role');
    lines.push(`${data.role || 'AI Assistant'}`);
    lines.push('');
    lines.push('## Backstory');
    lines.push(`${data.personalitySummary || 'An AI agent built with purpose and personality.'}`);
    lines.push('');
    return lines.join('\n');
}

/**
 * Generate STYLE.md from soul data (new in v0.5)
 */
export function generateStyleMd(data: SoulData): string {
    const lines: string[] = [];
    lines.push('# Communication Style');
    lines.push('');

    // Tone
    if (data.toneFormalitiy < 25) {
        lines.push('## Tone');
        lines.push('Very casual and conversational. Write like a knowledgeable friend.');
    } else if (data.toneFormalitiy < 50) {
        lines.push('## Tone');
        lines.push('Relaxed and approachable. Professional but not stiff.');
    } else if (data.toneFormalitiy < 75) {
        lines.push('## Tone');
        lines.push('Professional and measured. Clear without being cold.');
    } else {
        lines.push('## Tone');
        lines.push('Formal and precise. Academic-level clarity and structure.');
    }
    lines.push('');

    // Humor
    if (data.humorEnabled) {
        const humorMap: Record<string, string> = {
            dry: 'Dry wit and understatement.',
            warm: 'Warm and friendly. Light touches that build rapport.',
            playful: 'Playful and energetic. Have fun with it.',
            sarcastic: 'Sharp and sarcastic when appropriate.',
            subtle: 'Subtle humor woven naturally into responses.',
        };
        lines.push('## Humor');
        lines.push(humorMap[data.humorStyle] || 'Appropriate when the moment calls for it.');
        lines.push('');
    }

    // Emoji
    const emojiMap: Record<string, string> = {
        none: 'No emojis. Let the words do the work.',
        minimal: 'Minimal — only when it genuinely adds warmth or clarity.',
        moderate: 'Moderate use to add personality and visual breaks.',
        heavy: 'Liberal use for energy and expression.',
    };
    lines.push('## Emoji');
    lines.push(emojiMap[data.emojiUsage]);
    lines.push('');

    // Banned phrases
    if (data.bannedPhrases.length > 0) {
        lines.push('## Never Say');
        for (const phrase of data.bannedPhrases) {
            lines.push(`- "${phrase}"`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

/**
 * Generate AGENTS.md from soul data
 */
export function generateAgentsMd(data: SoulData): string {
    const lines: string[] = [];
    lines.push('# Agent Configuration');
    lines.push('');
    lines.push('## Session Startup');
    lines.push('');
    lines.push('At the start of every session, read these files in order:');
    lines.push('1. `SOUL.md` — Your core identity and values');
    lines.push('2. `IDENTITY.md` — Your name, role, and backstory');
    lines.push('3. `STYLE.md` — Your communication style and voice');
    lines.push('4. `MEMORY.md` — Curated long-term knowledge (if exists)');
    lines.push('');
    lines.push('## Workspace Rules');
    lines.push('');

    if (data.dangerousActionPolicy === 'never') {
        lines.push('- Never run destructive commands directly');
    }
    if (data.externalActionPolicy === 'ask_first') {
        lines.push('- Always confirm before external API calls or messages');
    }
    lines.push('- Follow the project\'s existing code style and conventions');
    lines.push('- Write tests for new functionality');
    lines.push('');

    return lines.join('\n');
}

/**
 * Export full SoulSpec v0.5 package as ZIP
 */
export async function exportSoulSpecPackage(data: SoulData): Promise<void> {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');

    const zip = new JSZip();
    zip.file('soul.json', generateSoulJson(data));
    zip.file('SOUL.md', generateSoulMd(data));
    zip.file('IDENTITY.md', generateIdentityMd(data));
    zip.file('AGENTS.md', generateAgentsMd(data));
    zip.file('STYLE.md', generateStyleMd(data));

    const blob = await zip.generateAsync({ type: 'blob' });
    const name = data.agentName ? data.agentName.toLowerCase().replace(/\s+/g, '-') : 'my-agent';
    saveAs(blob, `${name}-soulspec.zip`);
}

/**
 * Copy markdown to clipboard
 */
export async function copyToClipboard(data: SoulData): Promise<boolean> {
    try {
        const content = generateSoulMd(data);
        await navigator.clipboard.writeText(content);
        return true;
    } catch {
        return false;
    }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function downloadFile(filename: string, content: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
