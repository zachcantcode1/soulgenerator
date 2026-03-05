'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SoulData, STEPS } from './types';
import { getDefaultSoulData, ARCHETYPES } from './templates';

// ─── State ──────────────────────────────────────────────────────────────────

interface WizardState {
    currentStep: number;
    data: SoulData;
    isLoaded: boolean;
}

const initialState: WizardState = {
    currentStep: 0,
    data: getDefaultSoulData(),
    isLoaded: false,
};

// ─── Actions ────────────────────────────────────────────────────────────────

type WizardAction =
    | { type: 'SET_STEP'; step: number }
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'UPDATE_DATA'; payload: Partial<SoulData> }
    | { type: 'SELECT_ARCHETYPE'; archetype: SoulData['archetype'] }
    | { type: 'LOAD_STATE'; state: WizardState }
    | { type: 'RESET' };

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, currentStep: action.step };
        case 'NEXT_STEP':
            return { ...state, currentStep: Math.min(state.currentStep + 1, STEPS.length - 1) };
        case 'PREV_STEP':
            return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
        case 'UPDATE_DATA':
            return { ...state, data: { ...state.data, ...action.payload } };
        case 'SELECT_ARCHETYPE': {
            const archetype = ARCHETYPES.find(a => a.id === action.archetype);
            const defaults = archetype?.defaults || {};
            const baseData = getDefaultSoulData();
            return {
                ...state,
                data: { ...baseData, ...defaults, archetype: action.archetype },
                currentStep: 1,
            };
        }
        case 'LOAD_STATE':
            return { ...action.state, isLoaded: true };
        case 'RESET':
            return { ...initialState, isLoaded: true };
        default:
            return state;
    }
}

// ─── Context ────────────────────────────────────────────────────────────────

interface WizardContextType {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
}

const WizardContext = createContext<WizardContextType | null>(null);

const STORAGE_KEY = 'soul-generator-state';

export function WizardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(wizardReducer, initialState);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                const migratedData = parsed?.data && typeof parsed.data === 'object'
                    ? {
                        ...parsed.data,
                        toneFormality: parsed.data.toneFormality ?? parsed.data.toneFormalitiy ?? 50,
                    }
                    : parsed.data;
                dispatch({ type: 'LOAD_STATE', state: { ...parsed, data: migratedData, isLoaded: true } });
            } else {
                dispatch({ type: 'LOAD_STATE', state: { ...initialState, isLoaded: true } });
            }
        } catch {
            dispatch({ type: 'LOAD_STATE', state: { ...initialState, isLoaded: true } });
        }
    }, []);

    // Auto-save to localStorage on changes
    useEffect(() => {
        if (state.isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    currentStep: state.currentStep,
                    data: state.data,
                }));
            } catch {
                // localStorage full or unavailable
            }
        }
    }, [state.currentStep, state.data, state.isLoaded]);

    return (
        <WizardContext.Provider value={{ state, dispatch }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
