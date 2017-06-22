import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Governance_Checklists from './Governance_Checklists';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'governance_checklists.insert': function governance_checklistsInsert(g_check) {
    check(g_check, {
      description: String,
    });

    try {
      const firstname = Meteor.user().profile.name.first;
      return Governance_Checklists.insert({ author: firstname, ...g_check });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'governance_checklists.update': function governance_checklistsUpdate(g_check) {
    check(g_check, {
      _id: String,
      description: String,
    });

    try {
      const governance_checklistId = g_check._id;
      g_check.author = Meteor.user().profile.name.first;
      Governance_Checklists.update(governance_checklistId, { $set: g_check });
      return governance_checklistId; // Return _id so we can redirect to governance_checklist after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'governance_checklists.remove': function governance_checklistsRemove(governance_checklistId) {
    check(governance_checklistId, String);

    try {
      return Governance_Checklists.remove(governance_checklistId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'governance_checklists.insert',
    'governance_checklists.update',
    'governance_checklists.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
