/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import { monthDayYear } from '@cleverbeagle/dates';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';
import { numberWithCommas } from '../../../modules/get-form-elements'

class ReportPanelNutshell extends React.Component {
  render() {
    const { rept, chty } = this.props;
    const { summary, financial_info, revenue_model, religious_affiliation, registration_status, createdAt, updatedAt, programs } = chty;
    const { program_id } = rept;
    const program = (program_id && (programs.length >0) )? programs.filter(({_id})=>program_id == _id)[0] : undefined;
    return (rept && chty)? (
      <div className='report-panel-nutshell'>
        {summary?(<Col xs={12} md={12} className='report-section'>
          <h4>Organisation summary</h4>
          <Content content={ parseMarkdown(summary) } />
        </Col>) :''}

        {( (financial_info && financial_info.income_year_3_amt) || revenue_model || religious_affiliation || registration_status )?(
          <Col xs={12} md={12} className='report-section'>
            <h4>Quick facts about this organisation</h4>
            <Row>
              { (financial_info && financial_info.income_year_3_amt)?
                <Col xs={6} md={3} className='flex'>
                  <div className='fact-container' >
                    <h5>Annual Income</h5>
                    <ReportIconImage image='/Icon_Rev.png' large/>
                    <p className='key-figure'>{numberWithCommas(financial_info.income_year_3_amt)}</p>
                    <p>({financial_info.income_year_3})</p>
                  </div>
                </Col> :''}
              { revenue_model?
                <Col xs={6} md={3} className='flex'>
                  <div className='fact-container' >
                    <h5>Revenue Model</h5>
                    <ReportIconImage image='/Icon_RevModel.png' large/>
                    <p className='key-figure'>{revenue_model}</p>
                    <p>Government Funded</p>
                  </div>
                </Col>: ''}
              {religious_affiliation?
                <Col xs={6} md={3} className='flex'>
                  <div className='fact-container' >
                    <h5>Religious Affiliation</h5>
                    <ReportIconImage image='/Icon_Religion.png' large/>
                    <p className='key-figure'>{religious_affiliation}</p>
                    <p>-</p>
                  </div>
                </Col>:''}
              { registration_status?
                <Col xs={6} md={3} className='flex'>
                  <div className='fact-container' >
                    <h5>Registration Status</h5>
                    <ReportIconImage image='/Icon_Legal.png' large/>
                    <p className='key-figure'>{registration_status}</p>
                    <p>-</p>
                  </div>
                </Col>:''}
            </Row>
        </Col>) :''}
        {(program && program.summary)?(<Col xs={12} md={12} className='report-section'>
          <h4>Programme summary</h4>
          <Content content={ parseMarkdown(program.summary) } />
        </Col>) :''}
        {(program && program.revenue_model)?(<Col xs={12} md={12}className='report-section'>
          <h4>Programme revenue model</h4>
          <p>
            <span className='key-figure'>{revenue_model}</span>
            <span>  Government Funded</span>
          </p>
        </Col>) :''}
        {(createdAt && updatedAt)?(<Col xs={12} md={12} className='report-section'>
          <h4>Report details</h4>
          <p>Report created: {monthDayYear(createdAt)}</p>
          <p>Last updated: {monthDayYear(updatedAt)}</p>
        </Col>) :''}
        <Col xs={12} md={12} className='report-section'>
          <h4>Disclaimer</h4>
          <p>Please read the disclaimer found <a href='/terms'>here</a>.</p>
        </Col>
        <div>.</div>
      </div>
    ):<div></div>;
  }
}

ReportPanelNutshell.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
};

export default ReportPanelNutshell;
