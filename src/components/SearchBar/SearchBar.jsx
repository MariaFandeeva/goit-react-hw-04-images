import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onFormSubmitHandler = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Please enter key word');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const changeHandler = e => {
    // const { value } = e.currentTarget;
    // console.log('value:', value);
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onFormSubmitHandler}>
        <button type="submit" className={css.searchFormButton}>
          <span>
            <FiSearch size={25} />
          </span>
        </button>

        <input
          onChange={changeHandler}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
        />
      </form>
    </header>
  );
};

SearchBar.protoTypes = {
  onSubmit: PropTypes.func,
};
