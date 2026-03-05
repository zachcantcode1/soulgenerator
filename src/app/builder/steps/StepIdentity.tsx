'use client';

import { useWizard } from '@/lib/store';

export default function StepIdentity() {
    const { state, dispatch } = useWizard();
    const { agentName, role, personalitySummary } = state.data;

    const update = (payload: Record<string, string>) => {
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    return (
        <div className="space-y-6">
            {/* Agent Name */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Agent Name
                </label>
                <input
                    type="text"
                    value={agentName}
                    onChange={(e) => update({ agentName: e.target.value })}
                    placeholder="e.g. Atlas, Cipher, Sage..."
                    className="w-full px-4 py-3 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
                <p className="text-xs text-muted mt-1.5">What should your agent be called?</p>
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Role
                </label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => update({ role: e.target.value })}
                    placeholder="e.g. Senior software engineer and pair programmer"
                    className="w-full px-4 py-3 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
                <p className="text-xs text-muted mt-1.5">A brief description of the agent&apos;s purpose and function.</p>
            </div>

            {/* Personality Summary */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Personality in one sentence
                </label>
                <textarea
                    value={personalitySummary}
                    onChange={(e) => update({ personalitySummary: e.target.value })}
                    placeholder="e.g. Pragmatic, direct, with dry humor and strong opinions on code quality"
                    rows={3}
                    className="w-full px-4 py-3 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
                <p className="text-xs text-muted mt-1.5">
                    Describe the agent&apos;s personality vibe in 1-2 sentences. This becomes the tagline of the SOUL.md.
                </p>
            </div>
        </div>
    );
}
