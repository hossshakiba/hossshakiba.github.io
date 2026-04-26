'use client'
import { useState } from 'react'
import Image from 'next/image'


const ExperienceCart = (props) => {
    const [showAll, setShowAll] = useState(false);
    const imageProps = {
        alt: "",
        src: props.data.logo,
        layout: "intrinsic",
        width: 200,
        height: 200,
        objectFit: "contain",
        className: "absolute w-12 md:w-16 lg:w-20 h-auto"
    };



    return (
        <div className={`relative bg-[#f7fafd] hover:shadow-4xl cursor-pointer mb-8 md:mb-10 w-full sm:w-[78%] xl:w-[68%] 2xl:w-[58%] ${props.data.information.length <= 2 ? 'pb-4 md:pb-6 px-3 md:px-5 lg:px-5 pt-3 md:pt-4 lg:pt-4' : 'p-4 md:p-5 lg:p-5'} rounded-xl border border-[#e4ebf3] lg:transition lg:ease-in-out lg:delay-150 lg:hover:-translate-y-1 lg:hover:scale-[1.01]`} >
            <div className="flex">
                {props.data.url ? (
                    <a href={props.data.url}>
                        <Image {...imageProps} />
                    </a>
                ) : (
                    <Image {...imageProps} />
                )}                
                <div className="text-[#313C44] ml-16 md:ml-20 lg:ml-28">
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.92rem] md:text-base xl:text-[1.06rem] 2xl:text-[1.12rem] font-semibold text-[#2f3c49] leading-snug">{props.data.position}</p>
                        <p className="text-[0.68rem] sm:text-[0.72rem] md:text-xs text-[#7c8791] whitespace-nowrap mt-0.5">{props.data.date}</p>
                    </div>
                    <div className="text-[0.72rem] sm:text-xs md:text-[0.84rem] text-[#596673] mt-0.5 leading-relaxed">
                            {props.data.url ? (
                            <p className=""><a href={props.data.url}>{props.data.laboratory}</a></p>
                            ) : (
                                <p className="">{props.data.laboratory}</p>
                            )}
                        
                        <p className="text-[#6a7784] mt-1">{props.data.type}</p>
                    </div>
                    <div className="mt-2.5">
                    {props.data.information.slice(0, 2).map((info, index) => (
                        <div key={index} className="flex mb-1.5 text-xs sm:text-sm text-[#4f5963]">
                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 mt-[7px] sm:mt-[9px] mr-1.5 sm:mr-2 bg-[#6e7b87] rounded-full"></span>
                        <p className="w-[92%] md:w-full leading-relaxed">{info}</p>
                        </div>
                    ))}
                    </div>
                    <div className={`${showAll ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}>
                        {showAll &&
                            <div>
                                {props.data.information.slice(2).map((info, index) =>
                                    <div key={index} className="flex mb-1.5 text-xs sm:text-sm text-[#4f5963]">
                                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 mt-[7px] sm:mt-[9px] mr-1.5 sm:mr-2 bg-[#6e7b87] rounded-full"></span>
                                    <p className="w-[92%] md:w-full leading-relaxed">{info}</p>
                                    </div>
                                )}
                            </div>}
                    </div>
                </div>
            </div >
            {props.data.information.length > 2 && <button className="flex text-xs md:text-sm m-auto text-[#738292] my-2 md:mt-3 hover:text-[#4f6479] transition-colors duration-150" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'show less' : 'show more'}
            </button>}
        </div>
    )
}

export default ExperienceCart