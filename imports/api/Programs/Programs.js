/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Programs = new Mongo.Collection('Programs');

Programs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Programs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Programs.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this program was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this program was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this program was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the program.',
  },
  body: {
    type: String,
    label: 'The body of the program.',
  },
});

Programs.attachSchema(Programs.schema);

export default Programs;
