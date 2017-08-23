/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements'
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

class ReportPanelStrategy extends React.Component {
  render() {
    const { chty, bdgs } = this.props;
    const { badges_awarded, strategy } = chty ;
    const badges_awarded_id_array = extract_values(badges_awarded, '_id');
    return (
      <div className='report-panel-strategy'>
        { (strategy)?
        <Col xs={12} md={12} className='report-section'>
          <h4>This charity really invests in: </h4>
          <Content content={ parseMarkdown(strategy) } />
        </Col> : '' }
        { (badges_awarded && (badges_awarded.length> 0) )?
        <Col xs={12} md={12} className='report-section'>
          <h4>The following characteristics really stood out when reviewing this organisation:</h4>
          {bdgs.filter( ({_id})=> badges_awarded_id_array.includes(_id) ).map( (badge) => (<Row key={badge._id} >
            <Col xs={3} md={3}><ReportIconImage image={badge.image}/></Col>
            <Col xs={9} md={9}>
              <p><strong>{badge.name}</strong></p>
              <Content content={ parseMarkdown(badges_awarded.filter((badge_awarded)=>badge_awarded._id == badge._id)[0].reason ) } />
            </Col>
          </Row>) )}
        </Col> : '' }
        <div>.</div>
      </div>);
  }
}

ReportPanelStrategy.propTypes = {
  chty: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportPanelStrategy;
