import React from 'react';
import PropTypes from 'prop-types';
import CharityEditor from '../../../components/CharityEditor/CharityEditor';

const NewCharity = ({ history }) => (
  <div className="NewCharity">
    <h4 className="page-header">New Charity</h4>
    <CharityEditor history={history} />
  </div>
);

NewCharity.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewCharity;
