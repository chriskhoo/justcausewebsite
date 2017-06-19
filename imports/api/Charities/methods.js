import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Charities from './Charities';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'charities.insert': function charitiesInsert(chty) {
    check(chty, {
      title: String,
      body: String,
    });

    try {
      return Charities.insert({ author: this.userId, ...chty });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'charities.update': function charitiesUpdate(chty) {
    check(chty, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const charityId = chty._id;
      Charities.update(charityId, { $set: chty });
      return charityId; // Return _id so we can redirect to charity after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'charities.remove': function charitiesRemove(charityId) {
    check(charityId, String);

    try {
      return Charities.remove(charityId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'charities.insert',
    'charities.update',
    'charities.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
