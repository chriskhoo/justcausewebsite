/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';

import './ReportIconImage.scss';

class ReportIconImage extends React.Component {
  render() {
    const { image, alt, large } = this.props;
    const className = large ?'report-icon-image large':'report-icon-image';
    return (
      <div className={className}>
        <img src={image} alt={alt?alt:'image'}/>
      </div>
    );
  }
}

ReportIconImage.defaultProps = {
  large: false,
};

ReportIconImage.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  large: PropTypes.bool,
};

export default ReportIconImage;
