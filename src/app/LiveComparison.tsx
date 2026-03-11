'use client';

import { useEffect, useMemo, useState } from 'react';

const PROMPT = 'Write a short reply to a frustrated user whose deploy failed right before launch.';

const BEFORE_RESPONSE =
    'I understand your frustration. Deployment issues can be challenging. Please check your logs, verify your environment variables, and try redeploying. Let me know if you need further assistance.';

const AFTER_RESPONSE =
    'That timing is brutal. Let us steady this fast: check the latest deploy log for the first real error, confirm your production env vars are present, and rerun the build once locally. If you want, I can help you isolate the likely failure in a couple of minutes.';

const BEFORE_SPEED = 28;
const AFTER_SPEED = 26;
const END_PAUSE_MS = 4200;

function useTypedText(text: string, cycle: number, speed: number) {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        setVisibleCount(0);
        const interval = window.setInterval(() => {
            setVisibleCount((count) => {
                if (count >= text.length) {
                    window.clearInterval(interval);
                    return count;
                }
                return count + 1;
            });
        }, speed);

        return () => window.clearInterval(interval);
    }, [cycle, speed, text]);

    return text.slice(0, visibleCount);
}

export default function LiveComparison() {
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        const cycleDuration = Math.max(BEFORE_RESPONSE.length * BEFORE_SPEED, AFTER_RESPONSE.length * AFTER_SPEED) + END_PAUSE_MS;
        const interval = window.setInterval(() => {
            setCycle((current) => current + 1);
        }, cycleDuration);

        return () => window.clearInterval(interval);
    }, []);

    const beforeText = useTypedText(BEFORE_RESPONSE, cycle, BEFORE_SPEED);
    const afterText = useTypedText(AFTER_RESPONSE, cycle, AFTER_SPEED);

    const beforeDone = beforeText.length >= BEFORE_RESPONSE.length;
    const afterDone = afterText.length >= AFTER_RESPONSE.length;

    const cards = useMemo(
        () => [
            {
                key: 'before',
                title: 'Without Soul Generator',
                badge: 'Generic reply',
                description: 'Safe, flat, and forgettable.',
                text: beforeText,
                showCaret: !beforeDone,
            },
            {
                key: 'after',
                title: 'With Soul Generator',
                badge: 'Guided by SOUL.md',
                description: 'Clear voice, better empathy, stronger action.',
                text: afterText,
                showCaret: !afterDone,
            },
        ],
        [afterDone, afterText, beforeDone, beforeText]
    );

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1.85fr] gap-6 items-stretch">
            <div className="glass-card p-6 md:p-7 flex flex-col justify-between h-full">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card/50 text-xs text-muted-foreground mb-5">
                        Live comparison
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-3">See the difference in voice</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        Same prompt. Two completely different responses. One sounds generic. The other sounds like an agent with an actual point of view.
                    </p>
                </div>

                <div className="rounded-2xl border border-card-border bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">Prompt</p>
                    <p className="text-sm text-foreground leading-relaxed">{PROMPT}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full items-stretch">
                {cards.map((card) => (
                    <div
                        key={card.key}
                        className="glass-card comparison-card-active p-5 md:p-6 transition-all duration-500 h-full flex flex-col"
                    >
                        <div className="mb-2 min-h-[6.75rem]">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1.5">{card.description}</p>
                        </div>

                        <div className="mb-1.5">
                            <span className="inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full border border-card-border bg-card text-accent-light max-w-full whitespace-normal sm:whitespace-nowrap">
                                {card.badge}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-card-border bg-background/75 p-4 min-h-56 flex-1">
                            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                                {card.text}
                                {card.showCaret && <span className="typing-caret" aria-hidden="true" />}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
