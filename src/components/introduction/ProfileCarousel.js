'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProfileCarousel = ({ images, alt, imageClassName, showControlsOnHover = true, controlsClassName = '' }) => {
  const [current, setCurrent] = useState(0);

  const showPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group">
      <Image
        alt={alt}
        src={images[current]}
        width={272}
        height={272}
        className={imageClassName || "w-[13.5rem] h-[13.5rem] 3xl:w-[17rem] 3xl:h-[17rem] rounded-xl object-cover"}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous profile image"
            onClick={showPrev}
            className={`absolute left-3 bottom-3 h-8 w-8 rounded-md bg-[var(--color-surface)] text-[var(--color-heading)] border border-[var(--color-border)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-soft)] hover:border-[var(--color-accent)] ${
              showControlsOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            } ${controlsClassName}`}
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Next profile image"
            onClick={showNext}
            className={`absolute right-3 bottom-3 h-8 w-8 rounded-md bg-[var(--color-surface)] text-[var(--color-heading)] border border-[var(--color-border)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-soft)] hover:border-[var(--color-accent)] ${
              showControlsOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            } ${controlsClassName}`}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileCarousel;
