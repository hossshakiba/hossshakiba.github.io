'use client'
import React from 'react'
import rightArrow from '../../public/images/icons/rightArrow.svg'
import downArrow from '../../public/images/icons/downArrow.svg'
import Image from 'next/image'

const EducationButton = (props) => {
    const handleClick = () => {
        const next = !props.showEducation
        props.setShowEducation(next)
        requestAnimationFrame(() => {
            const id = next ? 'Educations' : 'aboutSection'
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }

    return (
        <button type="button" className="flex items-center mt-6 mb-10" onClick={handleClick}>
            {props.showEducation ? <Image alt="" src={downArrow} /> : <Image alt="" src={rightArrow} />}
            <span className="theme-heading text-[0.95rem] lg:text-[1.04rem] xl:text-[1.08rem] 2xl:text-[1.14rem] font-semibold ml-2">
                Education
            </span>
        </button>
    )
}

export default EducationButton