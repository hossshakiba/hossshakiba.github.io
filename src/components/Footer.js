import React from 'react'
import { getData } from '../../lib/getData';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from '../config';

const Footer = () => {
    const data = getData('socialMedia.json');

    return (
        <div className="bg-[#819EB4] h-24 flex items-center justify-center">
            <ul className="flex items-center [&>*]:mx-1.5 md:[&>*]:mx-3 justify-center">
                {data.socialMedias.map(socialMedia =>
                    <li>
                        <Link href={socialMedia.link}>
                            <Image
                                alt={socialMedia.alt}
                                src={BASE_URL + socialMedia.image}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-[80%] md:w-full h-auto"
                            />
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Footer