'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { LuCopy } from 'react-icons/lu';

function buildBibtexString(data) {
  const entries = Object.entries(data);
  if (entries.length === 0) return '';
  const [[typeKey, citeKey], ...fields] = entries;
  const body = fields
    .map(([k, v], i) => `  ${k} = {${v}}${i < fields.length - 1 ? ',' : ''}`)
    .join('\n');
  return `${typeKey}{${citeKey},\n${body}\n}`;
}

const Modal = (props) => {
  const { data, title, setShowModal } = props;

  const bibtexRaw = useMemo(() => buildBibtexString(data), [data]);

  const data1 = Object.entries(data)[0];
  const data2 = { ...data };
  const keys = Reflect.ownKeys(data2);
  if (keys.length) delete data2[keys[0]];
  const bibEntries = Object.entries(data2);
  const formattedBibEntries = bibEntries.map((entry, index) => {
    const isLast = index === bibEntries.length - 1;
    return `${entry[0]} = {${entry[1]}}` + (!isLast ? ',' : '');
  });

  const [isCopied, setIsCopied] = useState(false);

  const copyTextHandler = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bibtexRaw);
      } else {
        const ta = document.createElement('textarea');
        ta.value = bibtexRaw;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Unable to copy', err);
    }
  }, [bibtexRaw]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setShowModal]);

  return (
    <>
      <div
        role="presentation"
        aria-hidden
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-20 cursor-pointer bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bibtex-modal-title"
        className="theme-surface theme-heading fixed left-1/2 top-1/2 z-30 max-h-[min(85vh,28rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--color-border)] p-4 shadow-lg md:p-5"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] pb-3">
          <h2 id="bibtex-modal-title" className="text-sm font-semibold leading-snug sm:text-base md:text-lg">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowModal(false)}
            className="theme-subtle -m-1 shrink-0 rounded-md p-1 hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-heading)]"
          >
            <FaXmark className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-3">
          <div className="theme-surface-soft max-h-[min(50vh,14rem)] w-full overflow-auto rounded-md border border-[var(--color-border)] px-3 py-2.5 pr-12 sm:max-h-[min(55vh,16rem)]">
            <pre
              id="bibText"
              className="font-mono text-[11px] leading-relaxed text-[var(--color-text)] sm:text-xs md:text-[0.8125rem]"
            >
              <code>
                <span className="text-[var(--color-accent-strong)] font-semibold">{data1[0]}</span>
                <span className="text-[var(--color-muted)]">{`{${data1[1]},`}</span>
                {'\n'}
                {formattedBibEntries.map((entry, index) => (
                  <React.Fragment key={index}>
                    <span className="text-[var(--color-accent)]">{`  ${entry}`}</span>
                    {'\n'}
                  </React.Fragment>
                ))}
                <span className="text-[var(--color-muted)]">{'}'}</span>
              </code>
            </pre>
          </div>

          <div className="absolute right-2 top-2 flex flex-col items-end gap-1 sm:right-2.5 sm:top-2.5">
            {isCopied && (
              <span className="rounded-md bg-[var(--color-accent)] px-2 py-1 text-xs font-medium text-white shadow-md">
                Copied
              </span>
            )}
            <button
              type="button"
              aria-label="Copy BibTeX to clipboard"
              onClick={copyTextHandler}
              className="theme-surface rounded-md border border-[var(--color-border)] p-2 shadow-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <LuCopy className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
