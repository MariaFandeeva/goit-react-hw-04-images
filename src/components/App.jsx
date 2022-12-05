import React, { Component } from 'react';
import { fetchImg } from './services/api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';
export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    per_page: 12,
    isLoading: false,
    error: null,
    showModal: false,
    id: null,
    largeImageURL: 'largeImageURL',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImg(searchQuery, page);
    }
  }

  getImg = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImg(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore:
          this.setState.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, page, largeImageURL, showModal } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onFormSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {!isLoading && images.length !== 0 && (
          <Button onLoadMore={this.onLoadMore} page={page} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
