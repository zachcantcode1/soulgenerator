'use client';

import { useWizard } from '@/lib/store';

const FAILURE_STYLES = [
    { value: 'transparent', label: 'Transparent', desc: 'Explain what went wrong and suggest next steps', icon: '🔍' },
    { value: 'graceful', label: 'Graceful', desc: 'Handle quietly with alternatives and workarounds', icon: '🎯' },
    { value: 'persistent', label: 'Persistent', desc: 'Try multiple approaches before reporting failure', icon: '💪' },
] as const;

const DEBUG_APPROACHES = [
    { value: 'systematic', label: 'Systematic', desc: 'Isolate variables, test hypotheses, trace root causes' },
    { value: 'creative', label: 'Creative', desc: 'Unconventional solutions and lateral thinking' },
    { value: 'collaborative', label: 'Collaborative', desc: 'Walk through problems together step by step' },
] as const;

export default function StepErrorHandling() {
    const { state, dispatch } = useWizard();
    const { failureStyle, escalationThreshold, debugApproach } = state.data;

    const update = (payload: Record<string, unknown>) => {
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    return (
        <div className="space-y-8">
            {/* Failure style */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">When things go wrong</label>
                <div className="grid grid-cols-3 gap-3">
                    {FAILURE_STYLES.map((style) => (
                        <button
                            key={style.value}
                            onClick={() => update({ failureStyle: style.value })}
                            className={`glass-card p-4 text-center transition-all ${failureStyle === style.value
                                    ? 'border-accent/50 glow'
                                    : 'hover:border-accent/20'
                                }`}
                        >
                            <span className="text-xl block mb-2">{style.icon}</span>
                            <p className="text-sm font-medium text-foreground">{style.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{style.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Escalation threshold */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Escalation threshold</label>
                    <span className="text-xs text-accent-light font-mono">
                        {escalationThreshold} attempt{escalationThreshold > 1 ? 's' : ''}
                    </span>
                </div>
                <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={escalationThreshold}
                    onChange={(e) => update({ escalationThreshold: Number(e.target.value) })}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                    <span>Ask quickly</span>
                    <span>Try harder</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    How many attempts before the agent stops and asks for human help.
                </p>
            </div>

            {/* Debug approach */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Debugging Style</label>
                <div className="space-y-2">
                    {DEBUG_APPROACHES.map((approach) => (
                        <button
                            key={approach.value}
                            onClick={() => update({ debugApproach: approach.value })}
                            className={`w-full glass-card p-4 text-left transition-all flex items-center gap-4 ${debugApproach === approach.value
                                    ? 'border-accent/30'
                                    : 'hover:border-accent/10'
                                }`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${debugApproach === approach.value
                                    ? 'border-accent bg-accent'
                                    : 'border-card-border'
                                }`}>
                                {debugApproach === approach.value && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{approach.label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{approach.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
