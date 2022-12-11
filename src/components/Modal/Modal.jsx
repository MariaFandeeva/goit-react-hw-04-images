import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
// const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose }) => {
  const onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={onBackDropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
    // modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
