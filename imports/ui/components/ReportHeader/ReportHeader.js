/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import ReportHeaderBadgeRow from '../ReportHeaderBadgeRow/ReportHeaderBadgeRow'

import './ReportHeader.scss';

class ReportHeader extends React.Component {
  render() {
    const { rept, chty, bdgs } = this.props;
    const { year_established, badges_awarded } = chty;
    const { name, logo, detail_level_id } = rept;
    return (rept ?
      <div className='report-header'>
        <div className='charity-logo'>
          <img className='charity-image' src={logo} alt='charity logo'/>
        </div>
        <div className = 'header-container'>
          <div className={ `report_detail_level ${detail_level_id.name}`} >{detail_level_id.name}</div>
          <h3>{ name }</h3>
          <p>Charity Established in { year_established }</p>
          <ReportHeaderBadgeRow
            bdgs={bdgs}
            badges_awarded={badges_awarded}
          />
        </div>
      </div>: '')
  }
}

ReportHeader.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportHeader;
