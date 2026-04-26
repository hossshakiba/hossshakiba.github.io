'use client';
import Link from 'next/link';

const DateText = (props) => {
    const makeText = (textObject) => {
        return textObject.map((i, index) => {
            if (typeof i === 'string') {
                return i; 
            } else if (typeof i === 'object' && i.url && i.word) {
                return (
                    <Link className="font-bold" key={index} href={i.url}>
                        {i.word}
                    </Link>
                ); 
            }
        });
    };

    const visibleNews = props.showAll ? props.data : props.data.slice(0, 4);

    return (
        <div className="mt-3 md:mt-5 mb-6 md:mb-12">
            {visibleNews.map((n, index) => {
                const isLastVisible = index === visibleNews.length - 1;
                const isPreviewItem = !props.showAll && index === 3;
                const showConnector = !isLastVisible && !isPreviewItem;

                return (
                    <div key={`${n.date}-${index}`} className={`${isPreviewItem ? 'theme-muted' : 'theme-heading'} flex items-stretch gap-2 sm:gap-4`}>
                        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base w-[4.25rem] sm:w-28 md:w-32 lg:w-36 pt-0.5 sm:pt-1.5 text-right shrink-0">
                            {n.date}
                        </p>
                        <div className="w-4 sm:w-6 md:w-8 flex flex-col items-center pt-1 self-stretch shrink-0">
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[var(--color-subtle)] rounded-full"></div>
                            {showConnector && <div className="w-0.5 sm:w-1 flex-1 rounded-lg mt-1 bg-[var(--color-border)]"></div>}
                        </div>
                        <p className="text-sm md:text-[0.96rem] 2xl:text-base 3xl:text-lg flex-1 min-w-0 pb-6">
                            {makeText(n.text)}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default DateText;
