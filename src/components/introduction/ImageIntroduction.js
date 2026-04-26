import introductionRectangle2 from '../../../public/images/design/Rectangle 27 (8).svg';
import introductionRectangle3 from '../../../public/images/design/introductionRectangle2.svg';
import googleScholar from '../../../public/images/socialMedia/googleScholar.svg';
import Image from 'next/image';
import Link from 'next/link';
import { getData } from '../../../lib/getData';
import { BASE_URL } from '../../config';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import ProfileCarousel from './ProfileCarousel';
const focusRingStyles = `
  focus:outline-none 
  focus:ring-2
  focus:ring-blue-500
  focus-visible:outline-none 
  focus-visible:ring-2
  focus-visible:ring-blue-500
`;

const ImageIntroduction = () => {
    const data = getData('socialMedia.json');
    const profileImages = [
        '/images/profiles/prof-1.JPG',
        '/images/profiles/prof-2.JPG',
    ];
    
    const socialButtons = [
        {
            icon: <MdEmail className="w-4 h-4 mr-1.5" />,
            text: "Email",
            link: "mailto:shakibaia.hossein@gmail.com",
            gradient: "from-red-600 to-orange-300"
        },
        {
            icon: <SiGooglescholar className="w-4 h-4 mr-1.5" />,
            text: "Google Scholar",
            link: "https://scholar.google.com/citations?user=huveR90AAAAJ&hl=en&authuser=1",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            icon: <BsFileEarmarkText className="w-4 h-4 mr-1.5" />,
            text: "CV",
            link: "/CV/CV_Shakibania.pdf",
            gradient: "from-teal-300 to-lime-300"
        },
        {
            icon: <FaLinkedin className="w-4 h-4 mr-1.5" />,
            text: "LinkedIn",
            link: "https://www.linkedin.com/in/hossein-shakibania",
            gradient: "from-blue-600 to-blue-900"
        },
        {
            icon: <FaGithub className="w-4 h-4 mr-1.5" />,
            text: "GitHub",
            link: "https://github.com/hossshakiba",
            gradient: "from-purple-600 to-orange-400"
        },
        {
            icon: <FaXTwitter className="w-4 h-4 mr-1.5" />,
            text: "X (Twitter)",
            link: "https://x.com/hossshakiba",
            gradient: "from-black to-gray"
        }
    ];

    return (
        <div className="hidden md:block">
            {/* <Image alt="" src={introductionRectangle2} className="absolute right-0 -top-4 lg:-top-2 xl:-top-20 hidden xl:block xl:w-[43%] 2xl:w-[40%] 3xl:w-[55rem] h-[53rem] lg:h-[55rem] xl:h-[60rem] 2xl:h-[58rem] 3xl:h-[57rem]" /> */}
            {/* <Image alt="" src={introductionRectangle3} className="absolute right-0 -top-4 lg:-top-2 xl:-top-20 xl:hidden w-[22rem] lg:w-[30rem] h-[47rem] lg:h-[40rem]" /> */}
            <div className="absolute top-[12.6rem] lg:top-[12.6rem] xl:top-[12.1rem] 3xl:top-[13.6rem] 2xl:bg-cover right-[14%] lg:right-[20%] xl:right-[24%] 2xl:right-[26%] 3xl:right-[25%] flex flex-col items-center">
                <ProfileCarousel images={profileImages} alt="Profile image" />
                <div className="mt-4 3xl:mt-5 w-full max-w-[14.5rem] 3xl:max-w-[18rem] rounded-xl border border-[#e1e8f0] bg-[#f6f9fc] px-3 py-2 shadow-sm">
                    <p className="text-[#2c3137] font-semibold text-[0.9rem] 3xl:text-base text-center leading-tight">
                        MS Student in AIML
                    </p>
                    <p className="text-[#66707a] text-[0.78rem] 3xl:text-sm text-center mt-1 tracking-[0.01em]">
                        Technical University of Darmstadt
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-2.5 3xl:mt-2">
                    {socialButtons.map((button, index) => (
                        <Link key={index} href={button.link}>
                            <button className={`relative inline-flex items-center  p-0.5 overflow-hidden text-[0.72rem] font-medium text-gray-dark rounded-lg group bg-gradient-to-br ${button.gradient} group-hover:from-${button.gradient.split('-')[1]} group-hover:to-${button.gradient.split('-')[3]} hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 w-full`}>
                                <span className="relative px-1 py-[0.2rem] transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent flex  text-gray-dark group-hover:text-white w-full">
                                    {button.icon}
                                    {button.text}
                                </span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageIntroduction;
