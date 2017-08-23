/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';

class ReportPanelImpact extends React.Component {
  render() {
    const { rept } = this.props;
    const { type } = rept || {};
    const { data_collection, continuous_improvement, impact_framework, commentary, outputs, outcomes, outcome_quotes } = rept.impact_info || {};
    return ((rept && rept.impact_info && rept.type)?
      <div className='report-panel-impact'>
        { (impact_framework && data_collection && continuous_improvement)?
        <Col xs={12} md={12} className='report-section'>
          <h4> { (type == 'program')? 'Programme' : 'Charity'} approach to impact measurement</h4>
          { impact_framework? (<Row>
            <Col xs={4} md={4} className='key-figure text-left'>Framework</Col>
            <Col xs={8} md={8}><Content content={ parseMarkdown(impact_framework) } /></Col>
          </Row>):'' }
          { data_collection?(<Row>
            <Col xs={4} md={4} className='key-figure text-left'>Data Collection</Col>
            <Col xs={8} md={8}> <Content content={ parseMarkdown(data_collection) } /></Col>
          </Row>):'' }
          { continuous_improvement?(<Row>
            <Col xs={4} md={4} className='key-figure text-left'>Continuous Improvement</Col>
            <Col xs={8} md={8}> <Content content={ parseMarkdown(continuous_improvement) } /> </Col>
          </Row>) :'' }
        </Col> :''}
        { ( outputs || outcomes || outcome_quotes )?
        <Col xs={12} md={12} className='report-section'>
          <h4> { (type == 'program')? 'Programme' : 'Charity'} results</h4>
          <Row>
            <Col xs={12} md={6} className='report-impact-results-box blue-box'>
              <p><strong>Main Outputs</strong></p>
              <p>(e.g. # reached)</p>
              { (outputs && (outputs.length >0) )? outputs.map( ({_id, number, description })=> <Row key={_id}>
                <Col xs={3} md={3} className='key-figure'>{number}</Col>
                <Col xs={9} md={9}>{description}</Col>
              </Row> ) :'' }
            </Col>
            <Col xs={12} md={6} className='report-impact-results-box blue-box'>
              <p><strong>Main Outcomes</strong></p>
              <p>(e.g. reported change)</p>
              { (outcomes && (outcomes.length >0) )? outcomes.map( ({_id, number, description })=> <Row key={_id}>
                <Col xs={3} md={3} className='key-figure'>{number}</Col>
                <Col xs={9} md={9}>{description}</Col>
              </Row> ) :'' }
              { outcome_quotes? <Content content={ parseMarkdown(outcome_quotes) } /> :'' }
            </Col>
          </Row>
        </Col> :''}
        { ( commentary )?
        <Col xs={12} md={12} className='report-section opinion-box'>
          <h4> Just Cause commentary on impact:</h4>
          <Content content={ parseMarkdown(commentary) } />
        </Col> : '' }
        <div>.</div>
      </div>:<div></div>);
  }
}

ReportPanelImpact.propTypes = {
  rept: PropTypes.object.isRequired,
};

export default ReportPanelImpact;
