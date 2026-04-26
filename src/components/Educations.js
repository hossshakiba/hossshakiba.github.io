import Image from 'next/image';
import React from 'react';
import { BASE_URL } from '../config';

const Educations = (props) => {
    return (
        <div>
            <div className="ml-0 md:ml-2 lg:ml-4 xl:ml-8 flex">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 -mt-1 lg:mr-5 relative">
                        <Image
                            alt="Education Image"
                            src={BASE_URL + props.educationData.image}
                            fill
                            className="university-logo object-contain rounded-lg"
                            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 144px"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="theme-heading flex">
                        {/* Timeline */}
                        <div className="relative">
                            {/* Circle */}
                            <div className="w-2 h-2 mx-3 lg:mx-7 bg-[var(--color-subtle)] rounded-full my-3"></div>
                            {/* Line */}
                            {props.index + 1 !== props.length && (
                                <div className="w-1 h-28 ml-[0.88rem] lg:ml-[1.9rem] mr-[0.88rem] lg:mr-[1.85rem] rounded-lg bg-[var(--color-border)]"></div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:w-90">
                            <p className="text-sm md:text-base lg:text-lg">
                                {props.educationData.university}
                            </p>
                            <p className="text-xs md:text-sm">
                                {props.educationData.degree}
                            </p>
                            <p className="text-xs md:text-sm">
                                {props.educationData.date}
                            </p>
                            <ul className="text-xs md:text-sm list-disc ml-6 md:ml-7">
                                {props.educationData.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Educations;
