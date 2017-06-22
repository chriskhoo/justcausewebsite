import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Article_Types from './Article_Types';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'article_types.insert': function article_typesInsert(a_type) {
    check(a_type, {
      name: String,
    });

    try {
      return Article_Types.insert(a_type);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'article_types.update': function article_typesUpdate(a_type) {
    check(a_type, {
      _id: String,
      name: String,
    });

    try {
      const article_typeId = a_type._id;
      Article_Types.update(article_typeId, { $set: a_type });
      return article_typeId; // Return _id so we can redirect to article_type after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'article_types.remove': function article_typesRemove(article_typeId) {
    check(article_typeId, String);

    try {
      return Article_Types.remove(article_typeId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'article_types.insert',
    'article_types.update',
    'article_types.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
