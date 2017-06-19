/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Governance_Checklists = new Mongo.Collection('Governance_Checklists');

Governance_Checklists.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Governance_Checklists.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Governance_Checklists.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this governance_checklist was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this governance_checklist was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this governance_checklist was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the governance_checklist.',
  },
  body: {
    type: String,
    label: 'The body of the governance_checklist.',
  },
});

Governance_Checklists.attachSchema(Governance_Checklists.schema);

export default Governance_Checklists;
