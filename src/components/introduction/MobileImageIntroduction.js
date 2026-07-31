import Link from 'next/link';
import ProfileCarousel from './ProfileCarousel';
import { introHand, introSocialButtons } from './introSocials';

const MobileIntroduction = () => {
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
            <div className={`intro-role-caption intro-role-caption--mobile ${introHand.className}`}>
              <p className="intro-role-title">MS Student in AIML</p>
              <p className="intro-role-place">TU Darmstadt</p>
            </div>
          </div>
        </div>

        <nav
          className={`intro-socials intro-socials--mobile ${introHand.className}`}
          aria-label="Social links"
        >
          {introSocialButtons.map((button) => (
            <Link
              key={button.text}
              href={button.link}
              className="intro-social-link"
              title={button.title}
              aria-label={button.title}
            >
              {button.icon}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileIntroduction;
