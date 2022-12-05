import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number,
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};
