'use client';

import { useWizard } from '@/lib/store';
import { useState } from 'react';

export default function StepBoundaries() {
    const { state, dispatch } = useWizard();
    const { boundaries, customBoundaries } = state.data;
    const [customInput, setCustomInput] = useState('');

    const toggleBoundary = (id: string) => {
        const updated = boundaries.map(b =>
            b.id === id ? { ...b, enabled: !b.enabled } : b
        );
        dispatch({ type: 'UPDATE_DATA', payload: { boundaries: updated } });
    };

    const addCustom = () => {
        const trimmed = customInput.trim();
        if (trimmed && !customBoundaries.includes(trimmed)) {
            dispatch({ type: 'UPDATE_DATA', payload: { customBoundaries: [...customBoundaries, trimmed] } });
            setCustomInput('');
        }
    };

    const removeCustom = (boundary: string) => {
        dispatch({ type: 'UPDATE_DATA', payload: { customBoundaries: customBoundaries.filter(b => b !== boundary) } });
    };

    const enabledCount = boundaries.filter(b => b.enabled).length + customBoundaries.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Toggle guardrails your agent should always respect.
                </p>
                <span className="text-xs font-mono text-accent-light px-2 py-1 rounded-lg bg-accent/10">
                    {enabledCount} active
                </span>
            </div>

            {/* Boundary toggles */}
            <div className="space-y-2">
                {boundaries.map((boundary) => (
                    <div
                        key={boundary.id}
                        className={`glass-card p-4 flex items-start gap-4 cursor-pointer transition-all ${boundary.enabled ? 'border-accent/20' : 'opacity-60'
                            }`}
                        onClick={() => toggleBoundary(boundary.id)}
                    >
                        <button type="button" className={`toggle mt-0.5 ${boundary.enabled ? 'active' : ''}`} aria-label={`Toggle ${boundary.label}`} />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{boundary.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{boundary.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom boundaries */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Custom boundaries
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                        placeholder="Add a custom boundary..."
                        className="flex-1 px-4 py-2.5 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                    />
                    <button
                        onClick={addCustom}
                        className="px-4 py-2.5 bg-accent/20 text-accent-light rounded-xl text-sm hover:bg-accent/30 transition-all border border-accent/30"
                    >
                        Add
                    </button>
                </div>
                {customBoundaries.length > 0 && (
                    <div className="space-y-2 mt-3">
                        {customBoundaries.map((b) => (
                            <div key={b} className="glass-card p-3 flex items-center justify-between">
                                <span className="text-sm text-foreground">{b}</span>
                                <button onClick={() => removeCustom(b)} className="text-muted hover:text-danger text-sm transition-colors">×</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
