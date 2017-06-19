import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Countries from '../Countries';

Meteor.publish('countries', function countries() {
  return Countries.find();
});

// Note: countries.view is also used when editing an existing country.
Meteor.publish('countries.view', function countriesView(countryId) {
  check(countryId, String);
  return Countries.find({ _id: countryId });
});
