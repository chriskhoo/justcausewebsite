/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './ReportCard.scss';

class ReportCard extends React.Component {
  render() {
    const { detail_level_name, _id, name, logo, description, history, match } = this.props;
    const url = (match.url == '/reports/results')? _id : `reports/${_id}`
    return(
      <div className="report_wrapper" key={_id}>
        <div className= {`report_card ${detail_level_name}`}>
          <div className={ `report_detail_level ${detail_level_name}`} >{detail_level_name}</div>
          <div className="thumbnail_custom"><img src={logo} alt={name+'logo'}/></div>
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
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ReportCard;
