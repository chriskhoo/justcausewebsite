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
  name: {
    type: String,
    label: 'The name of the article_type.',
    optional: false,
  },
});

Article_Types.attachSchema(Article_Types.schema);

export default Article_Types;
