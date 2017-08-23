/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col  } from 'react-bootstrap';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';
import { numberWithCommas } from '../../../modules/get-form-elements'

class ReportPanelStaff extends React.Component {
  render() {
    const { chty } = this.props;
    const { staff_info } = chty || {};
    const { headcount_year, staff_headcount_number, volunteer_headcount_number, staff_turnover_year, staff_turnover_number, satisfaction_year, staff_satisfaction_percentage, volunteer_satisfaction_percentage, commentary } = staff_info || {};
    const graph1_check = headcount_year && staff_headcount_number;
    const graph2_check = staff_turnover_year && staff_turnover_number;
    const graph3_check = satisfaction_year && staff_satisfaction_percentage && volunteer_satisfaction_percentage;
    return (staff_info?
      <div className='report-panel-staff'>
        {(graph1_check || graph2_check || graph3_check)?(<Col xs={12} md={12} className='report-section'>
          <h4>Quick facts about this organisation</h4>
          <Row>
            { graph1_check? <Col xs={12} md={4} className='flex'>
              <div className='fact-container'>
                <h4>Headcount</h4>
                <p>Financial year: {headcount_year}</p>
                <ReportIconImage image='/Icon_Volunteers.png'/>
                <p className='key-figure'>{numberWithCommas(staff_headcount_number)}</p>
                <p>Staff</p>
                {volunteer_headcount_number? <div>
                  <br />
                  <p className='key-figure'>{numberWithCommas(volunteer_headcount_number)}</p>
                  <p>Volunteers</p>
                </div>:''}
              </div>
            </Col>:'' }
            { graph2_check? <Col xs={12} md={4}  className='flex'>
              <div className='fact-container'>
                <h4>Staff turnover rate</h4>
                <p>Financial year: {staff_turnover_year}</p>
                <ReportIconImage image='/Icon_Turnover.png' />
                <p className='key-figure'>{staff_turnover_number} %</p>
              </div>
            </Col>:'' }
            { graph3_check? <Col xs={12} md={4}  className='flex'>
              <div className='fact-container'>
                <h4>Volunteer & staff satisfaction<sup>1</sup></h4>
                <p>Financial year: {satisfaction_year}</p>
                <ReportIconImage image='/Icon_Smiley.png' />
                <p className='key-figure'>{staff_satisfaction_percentage} %</p>
                <p>Staff</p>
                <br />
                <p className='key-figure'>{volunteer_satisfaction_percentage} %</p>
                <p>Volunteers</p>
              </div>
            </Col>:'' }
          </Row>
          {satisfaction_year?
            <div><p>Based on Just Cause’s survey of staff & volunteers conducted within the last 2 years</p>
            <p><sup>1</sup> reporting they are satisfied or very satisfied with their experience</p></div>
            :''}
        </Col>) :''}
        {commentary?(<Col xs={12} md={12} className='report-section opinion-box'>
          <h4>Just Cause commentary on staff & volunteers</h4>
          <Content content={ parseMarkdown(commentary) } />
        </Col>) :''}
        <div>.</div>
      </div>:<div></div>);
  }
}

ReportPanelStaff.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelStaff;
