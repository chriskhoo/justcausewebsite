/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { extract_values } from '../../../modules/get-form-elements'
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

import './ReportPanelStrategy.scss';

class ReportPanelStrategy extends React.Component {
  render() {
    const { chty, bdgs } = this.props;
    const { badges_awarded, strategy } = chty ;
    const badges_awarded_id_array = extract_values(badges_awarded, '_id');
    return (
      <div className='report-panel-strategy'>
        { (strategy)?
        <div className='report-section'>
          <h4>This charity really invests in: </h4>
          <Content content={ parseMarkdown(strategy) } />
        </div> : '' }
        { (badges_awarded && (badges_awarded.length> 0) )?
        <div className='report-section'>
          <h4>Badges awarded to this charity: </h4>
          {bdgs.filter( ({_id})=> badges_awarded_id_array.includes(_id) ).map( (badge) => (<div className='report-row' key={badge._id} >
            <ReportIconImage image={badge.image} small/>
            <div className='text-beside'>
              <p><strong>{badge.name}</strong></p>
              <Content content={ parseMarkdown(badges_awarded.filter((badge_awarded)=>badge_awarded._id == badge._id)[0].reason ) } />
            </div>
          </div>) )}
        </div> : '' }
      </div>);
  }
}

ReportPanelStrategy.propTypes = {
  chty: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportPanelStrategy;
