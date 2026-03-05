'use client';

import { WizardProvider } from '@/lib/store';
import WizardContent from './WizardContent';

export default function BuilderPage() {
    return (
        <WizardProvider>
            <WizardContent />
        </WizardProvider>
    );
}
