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
  name: {
    type: String,
    label: 'The name of the article_type.',
  },
});

Detail_Levels.attachSchema(Detail_Levels.schema);

export default Detail_Levels;
