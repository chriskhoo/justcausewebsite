import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Charities from '../../../../api/Charities/Charities';
import CharityEditor from '../../../components/CharityEditor/CharityEditor';
import NotFound from '../../NotFound/NotFound';

const EditCharity = ({ chty, history }) => (chty ? (
  <div className="EditCharity">
    <h4 className="page-header">{`Editing "${chty.title}"`}</h4>
    <CharityEditor chty={chty} history={history} />
  </div>
) : <NotFound />);

EditCharity.propTypes = {
  chty: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const charityId = match.params._id;
  const subscription = Meteor.subscribe('charities.view', charityId);

  return {
    loading: !subscription.ready(),
    chty: Charities.findOne(charityId),
  };
}, EditCharity);
