'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const BRUSH_RATIO = 0.075;
const HEAL_FRAMES = 36;
const MAX_SPARKS = 140;
const SPARK_COLORS = ['#fff6d5', '#ffd66e', '#ffc23d', '#ffe9a8', '#dbe8ff'];

const drawSpark = (ctx, spark) => {
  const alpha = Math.max(spark.life, 0);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = spark.color;
  ctx.shadowColor = spark.color;
  ctx.shadowBlur = 6;
  const r = spark.size * (0.6 + alpha * 0.4);

  if (spark.star) {
    ctx.save();
    ctx.translate(spark.x, spark.y);
    ctx.rotate(spark.rotation);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const radius = i % 2 === 0 ? r * 2.4 : r * 0.55;
      const angle = (i * Math.PI) / 4;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
};

/**
 * Draws `topSrc` on a canvas above `revealSrc`; the pointer erases the canvas
 * to uncover the image underneath, and it heals back when the pointer leaves.
 */
const EraseReveal = ({ topSrc, revealSrc, sizes }) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const imageRef = useRef(null);
  const lastPointRef = useRef(null);
  const healRef = useRef(0);
  const sparksCanvasRef = useRef(null);
  const sparksRef = useRef([]);
  const sparksFrameRef = useRef(0);
  const reduceMotionRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [erasing, setErasing] = useState(false);

  const brushRadius = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.width * BRUSH_RATIO : 0;
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return undefined;

    let cancelled = false;
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = topSrc;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      redraw();

      const sparksCanvas = sparksCanvasRef.current;
      if (sparksCanvas) {
        sparksCanvas.width = canvas.width;
        sparksCanvas.height = canvas.height;
        sparksCanvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const observer = new ResizeObserver(() => {
      if (imageRef.current) resize();
    });

    img.onload = () => {
      if (cancelled) return;
      imageRef.current = img;
      resize();
      observer.observe(wrapper);
      setReady(true);
    };

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(healRef.current);
      cancelAnimationFrame(sparksFrameRef.current);
    };
  }, [topSrc]);

  const animateSparks = () => {
    const canvas = sparksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.restore();
    ctx.globalCompositeOperation = 'lighter';

    const sparks = sparksRef.current;
    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.vy += 0.045;
      spark.vx *= 0.97;
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.rotation += spark.spin;
      spark.life -= spark.decay;
      if (spark.life <= 0) {
        sparks.splice(i, 1);
      } else {
        drawSpark(ctx, spark);
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    sparksFrameRef.current = sparks.length ? requestAnimationFrame(animateSparks) : 0;
  };

  const emitSparks = (point, previous) => {
    if (reduceMotionRef.current) return;
    const dx = previous ? point.cssX - previous.cssX : 0;
    const dy = previous ? point.cssY - previous.cssY : 0;
    const count = Math.min(5, 1 + Math.floor(Math.hypot(dx, dy) / 5));
    const sparks = sparksRef.current;

    for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
      const angle = Math.random() * Math.PI * 2;
      const offset = Math.random() * point.cssRadius * 0.8;
      sparks.push({
        x: point.cssX + Math.cos(angle) * offset,
        y: point.cssY + Math.sin(angle) * offset,
        vx: (Math.random() - 0.5) * 1.4 - dx * 0.04,
        vy: -Math.random() * 1.3 - dy * 0.04,
        size: 0.7 + Math.random() * 1.4,
        life: 1,
        decay: 0.018 + Math.random() * 0.022,
        color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
        star: Math.random() < 0.3,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.2,
      });
    }

    if (!sparksFrameRef.current) sparksFrameRef.current = requestAnimationFrame(animateSparks);
  };

  const toCanvasPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
      cssX: event.clientX - rect.left,
      cssY: event.clientY - rect.top,
      cssRadius: (rect.width * BRUSH_RATIO),
    };
  };

  const stamp = (ctx, x, y, radius) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.6, 'rgba(0,0,0,0.85)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const eraseTo = (point) => {
    const ctx = canvasRef.current.getContext('2d');
    const radius = brushRadius();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 1;

    const last = lastPointRef.current || point;
    const distance = Math.hypot(point.x - last.x, point.y - last.y);
    const spacing = Math.max(1, radius / 4);
    const steps = Math.max(1, Math.ceil(distance / spacing));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      stamp(ctx, last.x + (point.x - last.x) * t, last.y + (point.y - last.y) * t, radius);
    }
    lastPointRef.current = point;
  };

  const moveCursor = (point) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const size = point.cssRadius * 2;
    cursor.style.width = `${size}px`;
    cursor.style.height = `${size}px`;
    cursor.style.transform = `translate(${point.cssX - point.cssRadius}px, ${point.cssY - point.cssRadius}px)`;
  };

  const heal = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const tick = () => {
      frame += 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.09;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (frame < HEAL_FRAMES) {
        healRef.current = requestAnimationFrame(tick);
      } else {
        redraw();
      }
    };

    healRef.current = requestAnimationFrame(tick);
  };

  const handlePointerEnter = (event) => {
    if (!ready) return;
    cancelAnimationFrame(healRef.current);
    const point = toCanvasPoint(event);
    lastPointRef.current = point;
    moveCursor(point);
    setErasing(true);
  };

  const handlePointerMove = (event) => {
    if (!ready) return;
    const point = toCanvasPoint(event);
    moveCursor(point);
    if (event.pointerType === 'mouse' || event.pressure > 0) {
      emitSparks(point, lastPointRef.current);
      eraseTo(point);
    }
  };

  const handlePointerLeave = () => {
    if (!ready) return;
    lastPointRef.current = null;
    setErasing(false);
    heal();
  };

  return (
    <div
      ref={wrapperRef}
      className={`erase-reveal relative w-full overflow-hidden rounded-lg theme-surface ${ready ? 'is-ready' : ''} ${erasing ? 'is-erasing' : ''}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerUp={(event) => {
        if (event.pointerType !== 'mouse') handlePointerLeave();
      }}
    >
      <Image
        src={topSrc}
        className="relative z-0 w-full h-auto"
        alt=""
        width={0}
        height={0}
        sizes={sizes}
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src={revealSrc}
        fill
        className={`object-cover object-center z-[1] ${ready ? 'opacity-100' : 'opacity-0'}`}
        alt=""
        sizes={sizes}
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-[2] h-full w-full" />
      <canvas ref={sparksCanvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />
      <span ref={cursorRef} aria-hidden className={`erase-cursor ${erasing ? 'is-visible' : ''}`} />
    </div>
  );
};

export default EraseReveal;
