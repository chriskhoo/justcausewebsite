import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Governance_Checklists from '../Governance_Checklists';

Meteor.publish('governance_checklists', function governance_checklists() {
  return Governance_Checklists.find();
});

// Note: governance_checklists.view is also used when editing an existing governance_checklist.
Meteor.publish('governance_checklists.view', function governance_checklistsView(governance_checklistId) {
  check(governance_checklistId, String);
  return Governance_Checklists.find({ _id: governance_checklistId });
});
