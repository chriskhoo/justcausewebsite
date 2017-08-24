/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col } from 'react-bootstrap';

import './SearchBar.scss';

class SearchBar extends React.Component {
  render() {
    const { handleSubmit, query } = this.props;
    return (
      <Col xs={10} md={6} className='searchbar'>
        <Col xs={1} md={1}>
          <Glyphicon glyph="search"></Glyphicon>
        </Col>
        <Col xs={8} md={9} className='flex'>
          <input
            type="text"
            name="search"
            placeholder="Enter search"
            defaultValue = {query}
          />
        </Col>
        <button
          className='col-md-2 col-xs-3 flex'
          type='button'
          onClick= {handleSubmit}
          >Search</button>
      </Col>
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
