import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Badges from './Badges';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'badges.insert': function badgesInsert(bdg) {
    check(bdg, {
      name: String,
      image: String,
    });

    try {
      return Badges.insert( bdg );
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'badges.update': function badgesUpdate(bdg) {
    check(bdg, {
      _id: String,
      name: String,
      image: String,
    });

    try {
      const badgeId = bdg._id;
      Badges.update(badgeId, { $set: bdg });
      return badgeId; // Return _id so we can redirect to badge after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'badges.remove': function badgesRemove(badgeId) {
    check(badgeId, String);

    try {
      return Badges.remove(badgeId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'badges.insert',
    'badges.update',
    'badges.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
