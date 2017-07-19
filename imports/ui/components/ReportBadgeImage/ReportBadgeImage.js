/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';

import './ReportBadgeImage.scss';

class ReportBadgeImage extends React.Component {
  render() {
    const { image, name } = this.props;
    return (
      <div className='report-badge-image'>
        <img src={image} alt={`${name} badge`}/>
      </div>
    );
  }
}

ReportBadgeImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ReportBadgeImage;
