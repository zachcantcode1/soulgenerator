'use client';

import { useWizard } from '@/lib/store';

const EXTERNAL_POLICIES = [
    { value: 'ask_first', label: 'Ask First', desc: 'Always confirm before external actions' },
    { value: 'cautious', label: 'Cautious', desc: 'Confirm when impact is unclear' },
    { value: 'proactive', label: 'Proactive', desc: 'Take initiative when it serves the goal' },
] as const;

const DANGER_POLICIES = [
    { value: 'never', label: 'Never', desc: 'Never run destructive commands' },
    { value: 'confirm_always', label: 'Always Confirm', desc: 'Confirm every destructive op' },
    { value: 'confirm_risky', label: 'Judgment Call', desc: 'Confirm for high-risk only' },
] as const;

export default function StepToolPhilosophy() {
    const { state, dispatch } = useWizard();
    const { autonomyLevel, externalActionPolicy, dangerousActionPolicy } = state.data;

    const update = (payload: Record<string, unknown>) => {
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    const autonomyLabel = autonomyLevel < 25 ? 'Very cautious' : autonomyLevel < 50 ? 'Moderate' : autonomyLevel < 75 ? 'Independent' : 'Fully autonomous';

    return (
        <div className="space-y-8">
            {/* Autonomy slider */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Autonomy Level</label>
                    <span className="text-xs text-accent-light font-mono">{autonomyLabel}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={autonomyLevel}
                    onChange={(e) => update({ autonomyLevel: Number(e.target.value) })}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                    <span>Always ask 🙋</span>
                    <span>Fully autonomous 🤖</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    How much should your agent do without checking in?
                </p>
            </div>

            {/* External action policy */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">External Actions</label>
                <p className="text-xs text-muted-foreground mb-3">API calls, sending messages, interacting with external services.</p>
                <div className="grid grid-cols-3 gap-3">
                    {EXTERNAL_POLICIES.map((policy) => (
                        <button
                            key={policy.value}
                            onClick={() => update({ externalActionPolicy: policy.value })}
                            className={`glass-card p-4 text-center transition-all ${externalActionPolicy === policy.value
                                    ? 'border-accent/50 glow'
                                    : 'hover:border-accent/20'
                                }`}
                        >
                            <p className="text-sm font-medium text-foreground">{policy.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{policy.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Dangerous action policy */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Destructive Operations</label>
                <p className="text-xs text-muted-foreground mb-3">Deleting files, dropping tables, irreversible commands.</p>
                <div className="grid grid-cols-3 gap-3">
                    {DANGER_POLICIES.map((policy) => (
                        <button
                            key={policy.value}
                            onClick={() => update({ dangerousActionPolicy: policy.value })}
                            className={`glass-card p-4 text-center transition-all ${dangerousActionPolicy === policy.value
                                    ? 'border-accent/50 glow'
                                    : 'hover:border-accent/20'
                                }`}
                        >
                            <p className="text-sm font-medium text-foreground">{policy.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{policy.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
