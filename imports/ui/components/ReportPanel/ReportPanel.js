/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
// import { Glyphicon } from 'react-bootstrap';

import './ReportPanel.scss';

class ReportPanel extends React.Component {
  render() {
    const { rept, chty } = this.props;
    return (
      <div className='report-panel'>
        <h4>{ rept && rept.name }</h4>
      </div>
    );
  }
}

ReportPanel.defaultProps = {

};

ReportPanel.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
};

export default ReportPanel;
