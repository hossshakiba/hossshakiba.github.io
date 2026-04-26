'use client'
import React from 'react'
import rightArrow from '../../public/images/icons/rightArrow.svg'
import downArrow from '../../public/images/icons/downArrow.svg'
import Image from 'next/image'
import Link from 'next/link'

const EducationButton = (props) => {
    return (
        <Link href={props.showEducation ? '#aboutSection' : '#Educations'}>
            <button className="flex items-center mt-6 mb-10" onClick={() => {
                props.setShowEducation(!props.showEducation)
            }}>
                {props.showEducation ? <Image alt="downArrow" src={downArrow} /> : <Image alt="rightArrow" src={rightArrow} />}
                <span className="text-gray-dark text-[0.95rem] lg:text-[1.04rem] xl:text-[1.08rem] 2xl:text-[1.14rem] font-semibold ml-2">
                    Education
                </span>
            </button>
        </Link>
    )
}

export default EducationButton