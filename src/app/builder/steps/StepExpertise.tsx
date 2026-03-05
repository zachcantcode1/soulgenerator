'use client';

import { useWizard } from '@/lib/store';
import { EXPERTISE_OPTIONS } from '@/lib/templates';
import { useState } from 'react';

export default function StepExpertise() {
    const { state, dispatch } = useWizard();
    const { expertiseTags, customExpertise } = state.data;
    const [customInput, setCustomInput] = useState('');
    const [filter, setFilter] = useState('');

    const toggleTag = (tag: string) => {
        const newTags = expertiseTags.includes(tag)
            ? expertiseTags.filter(t => t !== tag)
            : [...expertiseTags, tag];
        dispatch({ type: 'UPDATE_DATA', payload: { expertiseTags: newTags } });
    };

    const addCustom = () => {
        const trimmed = customInput.trim().toLowerCase().replace(/\s+/g, '-');
        if (trimmed && !customExpertise.includes(trimmed) && !expertiseTags.includes(trimmed)) {
            dispatch({ type: 'UPDATE_DATA', payload: { customExpertise: [...customExpertise, trimmed] } });
            setCustomInput('');
        }
    };

    const removeCustom = (tag: string) => {
        dispatch({ type: 'UPDATE_DATA', payload: { customExpertise: customExpertise.filter(t => t !== tag) } });
    };

    const filteredOptions = filter
        ? EXPERTISE_OPTIONS.filter(o => o.includes(filter.toLowerCase()))
        : EXPERTISE_OPTIONS;

    const totalSelected = expertiseTags.length + customExpertise.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Tag your agent&apos;s areas of knowledge. This appears in the SOUL.md footer.
                </p>
                <span className="text-xs font-mono text-accent-light px-2 py-1 rounded-lg bg-accent/10">
                    {totalSelected} selected
                </span>
            </div>

            {/* Filter */}
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter expertise..."
                className="w-full px-4 py-2.5 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
            />

            {/* Tag chips */}
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {filteredOptions.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`chip text-xs ${expertiseTags.includes(tag) ? 'selected' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Custom expertise */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Custom expertise
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                        placeholder="Add custom expertise..."
                        className="flex-1 px-4 py-2.5 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                    />
                    <button
                        onClick={addCustom}
                        className="px-4 py-2.5 bg-accent/20 text-accent-light rounded-xl text-sm hover:bg-accent/30 transition-all border border-accent/30"
                    >
                        Add
                    </button>
                </div>
                {customExpertise.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {customExpertise.map((tag) => (
                            <span key={tag} className="chip selected text-xs">
                                {tag}
                                <button onClick={() => removeCustom(tag)} className="ml-1.5 text-accent-light/60 hover:text-danger">×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
