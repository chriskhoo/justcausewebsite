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
    optional: false,
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
    optional: false,
  },
  summary: {
    type: String,
    label: 'A summary extract of the article.',
    optional: false,
  },
  body: {
    type: String,
    label: 'The body of the article.',
    optional: false,
  },
  service_ids: {
    type: Array,
    minCount: 1,
    label: 'The list of services tagged to the report.',
  },
  "service_ids.$": {
    type: Object,
    label: 'The object of services tagged to the report.',
  },
  "service_ids.$._id": {
    type: String,
    label: 'The id of service tagged to the report.',
    optional: false,
  },
  "service_ids.$.name": {
    type: String,
    label: 'The name of service tagged to the report.',
    optional: false,
  },
  country_id: {
    type: Object,
    label: 'The country object tagged to the report.',
    optional: false,
  },
  "country_id._id": {
    type: String,
    label: 'The id of the country tagged to the report.',
    optional: false,
  },
  "country_id.name": {
    type: String,
    label: 'The name of the country tagged to the report.',
    optional: false,
  },
  target_group_ids: {
    type: Array,
    minCount: 1,
    label: 'The list of target_groups tagged to the report.',
  },
  "target_group_ids.$": {
    type: Object,
    label: 'The object of target_groups tagged to the report.',
    optional: false,
  },
  "target_group_ids.$._id": {
    type: String,
    label: 'The id of target_group tagged to the report.',
    optional: false,
  },
  "target_group_ids.$.name": {
    type: String,
    label: 'The name of target_group tagged to the report.',
    optional: false,
  },
  article_type_id: {
    type: Object,
    label: 'The article_type object tagged to the report.',
    optional: false,
  },
  "article_type_id._id": {
    type: String,
    label: 'The id of the article_type tagged to the report.',
    optional: false,
  },
  "article_type_id.name": {
    type: String,
    label: 'The name of the article_type tagged to the report.',
    optional: false,
  },
});

Articles.attachSchema(Articles.schema);

export default Articles;
