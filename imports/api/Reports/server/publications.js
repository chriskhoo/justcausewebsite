import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Reports from '../Reports';

Meteor.publish('reports', function reports() {
  return Reports.find();
});

// Note: reports.view is also used when editing an existing report.
Meteor.publish('reports.view', function reportsView(reportId) {
  check(reportId, String);
  return Reports.find({ _id: reportId });
});

// Note: used by public, publishes only completed reports
Meteor.publish('reports.public', function reports() {
  return Reports.find({ completed: true }, {sort: {updatedAt: -1}});
});

// Note: used by public, publishes only completed reports
Meteor.publish('reports.search', function (searchTerm) {
  check(searchTerm, Match.OneOf(String, null, undefined));
  let query = {};
  const projection = { limit: 10, sort: {title: 1} };

  if (searchTerm){
    const regex = new RegExp(searchTerm, 'i');
    query = {
      $or: [
        { description: regex },
        { name: regex },
      ],
    };
    projection.limit = 100;
  }

  return Reports.find(query, projection);
});

// Note: used by public, publishes only completed reports
Meteor.publish('reports.public.view', function reportsView(reportId) {
  check(reportId, String);

  return Reports.find({ _id: reportId, completed: true });
});
