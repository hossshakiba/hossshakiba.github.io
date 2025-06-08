import introductionRectangle2 from '../../../public/images/design/Rectangle 27 (8).svg';
import introductionRectangle3 from '../../../public/images/design/introductionRectangle2.svg';
import person from '../../../public/images/IMG_1457.png';
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

const ImageIntroduction = () => {
    const data = getData('socialMedia.json');
    
    const socialButtons = [
        {
            icon: <MdEmail className="w-5 h-5 mr-2" />,
            text: "Email",
            link: "mailto:shakibaia.hossein@gmail.com",
            gradient: "from-purple-600 to-blue-500"
        },
        {
            icon: <SiGooglescholar className="w-5 h-5 mr-2" />,
            text: "Google Scholar",
            link: "https://scholar.google.com/citations?user=huveR90AAAAJ&hl=en&authuser=1",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            icon: <BsFileEarmarkText className="w-5 h-5 mr-2" />,
            text: "CV",
            link: "/CV/CV_Shakibania.pdf",
            gradient: "from-teal-300 to-lime-300"
        },
        {
            icon: <FaLinkedin className="w-5 h-5 mr-2" />,
            text: "LinkedIn",
            link: "https://www.linkedin.com/in/hossein-shakibania",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <FaGithub className="w-5 h-5 mr-2" />,
            text: "GitHub",
            link: "https://github.com/hossshakiba",
            gradient: "from-pink-500 to-orange-400"
        },
        {
            icon: <FaXTwitter className="w-5 h-5 mr-2" />,
            text: "X (Twitter)",
            link: "https://x.com/hossshakiba",
            gradient: "from-green-400 to-blue-600"
        }
    ];

    return (
        <div className="hidden md:block">
            {/* <Image alt="" src={introductionRectangle2} className="absolute right-0 -top-4 lg:-top-2 xl:-top-20 hidden xl:block xl:w-[43%] 2xl:w-[40%] 3xl:w-[55rem] h-[53rem] lg:h-[55rem] xl:h-[60rem] 2xl:h-[58rem] 3xl:h-[57rem]" /> */}
            {/* <Image alt="" src={introductionRectangle3} className="absolute right-0 -top-4 lg:-top-2 xl:-top-20 xl:hidden w-[22rem] lg:w-[30rem] h-[47rem] lg:h-[40rem]" /> */}
            <div className="absolute top-[9rem] lg:top-[9rem] xl:top-[10rem] 3xl:top-[11rem] 2xl:bg-cover right-[2%] lg:right-[10%] xl:right-[16%] 2xl:right-[19%] 3xl:right-[18%] flex flex-col items-center">
                <Image alt="" src={person} className="w-[20rem] h-[20rem] 3xl:w-[25rem] 3xl:h-[25rem]" />
                <p className="mt-5 3xl:mt-6 text-xl 3xl:text-2xl text-center">
                    <span className="text-gray-dark font-bold highlight">MS in AIML</span>
                    <br />
                    <span className="text-gray-dark font-bold highlight-secondary whitespace-nowrap">TU Darmstadt</span>
                </p>
                <div className="grid grid-cols-3 gap-1 mt-3 3xl:mt-2">
                    {socialButtons.map((button, index) => (
                        <Link key={index} href={button.link}>
                            <button className={`relative inline-flex items-center  p-0.5 overflow-hidden text-sm font-medium text-gray-dark rounded-lg group bg-gradient-to-br ${button.gradient} group-hover:from-${button.gradient.split('-')[1]} group-hover:to-${button.gradient.split('-')[3]} hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 w-full`}>
                                <span className="relative px-1 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent flex  text-gray-dark group-hover:text-white w-full">
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
