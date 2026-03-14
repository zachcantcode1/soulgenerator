import Image from 'next/image';
import Link from 'next/link';
import FloatingParticlesBackground from '../FloatingParticlesBackground';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sg.svg"
            alt="Soul Generator logo"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
          <span className="text-sm text-muted-foreground">Soul Generator</span>
        </Link>
        <Link
          href="/builder"
          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-all glow"
        >
          Get Started
        </Link>
      </nav>

      <section className="landing-hero min-h-[calc(100vh-72px)] flex items-center">
        <FloatingParticlesBackground
          className="absolute inset-0 pointer-events-none opacity-90 bg-black"
          particleCount={230}
          mouseInfluence={140}
          mouseStrength={0.03}
        />

        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14 w-full relative z-10">
          <div className="max-w-md mx-auto glass-card p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/sg.svg"
                alt="Soul Generator logo"
                width={64}
                height={64}
                priority
              />
            </div>
            <h1 className="text-2xl font-semibold text-foreground text-center mb-6">Sign up for updates</h1>

            <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-glass-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
