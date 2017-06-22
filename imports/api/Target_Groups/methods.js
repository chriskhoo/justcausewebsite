import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Target_Groups from './Target_Groups';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'target_groups.insert': function target_groupsInsert(t_grp) {
    check(t_grp, {
      name: String,
    });

    try {
      return Target_Groups.insert( t_grp );
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'target_groups.update': function target_groupsUpdate(t_grp) {
    check(t_grp, {
      _id: String,
      name: String,
    });

    try {
      const target_groupId = t_grp._id;
      Target_Groups.update(target_groupId, { $set: t_grp });
      return target_groupId; // Return _id so we can redirect to target_group after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'target_groups.remove': function target_groupsRemove(target_groupId) {
    check(target_groupId, String);

    try {
      return Target_Groups.remove(target_groupId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'target_groups.insert',
    'target_groups.update',
    'target_groups.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
