import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Article_Types from '../Article_Types';

Meteor.publish('article_types', function article_types() {
  return Article_Types.find();
});

// Note: article_types.view is also used when editing an existing article_type.
Meteor.publish('article_types.view', function article_typesView(article_typeId) {
  check(article_typeId, String);
  return Article_Types.find({ _id: article_typeId });
});
