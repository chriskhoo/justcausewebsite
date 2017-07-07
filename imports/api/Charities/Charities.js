/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Charities = new Mongo.Collection('Charities');

Charities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Charities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Charities.schema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the user this charity was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this charity was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this charity was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'The name of the charity.',
    optional: false,
  },
  year_established: {
    type: Number,
    label: 'The body of the charity.',
    optional: false,
  },
  website_link: {
    type: String,
    label: 'The website of the charity.',
    optional: false,
  },
  donation_link: {
    type: String,
    label: 'The website to donate to the charity.',
    optional: true,
  },
  logo: {
    type: String,
    label: 'The URL to the charity logo.',
    optional: false,
  },
  summary: {
    type: String,
    label: 'A summary about the charity.',
    optional: false,
  },
  revenue_model: {
    type: String,
    label: 'A description about how the charity is funded.',
    optional: false,
  },
  religious_affiliation: {
    type: String,
    label: 'Religious affiliation of the charity.',
    optional: false,
  },
  registration_status: {
    type: String,
    label: "A description about charity's registration status",
    optional: false,
  },
  jc_opinion_justcauseloves: {
    type: String,
    label: "A JustCause opinion about what it loves about the charity.",
    optional: true,
  },
  jc_opinion_donate_if: {
    type: String,
    label: "Description about the type of donors who might be interested in donating.",
    optional: true,
  },
  jc_opinion_broadentheirwork: {
    type: String,
    label: "Description about how donations might help the organization to broaden their work.",
    optional: true,
  },
  jc_opinion_strengthentheteam: {
    type: String,
    label: "Description about how donations might help the organization to strengthen their team.",
    optional: true,
  },
  badges_awarded: {
    type: Array,
    label: 'The badges awarded to the charity.',
    optional: true,
  },
  "badges_awarded.$": {
    type: Object,
    label: 'The object of each badge awarded to the charity.',
    optional: true,
  },
  "badges_awarded.$._id": {
    type: String,
    label: 'The id of a badge awarded to the charity.',
    optional: true,
  },
  "badges_awarded.$.reason": {
    type: String,
    label: 'The reason the badge was awarded to the charity.',
    optional: true,
  },
  programs: {
    type: Array,
    label: 'The badges awarded to the charity.',
    optional: true,
  },
  "programs.$": {
    type: Object,
    label: 'The object of each badge awarded to the charity.',
    optional: true,
  },
  "programs.$._id": {
    type: String,
    label: 'The id of a program belonging to the charity.',
    optional: true,
  },
  "programs.$.name": {
    type: String,
    label: 'The name of the program.',
    optional: true,
  },
  "programs.$.summary": {
    type: String,
    label: 'A summary about the program.',
    optional: true,
  },
  "programs.$.revenue_model": {
    type: String,
    label: 'A description about how the program is funded.',
    optional: true,
  },
  staff_info: {
    type: Object,
    label: "Information about the charity's staff.",
    optional: true,
  },
  "staff_info.headcount_year": {
    type: Number,
    label: "The year the headcount refers to.",
    optional: true,
  },
  "staff_info.staff_headcount_number": {
    type: Number,
    label: "The total number of staff.",
    optional: true,
  },
  "staff_info.volunteer_headcount_number": {
    type: Number,
    label: "The total number of volunteers.",
    optional: true,
  },
  "staff_info.staff_turnover_year": {
    type: Number,
    label: "The year the staff turnover refers to.",
    optional: true,
  },
  "staff_info.staff_turnover_number": {
    type: Number,
    label: "The staff turnover.",
    optional: true,
  },
  "staff_info.satisfaction_year": {
    type: Number,
    label: "The year the satisfaction survey refers to.",
    optional: true,
  },
  "staff_info.staff_satisfaction_percentage": {
    type: Number,
    label: "The percentage of staff satisfied in the survery.",
    optional: true,
  },
  "staff_info.volunteer_satisfaction_percentage": {
    type: Number,
    label: "The percentage of volunteers satisfied in the survery.",
    optional: true,
  },
  "staff_info.commentary": {
    type: String,
    label: "Just Cause's commentary about staff",
    optional: true,
  },
  reputation_info: {
    type: Object,
    label: "Information about the charity's reputation.",
    optional: true,
  },
  "reputation_info.quote_1": {
    type: String,
    label: "A quote about the charity.",
    optional: true,
  },
  "reputation_info.quote_2": {
    type: String,
    label: "A quote about the charity.",
    optional: true,
  },
  "reputation_info.quote_3": {
    type: String,
    label: "A quote about the charity.",
    optional: true,
  },
  "reputation_info.facebook_likes_date": {
    type: String,
    label: "A date the facebook likes refers to.",
    optional: true,
  },
  "reputation_info.facebook_likes_number": {
    type: Number,
    label: "The number of facebook likes from the charity's page.",
    optional: true,
  },
  "reputation_info.media_article_1_title": {
    type: String,
    label: "Title of the media article.",
    optional: true,
  },
  "reputation_info.media_article_1_source": {
    type: String,
    label: "Source of the media article.",
    optional: true,
  },
  "reputation_info.media_article_1_date": {
    type: String,
    label: "Date of the media article's publication.",
    optional: true,
  },
  "reputation_info.media_article_1_summary": {
    type: String,
    label: "Summary of the media article.",
    optional: true,
  },
  "reputation_info.media_article_2_title": {
    type: String,
    label: "Title of the media article.",
    optional: true,
  },
  "reputation_info.media_article_2_source": {
    type: String,
    label: "Source of the media article.",
    optional: true,
  },
  "reputation_info.media_article_2_date": {
    type: String,
    label: "Date of the media article's publication.",
    optional: true,
  },
  "reputation_info.media_article_2_summary": {
    type: String,
    label: "Summary of the media article.",
    optional: true,
  },
  "reputation_info.media_article_3_title": {
    type: String,
    label: "Title of the media article.",
    optional: true,
  },
  "reputation_info.media_article_3_source": {
    type: String,
    label: "Source of the media article.",
    optional: true,
  },
  "reputation_info.media_article_3_date": {
    type: String,
    label: "Date of the media article's publication.",
    optional: true,
  },
  "reputation_info.media_article_3_summary": {
    type: String,
    label: "Summary of the media article.",
    optional: true,
  },
  "reputation_info.commentary": {
    type: String,
    label: "Just Cause's commentary about reputation",
    optional: true,
  },
  leadership_info: {
    type: Object,
    label: "Information about the charity's leadership.",
  },
  "leadership_info.background_year": {
    type: Number,
    label: "The year the information on the charity leadership refers to.",
    optional: false,
  },
  "leadership_info.board_size": {
    type: Number,
    label: "The year the information on the charity leadership refers to.",
    optional: false,
  },
  "leadership_info.gender_ratio": {
    type: String,
    label: "The leadership's gender ratio.",
    optional: true,
  },
  "leadership_info.person_1_face": {
    type: String,
    label: "The URL where the image of charity leadership person_1's face is stored.",
    optional: true,
  },
  "leadership_info.person_1_name": {
    type: String,
    label: "The name of charity leadership person 1.",
    optional: true,
  },
  "leadership_info.person_1_position": {
    type: String,
    label: "The position of charity leadership person 1.",
    optional: true,
  },
  "leadership_info.person_1_description": {
    type: String,
    label: "A description of charity leadership person 1.",
    optional: true,
  },
  "leadership_info.person_2_face": {
    type: String,
    label: "The URL where the image of charity leadership person_2's face is stored.",
    optional: true,
  },
  "leadership_info.person_2_name": {
    type: String,
    label: "The name of charity leadership person 2.",
    optional: true,
  },
  "leadership_info.person_2_position": {
    type: String,
    label: "The position of charity leadership person 2.",
    optional: true,
  },
  "leadership_info.person_2_description": {
    type: String,
    label: "A description of charity leadership person 2.",
    optional: true,
  },
  "leadership_info.profession_1_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_1_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.profession_2_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_2_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.profession_3_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_3_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.profession_4_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_4_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.profession_5_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_5_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.profession_6_name": {
    type: String,
    label: "The name of a category of profession for leadership composition.",
    optional: true,
  },
  "leadership_info.profession_6_number": {
    type: Number,
    label: "The number of leaders belonging to the category of profession.",
    optional: true,
  },
  "leadership_info.governance_checklist_ids": {
    type: Array,
    label: 'The list of governance checklist items that the charity meets.',
    optional: true,
  },
  "leadership_info.governance_checklist_ids.$": {
    type: Object,
    label: 'The governance checklist object.',
    optional: true,
  },
  "leadership_info.governance_checklist_ids.$._id": {
    type: String,
    label: 'The id of governance checklist object.',
    optional: true,
  },
  "leadership_info.governance_checklist_ids.$.description": {
    type: String,
    label: 'The description of the governance checklist object.',
    optional: true,
  },
  "leadership_info.commentary": {
    type: String,
    label: "Just Cause's commentary about the charity's leadership",
    optional: true,
  },
  financial_info: {
    type: Object,
    label: "Information about the charity's finances.",
    optional: true,
  },
  "financial_info.income_year_1": {
    type: Number,
    label: "The Y-2 year of reporting.",
    optional: true,
  },
  "financial_info.income_year_1_amt": {
    type: Number,
    label: "The income reported for Y-2.",
    optional: true,
  },
  "financial_info.expenditure_year_1_amt": {
    type: Number,
    label: "The expenditure reported for Y-2.",
    optional: true,
  },
  "financial_info.income_year_2": {
    type: Number,
    label: "The Y-1 year of reporting.",
    optional: true,
  },
  "financial_info.income_year_2_amt": {
    type: Number,
    label: "The income reported for Y-1.",
    optional: true,
  },
  "financial_info.expenditure_year_2_amt": {
    type: Number,
    label: "The expenditure reported for Y-1.",
    optional: true,
  },
  "financial_info.income_year_3": {
    type: Number,
    label: "The year of reporting.",
    optional: true,
  },
  "financial_info.income_year_3_amt": {
    type: Number,
    label: "The income reported for year of reporting.",
    optional: true,
  },
  "financial_info.expenditure_year_3_amt": {
    type: Number,
    label: "The expenditure reported for year of reporting.",
    optional: true,
  },
  "financial_info.revenue_model_reporting_year": {
    type: Number,
    label: "The reporting year the revenue model is based on.",
    optional: true,
  },
  "financial_info.rev_model_cash_donations_and_fundraised_income_percent": {
    type: Number,
    label: "The percent of cash donations and fundraised income.",
    optional: true,
  },
  "financial_info.rev_model_govt_grants_subsidies_percent": {
    type: Number,
    label: "The percent of government grants or subsidies.",
    optional: true,
  },
  "financial_info.rev_model_activity_income_percent": {
    type: Number,
    label: "The percent of activity generated income.",
    optional: true,
  },
  "financial_info.rev_model_investment_income_percent": {
    type: Number,
    label: "The percent of investment generated income.",
    optional: true,
  },
  "financial_info.rev_model_others_percent": {
    type: Number,
    label: "The percent income from other sources.",
    optional: true,
  },
  "financial_info.major_donors_year": {
    type: Number,
    label: "The reporting year the major donors are based on.",
    optional: true,
  },
  "financial_info.major_donors_number": {
    type: Number,
    label: "The number of major donors reported that year.",
    optional: true,
  },
  "financial_info.major_donors_minimum_amt": {
    type: Number,
    label: "The minimum amount required to qualify as a major donor.",
    optional: true,
  },
  "financial_info.reserve_ratio_year": {
    type: Number,
    label: "The reporting year the reserve ratio.",
    optional: true,
  },
  "financial_info.reserve_ratio_amt": {
    type: Number,
    label: "The reserve ratio for that reporting year.",
    optional: true,
  },
  "financial_info.financial_checklist_ids": {
    type: Array,
    label: 'The list of financial checklist items that the charity meets.',
    optional: true,
  },
  "financial_info.financial_checklist_ids.$": {
    type: Object,
    label: 'The financial checklist object.',
    optional: true,
  },
  "financial_info.financial_checklist_ids.$._id": {
    type: String,
    label: 'The id of financial checklist object.',
    optional: true,
  },
  "financial_info.financial_checklist_ids.$.description": {
    type: String,
    label: 'The description of the financial checklist object.',
    optional: true,
  },
  "financial_info.commentary": {
    type: String,
    label: "Just Cause's commentary about the charity's finances",
    optional: true,
  },
});

Charities.attachSchema(Charities.schema);

export default Charities;
