import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Reports from './Reports';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'reports.insert': function reportsInsert(rept) {
    check(rept, {
      title: String,
      body: String,
    });

    try {
      return Reports.insert({ author: this.userId, ...rept });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'reports.update': function reportsUpdate(rept) {
    check(rept, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const reportId = rept._id;
      Reports.update(reportId, { $set: rept });
      return reportId; // Return _id so we can redirect to report after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'reports.remove': function reportsRemove(reportId) {
    check(reportId, String);

    try {
      return Reports.remove(reportId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'reports.insert',
    'reports.update',
    'reports.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
