'use client';

import ReactMarkdown from 'react-markdown';
import { useWizard } from '@/lib/store';
import { exportSoulMd, exportSoulSpecPackage, copyToClipboard } from '@/lib/export';
import { useState } from 'react';

interface PreviewPanelProps {
    markdown: string;
}

export default function PreviewPanel({ markdown }: PreviewPanelProps) {
    const { state } = useWizard();
    const [copied, setCopied] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(state.data);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleExportZip = async () => {
        setExporting(true);
        try {
            await exportSoulSpecPackage(state.data);
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-card-border px-4 py-3 flex items-center justify-between flex-shrink-0">
                <span className="text-sm font-medium text-foreground">SOUL.md Preview</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 text-xs border border-card-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                        {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                    <button
                        onClick={() => exportSoulMd(state.data)}
                        className="px-3 py-1.5 text-xs border border-card-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                        📄 SOUL.md
                    </button>
                    <button
                        onClick={handleExportZip}
                        disabled={exporting}
                        className="px-3 py-1.5 text-xs bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
                    >
                        {exporting ? '⏳ ...' : '📦 SoulSpec ZIP'}
                    </button>
                </div>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="markdown-preview text-sm leading-relaxed">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
