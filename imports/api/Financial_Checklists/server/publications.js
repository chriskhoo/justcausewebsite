import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Financial_Checklists from '../Financial_Checklists';

Meteor.publish('financial_checklists', function financial_checklists() {
  return Financial_Checklists.find();
});

// Note: financial_checklists.view is also used when editing an existing financial_checklist.
Meteor.publish('financial_checklists.view', function financial_checklistsView(financial_checklistId) {
  check(financial_checklistId, String);
  return Financial_Checklists.find({ _id: financial_checklistId });
});
