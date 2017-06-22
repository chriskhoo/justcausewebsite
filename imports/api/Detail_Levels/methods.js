import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Detail_Levels from './Detail_Levels';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'detail_levels.insert': function detail_levelsInsert(d_level) {
    check(d_level, {
      name: String,
    });

    try {
      return Detail_Levels.insert( d_level );
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'detail_levels.update': function detail_levelsUpdate( d_level ) {
    check(d_level, {
      _id: String,
      name: String,
    });

    try {
      const detail_levelId = d_level._id;
      Detail_Levels.update(detail_levelId, { $set: d_level });
      return detail_levelId; // Return _id so we can redirect to detail_level after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'detail_levels.remove': function detail_levelsRemove(detail_levelId) {
    check(detail_levelId, String);

    try {
      return Detail_Levels.remove(detail_levelId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'detail_levels.insert',
    'detail_levels.update',
    'detail_levels.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
