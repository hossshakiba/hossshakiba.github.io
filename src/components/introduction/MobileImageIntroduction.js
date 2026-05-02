import Image from 'next/image';
import { getData } from '../../../lib/getData';
import Link from 'next/link';
import { BASE_URL } from '../../config';
import ProfileCarousel from './ProfileCarousel';

const MobileIntroduction = () => {
  const data = getData('mobile-social.json') ?? { socialMedias: [] };
  const profileImages = [
    '/images/profiles/prof-1.JPG',
    '/images/profiles/prof-2.JPG',
    '/images/profiles/prof-3.png',
  ];

  return (
    <div className="md:hidden w-full pt-3">
      <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center sm:max-w-[23.5rem]">
        <div className="flex w-full max-w-full items-start justify-center gap-3">
          <div className="shrink-0">
            <ProfileCarousel
              images={profileImages}
              alt="Hossein Shakibania profile"
              imageClassName="w-32 h-32 rounded-2xl object-cover border border-[var(--color-border)] shadow-sm"
              showControlsOnHover={false}
              controlsClassName="!h-5 !w-5 text-[10px] leading-none p-0 rounded-sm"
            />
          </div>
          <div className="flex min-w-0 max-w-[12rem] flex-col items-start pt-1 leading-tight sm:max-w-[13rem]">
            <p className="theme-muted text-[0.8125rem]">Hello! I'm</p>
            <p className="theme-heading mt-1 text-lg font-semibold">
              <span className="name-accent">Hossein Shakibania</span>
            </p>
            <div className="theme-surface-soft mt-2 w-fit max-w-[11rem] rounded-lg border px-2.5 py-2 sm:max-w-[11.75rem] sm:rounded-xl sm:px-3 sm:py-2.5">
              <p className="theme-heading text-[0.8125rem] font-semibold leading-snug sm:text-sm">
                MS Student in AIML
              </p>
              <p className="theme-muted mt-0.5 text-xs leading-snug sm:text-[0.8125rem]">
                TU Darmstadt
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-3.5 flex w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {data.socialMedias.map((socialMedia) => (
            <li key={socialMedia.alt}>
              <Link href={socialMedia.link}>
                <span className="theme-surface-soft flex h-9 min-w-9 items-center justify-center rounded-md border px-2 shadow-[0_1px_3px_rgba(46,74,104,0.08)] transition-colors duration-150 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] sm:h-10 sm:min-w-10 sm:px-2.5">
                  <Image
                    alt={socialMedia.alt}
                    src={BASE_URL + socialMedia.image}
                    width={20}
                    height={20}
                    className="mobile-intro-social-icon max-h-[20px] max-w-[20px]"
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
