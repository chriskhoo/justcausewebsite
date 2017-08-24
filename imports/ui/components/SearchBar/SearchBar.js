/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col } from 'react-bootstrap';

import './SearchBar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus(){
    let nextState = this.state;
    nextState.focus = true;
    this.setState(nextState);
  }

  handleBlur(){
    let nextState = this.state;
    nextState.focus = false;
    this.setState(nextState);
  }

  render() {
    const { focus } = this.state;
    const { handleSubmit, query } = this.props;
    const searchbarClass = focus? 'searchbar active': 'searchbar';
    return (
      <Col xs={10} md={6} className={searchbarClass}>
        <Glyphicon glyph="search" className='col-md-1 col-xs-1 flex'></Glyphicon>
        <input
          type="text"
          name="search"
          className='col-md-2 col-xs-3 flex'
          placeholder="Enter search"
          defaultValue = {query}
          onFocus = {this.handleFocus}
          onBlur = {this.handleBlur}
        />
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
