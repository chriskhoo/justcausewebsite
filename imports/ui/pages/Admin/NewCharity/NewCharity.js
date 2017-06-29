import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Loading from '../../../components/Loading/Loading';
import CharityEditor from '../../../components/CharityEditor/CharityEditor';
import BadgesCollection from '../../../../api/Badges/Badges';
import Financial_ChecklistsCollection from '../../../../api/Financial_Checklists/Financial_Checklists';
import Governance_ChecklistsCollection from '../../../../api/Governance_Checklists/Governance_Checklists';

const NewCharity = ({ history, loading, bdgs, f_checks, g_checks }) => (
  !loading ? (
    <div className="NewCharity">
      <h4 className="page-header">New Charity</h4>
      <CharityEditor
        history={history}
        bdgs={bdgs}
        f_checks = {f_checks}
        g_checks = {g_checks} />
    </div>
  ) : <Loading />
);

NewCharity.propTypes = {
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  f_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
  g_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const bdgsSubscription = Meteor.subscribe('badges');
  const f_checksSubscription = Meteor.subscribe('financial_checklists');
  const g_checksSubscription = Meteor.subscribe('governance_checklists');
  return {
    loading: !bdgsSubscription.ready() || !f_checksSubscription.ready() || !g_checksSubscription.ready(),
    bdgs: BadgesCollection.find().fetch(),
    f_checks: Financial_ChecklistsCollection.find().fetch(),
    g_checks: Governance_ChecklistsCollection.find().fetch(),
  };
}, NewCharity);
