'use client';
import Image from 'next/image';
import EducationButton from '../EducationButton';
import Educations from '../Educations';
import introductionRectangle1 from '../../../public/images/design/introductionRectangle1.svg';
import { useState } from 'react';

const DetaiIntroduction = (props) => {
    const [showEducation, setShowEducation] = useState(false);

    return (
        <div id="aboutSection" className="scroll-mt-32 md:pl-8 lg:pl-10 xl:pl-12">
            {/* <Image alt="" src={introductionRectangle1} className="absolute -top-16 xl:-top-8 left-0 hidden md:block" /> */}
            <div className="mb-32 3xl:mb-40 mt-[2rem] lg:mt-[5rem] 3xl:mt-[8rem]">
                <p className="theme-muted text-xl xl:text-2xl 3xl:text-3xl font-medium mb-2 xl:mb-3 hidden md:block">Hello! I’m</p>
                <h2 className="theme-heading text-2xl xl:text-3xl 3xl:text-5xl font-semibold hidden md:block"><span className="name-accent">Hossein Shakibania</span></h2>
                <p className="theme-heading text-sm md:text-[0.96rem] 2xl:text-base 3xl:text-lg text-justify mt-1 md:mt-4 xl:mt-6 3xl:mt-10">
                    I'm an MS student in <a className="theme-link" href="https://www.informatik.tu-darmstadt.de/studium_fb20/im_studium/studiengaenge_liste/aim_msc.en.jsp"> Artificial Intelligence and Machine Learning</a> at Technical University of Darmstadt and a student research assistant at <a className="theme-link" href="https://www.informatik.tu-darmstadt.de/mai/multimodal_ai/index.en.jsp">Multimodal AI Lab</a>, led by <a className="theme-link" href="https://scholar.google.com/citations?user=3kDtybgAAAAJ&hl=en">Prof. Marcus Rohrbach</a> and <a className="theme-link" href="https://scholar.google.com/citations?user=GHpxNQIAAAAJ&hl=en">Prof. Anna Rohrbach</a>. I completed my BS in Computer Engineering in 2024 at Bu-Ali Sina University.
                </p>
                <p className="theme-heading text-sm md:text-[0.96rem] 2xl:text-base 3xl:text-lg text-justify mt-2 xl:mt-3 3xl:mt-5">
                    I'm interested in <span className="font-semibold">multimodal generative models</span> and their <span className="font-semibold">personalization</span>, with the goal of making visual content creation more controllable, creative, and expressive.
                </p>
                <p className="theme-heading text-sm md:text-[0.96rem] 2xl:text-base 3xl:text-lg text-justify mt-2 xl:mt-3 3xl:mt-5">
                    Feel free to reach out. I'm open to collaborations!
                </p>
                <EducationButton showEducation={showEducation} setShowEducation={setShowEducation} />
                <div
                    id="Educations"
                    className={`scroll-mt-48 transition-opacity ease-in duration-700 ${showEducation ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-hidden={!showEducation}
                >
                    {showEducation && props.educationData?.educations?.map((education, index) => (
                        <Educations
                            key={index}
                            index={index}
                            length={props.educationData?.educations?.length ?? 0}
                            educationData={education}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetaiIntroduction;