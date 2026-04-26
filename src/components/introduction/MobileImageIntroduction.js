import Image from 'next/image';
import person from '../../../public/images/profiles/prof-1.JPG';
import { getData } from '../../../lib/getData';
import Link from 'next/link';
import { BASE_URL } from '../../config';
import ProfileCarousel from './ProfileCarousel';

const MobileIntroduction = () => {
  const data = getData('mobileSocialMedia.json');
  const profileImages = [
    '/images/profiles/prof-1.JPG',
    '/images/profiles/prof-2.JPG',
  ];

  return (
    <div className="md:hidden px-2 pt-3">
      <div className="mx-auto w-full max-w-[22rem]">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <ProfileCarousel
              images={profileImages}
              alt="Hossein Shakibania profile"
              imageClassName="w-28 h-28 rounded-2xl object-cover border border-[#dfe6ef] shadow-sm"
              showControlsOnHover={false}
              controlsClassName="h-6 w-6 text-xs"
            />
          </div>
          <div className="leading-tight pt-1">
            <p className="text-[#6d7680] text-xs">Hello! I'm</p>
            <p className="text-gray-dark font-semibold text-lg mt-1">
              <span className="name-accent">Hossein Shakibania</span>
            </p>
            <div className="mt-2 rounded-lg border border-[#e4eaf2] bg-[#f7faff] px-2 py-1.5">
              <p className="text-[#2c3137] font-semibold text-[0.74rem] leading-tight">
                MS Student in AIML
              </p>
              <p className="text-[#66707a] text-[0.68rem] mt-0.5 leading-tight">
                Technical University of Darmstadt
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          {data.socialMedias.map((socialMedia) => (
            <li key={socialMedia.alt}>
              <Link href={socialMedia.link}>
                <span className="flex h-8 min-w-8 px-2 items-center justify-center rounded-md border border-[#d9e2ec] bg-[#f8fbff] shadow-[0_1px_3px_rgba(46,74,104,0.08)] transition-colors duration-150 hover:bg-white hover:border-[#c7d5e4]">
                <Image
                  alt={socialMedia.alt}
                  src={BASE_URL + socialMedia.image}
                  width={18}
                  height={18}
                  className="max-w-[18px] max-h-[18px]"
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
