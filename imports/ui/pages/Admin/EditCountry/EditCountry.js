import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Countries from '../../../../api/Countries/Countries';
import CountryEditor from '../../../components/CountryEditor/CountryEditor';
import NotFound from '../../NotFound/NotFound';

const EditCountry = ({ ctry, history }) => (ctry ? (
  <div className="EditCountry">
    <h4 className="page-header">{`Editing "${ctry.title}"`}</h4>
    <CountryEditor ctry={ctry} history={history} />
  </div>
) : <NotFound />);

EditCountry.propTypes = {
  ctry: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const countryId = match.params._id;
  const subscription = Meteor.subscribe('countries.view', countryId);

  return {
    loading: !subscription.ready(),
    ctry: Countries.findOne(countryId),
  };
}, EditCountry);
