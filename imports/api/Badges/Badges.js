/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Badges = new Mongo.Collection('Badges');

Badges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Badges.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Badges.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this badge was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this badge was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this badge was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the badge.',
  },
  body: {
    type: String,
    label: 'The body of the badge.',
  },
});

Badges.attachSchema(Badges.schema);

export default Badges;
