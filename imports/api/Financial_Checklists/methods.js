import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Financial_Checklists from './Financial_Checklists';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'financial_checklists.insert': function financial_checklistsInsert(f_check) {
    check(f_check, {
      description: String,
    });

    try {
      const firstname = Meteor.user().profile.name.first;
      return Financial_Checklists.insert({ author: firstname, ...f_check });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'financial_checklists.update': function financial_checklistsUpdate(f_check) {
    check(f_check, {
      _id: String,
      description: String,
    });

    try {
      const financial_checklistId = f_check._id;
      f_check.author = Meteor.user().profile.name.first;
      Financial_Checklists.update(financial_checklistId, { $set: f_check });
      return financial_checklistId; // Return _id so we can redirect to financial_checklist after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'financial_checklists.remove': function financial_checklistsRemove(financial_checklistId) {
    check(financial_checklistId, String);

    try {
      return Financial_Checklists.remove(financial_checklistId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'financial_checklists.insert',
    'financial_checklists.update',
    'financial_checklists.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
