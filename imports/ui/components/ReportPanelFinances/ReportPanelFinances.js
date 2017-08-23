/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import { Glyphicon, Table, Row, Col } from 'react-bootstrap';
import { numberWithCommas } from '../../../modules/get-form-elements'

class ReportPanelFinances extends React.Component {
  render() {
    const { chty } = this.props;
    const { financial_info } = chty || {};
    const { income_year_1, income_year_1_amt, expenditure_year_1_amt, income_year_2, income_year_2_amt, expenditure_year_2_amt, income_year_3, income_year_3_amt, expenditure_year_3_amt, revenue_model_reporting_year, rev_model_cash_donations_and_fundraised_income_percent, rev_model_govt_grants_subsidies_percent, rev_model_activity_income_percent, rev_model_investment_income_percent, rev_model_others_percent, major_donors_year, major_donors_number, major_donors_minimum_amt, reserve_ratio_year, reserve_ratio_amt, financial_checklist_ids, commentary } = financial_info || {};
    const graph1_check = income_year_1 && income_year_2 && income_year_3 && income_year_1_amt && expenditure_year_1_amt && income_year_2_amt && expenditure_year_2_amt && income_year_3_amt && expenditure_year_3_amt;
    const graph2_check = revenue_model_reporting_year || rev_model_cash_donations_and_fundraised_income_percent || rev_model_govt_grants_subsidies_percent || rev_model_activity_income_percent || rev_model_investment_income_percent || rev_model_others_percent;
    const graph3_check = reserve_ratio_year && reserve_ratio_amt;
    const graph4_check = major_donors_year && major_donors_number && major_donors_minimum_amt;
    return ((financial_info)?
      <div className='report-panel-finances'>
        { graph1_check || graph2_check || graph3_check || graph4_check?
          (<Col xs={12} md={12} className='report-section'>
            <h4>Quick facts about this organisation</h4>
            <Row>
              { graph1_check? <Col xs={12} md={6} className='flex'>
                <div className='fact-container'>
                  <h4>Total income & expenditure</h4>
                  <p>Financial year: {income_year_3}</p>
                  <Table striped bordered hover responsive>
                    <thead><tr><th>Year</th><th>Income</th><th>Expenditure</th></tr></thead>
                    <tbody>
                      <tr><td>{income_year_1}</td><td>{numberWithCommas(income_year_1_amt)}</td><td>{numberWithCommas(expenditure_year_1_amt)}</td></tr>
                      <tr><td>{income_year_2}</td><td>{numberWithCommas(income_year_2_amt)}</td><td>{numberWithCommas(expenditure_year_2_amt)}</td></tr>
                      <tr><td>{income_year_3}</td><td>{numberWithCommas(income_year_3_amt)}</td><td>{numberWithCommas(expenditure_year_3_amt)}</td></tr>
                    </tbody>
                  </Table>
                </div>
              </Col>:'' }
              { graph2_check? <Col xs={12} md={6} className='flex'>
                <div className='fact-container'>
                  <h4>Income break-down (%)</h4>
                  <p>Financial year: {revenue_model_reporting_year}</p>
                  <Table striped bordered hover responsive>
                    <thead><tr><th>Source</th><th>%</th></tr>
                    </thead>
                    <tbody>
                      <tr><th>Donations and fundraised income</th> <td>{rev_model_cash_donations_and_fundraised_income_percent}</td></tr>
                      <tr><th>Government grants subsidies</th><td>{rev_model_govt_grants_subsidies_percent}</td></tr>
                      <tr><th>Activity income</th><td>{rev_model_activity_income_percent}</td></tr>
                      <tr><th>Investment income</th><td>{rev_model_investment_income_percent}</td></tr>
                      <tr><th>Others</th><td>{rev_model_others_percent}</td></tr>
                    </tbody>
                  </Table>
                </div>
              </Col>:'' }
              { graph3_check? <Col xs={6} md={6} className='flex'>
                <div className='fact-container'>
                  <h4>Reserves ratio</h4>
                  <p>Financial year: {reserve_ratio_year}</p>
                  <p className='key-figure'>{reserve_ratio_amt}</p>
                  <p>Unrestricted reserves / Total annual expenditure</p>
                </div>
              </Col>:'' }
              { graph4_check? <Col xs={6} md={6} className='flex'>
                <div className='fact-container'>
                  <h4>Number of major donors</h4>
                  <p>Financial year: {major_donors_year}</p>
                  <p className='key-figure'>{numberWithCommas(major_donors_number)}</p>
                  <p>i.e. donors (excluding government) giving more than</p>
                  <p className='key-figure'> {numberWithCommas(major_donors_minimum_amt)}</p>
                </div>
              </Col>:'' }
            </Row>
          </Col>) :''}
        {financial_checklist_ids && (financial_checklist_ids.length >0 )?
          (<Col xs={12} md={12} className='report-section'>
            <h4>Key financial processes & policy checklist for this organisation</h4>
            { financial_checklist_ids.map( (checklist)=><Row key={checklist._id} >
              <Col xs={1} md={1}> <Glyphicon glyph='ok' className='key-figure' /></Col>
              <Col xs={11} md={11}>{checklist.description}</Col>
            </Row> ) }
          </Col>) :''}
        {commentary?(<Col xs={12} md={12} className='report-section opinion-box'>
          <h4>Just Cause commentary on financials </h4>
          <Content content={ parseMarkdown(commentary) } />
        </Col>) :''}
        <div>.</div>
      </div>:<div></div>);
  }
}

ReportPanelFinances.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelFinances;
