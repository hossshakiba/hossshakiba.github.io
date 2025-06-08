'use client';
import Image from 'next/image';
import EducationButton from '../EducationButton';
import Educations from '../Educations';
import introductionRectangle1 from '../../../public/images/design/introductionRectangle1.svg';
import { useState } from 'react';

const DetaiIntroduction = (props) => {
    const [showEducation, setShowEducation] = useState(false);

    return (
        <div id="aboutSection" className="scroll-mt-32">
            {/* <Image alt="" src={introductionRectangle1} className="absolute -top-16 xl:-top-8 left-0 hidden md:block" /> */}
            <div className="mb-32 3xl:mb-40 mt-[3rem] lg:mt-[5rem] 3xl:mt-[8rem]">
                <p className="text-gray text-2xl xl:text-3xl 3xl:text-5xl font-medium mb-3 xl:mb-4 hidden md:block">Hello! I’m</p>
                <h2 className="text-gray-dark text-3xl xl:text-4xl 3xl:text-6xl font-black hidden md:block"><span className="highlight">Hossein Shakibania</span></h2>
                <p className="text-gray-dark text-sm md:text-base 2xl:text-lg 3xl:text-xl text-justify mt-[10rem] md:mt-4 xl:mt-6 3xl:mt-10">
                    I am an MS student in <a className="text-blue-500" href="https://www.informatik.tu-darmstadt.de/studium_fb20/im_studium/studiengaenge_liste/aim_msc.en.jsp"> Artificial Intelligence and Machine Learning</a> at Technical University of Darmstadt and a student research assistant at <a className="text-blue-500" href="https://www.informatik.tu-darmstadt.de/mai/multimodal_ai/index.en.jsp">Multimodal AI Lab</a>, led by <a className="text-blue-500" href="https://scholar.google.com/citations?user=3kDtybgAAAAJ&hl=en">Prof. Marcus Rohrbach</a> and <a className="text-blue-500" href="https://scholar.google.com/citations?user=GHpxNQIAAAAJ&hl=en">Prof. Anna Rohrbach</a>. I completed my BS in Computer Engineering in 2024 at Bu-Ali Sina University.
                </p>
                <p className=" text-gray-dark text-sm md:text-base 2xl:text-lg 3xl:text-xl text-justify mt-2 xl:mt-3 3xl:mt-5">
                    I am broadly interested in Multimodal Generative Models, particularly their applications in Content Creation, Controllable Editing, and Creative AI. My current research centers on Compositionality in Diffusion-based methods.
                </p>
                <p className="text-gray-dark text-sm md:text-base 2xl:text-lg 3xl:text-xl text-justify mt-2 xl:mt-3 3xl:mt-5">
                    Feel free to reach out. I'm open to collaborations!
                </p>
                <EducationButton showEducation={showEducation} setShowEducation={setShowEducation} />
                <div className={`${showEducation ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in duration-700`}>
                    {props.educationData.educations.map((education, index) =>
                        <Educations key={index} index={index} length={props.educationData.educations.length} educationData={education} showEducation={showEducation} setShowEducation={setShowEducation} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetaiIntroduction;