import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  onFormSubmitHandler = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Please enter key word');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  changeHandler = e => {
    // const { value } = e.currentTarget;
    // console.log('value:', value);
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onFormSubmitHandler}>
          <button type="submit" className={css.searchFormButton}>
            <span>
              <FiSearch size={25} />
            </span>
          </button>

          <input
            onChange={this.changeHandler}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}
SearchBar.protoTypes = {
  onSubmit: PropTypes.func,
};
