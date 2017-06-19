/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Articles = new Mongo.Collection('Articles');

Articles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Articles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Articles.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this article was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this article was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this article was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the article.',
  },
  body: {
    type: String,
    label: 'The body of the article.',
  },
});

Articles.attachSchema(Articles.schema);

export default Articles;
