import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Articles from '../Articles';

Meteor.publish('articles', function articles() {
  return Articles.find();
});

// Note: articles.view is also used when editing an existing article.
Meteor.publish('articles.view', function articlesView(articleId) {
  check(articleId, String);
  return Articles.find({ _id: articleId }, {sort: {updatedAt: -1}});
});

// Note: used by public, publishes only completed reports
Meteor.publish('articles.search', function (searchTerm) {
  check(searchTerm, Match.OneOf(String, null, undefined));
  let query = {};
  const projection = { sort: {updatedAt: -1} };

  if (searchTerm){
    const regex = new RegExp(searchTerm, 'i');
    query = {
      $or: [
        { summary: regex },
        { title: regex },
        { 'country_id.name': regex },
        { 'article_type_id.name': regex },
        { 'service_ids.name': regex },
        { 'target_group_ids.name': regex }
      ],
    };
    projection.limit = 100;
  }

  return Articles.find(query, projection);
});

// Note: used for finding articles related to reports.
Meteor.publish('articles.related', function articlesRelated(target_groups, services) {
  check(target_groups, Array);
  check(services, Array);
  let query = {};
  if(target_groups.length+services.length){
    query = {
      $or: [
        { 'service_ids._id': { $in: services} },
        { 'target_group_ids._id': {$in: target_groups} },
      ],
    };
  }
  return Articles.find(query, { limit: 6 });
});
