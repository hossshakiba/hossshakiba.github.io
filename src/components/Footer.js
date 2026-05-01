import React from 'react'
import { getData } from '../../lib/getData';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from '../config';

const Footer = () => {
    const data = getData('social.json');
    const lastUpdated = 'May 2026';

    return (
        <div className="py-4 px-3 flex flex-col items-center justify-center gap-2 bg-[var(--color-footer-bg)] border-t border-[var(--color-border)]">
            <ul className="flex items-center [&>*]:mx-1.5 md:[&>*]:mx-3 justify-center">
                {data.socialMedias.map(socialMedia =>
                    <li>
                        <Link href={socialMedia.link}>
                            <Image
                                alt={socialMedia.alt}
                                src={BASE_URL + socialMedia.image}
                                width={30}
                                height={30}
                                className="max-w-[50px] max-h-[50px] md:max-w-[60px] md:max-h-[60px] lg:max-w-[70px] lg:max-h-[70px]"
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </li>
                )}
            </ul>
            <p className="text-[0.68rem] sm:text-xs text-[var(--color-footer-text)] tracking-[0.02em]">
                Last updated: {lastUpdated}
            </p>
        </div>
    )
}

export default Footer