/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
// import { Glyphicon } from 'react-bootstrap';

import './ReportAside.scss';

class ReportAside extends React.Component {
  render() {
    const { rept, chty } = this.props;
    return (
      <div className='report-aside'>
        <h4>{ rept && rept.name }</h4>
      </div>
    );
  }
}

ReportAside.defaultProps = {

};

ReportAside.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
};

export default ReportAside;
