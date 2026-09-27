'use client';

import { useLayoutEffect, useRef } from 'react';

const DURATION_MS = 2200;
const STEPS = 22;
const TOKEN_PATTERN = /\s+|[\p{L}\p{N}’']{1,4}|[^\s\p{L}\p{N}]/gu;

/**
 * Reveals its text like a masked discrete diffusion model: every token starts as [MASK]
 * and tokens are unmasked in random order over a fixed number of denoising steps.
 */
const DiscreteDiffusionText = ({ children, className = '', signalReady = false }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reveal = () => root.classList.remove('dd-pending');
    const markReady = () => {
      if (signalReady) document.documentElement.classList.add('intro-ready');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      markReady();
      return undefined;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
    }

    const replacements = [];
    const tokens = [];
    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      const parts = node.nodeValue.match(TOKEN_PATTERN) || [];
      const spans = [];
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'dd-tok is-masked';
        span.textContent = part;
        fragment.appendChild(span);
        spans.push(span);
        tokens.push(span);
      });
      const first = fragment.firstChild;
      const last = fragment.lastChild;
      node.parentNode.replaceChild(fragment, node);
      replacements.push({ node, first, last });
    });

    for (let i = tokens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
    }

    reveal();
    markReady();

    const restore = () => {
      replacements.forEach(({ node, first, last }) => {
        const parent = first.parentNode;
        if (!parent) return;
        parent.insertBefore(node, first);
        let current = first;
        while (current) {
          const next = current === last ? null : current.nextSibling;
          current.remove();
          current = next;
        }
      });
    };

    let revealed = 0;
    let step = 0;
    const interval = window.setInterval(() => {
      step += 1;
      const progress = step / STEPS;
      const target = Math.round(tokens.length * (1 - Math.cos((progress * Math.PI) / 2)) ** 0.85);
      const goal = step >= STEPS ? tokens.length : Math.max(target, revealed + 1);
      for (; revealed < goal && revealed < tokens.length; revealed++) {
        tokens[revealed].className = 'dd-tok is-new';
      }
      if (step >= STEPS) {
        clearInterval(interval);
        window.setTimeout(restore, 450);
      }
    }, DURATION_MS / STEPS);

    return () => {
      clearInterval(interval);
      restore();
    };
  }, [signalReady]);

  return (
    <div ref={rootRef} className={`dd-pending ${className}`}>
      {children}
    </div>
  );
};

export default DiscreteDiffusionText;
