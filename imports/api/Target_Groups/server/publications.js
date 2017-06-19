import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Target_Groups from '../Target_Groups';

Meteor.publish('target_groups', function target_groups() {
  return Target_Groups.find();
});

// Note: target_groups.view is also used when editing an existing target_group.
Meteor.publish('target_groups.view', function target_groupsView(target_groupId) {
  check(target_groupId, String);
  return Target_Groups.find({ _id: target_groupId });
});
