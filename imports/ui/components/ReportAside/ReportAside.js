/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements'

import './ReportAside.scss';

class ReportAside extends React.Component {
  render() {
    const { rept, chty, svcs, ctrys, t_grps, arts_rel } = this.props;
    const { name, target_group_ids, service_ids, country_id, program_id } = rept;
    const { website_link,  donation_link } = chty;
    const target_group_ids_tagged_array = extract_values(target_group_ids, '_id');
    const service_ids_tagged_array = extract_values(service_ids, '_id');
    return (rept?
      <div className='report-aside'>
        <div className='report-links'>
          <Button bsStyle='primary' href={website_link} >Go to Website</Button>
          <Button bsStyle='success' href={donation_link} >Click to Donate</Button>
        </div>
        <div className='report-aside-container'>
          <h4>{ program_id? 'Program' : 'Charity' } Tags</h4>
          <div className='report-tag-section'>
            <p><strong>Country:</strong></p>
            <div className='btn tag-button'>{country_id.name}</div>
          </div>
          <div className='report-tag-section'>
            <p><strong>Target Group:</strong></p>
            {t_grps.filter( ({_id})=> target_group_ids_tagged_array.includes(_id) ).map( (target_group) => <div key={target_group._id} className='btn tag-button'>{target_group.name}</div> )}
          </div>
          <div className='report-tag-section'>
            <p><strong>Service:</strong></p>
            {svcs.filter( ({_id})=> service_ids_tagged_array.includes(_id) ).map( (service) => <div key={service._id} className='btn tag-button'>{service.name}</div> )}
          </div>
        </div>
        <div className='report-aside-container'>
          <h4>Related Articles</h4>
          {arts_rel.map( (art)=> (
          <div key={art._id} className='related-row'>
            <div className='related-image'>
              <img alt='thumbnail' src={art.thumbnail} />
            </div>
            <div className='related-text'>
              <p>{art.title}</p>
            </div>
          </div>) )}
        </div>

      </div>: '');
  }
}

ReportAside.defaultProps = {

};

ReportAside.propTypes = {
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportAside;
