'use client';
import Cart from './Cart';
import Image from 'next/image';
import publicationRectangle from '../../public/images/design/publicationRectangle.svg';
import { useState, useEffect } from 'react';
import Modal from './Modal';

const Publications = (props) => {
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [cartTitle, setCartTitle] = useState('');

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showModal])

  return (
    <div id="publicationSection" className="relative scroll-mt-16">
      {showModal && <Modal title={cartTitle} setShowModal={setShowModal} data={modalData} />}
      {/* <Image alt="" src={publicationRectangle} className="absolute left-0 top-96 -z-10 hidden lg:block" /> */}
      <div className="content-shell pt-8 md:pt-16">
        <div className="section-heading">
          <p className="section-title">Publications</p>
          <div className="section-divider"></div>
          <p className="text-[#66707a] text-xs sm:text-sm mt-3 tracking-[0.01em]">For a complete list of research works, see my <a className="text-[#5079a4] hover:text-[#355b84] transition-colors duration-150" href="https://scholar.google.com/citations?user=huveR90AAAAJ&hl=en&authuser=1">Google Scholar</a>.</p>
        </div>
        <div className="flex flex-col items-center justify-center pt-4 xl:pt-8">
          {props.data.publications.slice(0, 4).map((publication, index) =>
            <Cart setCartTitle={setCartTitle} setShowModal={setShowModal} setModalData={setModalData} key={index} author={true} data={publication} />
          )}
        </div>
        <div className={`${showAllPublications ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in duration-700 flex flex-col items-center justify-center`}>
          {showAllPublications && props.data.publications.slice(4).map((publication, index) =>
            <Cart setCartTitle={setCartTitle} setShowModal={setShowModal} setModalData={setModalData} key={index} author={true} data={publication} />
          )}
        </div>
          {
            props.data.publications.length > 4 &&
            <button className="text-[#748595] text-xs md:text-sm xl:text-base bg-primary1 mt-6 py-2 px-4 rounded-lg mx-auto flex mb-10"
            onClick={() => setShowAllPublications(!showAllPublications)}
          >
            {showAllPublications ? 'show less' : 'show more'}
          </button>
          }
      </div>
    </div>
  );
};

export default Publications;
