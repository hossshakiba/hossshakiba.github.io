import Link from 'next/link';
import ProfileCarousel from './ProfileCarousel';
import { introHand, introSocialButtons } from './introSocials';

const ImageIntroduction = () => {
  const profileImages = [
    '/images/profiles/prof-1.JPG',
    '/images/profiles/prof-2.JPG',
    '/images/profiles/prof-3.png',
  ];

  return (
    <div className="hidden md:flex md:justify-end md:min-w-0 md:pr-8 lg:pr-10 xl:pr-12">
      <div className="mt-[3.2rem] lg:mt-[5rem] xl:mt-[5.2rem] 3xl:mt-[6rem] flex flex-col items-center justify-self-end">
        <ProfileCarousel images={profileImages} alt="Profile image" />
        <div className={`intro-role-caption ${introHand.className}`}>
          <p className="intro-role-title">MS Student in AIML</p>
          <p className="intro-role-place">TU Darmstadt</p>
        </div>
        <nav className={`intro-socials ${introHand.className}`} aria-label="Social links">
          {introSocialButtons.map((button) => (
            <Link
              key={button.text}
              href={button.link}
              className="intro-social-link"
              title={button.title}
            >
              {button.icon}
              <span>{button.text}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ImageIntroduction;
