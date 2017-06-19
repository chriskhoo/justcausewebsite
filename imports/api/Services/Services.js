/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Services = new Mongo.Collection('Services');

Services.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Services.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Services.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this service was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this service was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this service was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the service.',
  },
  body: {
    type: String,
    label: 'The body of the service.',
  },
});

Services.attachSchema(Services.schema);

export default Services;
