/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';
import { numberWithCommas } from '../../../modules/get-form-elements'

import './ReportPanelReputation.scss';

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
        {(quote_1 || quote_2 || quote_3)?(<div className='report-section'>
          <h4>What do people who work with the organisation say?</h4>
          <p>JustCause asked five organisations who work regularly with them, what they think:</p>
          {quote_1? <div className='report-row'>
            <ReportIconImage image='/Icon_Quote.png' small/>
            <div className='blue-box text-beside'>
              <Content content={ parseMarkdown(quote_1) } />
            </div>
          </div>:''}
          {quote_2? <div className='report-row'>
            <div className='blue-box text-beside'>
              <Content content={ parseMarkdown(quote_2) } />
            </div>
            <ReportIconImage image='/Icon_Quote.png' small/>
          </div>:''}
          {quote_3? <div className='report-row'>
            <ReportIconImage image='/Icon_Quote.png' small/>
            <div className='blue-box text-beside'>
              <Content content={ parseMarkdown(quote_3) } />
            </div>
          </div>:''}
        </div>) :''}

        {(graph1_check || graph2_check || graph3_check || graph4_check)?(<div className='report-section'>
          <h4>Latest media coverage on this organisation</h4>
          {graph1_check? <div className='report-row'>
            <ReportIconImage image='/Icon_Facebook.png' small/>
            <div className='text-beside'>
              <div className='report-row'>
                <p className='key-figure'>{numberWithCommas(facebook_likes_number)}</p>
                <p className='text-beside'><strong>Facebook likes ({facebook_likes_date})</strong></p>
              </div>
            </div>
          </div>:''}
          {graph2_check? <div className='report-row'>
            <ReportIconImage image='/Icon_Media.png' small/>
            <div className='text-beside'>
              <h4>{media_article_1_title}</h4>
              <p><strong>{media_article_1_source}, {media_article_1_date}</strong></p>
              <Content content={ parseMarkdown(media_article_1_summary) } />
            </div>
          </div>:''}
          {graph3_check? <div className='report-row'>
            <ReportIconImage image='/Icon_Media.png' small/>
            <div className='text-beside'>
              <h4>{media_article_2_title}</h4>
              <p><strong>{media_article_2_source}, {media_article_2_date}</strong></p>
              <Content content={ parseMarkdown(media_article_2_summary) } />
            </div>
          </div>:''}
          {graph4_check? <div className='report-row'>
            <ReportIconImage image='/Icon_Media.png' small/>
            <div className='text-beside'>
              <h4>{media_article_3_title}</h4>
              <p><strong>{media_article_3_source}, {media_article_3_date}</strong></p>
              <Content content={ parseMarkdown(media_article_3_summary) } />
            </div>
          </div>:''}
        </div>) :''}

        {commentary?(<div className='report-section opinion-box'>
          <h4>Just Cause believes that ... </h4>
          <Content content={ parseMarkdown(commentary) } />
        </div>) :''}
      </div>:<div></div>);
  }
}

ReportPanelReputation.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelReputation;
