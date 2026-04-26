import Image from 'next/image';
import { getData } from '../../../lib/getData';
import Link from 'next/link';
import { BASE_URL } from '../../config';
import ProfileCarousel from './ProfileCarousel';

const MobileIntroduction = () => {
  const data = getData('mobileSocialMedia.json');
  const profileImages = [
    '/images/profiles/prof-1.JPG',
    '/images/profiles/prof-2.JPG',
    '/images/profiles/prof-3.png',
  ];

  return (
    <div className="md:hidden px-2 pt-3">
      <div className="mx-auto w-full max-w-[24rem]">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <ProfileCarousel
              images={profileImages}
              alt="Hossein Shakibania profile"
              imageClassName="w-32 h-32 rounded-2xl object-cover border border-[var(--color-border)] shadow-sm"
              showControlsOnHover={false}
              controlsClassName="!h-5 !w-5 text-[10px] leading-none p-0 rounded-sm"
            />
          </div>
          <div className="leading-tight pt-1 min-w-0 flex-1">
            <p className="theme-muted text-[0.8125rem]">Hello! I'm</p>
            <p className="theme-heading font-semibold text-lg mt-1">
              <span className="name-accent">Hossein Shakibania</span>
            </p>
            <div className="theme-surface-soft mt-2 rounded-lg border px-2.5 py-1.5">
              <p className="theme-heading font-semibold text-[0.8rem] leading-tight">
                MS Student in AIML
              </p>
              <p className="theme-muted text-[0.7rem] mt-0.5 leading-tight">
                TU Darmstadt
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-3.5 flex items-center justify-center gap-2.5 flex-wrap">
          {data.socialMedias.map((socialMedia) => (
            <li key={socialMedia.alt}>
              <Link href={socialMedia.link}>
                <span className="theme-surface-soft flex h-10 min-w-10 px-2.5 items-center justify-center rounded-md border shadow-[0_1px_3px_rgba(46,74,104,0.08)] transition-colors duration-150 hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)]">
                <Image
                  alt={socialMedia.alt}
                  src={BASE_URL + socialMedia.image}
                  width={20}
                  height={20}
                  className="max-w-[20px] max-h-[20px]"
                  style={{ objectFit: 'contain' }}
                />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileIntroduction;
