'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import MagicToast from './MagicToast';
import { introHand } from './introduction/introSocials';

const FIRST_DELAY_MS = 12000;
const INTERVAL_MS = 40000;
const FLIGHT_MS = 11000;
const EVADE_RADIUS = 110;
const MAX_SPEED = 7;
const COUNT_KEY = 'snitches-caught';
const BURST_SPARKS = 16;

const CATCH_LINES = [
  'Reviewer 2 still says the catch lacks novelty.',
  'Ablation study: without you, the Snitch escapes 100% of the time.',
  'Nice catch! Now point all your attention heads at me!',

  'Fun fact: the title “Attention Is All You Need” was a nod to the Beatles’ “All You Need Is Love.”',
  'Fun fact: AlexNet was trained on two gaming GPUs in Alex Krizhevsky’s bedroom at his parents’ house.',
  'Fun fact: Hinton said dropout was inspired by bank tellers being rotated so they couldn’t conspire to commit fraud.',
  'Fun fact: the word “robot” comes from Karel Čapek’s 1920 play R.U.R., from the Czech “robota,” meaning forced labor.',
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const randomTarget = () => ({
  x: randomBetween(70, window.innerWidth - 70),
  y: randomBetween(110, window.innerHeight - 70),
});

const edgeStart = () => {
  const fromLeft = Math.random() < 0.5;
  return {
    x: fromLeft ? -40 : window.innerWidth + 40,
    y: randomBetween(140, window.innerHeight * 0.6),
  };
};

export const SnitchArt = ({ size = 56 }) => (
  <svg viewBox="-26 -13 52 26" width={size} height={size / 2} aria-hidden className="snitch-art">
    <defs>
      <radialGradient id="snitch-gold" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#fff6c9" />
        <stop offset="35%" stopColor="#ffd54f" />
        <stop offset="78%" stopColor="#c98a0e" />
        <stop offset="100%" stopColor="#7d5200" />
      </radialGradient>
    </defs>
    <g className="snitch-wing snitch-wing--left">
      <path
        d="M-5,-1 C-10,-11 -22,-11 -25,-5 C-19,-3.5 -12,-1.5 -5,1.5 Z"
        fill="rgba(255,255,255,0.88)"
        stroke="rgba(190,160,80,0.9)"
        strokeWidth="0.5"
      />
      <path d="M-6,-0.5 L-21,-6 M-6,0 L-17,-2.5 M-6,-1 L-14,-8" stroke="rgba(190,160,80,0.7)" strokeWidth="0.35" />
    </g>
    <g className="snitch-wing snitch-wing--right">
      <path
        d="M5,-1 C10,-11 22,-11 25,-5 C19,-3.5 12,-1.5 5,1.5 Z"
        fill="rgba(255,255,255,0.88)"
        stroke="rgba(190,160,80,0.9)"
        strokeWidth="0.5"
      />
      <path d="M6,-0.5 L21,-6 M6,0 L17,-2.5 M6,-1 L14,-8" stroke="rgba(190,160,80,0.7)" strokeWidth="0.35" />
    </g>
    <circle r="6.2" fill="url(#snitch-gold)" />
    <path d="M-6.2,0 A6.2,6.2 0 0 0 6.2,0" fill="none" stroke="rgba(110,70,0,0.55)" strokeWidth="0.45" />
    <path d="M-3.2,-5.3 C-1,-2 1,-2 3.2,-5.3" fill="none" stroke="rgba(110,70,0,0.4)" strokeWidth="0.4" />
  </svg>
);

const GoldenSnitch = () => {
  const [flying, setFlying] = useState(false);
  const [burst, setBurst] = useState(null);
  const [toast, setToast] = useState(null);
  const snitchRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(0);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const stateRef = useRef(null);
  const lastLineRef = useRef(-1);
  const hintRef = useRef(null);
  const hintShownRef = useRef(false);
  const [showHint, setShowHint] = useState(false);

  const scheduleFlight = useCallback((delay) => {
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(function launch() {
      if (document.visibilityState !== 'visible') {
        document.addEventListener('visibilitychange', launch, { once: true });
        return;
      }
      if (!hintShownRef.current) {
        hintShownRef.current = true;
        setShowHint(true);
      }
      setFlying(true);
    }, delay);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const forced = new URLSearchParams(window.location.search).has('snitch');
    const trackPointer = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('pointermove', trackPointer, { passive: true });
    scheduleFlight(forced ? 1500 : FIRST_DELAY_MS);

    return () => {
      window.removeEventListener('pointermove', trackPointer);
      clearTimeout(timerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleFlight]);

  useEffect(() => {
    if (!flying) return undefined;
    const el = snitchRef.current;
    if (!el) return undefined;

    const start = edgeStart();
    const state = {
      x: start.x,
      y: start.y,
      vx: 0,
      vy: 0,
      target: randomTarget(),
      retargetAt: performance.now() + randomBetween(600, 1400),
      dartUntil: 0,
      hoverUntil: 0,
      exiting: false,
      launchedAt: performance.now(),
      last: performance.now(),
    };
    stateRef.current = state;

    const tick = (now) => {
      const dt = Math.min((now - state.last) / 16.67, 3);
      state.last = now;

      if (!state.exiting && now - state.launchedAt > FLIGHT_MS) {
        state.exiting = true;
        state.target = {
          x: state.x < window.innerWidth / 2 ? window.innerWidth + 80 : -80,
          y: randomBetween(80, window.innerHeight * 0.5),
        };
      }

      if (!state.exiting && now > state.retargetAt) {
        state.target = randomTarget();
        state.retargetAt = now + randomBetween(500, 1500);
        const roll = Math.random();
        if (roll < 0.22) state.dartUntil = now + 320;
        else if (roll < 0.36) state.hoverUntil = now + randomBetween(350, 800);
      }

      let speed = MAX_SPEED;
      if (now < state.dartUntil) speed *= 2.2;
      if (now < state.hoverUntil) speed *= 0.12;
      if (state.exiting) speed *= 1.4;

      const tx = state.target.x - state.x;
      const ty = state.target.y - state.y;
      const distance = Math.hypot(tx, ty) || 1;
      let desiredX = (tx / distance) * speed;
      let desiredY = (ty / distance) * speed;

      const px = state.x - pointerRef.current.x;
      const py = state.y - pointerRef.current.y;
      const pointerDistance = Math.hypot(px, py);
      if (!state.exiting && pointerDistance < EVADE_RADIUS) {
        const push = (1 - pointerDistance / EVADE_RADIUS) * MAX_SPEED * 1.6;
        desiredX += (px / (pointerDistance || 1)) * push;
        desiredY += (py / (pointerDistance || 1)) * push;
      }

      state.vx += (desiredX - state.vx) * 0.08 * dt;
      state.vy += (desiredY - state.vy) * 0.08 * dt;
      state.x += state.vx * dt;
      state.y += state.vy * dt + Math.sin(now / 90) * 0.35;

      const tilt = Math.max(-25, Math.min(25, state.vx * 3));
      el.style.transform = `translate3d(${state.x - 28}px, ${state.y - 20}px, 0) rotate(${tilt}deg)`;
      if (hintRef.current) {
        hintRef.current.style.transform = `translate3d(${state.x}px, ${state.y + 26}px, 0)`;
      }

      const offscreen = state.x < -120 || state.x > window.innerWidth + 120;
      if (state.exiting && offscreen) {
        setFlying(false);
        setShowHint(false);
        scheduleFlight(INTERVAL_MS);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [flying, scheduleFlight]);

  const catchSnitch = () => {
    if (!stateRef.current || !flying) return;
    const state = stateRef.current;
    cancelAnimationFrame(frameRef.current);
    setBurst({ x: state.x, y: state.y, id: Date.now() });
    setFlying(false);
    setShowHint(false);

    const count = Number(localStorage.getItem(COUNT_KEY) || 0) + 1;
    localStorage.setItem(COUNT_KEY, String(count));

    let line = Math.floor(Math.random() * CATCH_LINES.length);
    if (line === lastLineRef.current) line = (line + 1) % CATCH_LINES.length;
    lastLineRef.current = line;

    setToast({
      body: CATCH_LINES[line],
      footnote: count === 1 ? 'Your first Snitch!' : `Snitches caught: ${count}`,
    });
    scheduleFlight(INTERVAL_MS);
  };

  const closeToast = useCallback(() => setToast(null), []);

  return (
    <>
      {flying && (
        <button
          ref={snitchRef}
          type="button"
          className="snitch"
          aria-label="Catch the Golden Snitch"
          onPointerDown={catchSnitch}
          onClick={catchSnitch}
          style={{ transform: 'translate3d(-200px, -200px, 0)' }}
        >
          <SnitchArt />
        </button>
      )}

      {flying && showHint && (
        <div ref={hintRef} className="snitch-hint" aria-hidden style={{ transform: 'translate3d(-400px, -400px, 0)' }}>
          <span className={introHand.className} onAnimationEnd={() => setShowHint(false)}>
            catch me if you can!
          </span>
        </div>
      )}

      {burst && (
        <div
          key={burst.id}
          className="snitch-burst"
          style={{ left: burst.x, top: burst.y }}
          aria-hidden
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget.lastChild) setBurst(null);
          }}
        >
          {Array.from({ length: BURST_SPARKS }, (_, i) => (
            <span
              key={i}
              className="snitch-burst-spark"
              style={{
                '--angle': `${(360 / BURST_SPARKS) * i + randomBetween(-8, 8)}deg`,
                '--distance': `${randomBetween(38, 78)}px`,
              }}
            />
          ))}
        </div>
      )}

      {toast && (
        <MagicToast
          icon={<SnitchArt size={84} />}
          title="You caught the Golden Snitch!"
          body={toast.body}
          footnote={toast.footnote}
          onClose={closeToast}
        />
      )}
    </>
  );
};

export default GoldenSnitch;
