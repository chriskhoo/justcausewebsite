import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Services from '../Services';

Meteor.publish('services', function services() {
  return Services.find();
});

// Note: services.view is also used when editing an existing service.
Meteor.publish('services.view', function servicesView(serviceId) {
  check(serviceId, String);
  return Services.find({ _id: serviceId });
});
