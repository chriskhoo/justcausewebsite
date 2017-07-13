import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Reports from './Reports';
import rateLimit from '../../modules/rate-limit';

const checkObject = {
  service_ids: Array,
  country_id: Object,
  target_group_ids: Array,
  detail_level_id: Object,
  description: String, // note this is a derived field
  name: String, // note this is a derived field
  logo: String, // note this is a derived field
  charity_id: String,
  type:  String,
  completed: Boolean,
  impact_info: Match.Optional(Object),
  program_id: Match.Optional(String),
}

let checkObjectID = Object.assign({}, checkObject);
checkObjectID._id = String;

Meteor.methods({
  'reports.insert': function reportsInsert(rept) {
    check(rept, checkObject);
    try {
      return Reports.insert({ author: this.userId, ...rept });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'reports.update': function reportsUpdate(rept) {
    check(rept, checkObjectID);
    try {
      const reportId = rept._id;
      Reports.update(reportId, { $set: rept });
      return reportId; // Return _id so we can redirect to report after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'reports.remove': function reportsRemove(reportId) {
    check(reportId, String);
    try {
      return Reports.remove(reportId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'reports.insert',
    'reports.update',
    'reports.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
