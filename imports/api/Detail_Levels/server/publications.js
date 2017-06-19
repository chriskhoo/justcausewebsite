import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Detail_Levels from '../Detail_Levels';

Meteor.publish('detail_levels', function detail_levels() {
  return Detail_Levels.find();
});

// Note: detail_levels.view is also used when editing an existing detail_level.
Meteor.publish('detail_levels.view', function detail_levelsView(detail_levelId) {
  check(detail_levelId, String);
  return Detail_Levels.find({ _id: detail_levelId });
});
