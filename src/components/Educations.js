import Image from 'next/image'
import React from 'react'
import { BASE_URL } from '../config';

const Educations = (props) => {
    return (
        <div>
            <div id="Educations" className="scroll-mt-48"></div>
            {props.showEducation &&
                <div className="md:ml-5 lg:ml-10 xl:ml-20 flex">
                    <Image alt="" width={100} height={100} className="w-20 h-20 lg:mr-10" src={BASE_URL + props.educationData.image} />
                    <div className="text-gray-dark flex">
                        <div className="">
                            <div className="w-2 h-2 mx-3 lg:mx-7 bg-[#BCC0C2] rounded-full my-3"></div>
                            {props.index + 1 !== props.length &&
                                <div className="w-1 h-28 ml-[0.88rem] lg:ml-[1.9rem] mr-[0.88rem] lg:mr-[1.85rem] rounded-lg bg-[#D7E1EB]"></div>
                            }
                        </div>
                        <div className="lg:w-90">
                            <p className="text-base md:text-lg lg:text-xl">{props.educationData.university}</p>
                            <p className="text-sm md:text-base">{props.educationData.degree}</p>
                            <p className="text-sm md:text-base">{props.educationData.date}</p>
                            <ul className="text-sm md:text-base list-disc ml-8">
                                {props.educationData.details.map((detail, index) =>
                                    <li key={index}>{detail}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Educations
