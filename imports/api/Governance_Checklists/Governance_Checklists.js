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
    label: 'The first name of the user who last updated this governance_checklist item.',
  },
  createdAt: {
    type: String,
    label: 'The date this governance_checklist item was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this governance_checklist was item last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  description: {
    type: String,
    label: 'The description of the governance_checklist item.',
    optional: false,
  },
});

Governance_Checklists.attachSchema(Governance_Checklists.schema);

export default Governance_Checklists;
