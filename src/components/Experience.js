import React from 'react'
import { getData } from '../../lib/getData'
import ExperienceCart from './ExperienceCart'

const Experience = () => {
  const experiences = getData('Experience.json');
  
  return (
    <div id="experienceSection" className="scroll-mt-16">
      <div className="container m-auto px-7 lg:px-10 xl:px-20 2xl:px-28 3xl:px-44 py-8 md:py-16 text-gray-dark">
        <p className="text-gray-dark text-2xl 2xl:text-3xl">Experience</p>
        <div className="flex flex-col items-center justify-center pt-8 xl:pt-16">
          {experiences.experience.map((experience, index) =>
            <ExperienceCart data={experience} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Experience
