'use client';
import React, { useState } from 'react';
import ExperienceCart from './ExperienceCart';

const Experience = ({ data }) => {
  if (!data?.experience) return null; // Or a loading spinner if you prefer!
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  return (
    <div id="experienceSection" className="scroll-mt-16">
      <div className="content-shell py-8 md:py-16 text-gray-dark">
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
            className="text-[#748595] text-xs md:text-sm xl:text-base bg-primary1 mt-6 py-2 px-4 rounded-lg mx-auto flex mb-10"
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
