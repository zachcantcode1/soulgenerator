import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Image
            src="/sg.png"
            alt="Soul Generator logo"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
        </div>
        <div className="flex items-center">
          <Link
            href="/builder"
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-all glow"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card/50 text-xs text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Follows the SoulSpec 0.5 Standard
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight mb-6">
            Give your AI agent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              a soul
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Answer a few smart questions. We build the perfect <code className="text-accent-light bg-card px-1.5 py-0.5 rounded text-sm">SOUL.md</code> for you.
            No blank-page anxiety. No manual formatting. Just your agent&apos;s identity, perfected.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/builder"
              className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-all animate-pulse-glow text-base"
            >
              Build Your Soul →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-center text-foreground mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', icon: '🎭', title: 'Choose an archetype', desc: 'Pick a starting personality — Coder, Assistant, Creative, or build from scratch.' },
            { step: '02', icon: '🎚️', title: 'Answer guided questions', desc: 'Sliders, toggles, and selectors — no writing needed. We handle the words.' },
            { step: '03', icon: '📦', title: 'Export', desc: 'Download your polished SOUL.md or a full SoulSpec package, ready to drop into any project.' },
          ].map((item) => (
            <div key={item.step} className="glass-card p-6 group hover:border-accent/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-muted font-mono">{item.step}</span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is SOUL.md */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="glass-card p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Explanation */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What is a <code className="text-accent-light">SOUL.md</code>?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A <strong className="text-foreground">SOUL.md</strong> is a markdown file that defines your AI agent&apos;s
                personality, values, communication style, and behavioral boundaries. It&apos;s the identity layer that turns
                a generic LLM into <em>your</em> agent.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The <a href="https://github.com/clawsouls/soulspec/blob/main/soul-spec-v0.5.md" target="_blank" rel="noopener" className="text-accent-light hover:underline">SoulSpec standard</a> defines
                a minimal file structure — <strong className="text-foreground">SOUL.md + STYLE.md + soul.json</strong> — that gives
                agents a persistent, portable identity. No build step. No runtime dependency. Just markdown and JSON.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                It works with any framework that reads SOUL.md — including Cursor, Windsurf, Continue, and custom agent pipelines.
              </p>
            </div>

            {/* Right: Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Why it matters
              </h3>
              <div className="space-y-3">
                {[
                  { icon: '🎯', title: 'Consistent behavior', desc: 'Your agent responds the same way every time — across sessions, tools, and contexts.' },
                  { icon: '⚡', title: 'Faster iteration', desc: 'Change tone, values, or boundaries in one file instead of rewriting system prompts across your stack.' },
                  { icon: '🔄', title: 'Portable identity', desc: 'Move your agent between frameworks without losing its personality. One spec, any platform.' },
                  { icon: '🤝', title: 'Team alignment', desc: 'Everyone on the team knows how the agent should behave. The SOUL.md is the source of truth.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <span className="text-base mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold text-center text-foreground mb-12">Built for perfection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: '💎', title: 'Curated value sets', desc: 'Pick from 28 battle-tested principles, or write your own.' },
            { icon: '🛡️', title: 'Boundary builder', desc: 'Toggle common guardrails on/off. Add custom hard limits.' },
            { icon: '💬', title: 'Voice tuning', desc: 'Dial in tone, humor, verbosity, and emoji with sliders and toggles.' },
            { icon: '🔍', title: 'Live preview', desc: 'See your SOUL.md render in real-time as you answer questions.' },
            { icon: '📋', title: 'SoulSpec package', desc: 'Full v0.5 package: soul.json + SOUL.md + IDENTITY.md + STYLE.md + AGENTS.md.' },
            { icon: '💾', title: 'Auto-save', desc: 'Your progress saves automatically. Come back anytime.' },
          ].map((f) => (
            <div key={f.title} className="glass-card p-5 flex gap-4 items-start hover:border-accent/20 transition-all">
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-8 text-center text-xs text-muted">
        <p>Soul Generator — Tool for crafting AI agent personas</p>
        <p className="mt-1">
          SoulSpec <a href="https://github.com/clawsouls/soulspec/blob/main/soul-spec-v0.5.md" target="_blank" rel="noopener" className="text-accent-light hover:underline">0.5</a> · Built by <a href="https://x.com/zachknows" target="_blank" rel="noopener" className="text-accent-light hover:underline">@zachknows</a>
        </p>
      </footer>
    </div>
  );
}
