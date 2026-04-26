'use client';
import Cart from './Cart';
import Image from 'next/image';
import publicationRectangle from '../../public/images/design/publicationRectangle.svg';
import natureStroke from '../../public/images/design/nature-stroke.svg';
import naturePineTree from '../../public/images/design/nature-pine-tree.svg';
import natureBirds from '../../public/images/design/nature-birds.svg';
import natureBirdsSmall from '../../public/images/design/nature-birds-small.svg';
import natureSunPointedRays from '../../public/images/design/nature-sun-pointed-rays.svg';
import natureMoon from '../../public/images/design/nature-moon.svg';
import natureMountains from '../../public/images/design/nature-mountains.svg';
import natureGlassesWand from '../../public/images/design/nature-glasses-wand.svg';
import natureHogwartsCastle from '../../public/images/design/nature-hogwarts-castle.svg';
import naturePizzaSlice from '../../public/images/design/nature-pizza-slice.svg';
import natureFrenchFries from '../../public/images/design/nature-french-fries.svg';
import natureColaGlass from '../../public/images/design/nature-cola-glass.svg';
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
    <div id="publicationSection" className="relative scroll-mt-16 overflow-hidden">
      {showModal && <Modal title={cartTitle} setShowModal={setShowModal} data={modalData} />}
      {/* <Image alt="" src={publicationRectangle} className="absolute left-0 top-96 -z-10 hidden lg:block" /> */}
      <Image
        src={naturePineTree}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-shape-strong decor-neon-green pointer-events-none hidden lg:block absolute left-16 xl:left-24 top-[24rem] w-22 xl:w-28 text-[var(--color-accent)] opacity-[0.1] dark:opacity-[0.24] -z-10"
      />
      <Image
        src={natureBirds}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-cyan pointer-events-none hidden lg:block absolute left-16 xl:left-24 top-80 w-24 xl:w-28 text-[var(--color-accent)] opacity-[0.09] dark:opacity-[0.2] -z-10"
      />
      <Image
        src={natureStroke}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-cyan pointer-events-none hidden lg:block absolute left-16 xl:left-24 top-[29rem] w-36 xl:w-44 text-[var(--color-accent)] opacity-[0.07] dark:opacity-[0.22] -z-10"
      />
      <Image
        src={natureSunPointedRays}
        alt=""
        aria-hidden="true"
        className="theme-light-only decor-shape decor-shape-strong decor-neon-gold pointer-events-none absolute right-8 xl:right-16 top-28 w-32 xl:w-36 text-[var(--color-accent)] opacity-[0.1] z-0"
      />
      <Image
        src={natureMoon}
        alt=""
        aria-hidden="true"
        className="theme-dark-only decor-shape decor-shape-strong decor-neon-cyan pointer-events-none absolute right-8 xl:right-16 top-28 w-32 xl:w-36 text-[var(--color-accent)] opacity-[0.2] z-0"
      />
      <Image
        src={natureBirdsSmall}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute right-44 xl:right-36 top-24 w-20 text-[var(--color-accent)] opacity-[0.07] dark:opacity-[0.18] z-0"
      />
      <Image
        src={natureMountains}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute right-14 xl:right-20 top-44 w-48 text-[var(--color-accent)] opacity-[0.07] dark:opacity-[0.18] z-0"
      />
      <Image
        src={natureGlassesWand}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-violet pointer-events-none hidden xl:block absolute right-32 xl:right-40 top-[35.5rem] w-42 xl:w-44 text-[var(--color-accent)] opacity-[0.06] dark:opacity-[0.16] z-0"
      />
      <Image
        src={natureHogwartsCastle}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-cyan pointer-events-none hidden xl:block absolute right-4 xl:right-8 top-[48rem] w-52 xl:w-56 text-[var(--color-accent)] opacity-[0.06] dark:opacity-[0.16] z-0"
      />
      <Image
        src={naturePizzaSlice}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-gold pointer-events-none hidden xl:block absolute left-6 xl:left-10 bottom-8 w-24 xl:w-28 -rotate-24 text-[var(--color-accent)] opacity-[0.08] dark:opacity-[0.2] -z-10"
      />
      <Image
        src={natureFrenchFries}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-gold pointer-events-none hidden xl:block absolute left-24 xl:left-32 bottom-6 w-20 xl:w-24 rotate-6 text-[var(--color-accent)] opacity-[0.08] dark:opacity-[0.2] -z-10"
      />
      <Image
        src={natureColaGlass}
        alt=""
        aria-hidden="true"
        className="decor-shape decor-neon-red pointer-events-none hidden xl:block absolute left-40 xl:left-52 bottom-5 w-16 xl:w-20 rotate-3 text-[var(--color-accent)] opacity-[0.08] dark:opacity-[0.2] -z-10"
      />
      <div className="content-shell pt-8 md:pt-16 relative z-10">
        <div className="section-heading">
          <p className="section-title">Publications</p>
          <div className="section-divider"></div>
          <p className="theme-muted text-xs sm:text-sm mt-3 tracking-[0.01em]">For a complete list of research works, see my <a className="theme-link transition-colors duration-150" href="https://scholar.google.com/citations?user=huveR90AAAAJ&hl=en&authuser=1">Google Scholar</a>.</p>
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
            <button className="theme-muted text-xs md:text-sm xl:text-base theme-surface-soft border mt-6 py-2 px-4 rounded-lg mx-auto flex mb-10 hover:text-[var(--color-accent)] transition-colors duration-150"
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
