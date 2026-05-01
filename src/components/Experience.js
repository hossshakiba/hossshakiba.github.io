'use client';
import React, { useState } from 'react';
import ExperienceCart from './ExperienceCart';
import Image from 'next/image';
import natureTree from '../../public/images/illustrations/nature-tree-outline.svg';
import natureWindLines from '../../public/images/illustrations/nature-wind-lines.svg';
import natureStroke from '../../public/images/illustrations/nature-stroke.svg';
import natureTreeRoundedBig from '../../public/images/illustrations/nature-tree-rounded-big.svg';
import natureBirdsSmall from '../../public/images/illustrations/nature-birds-small.svg';
import natureBirdsWide from '../../public/images/illustrations/nature-birds-wide.svg';
import { showDecorSketches } from '@/config/decorSketches';

const Experience = ({ data }) => {
  if (!data?.experience) return null; // Or a loading spinner if you prefer!
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  return (
    <div id="experienceSection" className="scroll-mt-16 relative overflow-hidden">
      {showDecorSketches && (
        <>
          <Image
            src={natureTree}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-shape-strong decor-neon-green pointer-events-none hidden lg:block absolute right-2 top-[24rem] w-52 xl:w-64 text-[var(--color-accent)] opacity-[0.08] dark:opacity-[0.16] -z-10"
          />
          <Image
            src={natureBirdsSmall}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-neon-cyan pointer-events-none hidden lg:block absolute right-28 xl:right-34 top-[26rem] w-20 text-[var(--color-accent)] opacity-[0.08] dark:opacity-[0.19] -z-10"
          />
          <Image
            src={natureWindLines}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute left-12 top-40 w-56 text-[var(--color-accent)] opacity-[0.05] dark:opacity-[0.1] -z-10"
          />
          <Image
            src={natureTreeRoundedBig}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-shape-strong decor-neon-green pointer-events-none hidden lg:block absolute left-8 xl:left-14 top-[42rem] w-44 xl:w-56 text-[var(--color-accent)] opacity-[0.09] dark:opacity-[0.2] -z-10"
          />
          <Image
            src={natureBirdsWide}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute left-10 top-[34rem] w-32 text-[var(--color-accent)] opacity-[0.06] dark:opacity-[0.16] -z-10"
          />
          <Image
            src={natureStroke}
            alt=""
            aria-hidden="true"
            className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute right-10 top-[33rem] w-48 text-[var(--color-accent)] opacity-[0.05] dark:opacity-[0.1] -z-10"
          />
        </>
      )}
      <div className="content-shell py-8 md:py-16 theme-heading">
        <div className="section-heading">
          <p className="section-title">Experience</p>
          <div className="section-divider"></div>
        </div>
        <div className="flex flex-col items-center justify-center pt-8 xl:pt-16">
          {data.experience.slice(0, 3).map((experience, index) => (
            <ExperienceCart data={experience} key={index} />
          ))}
        </div>
        <div className={`${showAllExperiences ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in duration-700 flex flex-col items-center justify-center`}>
          {showAllExperiences &&
            data.experience.slice(3).map((experience, index) => (
              <ExperienceCart data={experience} key={index} />
            ))}
        </div>
        {data.experience.length > 3 && (
          <button
            className="theme-muted text-xs md:text-sm xl:text-base theme-surface-soft border mt-6 py-2 px-4 rounded-lg mx-auto flex mb-10 hover:text-[var(--color-accent)] transition-colors duration-150"
            onClick={() => setShowAllExperiences(!showAllExperiences)}
          >
            {showAllExperiences ? 'show less' : 'show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Experience;
