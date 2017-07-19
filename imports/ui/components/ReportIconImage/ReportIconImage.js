/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';

import './ReportIconImage.scss';

class ReportIconImage extends React.Component {
  render() {
    const { image, small, large } = this.props;
    const className = large ?'report-icon-image large':(small ?'report-icon-image small':'report-icon-image');
    return (
      <div className={className}>
        <img src={image} alt='image'/>
      </div>
    );
  }
}

ReportIconImage.defaultProps = {
  small: false,
  large: false,
};

ReportIconImage.propTypes = {
  image: PropTypes.string.isRequired,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

export default ReportIconImage;
