import React from 'react';
import PropTypes from 'prop-types';
import CountryEditor from '../../../components/CountryEditor/CountryEditor';

const NewCountry = ({ history }) => (
  <div className="NewCountry">
    <h4 className="page-header">New Country</h4>
    <CountryEditor history={history} />
  </div>
);

NewCountry.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewCountry;
