'use client';

import { useWizard } from '@/lib/store';
import { ARCHETYPES } from '@/lib/templates';


export default function StepArchetype() {
    const { state, dispatch } = useWizard();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARCHETYPES.map((arch) => (
                <button
                    key={arch.id}
                    onClick={() => dispatch({ type: 'SELECT_ARCHETYPE', archetype: arch.id })}
                    className={`glass-card p-5 text-left transition-all hover:scale-[1.02] ${state.data.archetype === arch.id
                        ? 'border-accent/50 glow'
                        : 'hover:border-accent/20'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{arch.emoji}</span>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">{arch.name}</h3>
                            <p className="text-xs text-accent-light font-mono">{arch.tagline}</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{arch.description}</p>
                </button>
            ))}
        </div>
    );
}
