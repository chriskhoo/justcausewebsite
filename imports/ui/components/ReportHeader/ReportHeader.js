/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
// import { Glyphicon } from 'react-bootstrap';

import './ReportHeader.scss';

class ReportHeader extends React.Component {
  render() {
    const { rept, chty } = this.props;
    return (
      <div className='report-header'>
        <h4>{ rept && rept.name }</h4>
      </div>
    );
  }
}

ReportHeader.defaultProps = {

};

ReportHeader.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
};

export default ReportHeader;
