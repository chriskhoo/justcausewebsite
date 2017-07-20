import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Articles from '../Articles';

Meteor.publish('articles', function articles() {
  return Articles.find();
});

// Note: articles.view is also used when editing an existing article.
Meteor.publish('articles.view', function articlesView(articleId) {
  check(articleId, String);
  return Articles.find({ _id: articleId });
});

// Note: used by public, publishes only completed reports
Meteor.publish('articles.search', function (searchTerm) {
  check(searchTerm, Match.OneOf(String, null, undefined));
  let query = {};
  const projection = { limit: 10, sort: {title: 1} };

  if (searchTerm){
    const regex = new RegExp(searchTerm, 'i');
    query = {
      $or: [
        { summary: regex },
        { title: regex },
      ],
    };
    projection.limit = 100;
  }

  return Articles.find(query, projection);
});

// Note: used for finding related articles.
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
