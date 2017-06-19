/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Financial_Checklists = new Mongo.Collection('Financial_Checklists');

Financial_Checklists.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Financial_Checklists.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Financial_Checklists.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this financial_checklist was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this financial_checklist was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this financial_checklist was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the financial_checklist.',
  },
  body: {
    type: String,
    label: 'The body of the financial_checklist.',
  },
});

Financial_Checklists.attachSchema(Financial_Checklists.schema);

export default Financial_Checklists;
