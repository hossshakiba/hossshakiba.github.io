'use client';

/**
 * Horizontal wall-style switch: paddle left = light (day / ☀), right = dark (night / 🌙).
 * `compact` — tighter for mobile drawer / md header.
 */
export default function ThemePowerSwitch({ theme, onToggle, compact = false }) {
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  const shell =
    compact
      ? 'h-[2.35rem] w-[5.65rem] gap-0.5 rounded-md px-1.5 py-1'
      : 'h-[2.6rem] w-[6.35rem] gap-1 rounded-lg px-1.5 py-1';

  const slotH = compact ? 'h-5' : 'h-[1.375rem]';
  const slotMinW = compact ? 'min-w-[2.55rem]' : 'min-w-[2.9rem]';
  const iconSm = compact ? 'text-[12px]' : 'text-[13px]';
  const iconLg = compact ? 'text-[11px]' : 'text-[13px]';
  const screw = compact ? 'left-0.5 top-0.5 h-1 w-1' : 'left-0.5 top-0.5 h-1 w-1';
  const screwBR = compact ? 'bottom-0.5 right-0.5 h-1 w-1' : 'bottom-0.5 right-0.5 h-1 w-1';

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={onToggle}
      className={`relative flex shrink-0 items-center border-2 border-[#6b6358] bg-gradient-to-b from-[#ebe4d6] via-[#d9d0c0] to-[#c4b9a8] shadow-[0_3px_10px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.5)] outline-none transition-transform duration-150 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-nav-bg)] active:scale-[0.98] dark:border-[#5a6574] dark:from-[#4a5565] dark:via-[#3d4655] dark:to-[#323a48] dark:shadow-[0_3px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] ${shell}`}
    >
      <span className={`absolute ${screw} rounded-full bg-[#3d3830] opacity-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:bg-[#1e2228] dark:opacity-70`} />
      <span className={`absolute right-0.5 top-0.5 h-1 w-1 rounded-full bg-[#3d3830] opacity-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:bg-[#1e2228] dark:opacity-70`} />
      <span className={`absolute bottom-0.5 left-0.5 h-1 w-1 rounded-full bg-[#3d3830] opacity-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:bg-[#1e2228] dark:opacity-70`} />
      <span className={`absolute ${screwBR} rounded-full bg-[#3d3830] opacity-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:bg-[#1e2228] dark:opacity-70`} />

      <span
        className={`pointer-events-none select-none leading-none transition-all duration-300 motion-reduce:duration-75 ${iconSm} ${!isDark ? 'scale-110 opacity-100 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]' : 'opacity-30'}`}
        aria-hidden
      >
        ☀️
      </span>

      <div
        className={`relative mx-0.5 ${slotH} ${slotMinW} flex-1 overflow-hidden rounded-[5px] bg-[#0c0b09] shadow-[inset_0_2px_6px_rgba(0,0,0,0.92)] ring-1 ring-black/60 dark:bg-[#050608] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.95)] dark:ring-black/80`}
      >
        <div className="pointer-events-none absolute bottom-0.5 left-1/2 top-0.5 z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/18 to-transparent" />

        <div
          className="absolute bottom-0.5 top-0.5 w-[calc(50%-3px)] rounded-[3px] transition-all duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:duration-75"
          style={{
            left: isDark ? 'calc(50% + 1.5px)' : '2px',
            background: isDark
              ? 'linear-gradient(180deg, #4a4844 0%, #2a2826 45%, #1a1917 100%)'
              : 'linear-gradient(180deg, #faf8f4 0%, #e0d8cc 40%, #c4bbb0 100%)',
            boxShadow: isDark
              ? 'inset 0 -1px 2px rgba(0,0,0,0.45), 2px 0 3px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)'
              : 'inset 0 1px 2px rgba(255,255,255,0.65), -2px 0 3px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.06)',
          }}
        />
      </div>

      <span
        className={`pointer-events-none select-none leading-none transition-all duration-300 motion-reduce:duration-75 ${iconLg} ${isDark ? 'scale-110 opacity-100 drop-shadow-[0_0_6px_rgba(129,140,248,0.4)]' : 'opacity-30'}`}
        aria-hidden
      >
        🌙
      </span>
    </button>
  );
}
