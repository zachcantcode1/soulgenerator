import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="glass-card p-8 max-w-md w-full text-center animate-fade-in">
                <div className="text-3xl mb-4">🧭</div>
                <h1 className="text-xl font-semibold text-foreground mb-2">Page not found</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    This page does not exist. Head back to the builder and keep crafting.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
                    >
                        Home
                    </Link>
                    <Link
                        href="/builder"
                        className="px-4 py-2 text-sm border border-card-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                        Builder
                    </Link>
                </div>
            </div>
        </div>
    );
}
