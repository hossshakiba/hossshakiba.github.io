import image from '../../../public/images/bgImage.jpg';
import DetaiIntroduction from './DetaiIntroduction';
import ImageIntroduction from './ImageIntroduction';
import { getData } from '../../../lib/getData';
import MobileIntroduction from './MobileImageIntroduction';

const Introduction = async () => {
    const educationData = getData('educations.json');

    return (
        <div className="relative 3xl:bg-cover bg-no-repeat pt-[4.5rem]" style={{
            "backgroundImage": `linear-gradient(rgb(255 255 255), rgb(255 255 255)), url(${image.src})`,
        }}>
            <div className="content-shell grid md:grid-cols-2 pt-7 3xl:pt-8">
                <MobileIntroduction />
                <DetaiIntroduction educationData={educationData} />
                <ImageIntroduction />
            </div>
        </div>
    );
};

export default Introduction;