import React from 'react';
import PropTypes from 'prop-types';
import ServiceEditor from '../../../components/ServiceEditor/ServiceEditor';

const NewService = ({ history }) => (
  <div className="NewService">
    <h4 className="page-header">New Service</h4>
    <ServiceEditor history={history} />
  </div>
);

NewService.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewService;
