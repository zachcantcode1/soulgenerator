'use client';

import { useWizard } from '@/lib/store';
import { VALUE_OPTIONS } from '@/lib/templates';
import { useState } from 'react';

export default function StepValues() {
    const { state, dispatch } = useWizard();
    const { selectedValues, customValues } = state.data;
    const [customInput, setCustomInput] = useState('');

    const toggleValue = (value: string) => {
        const isSelected = selectedValues.includes(value);
        const newValues = isSelected
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        dispatch({
            type: 'UPDATE_DATA',
            payload: {
                selectedValues: newValues,
                valuePriority: [...newValues, ...customValues],
            },
        });
    };

    const addCustom = () => {
        const trimmed = customInput.trim().toLowerCase();
        if (trimmed && !customValues.includes(trimmed) && !selectedValues.includes(trimmed)) {
            const newCustom = [...customValues, trimmed];
            dispatch({
                type: 'UPDATE_DATA',
                payload: {
                    customValues: newCustom,
                    valuePriority: [...selectedValues, ...newCustom],
                },
            });
            setCustomInput('');
        }
    };

    const removeCustom = (value: string) => {
        const newCustom = customValues.filter(v => v !== value);
        dispatch({
            type: 'UPDATE_DATA',
            payload: {
                customValues: newCustom,
                valuePriority: [...selectedValues, ...newCustom],
            },
        });
    };

    const totalSelected = selectedValues.length + customValues.length;

    return (
        <div className="space-y-6">
            {/* Selected count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Pick 3–7 core values that define your agent.
                </p>
                <span className={`text-xs font-mono px-2 py-1 rounded-lg ${totalSelected >= 3 && totalSelected <= 7
                        ? 'text-success bg-success/10'
                        : totalSelected > 7
                            ? 'text-warning bg-warning/10'
                            : 'text-muted bg-card'
                    }`}>
                    {totalSelected} selected
                </span>
            </div>

            {/* Value chips */}
            <div className="flex flex-wrap gap-2">
                {VALUE_OPTIONS.map((opt) => (
                    <button
                        key={opt.label}
                        onClick={() => toggleValue(opt.label)}
                        className={`chip ${selectedValues.includes(opt.label) ? 'selected' : ''}`}
                        title={opt.description}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Custom values */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Custom values
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                        placeholder="Add your own value..."
                        className="flex-1 px-4 py-2.5 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                    />
                    <button
                        onClick={addCustom}
                        className="px-4 py-2.5 bg-accent/20 text-accent-light rounded-xl text-sm hover:bg-accent/30 transition-all border border-accent/30"
                    >
                        Add
                    </button>
                </div>
                {customValues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {customValues.map((v) => (
                            <span key={v} className="chip selected group">
                                {v}
                                <button
                                    onClick={() => removeCustom(v)}
                                    className="ml-1.5 text-accent-light/60 hover:text-danger transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
