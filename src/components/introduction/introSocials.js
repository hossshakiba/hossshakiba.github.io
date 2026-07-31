import Image from 'next/image';
import { Kalam } from 'next/font/google';
import { BASE_URL } from '../../config';

export const introHand = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const introSocialButtons = [
  {
    text: 'email',
    title: 'Email',
    link: 'mailto:shakibaia.hossein@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    text: 'scholar',
    title: 'Google Scholar',
    link: 'https://scholar.google.com/citations?user=huveR90AAAAJ&hl=en&authuser=1',
    icon: (
      <Image
        src={`${BASE_URL}/images/mobileSocialMedia/googleScholar.svg`}
        alt=""
        width={18}
        height={18}
        className="intro-scholar-icon"
        style={{ objectFit: 'contain' }}
      />
    ),
  },
  {
    text: 'cv',
    title: 'CV',
    link: '/CV/CV_Shakibania.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 3.5h7.5L19 8v12.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
        <path d="M14.5 3.5V8H19" />
        <path d="M9 13h6M9 16.5h4" />
      </svg>
    ),
  },
  {
    text: 'linkedin',
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/hossein-shakibania',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3v10zM6.5 7.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-5.3c0-3.2-3.5-2.9-3.5 0V19h-3V9h3v1.6c1.4-2.6 6.5-2.8 6.5 2.5V19z" />
      </svg>
    ),
  },
  {
    text: 'github',
    title: 'GitHub',
    link: 'https://github.com/hossshakiba',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.8 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    ),
  },
  {
    text: 'x',
    title: 'X / Twitter',
    link: 'https://x.com/hossshakiba',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.013L4.6 22H1.342l8.05-9.197L1 2h7.018l4.842 6.396L18.244 2zm-1.2 18h1.84L7.04 4H5.06l11.984 16z" />
      </svg>
    ),
  },
];
