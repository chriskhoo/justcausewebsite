/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Target_Groups = new Mongo.Collection('Target_Groups');

Target_Groups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Target_Groups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Target_Groups.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this target_group was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this target_group was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this target_group was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the target_group.',
  },
  body: {
    type: String,
    label: 'The body of the target_group.',
  },
});

Target_Groups.attachSchema(Target_Groups.schema);

export default Target_Groups;
