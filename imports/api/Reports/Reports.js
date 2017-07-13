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
  service_ids: {
    type: Array,
    minCount: 1,
    label: 'The list of services tagged to the report.',
    optional: false,
  },
  "service_ids.$": {
    type: Object,
    label: 'The object of services tagged to the report.',
    optional: false,
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
  detail_level_id: {
    type: Object,
    label: 'The detail_level object tagged to the report.',
    optional: false,
  },
  "detail_level_id._id": {
    type: String,
    label: 'The id of the detail_level tagged to the report.',
    optional: false,
  },
  "detail_level_id.name": {
    type: String,
    label: 'The name of the detail_level tagged to the report.',
    optional: false,
  },
  description: {
    type: String,
    label: 'This is a brief description displayed in the search cards and is taken from the charity or program.',
    optional: false,
  },
  name: {
    type: String,
    label: 'This is the name of the charity or the program the report is from.',
    optional: false,
  },
  logo: {
    type: String,
    label: 'This is the logo of charity that the report is written about.',
    optional: false,
  },
  type: {
    type: String,
    label: 'This is a choice between a program report or a charity report.',
    optional: false,
  },
  charity_id: {
    type: String,
    label: 'The id of the charity linked to this report.',
    optional: false,
  },
  program_id: {
    type: String,
    label: 'The id of the program tagged to the report.',
    optional: true,
  },
  completed: {
    type: Boolean,
    label: 'Completed reports marked as true will be publically released.',
    optional: false,
  },
  impact_info: {
    type: Object,
    label: 'The impact_info object tagged to the report.',
    optional: true,
  },
  "impact_info.data_collection": {
    type: String,
    label: 'Description of data collection for impact assessment.',
    optional: true,
  },
  "impact_info.continuous_improvement": {
    type: String,
    label: 'Description of continuous improvement efforts.',
    optional: true,
  },
  "impact_info.impact_framework": {
    type: String,
    label: 'Description of impact framework used.',
    optional: true,
  },
  "impact_info.commentary": {
    type: String,
    label: "Just Cause's commentary about the program or charity's impact assessment.",
    optional: true,
  },
  "impact_info.outputs": {
    type: Array,
    label: "Impact outputs for this program or charity.",
    optional: true,
  },
  "impact_info.outputs.$": {
    type: Object,
    label: 'The impact output object.',
    optional: true,
  },
  "impact_info.outputs.$._id": {
    type: String,
    label: 'The id this object.',
    optional: true,
  },
  "impact_info.outputs.$.number": {
    type: String,
    label: 'The measured output figure for this object.',
    optional: true,
  },
  "impact_info.outputs.$.description": {
    type: String,
    label: 'The unit of output measured for this object.',
    optional: true,
  },
  "impact_info.outcomes": {
    type: Array,
    label: "Impact outcome for this program or charity.",
    optional: true,
  },
  "impact_info.outcomes.$": {
    type: Object,
    label: 'The impact outcome object.',
    optional: true,
  },
  "impact_info.outcomes.$._id": {
    type: String,
    label: 'The id this object.',
    optional: true,
  },
  "impact_info.outcomes.$.number": {
    type: String,
    label: 'The measured outcome figure for this object.',
    optional: true,
  },
  "impact_info.outcomes.$.description": {
    type: String,
    label: 'The unit of outcome measured for this object.',
    optional: true,
  },
  "impact_info.outcome_quotes": {
    type: String,
    label: "Additional pure text description of outcome.",
    optional: true,
  },
});

Reports.attachSchema(Reports.schema);

export default Reports;
