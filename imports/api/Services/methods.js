import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Services from './Services';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'services.insert': function servicesInsert(svcs) {
    check(svcs, {
      name: String,
    });

    try {
      return Services.insert( svcs );
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'services.update': function servicesUpdate(svcs) {
    check(svcs, {
      _id: String,
      name: String,
    });

    try {
      const serviceId = svcs._id;
      Services.update(serviceId, { $set: svcs });
      return serviceId; // Return _id so we can redirect to service after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'services.remove': function servicesRemove(serviceId) {
    check(serviceId, String);

    try {
      return Services.remove(serviceId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'services.insert',
    'services.update',
    'services.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
