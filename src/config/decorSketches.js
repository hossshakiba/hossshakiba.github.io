/**
 * Site-wide toggle for decorative background SVG sketches (trees, birds, motifs, etc.).
 *
 * Set `DECOR_SKETCHES_CODE_ENABLED` to `false` to hide all sketches without removing components.
 *
 * Optional: set `NEXT_PUBLIC_DECOR_SKETCHES=false` in `.env.local` to disable at build time
 * (overrides the code flag when set to false). Restart dev server after changing env.
 */
const DECOR_SKETCHES_CODE_ENABLED = true;

const env = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_DECOR_SKETCHES : undefined;
const envForcesOff = env === 'false' || env === '0';

export const showDecorSketches = DECOR_SKETCHES_CODE_ENABLED && !envForcesOff;
