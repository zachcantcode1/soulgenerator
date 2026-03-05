'use client';

import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="glass-card p-8 max-w-md w-full text-center animate-fade-in">
                <div className="text-3xl mb-4">⚠️</div>
                <h1 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    Try again, or return to the home page.
                </p>
                {error?.digest && (
                    <p className="text-xs text-muted mb-6 font-mono">Error ID: {error.digest}</p>
                )}
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={reset}
                        className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
                    >
                        Retry
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm border border-card-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
