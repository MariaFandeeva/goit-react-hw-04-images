import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

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
      <header className="searchbar">
        <form className="search-form" onSubmit={this.onFormSubmitHandler}>
          <button type="submit" className="search-form__button">
            <span>
              <FiSearch size={25} />
            </span>
          </button>

          <input
            onChange={this.changeHandler}
            className="search-form__input"
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
