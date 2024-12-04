'use client'
import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { useState } from 'react';

const Modal = (props) => {
    const data1 = Object.entries(props.data)[0];
    const data2 = { ...props.data };
    const keys = Reflect.ownKeys(data2);
    if (keys.length) delete data2[keys[0]];
    const [isCopied, setIsCopied] = useState(false)

 
    const copyTextHandler = async (e) => {
        const element = document.getElementById("bibText")

        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        selection.removeAllRanges(); 

        selection.addRange(range);

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setIsCopied(true)
            }
            setTimeout(() => {
                setIsCopied(false)
            }, 1000);
        } catch (err) {
            console.error('Unable to copy', err);
        }

        selection.removeAllRanges();
    }

    return (
        <>
            <div onClick={() => props.setShowModal(false)} className="bg-black opacity-30 fixed left-0 top-0 z-20 h-screen w-screen"></div>
            <div className="p-4 md:p-6 fixed -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] w-[90%] lg:w-[80%] md:w-[70%] max-h-[30rem] bg-white z-30 rounded-lg text-black">
                <div className="flex justify-between md:items-center border-b pb-2 md:pb-4">
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{props.title}</div>
                    <FaXmark className="w-8 md:w-5 h-8 ml-2 md:h-5 cursor-pointer" onClick={() => props.setShowModal(false)} />
                </div>
                <div className="relative font-semibold bg-[#f6f8fa] max-h-[20rem] md:h-[90%] w-full py-2 px-1 md:p-4 mt-2 flex overflow-y-auto">
                    <div id="bibText" className="">
                        <div className="sm:text-lg md:text-xl">
                            <span className="text-red-800">{data1[0]}</span><span className="text-purple-600">{`{${data1[1]},`}</span>
                        </div>
                        <div className="md:text-lg pl-1 md:pl-3">
                            {Object.entries(data2).map((entry, index) => <div key={index}>{`${entry[0]}${'='}{${entry[1]}},`}</div>)}
                        </div>
                        {'}'}
                    </div>
                    <div className={`flex absolute right-3`}>
                        <div className={`ease-in-out ${isCopied ? 'opacity-100' : 'opacity-0 delay-500'} transition-opacity duration-300 ease-in`}>
                            {isCopied && <div className={`bg-gray-dark text-white px-2 py-1 inline h-fit rounded-lg mr-1 font-normal text-sm`}>copied</div>}
                        </div>
                        <LuCopy className="w-6 md:w-8 h-6 md:h-8 cursor-pointer" onClick={(e) => copyTextHandler(e)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
