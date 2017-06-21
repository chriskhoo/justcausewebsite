/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Countries = new Mongo.Collection('Countries');

Countries.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Countries.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Countries.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this report was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this report was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'The name of the article_type.',
  },
});

Countries.attachSchema(Countries.schema);

export default Countries;
