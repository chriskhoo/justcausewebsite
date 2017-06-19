import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Badges from '../Badges';

Meteor.publish('badges', function badges() {
  return Badges.find();
});

// Note: badges.view is also used when editing an existing badge.
Meteor.publish('badges.view', function badgesView(badgeId) {
  check(badgeId, String);
  return Badges.find({ _id: badgeId });
});
