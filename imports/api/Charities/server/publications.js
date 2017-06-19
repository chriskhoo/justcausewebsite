import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Charities from '../Charities';

Meteor.publish('charities', function charities() {
  return Charities.find();
});

// Note: charities.view is also used when editing an existing charity.
Meteor.publish('charities.view', function charitiesView(charityId) {
  check(charityId, String);
  return Charities.find({ _id: charityId });
});
