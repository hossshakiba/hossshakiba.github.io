'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import MagicToast from './MagicToast';

const FIRST_DELAY_MS = 35000;
const INTERVAL_MS = 75000;
const CROSS_MS = 9500;
const OWL_WIDTH = 88;

const LETTERS = [
  'Dear visitor, we are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry. Term begins on 1 September.',
  'We await your owl by no later than 31 July. Please do not reply by email.',
  'A reminder that the use of magic in front of Muggles is strictly prohibited. Reading papers is fine.',
  'Professor McGonagall requests that you stop reading about diffusion models in the Great Hall.',
  'Your Pensieve memory has been successfully obliviated. Wait… what were we saying?',
  'Hedwig says hi, and would like to be paid in owl treats.',
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const OwlArt = () => (
  <svg viewBox="0 0 88 70" width={OWL_WIDTH} height={70} aria-hidden>
    <g className="owl-wing owl-wing--back">
      <path d="M38,30 C50,10 66,3 78,5 C72,14 61,26 47,38 Z" fill="#7a5a3c" />
    </g>
    <path d="M54,34 L68,30 L66,36 L70,40 L56,42 Z" fill="#8a6644" />
    <ellipse cx="42" cy="36" rx="16" ry="13" fill="#a07a52" />
    <path d="M34,40 q4,3 8,0 M40,44 q4,3 8,0 M34,33 q4,3 8,0" stroke="#6e4f33" strokeWidth="1" fill="none" />
    <circle cx="28" cy="26" r="11" fill="#b08860" />
    <path d="M20,17 L19,11 L24,16 Z M34,16 L37,10 L37,17 Z" fill="#8a6644" />
    <circle cx="24" cy="25" r="4.2" fill="#fff4d6" />
    <circle cx="32.5" cy="25" r="4.2" fill="#fff4d6" />
    <circle cx="23.5" cy="25.2" r="2.1" fill="#1b1208" />
    <circle cx="32" cy="25.2" r="2.1" fill="#1b1208" />
    <circle cx="23" cy="24.5" r="0.7" fill="#fff" />
    <circle cx="31.5" cy="24.5" r="0.7" fill="#fff" />
    <path d="M26.5,28 L28.2,32 L30,28 Z" fill="#e0a526" />
    <path d="M36,48 l-2,5 M40,48 l0,5" stroke="#e0a526" strokeWidth="1.4" strokeLinecap="round" />
    <g transform="translate(26 52) rotate(-8)">
      <rect width="22" height="14" rx="1.5" fill="#f3e6c4" stroke="#b39a6a" strokeWidth="0.7" />
      <path d="M0.5,0.8 L11,8 L21.5,0.8" fill="none" stroke="#b39a6a" strokeWidth="0.7" />
      <circle cx="11" cy="8" r="2.6" fill="#9b1c1c" />
    </g>
    <g className="owl-wing owl-wing--front">
      <path d="M36,32 C48,12 64,6 75,10 C69,18 58,30 44,42 Z" fill="#8f6a45" />
      <path d="M40,32 L68,12 M42,36 L64,20" stroke="#6e4f33" strokeWidth="0.8" />
    </g>
  </svg>
);

const FlyingOwl = () => {
  const [flying, setFlying] = useState(false);
  const [letter, setLetter] = useState(null);
  const owlRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(0);
  const lastLetterRef = useRef(-1);

  const scheduleFlight = useCallback((delay) => {
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(function launch() {
      if (document.visibilityState !== 'visible') {
        document.addEventListener('visibilitychange', launch, { once: true });
        return;
      }
      setFlying(true);
    }, delay);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const forced = new URLSearchParams(window.location.search).has('owl');
    scheduleFlight(forced ? 1500 : FIRST_DELAY_MS);
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleFlight]);

  useEffect(() => {
    if (!flying) return undefined;
    const el = owlRef.current;
    if (!el) return undefined;

    const toRight = Math.random() < 0.5;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const startX = toRight ? -OWL_WIDTH - 20 : width + 20;
    const endX = toRight ? width + 20 : -OWL_WIDTH - 20;
    const startY = randomBetween(height * 0.15, height * 0.55);
    const endY = startY + randomBetween(-height * 0.15, height * 0.15);
    const swoop = randomBetween(30, 80);
    const duration = CROSS_MS * Math.max(0.6, Math.min(1.2, width / 1400));
    const flip = toRight ? 'scaleX(-1)' : '';
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = (now - startedAt) / duration;
      if (progress >= 1) {
        setFlying(false);
        scheduleFlight(INTERVAL_MS);
        return;
      }
      const x = startX + (endX - startX) * progress;
      const y =
        startY + (endY - startY) * progress + Math.sin(progress * Math.PI) * swoop + Math.sin(now / 260) * 6;
      const tilt = Math.cos(now / 260) * 3;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) ${flip}`;
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [flying, scheduleFlight]);

  const openLetter = () => {
    cancelAnimationFrame(frameRef.current);
    setFlying(false);
    let index = Math.floor(Math.random() * LETTERS.length);
    if (index === lastLetterRef.current) index = (index + 1) % LETTERS.length;
    lastLetterRef.current = index;
    setLetter(LETTERS[index]);
    scheduleFlight(INTERVAL_MS);
  };

  const closeLetter = useCallback(() => setLetter(null), []);

  return (
    <>
      {flying && (
        <button
          ref={owlRef}
          type="button"
          className="owl"
          aria-label="An owl has a letter for you"
          onClick={openLetter}
          style={{ transform: 'translate3d(-200px, -200px, 0)' }}
        >
          <OwlArt />
        </button>
      )}
      {letter && (
        <MagicToast
          icon={<span style={{ fontSize: '2.6rem', lineHeight: 1 }}>✉️</span>}
          title="An owl has brought you a letter!"
          body={letter}
          footnote="Hogwarts Owl Post"
          onClose={closeLetter}
        />
      )}
    </>
  );
};

export default FlyingOwl;
