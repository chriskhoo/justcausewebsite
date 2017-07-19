/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { extract_values } from '../../../modules/get-form-elements'
import ReportBadgeImage from '../ReportBadgeImage/ReportBadgeImage';

import './ReportHeaderBadgeRow.scss';

class ReportHeaderBadgeRow extends React.Component {
  render() {
    const { badges_awarded, bdgs } = this.props;
    const badges_awarded_id_array = extract_values(badges_awarded, '_id');
    return (
      <div className = 'report-header-badge-row'>
        {bdgs.filter( ({_id})=> badges_awarded_id_array.includes(_id) ).map( (badge) => <ReportBadgeImage key={badge._id} image={badge.image} name={badge.name} /> )}
      </div>
    );
  }
}

ReportHeaderBadgeRow.propTypes = {
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  badges_awarded: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportHeaderBadgeRow;
