'use client';
import React, { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

const Modal = (props) => {
    const data1 = Object.entries(props.data)[0];
    const data2 = { ...props.data };
    const keys = Reflect.ownKeys(data2);
    if (keys.length) delete data2[keys[0]];

    // Remove trailing comma logic
    const bibEntries = Object.entries(data2);
    const formattedBibEntries = bibEntries.map((entry, index) => {
        const isLast = index === bibEntries.length - 1;
        return `${entry[0]}=${'{' + entry[1] + '}'}` + (!isLast ? ',' : '');
    });

    const [isCopied, setIsCopied] = useState(false);

    const copyTextHandler = async () => {
        const element = document.getElementById("bibText");

        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        selection.removeAllRanges();

        selection.addRange(range);

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setIsCopied(true);
            }
            setTimeout(() => {
                setIsCopied(false);
            }, 1500); // Extended for smoother feedback
        } catch (err) {
            console.error('Unable to copy', err);
        }

        selection.removeAllRanges();
    };

    return (
        <>
            {/* Background Overlay */}
            <div
                onClick={() => props.setShowModal(false)}
                className="bg-black opacity-50 fixed left-0 top-0 z-20 h-screen w-screen"
            ></div>

            {/* Modal Content */}
            <div className="p-4 md:p-5 fixed -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-h-[20rem] theme-surface border z-30 rounded-lg shadow-lg theme-heading">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
                    <div className="text-sm sm:text-base md:text-lg">{props.title}</div>
                    <FaXmark
                        className="w-5 h-5 cursor-pointer theme-subtle hover:text-[var(--color-heading)]"
                        onClick={() => props.setShowModal(false)}
                    />
                </div>

                {/* BibTex Content */}
                <div className="relative theme-surface-soft max-h-[12rem] w-full mt-3 py-2 px-2 sm:px-4 rounded-md border border-[var(--color-border)] overflow-y-auto overflow-x-auto text-sm sm:text-base">
                    <div id="bibText" className="leading-relaxed whitespace-pre">
                        <div>
                            <span className="text-[var(--color-accent-strong)] font-semibold">{data1[0]}</span>
                            <span className="theme-muted font-medium">{`{${data1[1]},`}</span>
                        </div>
                        <div className="pl-3">
                            {formattedBibEntries.map((entry, index) => (
                                <div key={index}>
                                    <span className="text-[var(--color-accent)] font-medium">{entry}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pl-1 theme-muted">{'}'}</div>
                    </div>

                    {/* Copy Button */}
                    <div className="flex absolute right-3 top-3 sm:top-auto sm:bottom-3">
                        <div
                            className={`transition-opacity duration-300 ${
                                isCopied ? 'opacity-100' : 'opacity-0'
                            } bg-[var(--color-accent)] text-white px-2 py-1 rounded-md text-xs font-medium shadow-md`}
                        >
                            {isCopied ? 'Copied!' : ''}
                        </div>
                        <LuCopy
                            className="w-5 h-5 theme-muted cursor-pointer hover:text-[var(--color-heading)] transition-all duration-300 transform hover:scale-110"
                            onClick={copyTextHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
