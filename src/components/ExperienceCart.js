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
        className: `absolute w-12 md:w-16 lg:w-20 h-auto ${props.data.invertInDarkMode ? 'dark-invert-logo' : ''}`
    };



    return (
        <div className={`relative theme-card hover:shadow-4xl cursor-pointer mb-8 md:mb-10 w-full sm:w-[78%] xl:w-[68%] 2xl:w-[58%] ${props.data.information.length <= 2 ? 'pb-4 md:pb-6 px-3 md:px-5 lg:px-5 pt-3 md:pt-4 lg:pt-4' : 'p-4 md:p-5 lg:p-5'} rounded-xl border lg:transition lg:ease-in-out lg:delay-150 lg:hover:-translate-y-1 lg:hover:scale-[1.01]`} >
            <div className="flex">
                {props.data.url ? (
                    <a href={props.data.url}>
                        <Image {...imageProps} />
                    </a>
                ) : (
                    <Image {...imageProps} />
                )}                
                <div className="theme-heading ml-16 md:ml-20 lg:ml-28">
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.92rem] md:text-base xl:text-[1.06rem] 2xl:text-[1.12rem] font-semibold theme-heading leading-snug min-w-0">{props.data.position}</p>
                        <p className="hidden md:block shrink-0 text-[0.68rem] sm:text-[0.72rem] md:text-xs theme-subtle whitespace-nowrap mt-0.5">{props.data.date}</p>
                    </div>
                    <div className="text-[0.72rem] sm:text-xs md:text-[0.84rem] theme-muted mt-0.5 leading-relaxed">
                            {props.data.url ? (
                            <p className=""><a href={props.data.url}>{props.data.laboratory}</a></p>
                            ) : (
                                <p className="">{props.data.laboratory}</p>
                            )}
                        
                        <p className="theme-muted mt-1">{props.data.type}</p>
                        <p className="md:hidden text-[0.68rem] sm:text-[0.72rem] theme-subtle mt-0.5">{props.data.date}</p>
                    </div>
                    <div className="mt-2.5">
                    {props.data.information.slice(0, 2).map((info, index) => (
                        <div key={index} className="flex mb-1.5 text-xs sm:text-sm theme-muted">
                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 mt-[7px] sm:mt-[9px] mr-1.5 sm:mr-2 bg-[var(--color-subtle)] rounded-full"></span>
                        <p className="w-[92%] md:w-full leading-relaxed">{info}</p>
                        </div>
                    ))}
                    </div>
                    <div className={`${showAll ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}>
                        {showAll &&
                            <div>
                                {props.data.information.slice(2).map((info, index) =>
                                    <div key={index} className="flex mb-1.5 text-xs sm:text-sm theme-muted">
                                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 mt-[7px] sm:mt-[9px] mr-1.5 sm:mr-2 bg-[var(--color-subtle)] rounded-full"></span>
                                    <p className="w-[92%] md:w-full leading-relaxed">{info}</p>
                                    </div>
                                )}
                            </div>}
                    </div>
                </div>
            </div >
            {props.data.information.length > 2 && <button className="flex text-xs md:text-sm m-auto theme-muted my-2 md:mt-3 hover:text-[var(--color-accent)] transition-colors duration-150" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'show less' : 'show more'}
            </button>}
        </div>
    )
}

export default ExperienceCart