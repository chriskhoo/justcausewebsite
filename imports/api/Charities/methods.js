import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Charities from './Charities';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'charities.insert': function charitiesInsert(chty) {
    check(chty, {
      name: String,
      year_established: String,
      website_link:  String,
      donation_link: Match.Optional(String),
      logo: String,
      summary: String,
      revenue_model: String,
      religious_affiliation: String,
      registration_status: String,
      jc_opinion_justcauseloves: Match.Optional([String]),
      jc_opinion_donate_if: Match.Optional([String]),
      jc_opinion_broadentheirwork: Match.Optional([String]),
      jc_opinion_strengthentheteam: Match.Optional([String]),
      badges_awarded: Match.Optional([String]),
      programs: Match.Optional([String]),
      staff_info: Match.Optional(Object),
      reputation_info: Object,
      leadership_info: Object,
      financial_info: Object,
    });

    try {
      return Charities.insert({ author: this.userId, ...chty });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'charities.update': function charitiesUpdate(chty) {
    check(chty, {
      _id: String,
      name: String,
      year_established: String,
      website_link:  String,
      donation_link: Match.Optional(String),
      logo: String,
      summary: String,
      revenue_model: String,
      religious_affiliation: String,
      registration_status: String,
      jc_opinion_justcauseloves: Match.Optional([String]),
      jc_opinion_donate_if: Match.Optional([String]),
      jc_opinion_broadentheirwork: Match.Optional([String]),
      jc_opinion_strengthentheteam: Match.Optional([String]),
      badges_awarded: Match.Optional([String]),
      programs: Match.Optional([String]),
      staff_info: Match.Optional(Object),
      reputation_info: Object,
      leadership_info: Object,
      financial_info: Object,
    });

    try {
      const charityId = chty._id;
      Charities.update(charityId, { $set: chty });
      return charityId; // Return _id so we can redirect to charity after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'charities.remove': function charitiesRemove(charityId) {
    check(charityId, String);

    try {
      return Charities.remove(charityId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'charities.insert',
    'charities.update',
    'charities.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
