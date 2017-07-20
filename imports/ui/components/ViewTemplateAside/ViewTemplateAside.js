/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements'

import './ViewTemplateAside.scss';

class ViewTemplateAside extends React.Component {
  render() {
    const { art, rept, chty, svcs, ctrys, t_grps, arts_rel, rpts_rel } = this.props;
    const { target_group_ids, service_ids, country_id, program_id } = rept || art || {};
    const { website_link,  donation_link } = chty || {};
    const target_group_ids_tagged_array = extract_values(target_group_ids, '_id');
    const service_ids_tagged_array = extract_values(service_ids, '_id');
    const type = art? 'Article': (program_id? 'Program': 'Charity');
    return ( (art || rept)?
      <div className='view-template-aside'>
        { rept? <div className='template-links'>
          <Button bsStyle='primary' href={website_link} >Go to website</Button>
          <Button bsStyle='success' href={donation_link} >Click to donate</Button>
        </div> : '' }

        <div className='template-aside-container'>
          <h4>{ type } Tags</h4>
          <div className='template-tag-section'>
            <p><strong>Country:</strong></p>
            <div className='btn tag-button'>{country_id.name}</div>
          </div>
          <div className='template-tag-section'>
            <p><strong>Target group:</strong></p>
            {t_grps.filter( ({_id})=> target_group_ids_tagged_array.includes(_id) ).map( (target_group) => <div key={target_group._id} className='btn tag-button'>{target_group.name}</div> )}
          </div>
          <div className='template-tag-section'>
            <p><strong>Service:</strong></p>
            {svcs.filter( ({_id})=> service_ids_tagged_array.includes(_id) ).map( (service) => <div key={service._id} className='btn tag-button'>{service.name}</div> )}
          </div>
        </div>

        {arts_rel? <div className='template-aside-container'>
          <h4>Related articles</h4>
          {arts_rel.map( (article)=> (
          <div key={article._id} className='related-row'>
            <div className='related-image'>
              <img alt='thumbnail' src={article.thumbnail} />
            </div>
            <div className='related-text'>
              <p>{article.title}</p>
            </div>
          </div>) )}
        </div> : ''}

        {rpts_rel? <div className='template-aside-container'>
          <h4>Related charity reports</h4>
          {rpts_rel.map( (report)=> (
          <div key={report._id} className='related-row'>
            <div className='related-image'>
              <img alt='thumbnail' src={report.logo} />
            </div>
            <div className='related-text'>
              <p>{report.name}</p>
            </div>
          </div>) )}
        </div> : ''}

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
