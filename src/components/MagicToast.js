'use client';

import { useEffect, useRef } from 'react';
import { introHand } from './introduction/introSocials';

const OPEN_GRACE_MS = 350;

const MagicToast = ({ icon, title, body, footnote, onClose }) => {
  const openedAtRef = useRef(0);

  const handleClick = () => {
    if (performance.now() - openedAtRef.current > OPEN_GRACE_MS) onClose();
  };

  useEffect(() => {
    openedAtRef.current = performance.now();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="magic-toast-layer" onClick={handleClick}>
      <div className="magic-toast" role="status">
        <button type="button" className="magic-toast-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        {icon && <div className="magic-toast-icon" aria-hidden>{icon}</div>}
        <p className={`magic-toast-title ${introHand.className}`}>{title}</p>
        <p className="magic-toast-body">{body}</p>
        {footnote && <p className="magic-toast-footnote">{footnote}</p>}
      </div>
    </div>
  );
};

export default MagicToast;
