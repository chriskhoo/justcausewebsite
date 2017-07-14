/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

import './SearchBar.scss';

class SearchBar extends React.Component {
  render() {
    const { handleSubmit, query } = this.props;
    return (
      <div className='searchbar'>
        <Glyphicon glyph="search"></Glyphicon>
        <input
          type="text"
          name="search"
          placeholder="Search"
          defaultValue = {query}
        />
        <button
          type='button'
          onClick= {handleSubmit}
          >Search</button>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  query: undefined,
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  query: PropTypes.string,
};

export default SearchBar;
