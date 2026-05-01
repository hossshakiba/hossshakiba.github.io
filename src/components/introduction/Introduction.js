import image from '../../../public/images/site/bgImage.jpg';
import Image from 'next/image';
import DetaiIntroduction from './DetaiIntroduction';
import ImageIntroduction from './ImageIntroduction';
import { getData } from '../../../lib/getData';
import MobileIntroduction from './MobileImageIntroduction';
import natureLeafCluster from '../../../public/images/illustrations/nature-leaf-cluster.svg';
import natureConstellation from '../../../public/images/illustrations/nature-constellation.svg';
import { showDecorSketches } from '@/config/decorSketches';

const Introduction = async () => {
    const educationData = getData('educations.json');

    return (
        <div
            className="relative 3xl:bg-cover bg-no-repeat pt-[4.5rem]"
            style={{
                backgroundImage: `linear-gradient(var(--color-bg), var(--color-bg)), url(${image.src})`,
            }}
        >
            {showDecorSketches && (
                <>
                    <Image
                        src={natureLeafCluster}
                        alt=""
                        aria-hidden="true"
                        className="decor-shape decor-neon-green pointer-events-none hidden lg:block absolute left-2 top-28 w-44 xl:w-52 text-[var(--color-accent)] opacity-[0.05] dark:opacity-[0.1] -z-10"
                    />
                    <Image
                        src={natureConstellation}
                        alt=""
                        aria-hidden="true"
                        className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute right-10 top-20 w-40 text-[var(--color-accent)] opacity-[0.05] dark:opacity-[0.14] -z-10"
                    />
                </>
            )}
            <div className="content-shell grid md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0 pt-7 3xl:pt-8">
                <MobileIntroduction />
                <DetaiIntroduction educationData={educationData} />
                <ImageIntroduction />
            </div>
        </div>
    );
};

export default Introduction;