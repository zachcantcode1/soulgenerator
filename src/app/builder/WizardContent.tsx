'use client';

import { useWizard } from '@/lib/store';
import { STEPS } from '@/lib/types';
import { generateSoulMd } from '@/lib/generator';
import Link from 'next/link';
import StepArchetype from './steps/StepArchetype';
import StepIdentity from './steps/StepIdentity';
import StepValues from './steps/StepValues';
import StepCommunication from './steps/StepCommunication';
import StepBoundaries from './steps/StepBoundaries';
import StepToolPhilosophy from './steps/StepToolPhilosophy';
import StepMemory from './steps/StepMemory';
import StepErrorHandling from './steps/StepErrorHandling';
import StepExpertise from './steps/StepExpertise';
import PreviewPanel from './PreviewPanel';
import React, { useEffect, useRef, useState } from 'react';

const STEP_COMPONENTS = [
    StepArchetype,
    StepIdentity,
    StepValues,
    StepCommunication,
    StepBoundaries,
    StepToolPhilosophy,
    StepMemory,
    StepErrorHandling,
    StepExpertise,
];

export default function WizardContent() {
    const { state, dispatch } = useWizard();
    const [showPreview, setShowPreview] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const resetCancelRef = useRef<HTMLButtonElement | null>(null);
    const resetConfirmRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!showResetConfirm) return;
        resetCancelRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowResetConfirm(false);
            }
            if (event.key !== 'Tab') return;
            const focusable = [resetCancelRef.current, resetConfirmRef.current].filter(Boolean) as HTMLButtonElement[];
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [showResetConfirm]);

    if (!state.isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    const CurrentStep = STEP_COMPONENTS[state.currentStep];
    const isLastStep = state.currentStep === STEPS.length - 1;
    const isFirstStep = state.currentStep === 0;
    const preview = generateSoulMd(state.data);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Top bar */}
            <header className="border-b border-card-border px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <img src="/sg.png" alt="Soul Generator logo" className="w-5 h-5 rounded-full" />
                    </Link>
                    <span className="text-card-border">/</span>
                    <span className="text-sm text-foreground font-medium">Builder</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="px-3 py-1.5 text-xs border border-card-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                        {showPreview ? '← Hide Preview' : 'Show Preview →'}
                    </button>
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="px-3 py-1.5 text-xs border border-card-border rounded-lg text-muted hover:text-danger hover:border-danger/40 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main content area */}
                <div className={`flex flex-col min-w-0 transition-all duration-300 ${showPreview ? 'w-1/2' : 'flex-1'}`}>
                    {/* Progress bar */}
                    <div className="px-4 py-3 border-b border-card-border flex-shrink-0 overflow-hidden">
                        <div className="flex items-center gap-1">
                            {STEPS.map((step, i) => (
                                <React.Fragment key={step.id}>
                                    <button
                                        onClick={() => dispatch({ type: 'SET_STEP', step: i })}
                                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 ${i === state.currentStep
                                            ? 'bg-accent/15 text-accent-light border border-accent/30'
                                            : i < state.currentStep
                                                ? 'text-success hover:text-foreground'
                                                : 'text-muted hover:text-muted-foreground'
                                            }`}
                                        title={step.title}
                                    >
                                        <span>{step.icon}</span>
                                        {!showPreview && <span className="hidden lg:inline">{step.title}</span>}
                                    </button>
                                    {i < STEPS.length - 1 && (
                                        <div className={`flex-1 h-px min-w-[4px] ${i < state.currentStep ? 'bg-success/40' : 'bg-card-border'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Step content */}
                    <div className="flex-1 overflow-y-auto">
                        <div
                            className={`${state.currentStep === 0 ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 py-8 animate-fade-in`}
                            key={state.currentStep}
                        >
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl">{STEPS[state.currentStep].icon}</span>
                                    <h2 className="text-xl font-semibold text-foreground">{STEPS[state.currentStep].title}</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">{STEPS[state.currentStep].description}</p>
                            </div>
                            {CurrentStep && <CurrentStep />}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="border-t border-card-border px-6 py-4 flex items-center justify-between flex-shrink-0">
                        <button
                            onClick={() => dispatch({ type: 'PREV_STEP' })}
                            disabled={isFirstStep}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isFirstStep
                                ? 'text-muted cursor-not-allowed'
                                : 'text-muted-foreground hover:text-foreground border border-card-border hover:border-accent/30'
                                }`}
                        >
                            ← Back
                        </button>
                        <span className="text-xs text-muted font-mono">
                            {state.currentStep + 1} / {STEPS.length}
                        </span>
                        {isLastStep ? (
                            <button
                                onClick={() => setShowPreview(true)}
                                className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-all glow"
                            >
                                Preview & Export ✨
                            </button>
                        ) : (
                            <button
                                onClick={() => dispatch({ type: 'NEXT_STEP' })}
                                className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-all"
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview panel */}
                {showPreview && (
                    <div className="w-1/2 min-w-0 border-l border-card-border flex-shrink-0">
                        <PreviewPanel markdown={preview} />
                    </div>
                )}
            </div>

            {/* Reset confirmation modal */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="reset-dialog-title"
                        aria-describedby="reset-dialog-description"
                        className="glass-card p-6 max-w-sm w-full mx-4 animate-fade-in"
                    >
                        <h3 id="reset-dialog-title" className="text-base font-semibold text-foreground mb-2">
                            Reset all progress?
                        </h3>
                        <p id="reset-dialog-description" className="text-sm text-muted-foreground mb-6">
                            This will clear all your answers and start from scratch. This cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                ref={resetCancelRef}
                                onClick={() => setShowResetConfirm(false)}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-card-border rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                ref={resetConfirmRef}
                                onClick={() => {
                                    dispatch({ type: 'RESET' });
                                    setShowResetConfirm(false);
                                    setShowPreview(false);
                                }}
                                className="px-4 py-2 text-sm bg-danger text-white rounded-lg hover:bg-danger/90 transition-all"
                            >
                                Reset Everything
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
