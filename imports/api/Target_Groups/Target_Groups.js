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
  name: {
    type: String,
    label: 'The name of the article_type.',
    optional: false,
  },
});

Target_Groups.attachSchema(Target_Groups.schema);

export default Target_Groups;
