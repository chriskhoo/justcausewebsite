/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import ReportPanelNutshell from '../ReportPanelNutshell/ReportPanelNutshell'
import ReportPanelImpact from '../ReportPanelImpact/ReportPanelImpact'
import ReportPanelStrategy from '../ReportPanelStrategy/ReportPanelStrategy'
import ReportPanelFinances from '../ReportPanelFinances/ReportPanelFinances'
import ReportPanelGovernance from '../ReportPanelGovernance/ReportPanelGovernance'
import ReportPanelStaff from '../ReportPanelStaff/ReportPanelStaff'
import ReportPanelReputation from '../ReportPanelReputation/ReportPanelReputation'
import ReportPanelOpinion from '../ReportPanelOpinion/ReportPanelOpinion'

import './ReportPanel.scss';

class ReportPanel extends React.Component {
  render() {
    const { rept, chty, bdgs } = this.props;
    const { jc_opinion_justcauseloves, jc_opinion_donate_if, jc_opinion_broadentheirwork, jc_opinion_strengthentheteam, badges_awarded, strategy, financial_info, leadership_info, staff_info, reputation_info } = chty || {};
    return ((rept && chty)?
      <div className='report-panel'>
        <Tabs defaultActiveKey={1} id='report-body'>
          <Tab eventKey={1} title="In a nutshell"><ReportPanelNutshell rept={rept} chty={chty} /></Tab>

          { rept.impact_info?
            <Tab eventKey={2} title="Impact"><ReportPanelImpact rept={rept} chty={chty} /></Tab> : '' }

          { ((badges_awarded.length >0) || strategy || bdgs)?
            <Tab eventKey={3} title="Strategy & Character"><ReportPanelStrategy chty={chty} bdgs={bdgs} /></Tab> : '' }

          { financial_info?
            <Tab eventKey={4} title="Finances"><ReportPanelFinances chty={chty} /></Tab>:''}

          { leadership_info?
          <Tab eventKey={5} title="Governance & Leadership"><ReportPanelGovernance rept={rept} chty={chty} /></Tab>:''}

          { staff_info?
          <Tab eventKey={6} title="Staff & Volunteers"><ReportPanelStaff rept={rept} chty={chty} /></Tab>:''}

          { reputation_info?
          <Tab eventKey={7} title="Reputation"><ReportPanelReputation rept={rept} chty={chty} /></Tab>:''}

          { (jc_opinion_justcauseloves || jc_opinion_donate_if || jc_opinion_broadentheirwork || jc_opinion_strengthentheteam)?
          <Tab eventKey={8} title="Just Cause's Opinion"><ReportPanelOpinion chty={chty} /></Tab>:''}

        </Tabs>
      </div>:'Report not found');
  }
}

ReportPanel.defaultProps = {

};

ReportPanel.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportPanel;
