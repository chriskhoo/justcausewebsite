/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col  } from 'react-bootstrap';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';
import { numberWithCommas } from '../../../modules/get-form-elements'

class ReportPanelReputation extends React.Component {
  render() {
    const { chty } = this.props;
    const { reputation_info } = chty || {};
    const { quote_1, quote_2, quote_3, facebook_likes_date, facebook_likes_number, media_article_1_title, media_article_1_source, media_article_1_date, media_article_1_summary, media_article_2_title, media_article_2_source, media_article_2_date, media_article_2_summary, media_article_3_title, media_article_3_source, media_article_3_date, media_article_3_summary, commentary } = reputation_info || {};
    const graph1_check = facebook_likes_date && facebook_likes_number;
    const graph2_check = media_article_1_title && media_article_1_source && media_article_1_date && media_article_1_summary;
    const graph3_check = media_article_2_title && media_article_2_source && media_article_2_date && media_article_2_summary;
    const graph4_check = media_article_3_title && media_article_3_source && media_article_3_date && media_article_3_summary;
    return (reputation_info?
      <div className='report-panel-reputation'>
        {(quote_1 || quote_2 || quote_3)?(<Col xs={12} md={12} className='report-section'>
          <h4>What do people who work with the organisation say?</h4>
          <p>Just Cause asked five organisations who work regularly with them, what they think:</p>
          {quote_1? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Quote.png'/></Col>
            <Col xs={10} md={10} className='blue-box'>
              <Content content={ parseMarkdown(quote_1) } />
            </Col>
          </Row>:''}
          {quote_2? <Row>
            <Col xs={10} md={10} className='blue-box'>
              <Content content={ parseMarkdown(quote_2) } />
            </Col>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Quote.png'/></Col>
          </Row>:''}
          {quote_3? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Quote.png'/></Col>
            <Col xs={10} md={10} className='blue-box'>
              <Content content={ parseMarkdown(quote_3) } />
            </Col>
          </Row>:''}
        </Col>) :''}

        {(graph1_check || graph2_check || graph3_check || graph4_check)?(<Col xs={12} md={12} className='report-section'>
          <h4>Latest media coverage on this organisation</h4>
          {graph1_check? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Fbk.png'/></Col>
            <Col xs={10} md={10}>
              <Row>
                <Col xs={2} md={2} className='key-figure'>{numberWithCommas(facebook_likes_number)}</Col>
                <Col xs={10} md={10}><strong>Facebook likes ({facebook_likes_date})</strong></Col>
              </Row>
            </Col>
          </Row>:''}
          {graph2_check? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Media.png'/></Col>
            <Col xs={10} md={10}>
              <h4>{media_article_1_title}</h4>
              <p><strong>{media_article_1_source}, {media_article_1_date}</strong></p>
              <Content content={ parseMarkdown(media_article_1_summary) } />
            </Col>
          </Row>:''}
          {graph3_check? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Media.png'/></Col>
            <Col xs={10} md={10}>
              <h4>{media_article_2_title}</h4>
              <p><strong>{media_article_2_source}, {media_article_2_date}</strong></p>
              <Content content={ parseMarkdown(media_article_2_summary) } />
            </Col>
          </Row>:''}
          {graph4_check? <Row>
            <Col xs={2} md={2}><ReportIconImage image='/Icon_Media.png'/></Col>
            <Col xs={10} md={10}>
              <h4>{media_article_3_title}</h4>
              <p><strong>{media_article_3_source}, {media_article_3_date}</strong></p>
              <Content content={ parseMarkdown(media_article_3_summary) } />
            </Col>
          </Row>:''}
        </Col>) :''}

        {commentary?(<Col xs={12} md={12} className='report-section opinion-box'>
          <h4>Just Cause believes that ... </h4>
          <Content content={ parseMarkdown(commentary) } />
        </Col>) :''}
        <div>.</div>
      </div>:<div></div>);
  }
}

ReportPanelReputation.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelReputation;
