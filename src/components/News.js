'use client';
import { useState } from 'react';
import DateText from './DateText';


const News = (props) => {
    const [showAllNews, setShowAllNews] = useState(false);
   
    return (
        <div id="newsSection" className="relative scroll-mt-32 theme-surface-soft sm:bg-transparent">
            {/* <Image  alt="" src={newsRectangle} className="absolute right-0 -bottom-14 md:-bottom-20 lg:bottom-20 w-20 sm:w-24 md:w-32 xl:w-40" /> */}
            <div className="content-shell pt-8 md:pt-16 pb-8 md:pb-10 sm:theme-surface-soft sm:rounded-xl relative z-10">
                <div className="section-heading">
                    <p className="section-title">News</p>
                    <div className="section-divider" />
                </div>
                <DateText showAll={showAllNews} data={props.data.news} button={'see all News'} />
                {props.data.news.length >= 5 && (
                    <div className="mt-5 flex justify-center md:mt-6">
                        <button
                            type="button"
                            className="text-xs md:text-sm xl:text-base theme-muted transition-colors duration-150 hover:text-[var(--color-accent)]"
                            onClick={() => setShowAllNews(!showAllNews)}
                        >
                            {showAllNews ? 'show less' : 'show more'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;