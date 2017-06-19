import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Programs from './Programs';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'programs.insert': function programsInsert(prgm) {
    check(prgm, {
      title: String,
      body: String,
    });

    try {
      return Programs.insert({ author: this.userId, ...prgm });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'programs.update': function programsUpdate(prgm) {
    check(prgm, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const programId = prgm._id;
      Programs.update(programId, { $set: prgm });
      return programId; // Return _id so we can redirect to program after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'programs.remove': function programsRemove(programId) {
    check(programId, String);

    try {
      return Programs.remove(programId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'programs.insert',
    'programs.update',
    'programs.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
