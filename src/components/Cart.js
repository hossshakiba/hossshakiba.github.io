'use client';
import Image from 'next/image';
import { FaQuoteRight } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { SiGoogleslides, SiHuggingface, SiArxiv } from "react-icons/si";
import Link from 'next/link';
import { BASE_URL, SELF_AUTHOR_NAME } from '../config';

const isSelfAuthor = (author) =>
  author.self || author.name === SELF_AUTHOR_NAME;

const Cart = (props) => {
  const actionButtonClassName =
    "w-fit py-1 px-2 font-semibold text-xs sm:text-sm md:text-base border border-[var(--color-border)] theme-muted rounded-md theme-surface hover:bg-[var(--color-surface-soft)] transition-colors duration-150 flex items-center";

  return (
    <div className="group shadow-4xl md:hover:shadow-3xl cursor-pointer grid self-center sm:grid-cols-3 mb-4 md:mb-8 w-full md:w-[90%] lg:w-[80%] xl:w-[85%] 2xl:w-[70%] theme-surface p-4 md:p-5 rounded-lg border lg:transition lg:ease-in-out lg:delay-150 lg:hover:-translate-y-1 lg:hover:scale-[1.01]">
      <div className="w-full col-span-1 sm:col-span-1 p-1 ld:p-0 flex items-center justify-center">
        {/* Inner wrapper shrink-wraps to the in-flow image so `fill` is not tied to the full grid row height */}
        <div className="relative w-full overflow-hidden rounded-lg theme-surface">
          <Image
            src={BASE_URL + props.data.image}
            className={`relative z-0 w-full h-auto transition-opacity duration-300 ${props.data.imageHover ? 'group-hover:opacity-0' : ''}`}
            alt=""
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, 33vw"
            style={{ width: '100%', height: 'auto' }}
          />
          {props.data.imageHover && (
            <Image
              src={BASE_URL + props.data.imageHover}
              fill
              className="object-cover object-center z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              alt=""
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          )}
        </div>
      </div>
      <div className="sm:col-span-2 flex flex-col justify-between ml-1.5 sm:ml-2 md:ml-8">
        <div>
          <div className="flex flex-col sm:flex-col-reverse mt-1.5">
            <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-accent)] mt-2 sm:mt-1 inline py-1 font-semibold">
              {props.data.venue} · {props.data.year}
            </p>
            <h1 className="font-semibold text-[0.84rem] md:text-[0.95rem] xl:text-[1.04rem] 2xl:text-lg theme-heading leading-snug">
              {props.data.title}
            </h1>
          </div>
          {props.author && <div className="theme-subtle text-[9px] md:text-xs mt-2 md:mt-4 leading-relaxed">
            {props.data.authors.map((author, index) => {
              const selfClass = isSelfAuthor(author) ? 'author-self' : '';
              const authorLabel = `${author.name}${author.co ? '*' : ''}`;

              return (
              <span key={index}>
                {author.link ? (
                  <Link className={`hover:text-[var(--color-heading)] ${selfClass}`} href={author.link}>{authorLabel}</Link>
                ) : (
                  <span className={selfClass}>{authorLabel}</span>
                )}
                {index + 1 !== props.data.authors.length && <span className="theme-subtle"> | </span>}
              </span>
            );
            })}
          </div>}
        </div>
        <div className="[&>*]:mt-2 md:[&>*]:mt-3 flex flex-wrap [&>*]:mr-2 mb-0 sm:mb-2">
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
              <button className={`${actionButtonClassName} hover:border-[var(--color-heading)] hover:text-[var(--color-heading)]`}>
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
          {props.data.bibtex && (
            <button
              type="button"
              onClick={() => {
                props.setShowModal(true);
                props.setModalData(props.data.bibtex.data);
                props.setCartTitle(props.data.title);
              }}
              className={`${actionButtonClassName} hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]`}
            >
              <FaQuoteRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden />
              <span className="text-xs ml-1">BibTeX</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
