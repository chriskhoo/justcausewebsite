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
  let query = { completed: true };
  const projection = { sort: {title: 1} };

  if (searchTerm){
    const regex = new RegExp(searchTerm, 'i');
    query = {
      $and: [
        { $or: [
          { description: regex },
          { name: regex },
          { 'country_id.name': regex },
          { 'detail_level_id.name': regex },
          { 'service_ids.name': regex },
          { 'target_group_ids.name': regex }
        ]},
        { completed: true }
      ]
    };
    projection.limit = 40;
  }

  return Reports.find(query, projection);
});

// Note: used by public, publishes only completed reports
Meteor.publish('reports.public.view', function reportsView(reportId) {
  check(reportId, String);
  return Reports.find({ _id: reportId, completed: true });
});

// Note: used for finding reports related to articles.
Meteor.publish('reports.related', function articlesRelated(target_groups, services) {
  check(target_groups, Array);
  check(services, Array);
  let query = { completed: true };
  if(target_groups.length+services.length){
    query = {
      $and: [
        { $or: [ { 'service_ids._id': { $in: services} }, { 'target_group_ids._id': {$in: target_groups} } ]},
        { completed: true }
      ]
    };
  }
  return Reports.find(query, { limit: 6 });
});
