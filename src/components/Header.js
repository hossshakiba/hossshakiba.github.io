'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import menu from '../../public/images/icons/menu.svg';
import Script from 'next/script';
import ThemePowerSwitch from './ThemePowerSwitch';

const Header = () => {
    const [mobileBar, setMobileBar] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const rootIsDark = document.documentElement.classList.contains('dark');
        setTheme(rootIsDark ? 'dark' : 'light');

        // Keep theme in sync with OS preference until user explicitly picks a theme.
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const syncFromSystem = (event) => {
            const saved = localStorage.getItem('theme');
            if (saved) return;
            const shouldUseDark = event.matches;
            document.documentElement.classList.toggle('dark', shouldUseDark);
            setTheme(shouldUseDark ? 'dark' : 'light');
        };

        media.addEventListener('change', syncFromSystem);
        return () => media.removeEventListener('change', syncFromSystem);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('[id*="Section"]');
            if (sections.length === 0) return;

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(section.id);
                }

            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const shouldUseDark = nextTheme === 'dark';
        document.documentElement.classList.toggle('dark', shouldUseDark);
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };

    return (
        <div className='relative'>
            <Script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module" />
            <div className="fixed w-full z-40 flex justify-between items-center overflow-visible px-6 sm:px-8 lg:px-12 py-3.5 bg-[var(--color-nav-bg)] border-b border-[var(--color-border)]">
                <div className="flex items-center -ml-10 sm:ml-0">
                    <dotlottie-player 
                        src="https://lottie.host/52a91e22-eb41-402a-8aa8-b468973c57cb/WHWL3xqQJH.lottie" 
                        background="transparent" 
                        speed="1" 
                        style={{ 
                            width: '100px', 
                            height: '50px',
                            filter: 'hue-rotate(90deg)'
                        }} 
                        loop 
                        autoplay
                    />
                </div>
                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-7 text-[0.92rem]">
                    <Link href="#aboutSection">
                        <li className={activeSection === 'aboutSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>About</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'aboutSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    <Link href="#newsSection">
                        <li className={activeSection === 'newsSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>News</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'newsSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    <Link href="#publicationSection">
                        <li className={activeSection === 'publicationSection' ? 'text-[var(--color-nav-active)] ' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>Publications</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'publicationSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    <Link href="#experienceSection">
                        <li className={activeSection === 'experienceSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>Experience</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'experienceSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    <Link href="#HonorsSection">
                        <li className={activeSection === 'HonorsSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>Achivements</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'HonorsSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    <Link href="#TalksSection">
                        <li className={activeSection === 'TalksSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)] hover:text-[var(--color-nav-active)] transition-all duration-700'}>Presentations</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'TalksSection' ? 'bg-[var(--color-nav-active)]' : 'bg-transparent'}`}></div>
                    </Link>
                    {/* <Link href="#AcademicServiceSection">
                        <li className={activeSection === 'AcademicServiceSection' ? 'text-[#B1C7DE]' : 'text-white hover:text-[#B1C7DE] transition-all duration-700'}>Academic Service</li>
                        <div className={`w-full h-[3px] rounded-lg transition-all duration-700 ${activeSection === 'AcademicServiceSection' ? 'bg-[#B1C7DE]' : 'bg-transparent'}`}></div>
                    </Link> */}
                </ul>
                <div className="hidden md:flex lg:hidden items-center">
                    <ThemePowerSwitch theme={theme} onToggle={toggleTheme} compact />
                </div>
                <div className="hidden lg:flex items-center">
                    <ThemePowerSwitch theme={theme} onToggle={toggleTheme} />
                </div>
                <button className="md:hidden" onClick={() => setMobileBar(!mobileBar)}>
                    <Image alt="menu" src={menu} />
                </button>
            </div>
            {/* {mobileBar && ( */}
            <div className={`md:hidden fixed top-16 left-0 w-full bg-[var(--color-nav-bg)] text-[var(--color-nav-text)] font-semibold text-sm flex flex-col items-start px-6 sm:px-8 pt-7 pb-6 space-y-4 border-b border-[var(--color-border)]
                ${mobileBar ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
                transform transition-all duration-500 ease-in-out z-20`}>
                <Link href="#aboutSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'aboutSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>About</span>
                </Link>
                <Link href="#newsSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'newsSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>News</span>
                </Link>
                <Link href="#publicationSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'publicationSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>Publications</span>
                </Link>
                <Link href="#experienceSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'experienceSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>Experience</span>
                </Link>
                <Link href="#HonorsSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'HonorsSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>Achivements</span>
                </Link>
                <Link href="#TalksSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'TalksSection' ? 'text-[var(--color-nav-active)]' : 'text-[var(--color-nav-text)]'}>Presentations</span>
                </Link>
                <div className="w-full border-t border-[var(--color-border)] pt-4">
                    <ThemePowerSwitch theme={theme} onToggle={toggleTheme} compact />
                </div>
                {/* <Link href="#AcademicServiceSection" onClick={() => setMobileBar(false)}>
                    <span className={activeSection === 'AcademicServiceSection' ? 'text-[#B1C7DE]' : 'text-white'}>Academic Service</span>
                </Link> */}
            </div>
            {/* )} */}
        </div>
    );
};

export default Header;
