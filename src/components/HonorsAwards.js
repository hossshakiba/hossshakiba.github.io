'use client';
import { useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';

const HonorsAwards = ({ data }) => {
  const [showAllAwards, setShowAllAwards] = useState(false);
  const awards = data?.awards ?? [];
  const INITIAL_VISIBLE_COUNT = 4;
  const visibleAwards = showAllAwards ? awards : awards.slice(0, INITIAL_VISIBLE_COUNT);

  if (!awards.length) return null;

  return (
    <section id="HonorsSection" className="scroll-mt-20 py-10 md:py-16 theme-surface-soft relative overflow-hidden">
      <div className="content-shell">
        <div className="section-heading">
          <p className="section-kicker flex items-center gap-1.5">
            <HiSparkles className="text-[var(--color-accent)]" />
            Highlights
          </p>
          <h2 className="section-title">Honors & Achievements</h2>
          <div className="section-divider" />
        </div>

        <div className="mt-6 md:mt-10 grid gap-4 md:gap-5 justify-items-center">
          {visibleAwards.map((award, index) => (
            <article
              key={`${award.date}-${index}`}
              className="theme-surface rounded-xl border p-3.5 md:p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-soft)] transition-all duration-200 w-full max-w-3xl"
            >
              <div className="min-w-0">
                <p className="theme-subtle text-[0.74rem] md:text-xs uppercase tracking-[0.1em] font-semibold">
                  {award.date}
                </p>
                <p className="theme-heading text-sm md:text-[0.97rem] leading-relaxed mt-1">
                  {Array.isArray(award.text) ? award.text.join(' ') : award.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        {awards.length > INITIAL_VISIBLE_COUNT && (
          <button
            className="theme-muted text-xs md:text-sm xl:text-base theme-surface border mt-6 py-2 px-4 rounded-lg mx-auto flex hover:text-[var(--color-accent)] transition-colors duration-150"
            onClick={() => setShowAllAwards(!showAllAwards)}
          >
            {showAllAwards ? 'show less' : 'show more'}
          </button>
        )}
      </div>
    </section>
  );
};

export default HonorsAwards;
