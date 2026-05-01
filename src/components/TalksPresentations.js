'use client'
import { useState } from 'react';
import Cart from './Cart';

const TalksPresentations = (props) => {
  const [showAllTalksPresentations, setShowAllTalksPresentations] = useState(false);
  const talks = props.data?.talks ?? props.data?.TalksPresentations ?? [];

  return (
    <div id="TalksSection" className="relative scroll-mt-16">
      <div className="content-shell pt-8 md:pt-16">
        <div className="section-heading">
          <p className="section-title">Talks & Presentations</p>
          <div className="section-divider"></div>
        </div>
        <div className="flex flex-col items-center justify-center pt-8 xl:pt-16">
          {talks.slice(0, 3).map((talksPresentations, index) =>
            <Cart key={index} author={false} data={talksPresentations} />
          )}
        </div>
        <div className={`${showAllTalksPresentations ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in duration-700 flex flex-col items-center justify-center`}>
          {showAllTalksPresentations && talks.slice(3).map((talksPresentations, index) =>
            <Cart key={index} author={false} data={talksPresentations} />
          )}
        </div>
          {
            talks.length > 3 &&
            <button className="theme-muted text-xs md:text-sm xl:text-base theme-surface-soft border mt-6 py-2 px-4 rounded-lg mx-auto flex mb-10 hover:text-[var(--color-accent)] transition-colors duration-150"
            onClick={() => setShowAllTalksPresentations(!showAllTalksPresentations)}
          >
            {showAllTalksPresentations ? 'show less' : `show more`}
          </button>
          }
      </div>
    </div>
  )
}

export default TalksPresentations
