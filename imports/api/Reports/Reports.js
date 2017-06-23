/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Reports = new Mongo.Collection('Reports');

Reports.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Reports.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Reports.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this report was created by.',
  },
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
  title: {
    type: String,
    label: 'The title of the report.',
    optional: false,
  },
  body: {
    type: String,
    label: 'The body of the report.',
    optional: false,
  },
  service_ids: {
    type: Array,
    label: 'The list of services tagged to the report.',
  },
  "service_ids.$": {
    type: Object,
    label: 'The object of services tagged to the report.',
  },
  "service_ids.$._id": {
    type: String,
    label: 'The id of service tagged to the report.',
  },
  "service_ids.$.name": {
    type: String,
    label: 'The name of service tagged to the report.',
  },
  country_id: {
    type: Object,
    label: 'The country object tagged to the report.',
  },
  "country_id._id": {
    type: String,
    label: 'The id of the country tagged to the report.',
  },
  "country_id.name": {
    type: String,
    label: 'The name of the country tagged to the report.',
  },
});

Reports.attachSchema(Reports.schema);

export default Reports;
