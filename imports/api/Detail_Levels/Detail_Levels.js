/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Detail_Levels = new Mongo.Collection('Detail_Levels');

Detail_Levels.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Detail_Levels.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Detail_Levels.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this detail_level was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this detail_level was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this detail_level was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the detail_level.',
  },
  body: {
    type: String,
    label: 'The body of the detail_level.',
  },
});

Detail_Levels.attachSchema(Detail_Levels.schema);

export default Detail_Levels;
