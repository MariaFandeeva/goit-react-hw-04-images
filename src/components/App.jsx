import { useState, useEffect } from 'react';
import { fetchImg } from './services/api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [id, setId] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL');
  const [loadMore, setLoadMore] = useState(false);
  const per_page = 12;

  useEffect(() => {
    getImg(searchQuery, page);
  }, [searchQuery, page]);

  const getImg = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchImg(searchQuery, page);
      if (hits.length === 0) {
        return alert('Sorry, there is no image');
      }
      // console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setIsLoading(false);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    // console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onFormSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}

      {error && <p>ERROR!</p>}
      {loadMore && <Button onLoadMore={onLoadMore} page={page} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};
