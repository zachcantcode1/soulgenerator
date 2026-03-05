'use client';

import { useWizard } from '@/lib/store';
import { MEMORY_PRIORITY_OPTIONS } from '@/lib/templates';

const PERSISTENCE_OPTIONS = [
    { value: 'none', label: 'None', desc: 'Fresh each conversation', icon: '🔄' },
    { value: 'session', label: 'Session', desc: 'Within a session only', icon: '⏱️' },
    { value: 'curated', label: 'Curated', desc: 'Store important facts', icon: '📌' },
    { value: 'full', label: 'Full', desc: 'Comprehensive logging', icon: '📚' },
] as const;

export default function StepMemory() {
    const { state, dispatch } = useWizard();
    const { memoryPersistence, sessionAwareness, memoryPriorities } = state.data;

    const update = (payload: Record<string, unknown>) => {
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    const togglePriority = (priority: string) => {
        const newPriorities = memoryPriorities.includes(priority)
            ? memoryPriorities.filter(p => p !== priority)
            : [...memoryPriorities, priority];
        update({ memoryPriorities: newPriorities });
    };

    return (
        <div className="space-y-8">
            {/* Persistence level */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Memory Persistence</label>
                <p className="text-xs text-muted-foreground mb-3">How much should your agent remember between sessions?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PERSISTENCE_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => update({ memoryPersistence: opt.value })}
                            className={`glass-card p-4 text-center transition-all ${memoryPersistence === opt.value
                                ? 'border-accent/50 glow'
                                : 'hover:border-accent/20'
                                }`}
                        >
                            <span className="text-xl block mb-1">{opt.icon}</span>
                            <p className="text-sm font-medium text-foreground">{opt.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Session awareness */}
            <div className="flex items-center justify-between glass-card p-4">
                <div>
                    <p className="text-sm font-medium text-foreground">Session Awareness</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Agent knows it starts fresh each session and uses files for continuity.
                    </p>
                </div>
                <button
                    type="button"
                    className={`toggle ${sessionAwareness ? 'active' : ''}`}
                    onClick={() => update({ sessionAwareness: !sessionAwareness })}
                    aria-label="Toggle session awareness"
                />
            </div>

            {/* Memory priorities */}
            {memoryPersistence !== 'none' && (
                <div className="animate-fade-in">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                        What should the agent prioritize remembering?
                    </label>
                    <div className="space-y-2">
                        {MEMORY_PRIORITY_OPTIONS.map((prio) => (
                            <button
                                key={prio}
                                onClick={() => togglePriority(prio)}
                                className={`w-full glass-card p-3 text-left text-sm transition-all flex items-center gap-3 ${memoryPriorities.includes(prio)
                                    ? 'border-accent/30 text-foreground'
                                    : 'text-muted-foreground hover:border-accent/10'
                                    }`}
                            >
                                <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs flex-shrink-0 ${memoryPriorities.includes(prio)
                                    ? 'border-accent bg-accent text-white'
                                    : 'border-card-border'
                                    }`}>
                                    {memoryPriorities.includes(prio) && '✓'}
                                </span>
                                {prio}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
