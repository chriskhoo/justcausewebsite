import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Reports from '../Reports';

Meteor.publish('reports', function reports() {
  return Reports.find();
});

// Note: reports.view is also used when editing an existing report.
Meteor.publish('reports.view', function reportsView(reportId) {
  check(reportId, String);
  return Reports.find({ _id: reportId });
});
