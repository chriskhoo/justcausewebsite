/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

class ReportPanelOpinion extends React.Component {
  render() {
    const { chty } = this.props;
    const { jc_opinion_justcauseloves, jc_opinion_donate_if, jc_opinion_broadentheirwork, jc_opinion_strengthentheteam } = chty || {};
    return ((chty)?
      <div className='report-panel-opinion'>
        {(jc_opinion_justcauseloves)?(<div className='report-section'>
          <div className='report-row'>
            <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' small/>
            <div className='opinion-box text-beside'>
              <h4>Just Cause loves this charity</h4>
              <Content content={ parseMarkdown(jc_opinion_justcauseloves) } />
            </div>
          </div>
        </div>) :''}
        {(jc_opinion_donate_if)?(<div className='report-section'>
          <div className='report-row'>
            <div className='opinion-box text-beside'>
              <h4>Donate to this charity if you ... </h4>
              <Content content={ parseMarkdown(jc_opinion_donate_if) } />
            </div>
            <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' small/>
          </div>
        </div>) :''}
        {(jc_opinion_broadentheirwork || jc_opinion_strengthentheteam)?(<div className='report-section'>
          <div className='report-row'>
            <ReportIconImage image='https://s-media-cache-ak0.pinimg.com/236x/29/00/cf/2900cfd430da55d24dac8d77256c694b--ninjas.jpg' small />
            <div className='opinion-box text-beside'>
              <h4>How we think your support can help this charity ... </h4>
              {jc_opinion_broadentheirwork? <div className='report-section'>
                <p>Broaden and deepen their work:</p>
                <Content content={ parseMarkdown(jc_opinion_broadentheirwork) } />
              </div>:''}
              {jc_opinion_strengthentheteam? <div className='report-section'>
                <p>Further strengthen the team’s own capacity, in particular:</p>
                <Content content={ parseMarkdown(jc_opinion_strengthentheteam) } />
              </div>:''}
            </div>
          </div>
        </div>) :''}
      </div>:<div></div>);
  }
}

ReportPanelOpinion.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelOpinion;
