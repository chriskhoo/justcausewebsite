/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col  } from 'react-bootstrap';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

class ReportPanelOpinion extends React.Component {
  render() {
    const { chty } = this.props;
    const { jc_opinion_justcauseloves, jc_opinion_donate_if, jc_opinion_broadentheirwork, jc_opinion_strengthentheteam } = chty || {};
    return ((chty)?
      <div className='report-panel-opinion'>
        {(jc_opinion_justcauseloves)?(<Col xs={12} md={12} className='report-section'>
          <Col xs={2} md={2}><ReportIconImage image='/Icon_Love.png'/></Col>
          <Col xs={10} md={10} className='opinion-box'>
            <h4>Just Cause loves this organisation</h4>
            <Content content={ parseMarkdown(jc_opinion_justcauseloves) } />
          </Col>
        </Col>) :''}
        {(jc_opinion_donate_if)?(<Col xs={12} md={12} className='report-section'>
          <Col xs={10} md={10} className='opinion-box'>
            <h4>Donate to this organisation if you ... </h4>
            <Content content={ parseMarkdown(jc_opinion_donate_if) } />
          </Col>
          <Col xs={2} md={2}><ReportIconImage image='/Icon_Star.png'/></Col>
        </Col>) :''}
        {(jc_opinion_broadentheirwork || jc_opinion_strengthentheteam)?(<Col xs={12} md={12} className='report-section'>
          <Col xs={2} md={2}><ReportIconImage image='/Icon_Work.png'/></Col>
          <Col xs={10} md={10} className='opinion-box'>
            <h4>How we think your support can help this organisation ... </h4>
            {jc_opinion_broadentheirwork? <div className='report-section'>
              <p>Broaden and deepen their work:</p>
              <Content content={ parseMarkdown(jc_opinion_broadentheirwork) } />
            </div>:''}
            {jc_opinion_strengthentheteam? <div className='report-section'>
              <p>Further strengthen the team’s own capacity, in particular:</p>
              <Content content={ parseMarkdown(jc_opinion_strengthentheteam) } />
            </div>:''}
          </Col>
        </Col>) :''}
        <div>.</div>
      </div>:<div></div>);
  }
}

ReportPanelOpinion.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelOpinion;
