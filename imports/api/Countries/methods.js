import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Countries from './Countries';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'countries.insert': function countriesInsert(ctry) {
    check(ctry, {
      title: String,
      body: String,
    });

    try {
      return Countries.insert({ author: this.userId, ...ctry });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'countries.update': function countriesUpdate(ctry) {
    check(ctry, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const countryId = ctry._id;
      Countries.update(countryId, { $set: ctry });
      return countryId; // Return _id so we can redirect to country after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'countries.remove': function countriesRemove(countryId) {
    check(countryId, String);

    try {
      return Countries.remove(countryId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'countries.insert',
    'countries.update',
    'countries.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
