import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Programs from '../Programs';

Meteor.publish('programs', function programs() {
  return Programs.find();
});

// Note: programs.view is also used when editing an existing program.
Meteor.publish('programs.view', function programsView(programId) {
  check(programId, String);
  return Programs.find({ _id: programId });
});
