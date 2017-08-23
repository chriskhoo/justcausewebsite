/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements';
import ReportIconImage from '../ReportIconImage/ReportIconImage';

import './ReportCard.scss';

class ReportCard extends React.Component {
  render() {
    const { detail_level_name, _id, charity_id, name, logo, description, target_group_ids, service_ids, history, match } = this.props;
    target_group_ids_array = extract_values(target_group_ids, '_id').toString();
    service_ids_array = extract_values(service_ids, '_id').toString();
    const url = (match.url == '/reports/results')? `${_id}?charity_id=${charity_id}&target_groups=${target_group_ids_array}&services=${service_ids_array}` : `reports/${_id}?charity_id=${charity_id}&target_groups=${target_group_ids_array}&services=${service_ids_array}`
    return(
      <div className="report_wrapper" key={_id}>
        <div className= {`report_card ${detail_level_name}`}>
          <div className={ `report_detail_level ${detail_level_name}`} >{detail_level_name}</div>
          <ReportIconImage image={logo} alt={name+' logo'}/>
          <h4>{name}</h4>
          <p>{description}</p>
          <Button
            bsStyle="success"
            onClick={() => history.push(url)}
            block
            >Details</Button>
        </div>
      </div>
    );
  }
}

ReportCard.propTypes = {
  detail_level_name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  charity_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  target_group_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
  service_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ReportCard;
