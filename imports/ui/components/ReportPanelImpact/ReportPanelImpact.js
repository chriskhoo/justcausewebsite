/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';

import './ReportPanelImpact.scss';

class ReportPanelImpact extends React.Component {
  render() {
    const { rept } = this.props;
    const { type } = rept || {};
    const { data_collection, continuous_improvement, impact_framework, commentary, outputs, outcomes, outcome_quotes } = rept.impact_info || {};
    return ((rept && rept.impact_info && rept.type)?
      <div className='report-panel-impact'>
        { (impact_framework && data_collection && continuous_improvement)?
        <div className='report-section'>
          <h4> { (type == 'program')? 'Programme' : 'Charity'} approach to impact measurement</h4>
          { impact_framework?<div className='report-row'><div className='key-figure'>Framework</div>  <Content content={ parseMarkdown(impact_framework) } /></div>:'' }
          { data_collection?<div className='report-row'><div className='key-figure'>Data Collection</div>  <Content content={ parseMarkdown(data_collection) } /></div>:'' }
          { continuous_improvement?<div className='report-row'><div className='key-figure'>Continuous Improvement</div>  <Content content={ parseMarkdown(continuous_improvement) } /></div> :'' }
        </div> :''}
        { ( outputs || outcomes || outcome_quotes )?
        <div className='report-section'>
          <h4> { (type == 'program')? 'Programme' : 'Charity'} results</h4>
          <div className='report-row'>
            <div className='report-impact-results-box blue-box'>
              <p><strong>Main Outputs</strong></p>
              <p>(e.g. # reached)</p>
              { (outputs && (outputs.length >0) )? outputs.map( ({_id, number, description })=> <div key={_id} className='report-row'><div className='key-figure'>{number}</div> <div className='text-beside'>{description}</div></div> ) :'' }
            </div>
            <div className='report-impact-results-box blue-box'>
              <p><strong>Main Outcomes</strong></p>
              <p>(e.g. reported change)</p>
              { (outcomes && (outcomes.length >0) )? outcomes.map( ({_id, number, description })=> <div key={_id} className='report-row'><div className='key-figure'>{number}</div>  <div className='text-beside'>{description}</div></div> ) :'' }
              { outcome_quotes? <Content content={ parseMarkdown(outcome_quotes) } /> :'' }
            </div>
          </div>
        </div> :''}
        { ( commentary )?
        <div className='report-section opinion-box'>
          <h4> Just Cause commentary on impact:</h4>
          <Content content={ parseMarkdown(commentary) } />
        </div> : '' }

      </div>:<div></div>);
  }
}

ReportPanelImpact.propTypes = {
  rept: PropTypes.object.isRequired,
};

export default ReportPanelImpact;
