'use client';
import Link from 'next/link';

/** "November 2025" → "Nov 2025" (first three letters of month + rest). */
function abbreviateMonthDateLabel(dateStr) {
    const trimmed = dateStr.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return trimmed;
    const month = parts[0];
    const tail = parts.slice(1).join(' ');
    if (month.length < 3) return trimmed;
    const abbr = month.slice(0, 3);
    const cased = abbr.charAt(0).toUpperCase() + abbr.slice(1).toLowerCase();
    return `${cased} ${tail}`;
}

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
        <div className="mt-4 xl:mt-8">
            {visibleNews.map((n, index) => {
                const isLastVisible = index === visibleNews.length - 1;
                const isPreviewItem = !props.showAll && index === 3;
                const showConnector = !isLastVisible && !isPreviewItem;

                const lineSlot =
                    'flex h-5 flex-none items-center md:h-6 2xl:h-7 3xl:h-8';
                const bodyType =
                    'text-sm leading-5 md:text-[0.96rem] md:leading-6 2xl:text-base 2xl:leading-7 3xl:text-lg 3xl:leading-8';

                return (
                    <div
                        key={`${n.date}-${index}`}
                        className={`${isPreviewItem ? 'theme-muted' : 'theme-heading'} grid grid-cols-[minmax(0,4.25rem)_1rem_minmax(0,1fr)] items-stretch gap-x-2 sm:grid-cols-[minmax(0,7rem)_1.5rem_minmax(0,1fr)] sm:gap-x-4 md:grid-cols-[minmax(0,8rem)_1.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,9rem)_2rem_minmax(0,1fr)]`}
                    >
                        <div className="flex min-w-0 flex-col items-end">
                            <div className={`${lineSlot} justify-end`}>
                                <p
                                    className="text-right text-[10px] tabular-nums sm:text-xs md:text-sm lg:text-base"
                                    aria-label={n.date}
                                >
                                    <span className="sm:hidden">{abbreviateMonthDateLabel(n.date)}</span>
                                    <span className="hidden sm:inline">{n.date}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex min-h-0 min-w-0 flex-col items-center">
                            <div className={`${lineSlot} shrink-0 justify-center`}>
                                <span
                                    className="relative z-[2] block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-subtle)] sm:h-2 sm:w-2"
                                    aria-hidden
                                />
                            </div>
                            {showConnector && (
                                <>
                                    <div
                                        className="mt-px min-h-0 w-0.5 flex-1 rounded-lg bg-[var(--color-border)] sm:w-1"
                                        aria-hidden
                                    />
                                    <div className="h-px w-0 shrink-0" aria-hidden />
                                </>
                            )}
                        </div>
                        <p
                            className={`min-w-0 ${bodyType} ${
                                isLastVisible ? 'pb-3' : 'pb-6'
                            }`}
                        >
                            {makeText(n.text)}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default DateText;
