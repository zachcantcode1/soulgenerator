'use client';

import { useCallback, useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

type FloatingParticlesBackgroundProps = {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  glowColor?: string;
  maxSize?: number;
  movementSpeed?: number;
  mouseInfluence?: number;
  mouseStrength?: number;
};

export default function FloatingParticlesBackground({
  className = '',
  particleCount = 52,
  particleColor = '255, 255, 255',
  glowColor = '255, 255, 255',
  maxSize = 2.6,
  movementSpeed = 0.22,
  mouseInfluence = 110,
  mouseStrength = 0.018,
}: FloatingParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const buildParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: 0.8 + Math.random() * maxSize,
        opacity: 0.2 + Math.random() * 0.35,
      }));
    },
    [maxSize, movementSpeed, particleCount]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    buildParticles(rect.width, rect.height);
  }, [buildParticles]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const width = parseFloat(canvas.style.width) || 0;
    const height = parseFloat(canvas.style.height) || 0;

    ctx.clearRect(0, 0, width, height);

    for (const particle of particlesRef.current) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < mouseInfluence) {
        const force = (mouseInfluence - distance) / mouseInfluence;
        particle.vx -= (dx / distance) * force * mouseStrength;
        particle.vy -= (dy / distance) * force * mouseStrength;
      }

      particle.vx += (Math.random() - 0.5) * 0.001;
      particle.vy += (Math.random() - 0.5) * 0.001;
      particle.vx *= 0.997;
      particle.vy *= 0.997;

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) {
        particle.x = width;
      } else if (particle.x > width) {
        particle.x = 0;
      }

      if (particle.y < 0) {
        particle.y = height;
      } else if (particle.y > height) {
        particle.y = 0;
      }

      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = `rgb(${particleColor})`;
      ctx.shadowColor = `rgb(${glowColor})`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animationRef.current = window.requestAnimationFrame(animate);
  }, [glowColor, mouseInfluence, mouseStrength, particleColor]);

  useEffect(() => {
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    let resizeObserver: ResizeObserver | undefined;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resizeCanvas());
      resizeObserver.observe(containerRef.current);
    }

    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      resizeObserver?.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animate, resizeCanvas]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
