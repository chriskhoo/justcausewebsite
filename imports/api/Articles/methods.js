import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Articles from './Articles';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'articles.insert': function articlesInsert(art) {
    check(art, {
      title: String,
      body: String,
    });

    try {
      return Articles.insert({ author: this.userId, ...art });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'articles.update': function articlesUpdate(art) {
    check(art, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const articleId = art._id;
      Articles.update(articleId, { $set: art });
      return articleId; // Return _id so we can redirect to article after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'articles.remove': function articlesRemove(articleId) {
    check(articleId, String);

    try {
      return Articles.remove(articleId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'articles.insert',
    'articles.update',
    'articles.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
