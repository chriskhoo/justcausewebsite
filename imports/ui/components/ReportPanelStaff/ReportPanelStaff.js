/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';
import {  } from 'react-bootstrap';

import './ReportPanelStaff.scss';

class ReportPanelStaff extends React.Component {
  render() {
    const { chty } = this.props;
    const { staff_info } = chty || {};
    const { headcount_year, staff_headcount_number, volunteer_headcount_number, staff_turnover_year, staff_turnover_number, satisfaction_year, staff_satisfaction_percentage, volunteer_satisfaction_percentage, commentary } = staff_info || {};
    const graph1_check = headcount_year && staff_headcount_number && volunteer_headcount_number;
    const graph2_check = staff_turnover_year && staff_turnover_number;
    const graph3_check = satisfaction_year && staff_satisfaction_percentage && volunteer_satisfaction_percentage;
    return (staff_info?
      <div className='report-panel-staff'>
        {(graph1_check || graph2_check || graph5_check)?(<div className='report-section'>
          <h4>Quick facts about this charity</h4>
          <div className='report-row' >
            { graph1_check? <div className='fact-container'>
              <h4>Headcount</h4>
              <p>Financial year: {headcount_year}</p>
              <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' large/>
              <p className='key-figure'>{staff_headcount_number}</p>
              <p>Staff</p>
              <br />
              <p className='key-figure'>{staff_headcount_number}</p>
              <p>Active volunteers</p>
            </div>:'' }
            { graph2_check? <div className='fact-container'>
              <h4>Staff turnover rate</h4>
              <p>Financial year: {staff_turnover_year}</p>
              <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' large/>
              <p className='key-figure'>{staff_turnover_number} %</p>
            </div>:'' }
            { graph3_check? <div className='fact-container'>
              <h4>Volunteer & staff satisfaction<sup>1</sup></h4>
              <p>Financial year: {satisfaction_year}</p>
              <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' large/>
              <p className='key-figure'>{staff_satisfaction_percentage} %</p>
              <p>Staff</p>
              <br />
              <p className='key-figure'>{volunteer_satisfaction_percentage} %</p>
              <p>Volunteers</p>
            </div>:'' }
          </div>
          <p>Based on JustCause’s survey of 40 staff & volunteers conducted within the last 2 years</p>
          <p><sup>1</sup> reporting they are satisfied or very satisfied with their experience</p>
        </div>) :''}
        {commentary?(<div className='report-section opinion-box'>
          <h4>Just Cause believes that ... </h4>
          <Content content={ parseMarkdown(commentary) } />
        </div>) :''}
      </div>:<div></div>);
  }
}

ReportPanelStaff.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelStaff;
