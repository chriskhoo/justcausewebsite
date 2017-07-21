/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { monthDayYear } from '@cleverbeagle/dates';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

import './ReportPanelNutshell.scss';

class ReportPanelNutshell extends React.Component {
  render() {
    const { rept, chty } = this.props;
    const { summary, financial_info, revenue_model, religious_affiliation, registration_status, createdAt, updatedAt, programs } = chty;
    const { program_id } = rept;
    const program = (program_id && (programs.length >0) )? programs.filter(({_id})=>program_id == _id)[0] : undefined;
    return (rept && chty)? (
      <div className='report-panel-nutshell'>
        {summary?(<div className='report-section'>
          <h4>Charity summary</h4>
          <Content content={ parseMarkdown(summary) } />
        </div>) :''}

        {( (financial_info && financial_info.income_year_3_amt) || revenue_model || religious_affiliation || registration_status )?(
          <div className='report-section'>
            <h4>Quick facts about this charity</h4>
            <div className='report-row'>
              { (financial_info && financial_info.income_year_3_amt)?
              <div className='fact-container'>
                <h5>Annual Income</h5>
                <ReportIconImage image='/Icon_Rev.png' large/>
                <p className='key-figure'>${financial_info.income_year_3_amt}</p>
                <p>({financial_info.income_year_3})</p>
              </div> :''}
              { revenue_model?
              <div className='fact-container'>
                <h5>Revenue Model</h5>
                <ReportIconImage image='/Icon_RevModel.png' large/>
                <p className='key-figure'>{revenue_model}</p>
                <p>Government Funded</p>
              </div>: ''}
              {religious_affiliation?
              <div className='fact-container'>
                <h5>Religious Affiliation</h5>
                <ReportIconImage image='/Icon_Religion.png' large/>
                <p className='key-figure'>{religious_affiliation}</p>
                <p>-</p>
              </div>:''}
              { registration_status?
                <div className='fact-container'>
                  <h5>Registration Status</h5>
                  <ReportIconImage image='/Icon_Legal.png' large/>
                  <p className='key-figure'>{registration_status}</p>
                  <p>-</p>
                </div>:''}
            </div>
        </div>) :''}
        {(program && program.summary)?(<div className='report-section'>
          <h4>Program summary</h4>
          <Content content={ parseMarkdown(program.summary) } />
        </div>) :''}
        {(program && program.revenue_model)?(<div className='report-section'>
          <h4>Program revenue model</h4>
          <div className='report-row'>
            <p className='key-figure'>{revenue_model}</p>
            <p className='text-beside'>Government Funded</p>
          </div>
        </div>) :''}
        {(createdAt && updatedAt)?(<div className='report-section'>
          <h4>Report details</h4>
          <p>Report created: {monthDayYear(createdAt)}</p>
          <p>Last updated: {monthDayYear(updatedAt)}</p>
        </div>) :''}
        <div className='report-section'>
          <h4>Disclaimer</h4>
          <p>Please read the disclaimer found here.</p>
        </div>
      </div>
    ):<div></div>;
  }
}

ReportPanelNutshell.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
};

export default ReportPanelNutshell;
