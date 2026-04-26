'use client';
import Image from 'next/image';
import newsRectangle from '../../public/images/design/newsRectangle.svg';
import { useState } from 'react';
import DateText from './DateText';


const News = (props) => {
    const [showAllNews, setShowAllNews] = useState(false);
   
    return (
        <div id="newsSection" className="relative pb-8 scroll-mt-32 bg-primary1 sm:bg-transparent">
            {/* <Image  alt="" src={newsRectangle} className="absolute right-0 -bottom-14 md:-bottom-20 lg:bottom-20 w-20 sm:w-24 md:w-32 xl:w-40" /> */}
            <div className="content-shell pb-8 md:pb-10 sm:bg-primary1 sm:rounded-xl">
                <div className="pt-8 md:pt-16">
                    <div className="section-heading">
                        <h1 className="section-title">News</h1>
                        <div className="section-divider"></div>
                    </div>
                    <DateText showAll={showAllNews} data={props.data.news} button={'see all News'} />
                </div> 
                    {
                        props.data.news.length >= 5 &&
                        <button className="text-xs md:text-sm xl:text-base text-[#748595] mx-auto flex mt-3" onClick={() => setShowAllNews(!showAllNews)}>
                        {showAllNews ? `show less` :`show more`}
                    </button>
                    }
            </div>
        </div>
    );
};

export default News;