import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Governance_Checklists from '../../../../api/Governance_Checklists/Governance_Checklists';
import Governance_ChecklistEditor from '../../../components/Governance_ChecklistEditor/Governance_ChecklistEditor';
import NotFound from '../../NotFound/NotFound';

const EditGovernance_Checklist = ({ g_check, history }) => (g_check ? (
  <div className="EditGovernance_Checklist">
    <h4 className="page-header">{`Editing "${g_check.title}"`}</h4>
    <Governance_ChecklistEditor g_check={g_check} history={history} />
  </div>
) : <NotFound />);

EditGovernance_Checklist.propTypes = {
  g_check: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const governance_checklistId = match.params._id;
  const subscription = Meteor.subscribe('governance_checklists.view', governance_checklistId);

  return {
    loading: !subscription.ready(),
    g_check: Governance_Checklists.findOne(governance_checklistId),
  };
}, EditGovernance_Checklist);
