import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import CharityEditor from '../../../components/CharityEditor/CharityEditor';
import CharitiesCollection from '../../../../api/Charities/Charities';
import BadgesCollection from '../../../../api/Badges/Badges';
import Financial_ChecklistsCollection from '../../../../api/Financial_Checklists/Financial_Checklists';
import Governance_ChecklistsCollection from '../../../../api/Governance_Checklists/Governance_Checklists';

const renderEditCharity = ( history, chty, bdgs, f_checks, g_checks ) => (chty ? (
  <div className="EditCharity">
    <h4 className="page-header">{`Editing "${chty.name}"`}</h4>
    <CharityEditor
      chty={chty}
      history={history}
      bdgs={bdgs}
      f_checks={f_checks}
      g_checks={g_checks}
    />
  </div>
) : <NotFound />);

const EditCharity = ({ loading, history, chty, bdgs, f_checks, g_checks }) => (
  !loading ?  renderEditCharity( history, chty, bdgs, f_checks, g_checks ) : <Loading /> );

EditCharity.propTypes = {
  chty: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  f_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
  g_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(({ match }) => {
  const charityId = match.params._id;
  const chtySubscription = Meteor.subscribe('charities.view', charityId);
  const bdgsSubscription = Meteor.subscribe('badges');
  const f_checksSubscription = Meteor.subscribe('financial_checklists');
  const g_checksSubscription = Meteor.subscribe('governance_checklists');
  return {
    loading: !chtySubscription.ready() || !bdgsSubscription.ready() || !f_checksSubscription.ready() || !g_checksSubscription.ready(),
    chty: CharitiesCollection.findOne(charityId),
    bdgs: BadgesCollection.find().fetch(),
    f_checks: Financial_ChecklistsCollection.find().fetch(),
    g_checks: Governance_ChecklistsCollection.find().fetch(),
  };
}, EditCharity);
