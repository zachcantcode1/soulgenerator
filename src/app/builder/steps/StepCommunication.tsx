'use client';

import { useWizard } from '@/lib/store';
import { useState } from 'react';

const HUMOR_STYLES = [
    { value: 'dry', label: 'Dry wit' },
    { value: 'warm', label: 'Warm & friendly' },
    { value: 'playful', label: 'Playful' },
    { value: 'sarcastic', label: 'Sarcastic' },
    { value: 'subtle', label: 'Subtle' },
];

const EMOJI_OPTIONS = [
    { value: 'none', label: 'None', desc: 'Words only' },
    { value: 'minimal', label: 'Minimal', desc: 'Sparingly' },
    { value: 'moderate', label: 'Moderate', desc: 'For personality' },
    { value: 'heavy', label: 'Heavy', desc: '🚀🎉✨' },
] as const;

export default function StepCommunication() {
    const { state, dispatch } = useWizard();
    const { toneFormalitiy, verbosity, humorEnabled, humorStyle, emojiUsage, bannedPhrases } = state.data;
    const [phraseInput, setPhraseInput] = useState('');

    const update = (payload: Record<string, unknown>) => {
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    const addBannedPhrase = () => {
        const trimmed = phraseInput.trim();
        if (trimmed && !bannedPhrases.includes(trimmed)) {
            update({ bannedPhrases: [...bannedPhrases, trimmed] });
            setPhraseInput('');
        }
    };

    const removeBannedPhrase = (phrase: string) => {
        update({ bannedPhrases: bannedPhrases.filter(p => p !== phrase) });
    };

    const toneLabel = toneFormalitiy < 25 ? 'Very casual' : toneFormalitiy < 50 ? 'Relaxed' : toneFormalitiy < 75 ? 'Professional' : 'Formal';
    const verbosityLabel = verbosity < 25 ? 'Terse' : verbosity < 50 ? 'Concise' : verbosity < 75 ? 'Balanced' : 'Thorough';

    return (
        <div className="space-y-8">
            {/* Tone slider */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Tone</label>
                    <span className="text-xs text-accent-light font-mono">{toneLabel}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={toneFormalitiy}
                    onChange={(e) => update({ toneFormalitiy: Number(e.target.value) })}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                    <span>Casual 🤙</span>
                    <span>Formal 🎩</span>
                </div>
            </div>

            {/* Verbosity slider */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Verbosity</label>
                    <span className="text-xs text-accent-light font-mono">{verbosityLabel}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={verbosity}
                    onChange={(e) => update({ verbosity: Number(e.target.value) })}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                    <span>Terse ✂️</span>
                    <span>Thorough 📖</span>
                </div>
            </div>

            {/* Humor toggle + style */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Humor</label>
                    <button
                        type="button"
                        className={`toggle ${humorEnabled ? 'active' : ''}`}
                        onClick={() => update({ humorEnabled: !humorEnabled })}
                        aria-label="Toggle humor"
                    />
                </div>
                {humorEnabled && (
                    <div className="flex flex-wrap gap-2 animate-fade-in">
                        {HUMOR_STYLES.map((h) => (
                            <button
                                key={h.value}
                                onClick={() => update({ humorStyle: h.value })}
                                className={`chip ${humorStyle === h.value ? 'selected' : ''}`}
                            >
                                {h.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Emoji usage */}
            <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Emoji usage</label>
                <div className="grid grid-cols-4 gap-2">
                    {EMOJI_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => update({ emojiUsage: opt.value })}
                            className={`glass-card p-3 text-center transition-all ${emojiUsage === opt.value
                                ? 'border-accent/50 glow'
                                : 'hover:border-accent/20'
                                }`}
                        >
                            <p className="text-xs font-medium text-foreground">{opt.label}</p>
                            <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Banned phrases */}
            <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                    Banned phrases <span className="text-muted">(optional)</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">Words or phrases your agent should never use.</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={phraseInput}
                        onChange={(e) => setPhraseInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addBannedPhrase()}
                        placeholder={`e.g. "Let's dive in", "Absolutely!"`}
                        className="flex-1 px-4 py-2.5 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                    />
                    <button
                        onClick={addBannedPhrase}
                        className="px-4 py-2.5 bg-accent/20 text-accent-light rounded-xl text-sm hover:bg-accent/30 transition-all border border-accent/30"
                    >
                        Ban
                    </button>
                </div>
                {bannedPhrases.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {bannedPhrases.map((p) => (
                            <span key={p} className="chip selected text-danger/80 border-danger/30 bg-danger/5">
                                🚫 {p}
                                <button onClick={() => removeBannedPhrase(p)} className="ml-1.5 hover:text-danger">×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
