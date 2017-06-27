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
  name: {
    type: String,
    label: 'The name of the badge.',
    optional: false,
  },
  image: {
    type: SimpleSchema.RegEx.Url,
    label: 'Link to the badge image.',
    optional: false,
  },
});

Badges.attachSchema(Badges.schema);

export default Badges;
