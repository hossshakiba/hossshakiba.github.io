const NOTO_EMOJI_BASE = 'https://fonts.gstatic.com/s/e/notoemoji/latest';
const EMOJI_SIZE = 24;

const Hobbies = ({ data, className = '' }) => {
  if (!data?.hobbies?.length) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
      <span className="theme-muted text-xs md:text-sm font-medium shrink-0">{data.label}</span>
      <div className="flex flex-wrap items-center gap-1">
        {data.hobbies.map((hobby) => (
          <span key={hobby.code} className="hobby-tag" title={hobby.title}>
            <span className="emoji-wrapper">
              <img
                className="emoji-static"
                src={`${NOTO_EMOJI_BASE}/${hobby.code}/512.png`}
                alt={hobby.alt}
                width={EMOJI_SIZE}
                height={EMOJI_SIZE}
                loading="lazy"
                decoding="async"
              />
              <picture className="emoji-animated">
                <source
                  srcSet={`${NOTO_EMOJI_BASE}/${hobby.code}/512.webp`}
                  type="image/webp"
                />
                <img
                  src={`${NOTO_EMOJI_BASE}/${hobby.code}/512.gif`}
                  alt=""
                  width={EMOJI_SIZE}
                  height={EMOJI_SIZE}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;
