/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements'

import './ViewTemplateAside.scss';

class ViewTemplateAside extends React.Component {
  render() {
    const { art, rept, chty, svcs, ctrys, t_grps, arts_rel, rpts_rel } = this.props;
    const { target_group_ids, service_ids, country_id, program_id } = rept || art || {};
    const { body } = art || {};
    const { website_link,  donation_link } = chty || {};
    const target_group_ids_tagged_array = extract_values(target_group_ids, '_id');
    const service_ids_tagged_array = extract_values(service_ids, '_id');
    const type = art? 'Article': (program_id? 'Program': 'Charity');
    return ( (art || rept)?
      <div className='view-template-aside'>
        { rept? <Row className='template-links'>
          <Col xs={6} md={6} >
            <Button bsStyle='primary' href={website_link} target="_blank" block>Go to website</Button>
          </Col>
          <Col xs={6} md={6} >
            <Button bsStyle='success' href={donation_link} target="_blank" block>Click to donate</Button>
          </Col>
        </Row> :
        <Row className='template-links'>
          <Col xs={12} md={12} >
            <Button bsStyle='primary' href={body} download block>Download image</Button>
          </Col>
        </Row> }
        <Row className='template-aside-container'>
          <Col xs={12} md={12}><h4>{ type } Tags</h4></Col>
          <Col xs={12} md={12} className='template-tag-section'>
            <p><strong>Country:</strong></p>
            <Col xs={12} md={12} className='tag-button'>{country_id.name}</Col>
          </Col>
          <Col xs={12} md={12} className='template-tag-section'>
            <p><strong>Target group:</strong></p>
            {t_grps.filter( ({_id})=> target_group_ids_tagged_array.includes(_id) ).map( (target_group) => <Col xs={6} md={4} key={target_group._id} className='tag-button'>{target_group.name}</Col> )}
          </Col>
          <Col xs={12} md={12} className='template-tag-section'>
            <p><strong>Service:</strong></p>
            {svcs.filter( ({_id})=> service_ids_tagged_array.includes(_id) ).map( (service) => <Col xs={6} md={4} key={service._id} className='tag-button'>{service.name}</Col> )}
          </Col>
        </Row>
        {arts_rel? <Row className='template-aside-container'>
          <h4>Related articles</h4>
          {arts_rel.map( (article)=> (
            <Col xs={12} md={12} key={article._id} className='related-row'>
              <Col xs={3} md={3} className='related-image'>
                <img alt='thumbnail' src={article.thumbnail} />
              </Col>
              <Col xs={9} md={9} className='related-text'>
                <p>{article.title}</p>
              </Col>
            </Col>) )}
          </Row> : ''}
          {rpts_rel? <Row className='template-aside-container'>
            <h4>Related charity reports</h4>
            {rpts_rel.map( (report)=> (
              <Col xs={12} md={12} key={report._id} className='related-row'>
                <Col xs={3} md={3} className='related-image'>
                  <img alt='thumbnail' src={report.logo} />
                </Col>
                <Col xs={9} md={9} className='related-text'>
                  <p>{report.name}</p>
                </Col>
              </Col>) )}
            </Row> : ''}
      </div>: <div></div>);
  }
}

ViewTemplateAside.propTypes = {
  art:PropTypes.object,
  rept: PropTypes.object,
  chty: PropTypes.object,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  arts_rel: PropTypes.arrayOf(PropTypes.object),
  rpts_rel: PropTypes.arrayOf(PropTypes.object),
};

export default ViewTemplateAside;
