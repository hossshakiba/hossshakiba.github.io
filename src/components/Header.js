'use client';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import ThemePowerSwitch from './ThemePowerSwitch';
const NAV_ITEMS = [
    { id: 'aboutSection', label: 'About' },
    { id: 'newsSection', label: 'News' },
    { id: 'publicationSection', label: 'Publications' },
    { id: 'experienceSection', label: 'Experience' },
    { id: 'HonorsSection', label: 'Achievements' },
    // { id: 'TalksSection', label: 'Presentations' },
    // { id: 'AcademicServiceSection', label: 'Academic Service' },
];

const Header = () => {
    const [mobileBar, setMobileBar] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [theme, setTheme] = useState('light');
    const [scrolled, setScrolled] = useState(false);
    const [indicator, setIndicator] = useState(null);
    const linkRefs = useRef({});

    useEffect(() => {
        const rootIsDark = document.documentElement.classList.contains('dark');
        setTheme(rootIsDark ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 8);
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            let current = '';
            NAV_ITEMS.forEach(({ id }) => {
                const section = document.getElementById(id);
                if (section && scrollPosition >= section.offsetTop) current = id;
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        const measure = () => {
            const el = linkRefs.current[activeSection];
            setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
        };
        measure();
        window.addEventListener('resize', measure);
        document.fonts?.ready.then(measure);
        return () => window.removeEventListener('resize', measure);
    }, [activeSection]);

    const applyTheme = (nextTheme) => {
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };

    const toggleTheme = (event) => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!document.startViewTransition || reduceMotion) {
            applyTheme(nextTheme);
            return;
        }

        const rect = event?.currentTarget?.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : 0;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        root.classList.add('theme-transitioning');
        const transition = document.startViewTransition(() => {
            flushSync(() => applyTheme(nextTheme));
        });

        transition.ready.then(() => {
            root.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 700,
                    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });

        transition.finished.finally(() => root.classList.remove('theme-transitioning'));
    };

    return (
        <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="content-shell flex h-16 items-center justify-between gap-4">
                <nav aria-label="Sections" className="hidden md:block">
                    <ul className="nav-pill">
                        {indicator && (
                            <li
                                aria-hidden
                                className="nav-pill-indicator"
                                style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
                            />
                        )}
                        {NAV_ITEMS.map(({ id, label }) => (
                            <li key={id}>
                                <Link
                                    href={`#${id}`}
                                    ref={(el) => { linkRefs.current[id] = el; }}
                                    aria-current={activeSection === id ? 'location' : undefined}
                                    className={`nav-pill-link ${activeSection === id ? 'is-active' : ''}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <span className="nav-mobile-title md:hidden">
                    {NAV_ITEMS.find(({ id }) => id === activeSection)?.label ?? 'About'}
                </span>

                <div className="flex items-center gap-2.5 lg:gap-3">
                    <div className="hidden md:flex lg:hidden items-center">
                        <ThemePowerSwitch theme={theme} onToggle={toggleTheme} compact />
                    </div>
                    <div className="hidden lg:flex items-center">
                        <ThemePowerSwitch theme={theme} onToggle={toggleTheme} />
                    </div>
                    <button
                        type="button"
                        className={`nav-burger md:hidden ${mobileBar ? 'is-open' : ''}`}
                        aria-label={mobileBar ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileBar}
                        onClick={() => setMobileBar(!mobileBar)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            <div
                className={`nav-drawer md:hidden ${mobileBar ? 'is-open' : ''}`}
                aria-hidden={!mobileBar}
            >
                <ul className="content-shell flex flex-col gap-1 pt-3 pb-5">
                    {NAV_ITEMS.map(({ id, label }) => (
                        <li key={id}>
                            <Link
                                href={`#${id}`}
                                tabIndex={mobileBar ? 0 : -1}
                                onClick={() => setMobileBar(false)}
                                className={`nav-drawer-link ${activeSection === id ? 'is-active' : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
                        <ThemePowerSwitch theme={theme} onToggle={toggleTheme} compact spellSide="right" />
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
