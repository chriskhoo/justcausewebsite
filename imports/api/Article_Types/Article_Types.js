/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Article_Types = new Mongo.Collection('Article_Types');

Article_Types.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Article_Types.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Article_Types.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this article_type was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this article_type was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this article_type was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the article_type.',
  },
  body: {
    type: String,
    label: 'The body of the article_type.',
  },
});

Article_Types.attachSchema(Article_Types.schema);

export default Article_Types;
