import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Badges from '../../../../api/Badges/Badges';
import BadgeEditor from '../../../components/BadgeEditor/BadgeEditor';
import NotFound from '../../NotFound/NotFound';

const EditBadge = ({ bdg, history }) => (bdg ? (
  <div className="EditBadge">
    <h4 className="page-header">{`Editing "${bdg.title}"`}</h4>
    <BadgeEditor bdg={bdg} history={history} />
  </div>
) : <NotFound />);

EditBadge.propTypes = {
  bdg: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const badgeId = match.params._id;
  const subscription = Meteor.subscribe('badges.view', badgeId);

  return {
    loading: !subscription.ready(),
    bdg: Badges.findOne(badgeId),
  };
}, EditBadge);
