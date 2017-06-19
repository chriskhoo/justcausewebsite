/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Charities = new Mongo.Collection('Charities');

Charities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Charities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Charities.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this charity was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this charity was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this charity was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the charity.',
  },
  body: {
    type: String,
    label: 'The body of the charity.',
  },
});

Charities.attachSchema(Charities.schema);

export default Charities;
