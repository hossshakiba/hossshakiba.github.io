'use client';
import Image from 'next/image';
import { FaQuoteRight } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { SiGoogleslides, SiHuggingface, SiArxiv } from "react-icons/si";
import Link from 'next/link';
import { BASE_URL } from '../config';

const Cart = (props) => {
  const actionButtonClassName =
    "w-fit py-1 px-2 font-semibold text-xs sm:text-sm md:text-base border border-[#d7e1eb] text-[#627181] rounded-md bg-white hover:bg-[#f4f8fc] transition-colors duration-150 flex items-center";

  return (
    <div className="group shadow-4xl md:hover:shadow-3xl cursor-pointer grid self-center sm:grid-cols-3 mb-4 md:mb-8 w-full md:w-[90%] lg:w-[80%] xl:w-[85%] 2xl:w-[70%] bg-[#F4F7FA] sm:bg-white p-4 md:p-5 rounded-lg lg:transition lg:ease-in-out lg:delay-150 lg:hover:-translate-y-1 lg:hover:scale-[1.01]">
      <div className="w-full col-span-1 sm:col-span-1 p-1 ld:p-0 flex items-center justify-center relative">
        <Image src={BASE_URL + props.data.image} className={`h-full m-auto rounded-lg transition-opacity duration-300 ${props.data.imageHover ? 'group-hover:opacity-0' : ''}`} alt="alt"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} />
        {props.data.imageHover && (
          <Image src={BASE_URL + props.data.imageHover} fill className="object-cover rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" alt=""
            sizes="(max-width: 640px) 100vw, 33vw" />
        )}
      </div>
      <div className="sm:col-span-2 flex flex-col justify-between ml-1.5 sm:ml-2 md:ml-8">
        <div>
          <div className="flex flex-col sm:flex-col-reverse mt-1.5">
            <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.08em] text-[#3d5b79] mt-2 sm:mt-1 inline py-1 font-semibold">
              {props.data.journal} · {props.data.year}
            </p>
            {props.data.url ? (
              <Link href={props.data.url}>
                <h1 className="font-semibold text-[0.84rem] md:text-[0.95rem] xl:text-[1.04rem] 2xl:text-lg text-[#4d5762] leading-snug">
                  {props.data.title}
                </h1>
              </Link>
            ) : (
              <h1 className="font-semibold text-[0.84rem] md:text-[0.95rem] xl:text-[1.04rem] 2xl:text-lg text-[#4d5762] leading-snug">
                {props.data.title}
              </h1>
            )}
          </div>
          {props.author && <div className="text-[#8f9ca9] text-[9px] md:text-xs mt-2 md:mt-4 leading-relaxed">
            {props.data.authors.map((author, index) => (
              <span key={index}>
                {author.link ? (
                  <Link className="hover:text-gray-dark" href={author.link}>{author.name}{author.co ? "*" : ""}</Link>
                ) : (
                  <span>{author.name}{author.co ? "*" : ""}</span>
                )}
                {index + 1 !== props.data.authors.length && <span className="text-[#A8AFB4]"> | </span>}
              </span>
            ))}
          </div>}
        </div>
        <div className="[&>*]:mt-2 md:[&>*]:mt-3 flex flex-wrap [&>*]:mr-2 mb-0 sm:mb-2">
          {props.data.bibtex &&
            <button onClick={() => {
              props.setShowModal(true);
              props.setModalData(props.data.bibtex.data);
              props.setCartTitle(props.data.title);
            }} className={`${actionButtonClassName} hover:border-[#5079a4] hover:text-[#5079a4]`}>
              <FaQuoteRight />
              <span className="text-xs ml-1">BibTeX</span>
            </button>
          }
          {props.data.website &&
            <Link href={props.data.url}>
              <button className={`${actionButtonClassName} hover:border-[#EB8317] hover:text-[#EB8317]`}>
                <IoEarthSharp />
                <span className="text-xs ml-1">Project's page</span>
              </button>
            </Link>
          }
          {props.data.pdf &&
            <Link href={props.data.pdf}>
              <button className={`${actionButtonClassName} hover:border-[#b31b1b] hover:text-[#b31b1b]`}>
                <SiArxiv />
                <span className="text-xs ml-1">arXiv</span>
              </button>
            </Link>
          }
          {props.data.code &&
            <Link href={props.data.code}>
              <button className={`${actionButtonClassName} hover:border-[#000000] hover:text-[#000000]`}>
                <FaCode />
                <span className="text-xs ml-1">Code</span>
              </button>
            </Link>
          }
          {props.data.youtube &&
            <Link href={props.data.youtube}>
              <button className={`${actionButtonClassName} hover:border-[#f70000] hover:text-[#f70000]`}>
                <FaYoutube />
                <span className="text-xs ml-1">YouTube</span>
              </button>
            </Link>
          }
          {props.data.slides &&
            <Link href={props.data.slides}>
              <button className={`${actionButtonClassName} hover:border-[#3D5300] hover:text-[#3D5300]`}>
                <SiGoogleslides />
                <span className="text-xs ml-1">Slides</span>
              </button>
            </Link>
          }
          {props.data.huggingFace &&
            <Link href={props.data.huggingFace}>
              <button className={`${actionButtonClassName} hover:border-[#b88900] hover:text-[#b88900]`}>
                <SiHuggingface />
                <span className="text-xs ml-1">Hugging Face</span>
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
