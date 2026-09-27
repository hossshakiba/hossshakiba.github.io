'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CANVAS_SIZE = 192;
const FIRST_REVEAL_MS = 1700;
const SWITCH_REVEAL_MS = 900;
const TOTAL_STEPS = 1000;

const gaussian = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;

const fillNoise = (eps) => {
  for (let i = 0; i < eps.length; i++) eps[i] = gaussian();
};

const drawCover = (ctx, img, size) => {
  const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
};

const ProfileCarousel = ({ images, alt, imageClassName, showControlsOnHover = true, controlsClassName = '' }) => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [step, setStep] = useState(TOTAL_STEPS);
  const canvasRef = useRef(null);
  const hasRevealedRef = useRef(false);

  const imageClass = imageClassName || "w-[13.5rem] h-[13.5rem] 3xl:w-[17rem] 3xl:h-[17rem] rounded-xl object-cover";
  const src = images[current];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return undefined;
    }

    const size = CANVAS_SIZE;
    const pixelCount = size * size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = size;
    canvas.height = size;

    const eps = new Float32Array(pixelCount * 3);
    fillNoise(eps);

    const frame = ctx.createImageData(size, size);
    const paint = (source, signal) => {
      const noise = Math.sqrt(1 - signal * signal);
      const out = frame.data;
      for (let p = 0, e = 0; p < pixelCount * 4; p += 4, e += 3) {
        for (let c = 0; c < 3; c++) {
          const x0 = source ? source[p + c] / 127.5 - 1 : 0;
          out[p + c] = (signal * x0 + noise * eps[e + c] * 0.9 + 1) * 127.5;
        }
        out[p + 3] = 255;
      }
      ctx.putImageData(frame, 0, 0);
    };

    paint(null, 0);
    setPhase('running');
    setStep(TOTAL_STEPS);

    let rafId = 0;
    let cancelled = false;
    const duration = hasRevealedRef.current ? SWITCH_REVEAL_MS : FIRST_REVEAL_MS;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      const full = document.createElement('canvas');
      full.width = size;
      full.height = size;
      drawCover(full.getContext('2d'), img, size);

      const coarse = document.createElement('canvas');
      const coarseCtx = coarse.getContext('2d');
      const upscale = document.createElement('canvas');
      upscale.width = size;
      upscale.height = size;
      const upscaleCtx = upscale.getContext('2d', { willReadFrequently: true });

      const start = performance.now();
      let lastStep = TOTAL_STEPS;

      const tick = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        const t = 1 - progress;
        // Cosine schedule: sqrt(alpha_bar) rises slowly at first, like a real sampler.
        const signal = Math.sin(((1 - t) * Math.PI) / 2);

        // Coarse-to-fine: structure emerges before detail.
        const resolution = Math.max(6, Math.round(6 + (size - 6) * progress * progress));
        coarse.width = resolution;
        coarse.height = resolution;
        coarseCtx.drawImage(full, 0, 0, resolution, resolution);
        upscaleCtx.imageSmoothingEnabled = true;
        upscaleCtx.drawImage(coarse, 0, 0, size, size);

        for (let i = 0; i < eps.length; i += 1 + ((Math.random() * 3) | 0)) eps[i] = gaussian();
        paint(upscaleCtx.getImageData(0, 0, size, size).data, signal);

        const nextStep = Math.round(t * TOTAL_STEPS);
        if (nextStep !== lastStep) {
          lastStep = nextStep;
          setStep(nextStep);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          hasRevealedRef.current = true;
          setPhase('done');
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    img.onerror = () => {
      if (!cancelled) setPhase('done');
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [src]);

  const showPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group">
      <Image
        alt={alt}
        src={src}
        width={272}
        height={272}
        className={imageClass}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`${imageClass} denoise-canvas pointer-events-none absolute inset-0 ${phase === 'done' ? 'is-done' : ''}`}
      />
      <span
        aria-hidden
        className={`denoise-step pointer-events-none absolute left-2 top-2 ${phase === 'running' ? 'is-visible' : ''}`}
      >
        t = {String(step).padStart(4, '\u2007')}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous profile image"
            onClick={showPrev}
            className={`absolute left-3 bottom-3 z-[2] h-8 w-8 rounded-md bg-[var(--color-surface)] text-[var(--color-heading)] border border-[var(--color-border)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-soft)] hover:border-[var(--color-accent)] ${
              showControlsOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            } ${controlsClassName}`}
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Next profile image"
            onClick={showNext}
            className={`absolute right-3 bottom-3 z-[2] h-8 w-8 rounded-md bg-[var(--color-surface)] text-[var(--color-heading)] border border-[var(--color-border)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-soft)] hover:border-[var(--color-accent)] ${
              showControlsOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            } ${controlsClassName}`}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileCarousel;
