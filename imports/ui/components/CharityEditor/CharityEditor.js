/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, ButtonGroup, Thumbnail } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { FormSelectMultiple, getSelectedObjects } from '../../componentElements/FormSelectMultiple/FormSelectMultiple';
import { FormSelectSingle, getSelectedObject } from '../../componentElements/FormSelectSingle/FormSelectSingle';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';
import FormThumbnailUpload from '../../componentElements/FormThumbnailUpload/FormThumbnailUpload';
import {CharityProgramEditor, populateExistingPrograms} from '../CharityProgramEditor/CharityProgramEditor';
import CharityBadgesEditor from '../CharityBadgesEditor/CharityBadgesEditor';
import CharityChecklistEditor from '../CharityChecklistEditor/CharityChecklistEditor';
import { getFormElementsWithNewButton, getCheckedFormElements, scrubObject } from '../../../modules/get-form-elements'

class CharityEditor extends React.Component {
  constructor(props) {
    super(props);
    const { chty } = this.props;
    this.state = {
      new_program_index: 0,
      new_program_array: [],
      logo: chty && chty.logo,
      person_1_face: chty && chty.leadership_info && chty.leadership_info.person_1_face,
      person_2_face: chty && chty.leadership_info && chty.leadership_info.person_2_face,
    }
    this.handleNew = this.handleNew.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    // rule created on client and server
    Slingshot.fileRestrictions("Thumbnails", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      maxSize: 2 * 1024 * 1024 // 2 MB (use null for unlimited)
    });
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {

      },
      messages: {

      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleNew(type){
    let nextState = this.state;
    const index = 'temp'+this.state[`new_${type}_index`];
    nextState[`new_${type}_index`] += 1;
    nextState[`new_${type}_array`].push(index);
    this.setState(nextState);
  }

  handleRemove(type, _id){
    let nextState = this.state;
    prefix = _id.substring(0,4);
    if(prefix=='temp'){
      nextState[`new_${type}_array`] = this.state[`new_${type}_array`].filter((element)=> element !== _id)
    }else{
      this.props.chty[type] = this.props.chty[type].filter((obj)=> obj._id !== _id)
    }
    this.setState(nextState);
  }

  handleUpload(metaContext, fieldName){
    let nextState = this.state;
    const uploader = new Slingshot.Upload("Thumbnails", metaContext);

    // update the element ID
    uploader.send(this.form[fieldName].files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response
        Bert.alert(error.message, 'danger');
      }
      else {
        nextState[fieldName] = downloadUrl;
      }
      // update the sample image
      this.setState(nextState);
    }.bind(this));
  }

  handleSubmit() {
    // get props
    const { history, bdgs, f_checks, g_checks } = this.props;
    // get form elements for fixed fields
    const {name, year_established, website_link, donation_link, logo, summary, revenue_model, religious_affiliation, registration_status, jc_opinion_justcauseloves, jc_opinion_donate_if, jc_opinion_broadentheirwork, jc_opinion_strengthentheteam, strategy} = this.form;
    // get fixed form elements for staff info
    const {headcount_year, staff_headcount_number, volunteer_headcount_number, staff_turnover_year, staff_turnover_number, satisfaction_year, staff_satisfaction_percentage, volunteer_satisfaction_percentage, staff_info_commentary} = this.form;
    // get fixed form elements for reputation info
    const {quote_1, quote_2, quote_3, facebook_likes_date, facebook_likes_number, media_article_1_title, media_article_1_source, media_article_1_date, media_article_1_summary, media_article_2_title, media_article_2_source, media_article_2_date, media_article_2_summary, media_article_3_title, media_article_3_source, media_article_3_date, media_article_3_summary, background_year, reputation_info_commentary } = this.form;
    // get fixed form elements for leadership info
    const { board_size, gender_ratio, person_1_face, person_1_name, person_1_position, person_1_description, person_2_face, person_2_name, person_2_position, person_2_description, profession_1_name, profession_1_number, profession_2_name, profession_2_number, profession_3_name, profession_3_number, profession_4_name, profession_4_number, profession_5_name, profession_5_number, profession_6_name, profession_6_number, leadership_info_commentary } = this.form;
    // get fixed form elements for financial info
    const { income_year_1, income_year_1_amt, expenditure_year_1_amt, income_year_2, income_year_2_amt, expenditure_year_2_amt, income_year_3, income_year_3_amt, expenditure_year_3_amt, revenue_model_reporting_year, rev_model_cash_donations_and_fundraised_income_percent, rev_model_govt_grants_subsidies_percent, rev_model_activity_income_percent, rev_model_investment_income_percent, rev_model_others_percent, major_donors_year, major_donors_number, major_donors_minimum_amt, reserve_ratio_year, reserve_ratio_amt, financial_info_commentary } = this.form;

    // get form elements for fields generated by programs
    const programs = getFormElementsWithNewButton("program", { name: 'string', summary: 'string', revenue_model: 'string' } , this.form);

    // get form elements for fields generated by badges, finance and governance checklist
    const badges_awarded = getCheckedFormElements("badge", this.form, fields = {reason: 'string'})
    const governance_checklist_ids = getCheckedFormElements("governance_checklist", this.form, fields = {}, listOptions = g_checks, importedFields = ['description'])
    const financial_checklist_ids = getCheckedFormElements("financial_checklist", this.form, fields = {}, listOptions = f_checks, importedFields = ['description'])

    let chty = {
      name: name.value.trim(),
      year_established: Number(year_established.value),
      website_link: website_link.value.trim(),
      donation_link: donation_link.value.trim(),
      logo: this.state.logo,
      summary: summary.value.trim(),
      revenue_model: revenue_model.value.trim(),
      religious_affiliation: religious_affiliation.value.trim(),
      registration_status: registration_status.value.trim(),
      jc_opinion_justcauseloves: jc_opinion_justcauseloves.value.trim(),
      jc_opinion_donate_if: jc_opinion_donate_if.value.trim(),
      jc_opinion_broadentheirwork: jc_opinion_broadentheirwork.value.trim(),
      jc_opinion_strengthentheteam: jc_opinion_strengthentheteam.value.trim(),
      strategy: strategy.value.trim(),
      badges_awarded: badges_awarded,
      programs: programs,
      staff_info: {},
      reputation_info: {},
      leadership_info: {},
      financial_info: {},
    };

    chty.staff_info = {
      headcount_year: Number(headcount_year.value),
      staff_headcount_number: Number(staff_headcount_number.value),
      volunteer_headcount_number: Number(volunteer_headcount_number.value),
      staff_turnover_year: Number(staff_turnover_year.value),
      staff_turnover_number: Number(staff_turnover_number.value),
      satisfaction_year: Number(satisfaction_year.value),
      staff_satisfaction_percentage: Number(staff_satisfaction_percentage.value),
      volunteer_satisfaction_percentage: Number(volunteer_satisfaction_percentage.value),
      commentary: staff_info_commentary.value.trim(),
    };

    chty.reputation_info= {
      quote_1: quote_1.value.trim(),
      quote_2: quote_2.value.trim(),
      quote_3: quote_3.value.trim(),
      facebook_likes_date: facebook_likes_date.value.trim(),
      facebook_likes_number: Number(facebook_likes_number.value),
      media_article_1_title: media_article_1_title.value.trim(),
      media_article_1_source: media_article_1_source.value.trim(),
      media_article_1_date: media_article_1_date.value.trim(),
      media_article_1_summary: media_article_1_summary.value.trim(),
      media_article_2_title: media_article_2_title.value.trim(),
      media_article_2_source: media_article_2_source.value.trim(),
      media_article_2_date: media_article_2_date.value.trim(),
      media_article_2_summary: media_article_2_summary.value.trim(),
      media_article_3_title: media_article_3_title.value.trim(),
      media_article_3_source: media_article_3_source.value.trim(),
      media_article_3_date: media_article_3_date.value.trim(),
      media_article_3_summary: media_article_3_summary.value.trim(),
      commentary: reputation_info_commentary.value.trim(),
    };

    chty.leadership_info={
      background_year: Number(background_year.value),
      board_size: Number(board_size.value),
      gender_ratio: gender_ratio.value.trim(),
      person_1_face: this.state.person_1_face,
      person_1_name: person_1_name.value.trim(),
      person_1_position: person_1_position.value.trim(),
      person_1_description: person_1_description.value.trim(),
      person_2_face: this.state.person_2_face,
      person_2_name: person_2_name.value.trim(),
      person_2_position: person_2_position.value.trim(),
      person_2_description: person_2_description.value.trim(),
      profession_1_name: profession_1_name.value.trim(),
      profession_1_number: Number(profession_1_number.value),
      profession_2_name: profession_2_name.value.trim(),
      profession_2_number: Number(profession_2_number.value),
      profession_3_name: profession_3_name.value.trim(),
      profession_3_number: Number(profession_3_number.value),
      profession_4_name: profession_4_name.value.trim(),
      profession_4_number: Number(profession_4_number.value),
      profession_5_name: profession_5_name.value.trim(),
      profession_5_number: Number(profession_5_number.value),
      profession_6_name: profession_6_name.value.trim(),
      profession_6_number: Number(profession_6_number.value),
      governance_checklist_ids: governance_checklist_ids,
      commentary: leadership_info_commentary.value.trim(),
    };

    chty.financial_info={
      income_year_1: Number(income_year_1.value),
      income_year_1_amt: Number(income_year_1_amt.value),
      expenditure_year_1_amt: Number(expenditure_year_1_amt.value),
      income_year_2: Number(income_year_2.value),
      income_year_2_amt: Number(income_year_2_amt.value),
      expenditure_year_2_amt: Number(expenditure_year_2_amt.value),
      income_year_3: Number(income_year_3.value),
      income_year_3_amt: Number(income_year_3_amt.value),
      expenditure_year_3_amt: Number(expenditure_year_3_amt.value),
      revenue_model_reporting_year: Number(revenue_model_reporting_year.value),
      rev_model_cash_donations_and_fundraised_income_percent: Number(rev_model_cash_donations_and_fundraised_income_percent.value),
      rev_model_govt_grants_subsidies_percent: Number(rev_model_govt_grants_subsidies_percent.value),
      rev_model_activity_income_percent: Number(rev_model_activity_income_percent.value),
      rev_model_investment_income_percent: Number(rev_model_investment_income_percent.value),
      rev_model_others_percent: Number(rev_model_others_percent.value),
      major_donors_year: Number(major_donors_year.value),
      major_donors_number: Number(major_donors_number.value),
      major_donors_minimum_amt: Number(major_donors_minimum_amt.value),
      reserve_ratio_year: Number(reserve_ratio_year.value),
      reserve_ratio_amt: Number(reserve_ratio_amt.value),
      financial_checklist_ids: financial_checklist_ids,
      commentary: financial_info_commentary.value.trim(),
    };

    scrubObject(chty.staff_info);
    scrubObject(chty.leadership_info);
    scrubObject(chty.reputation_info);
    scrubObject(chty.financial_info);
    scrubObject(chty);

    const existingCharity = this.props.chty && this.props.chty._id;
    const methodToCall = existingCharity ? 'charities.update' : 'charities.insert';
    if (existingCharity) chty._id = existingCharity;

    Meteor.call(methodToCall, chty, (error, charityId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingCharity ? 'Charity updated!' : 'Charity added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/charities/${charityId}`);
      }
    });
  }

  render() {
    // variables stored in props
    const { chty, bdgs, f_checks, g_checks } = this.props;

    // check programs and return elements for existing programs
    let existingPrograms = chty && populateExistingPrograms(chty.programs, this.handleRemove);

    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <Panel collapsible defaultExpanded header="core_info">
        <FormTextInput fieldName="name" defaultVal={chty && chty.name} />
        <FormTextInput fieldName="year_established" defaultVal={chty && chty.year_established} type="number"/>
        <FormTextInput fieldName="website_link" defaultVal={chty && chty.website_link} type="url"/>
        <FormTextInput fieldName="donation_link" defaultVal={chty && chty.website_link} type="url"/>
        <FormThumbnailUpload fieldName="logo" metaContext={ {type: "logo"} } handleUpload={this.handleUpload} />
        <Thumbnail className="thumbnail_custom" src={this.state.logo} alt="logo_preview" />
        <FormTextArea fieldName="summary" defaultVal={chty && chty.summary} />
        <FormTextInput fieldName="revenue_model" defaultVal={chty && chty.revenue_model} />
        <FormTextInput fieldName="religious_affiliation" defaultVal={chty && chty.religious_affiliation} />
        <FormTextInput fieldName="registration_status" defaultVal={chty && chty.registration_status} />
      </Panel>
      <Panel collapsible header="jc_opinion">
        <FormTextArea fieldName="jc_opinion_justcauseloves" defaultVal={chty && chty.jc_opinion_justcauseloves} />
        <FormTextArea fieldName="jc_opinion_donate_if" defaultVal={chty && chty.jc_opinion_donate_if} />
        <FormTextArea fieldName="jc_opinion_broadentheirwork" defaultVal={chty && chty.jc_opinion_broadentheirwork} />
        <FormTextArea fieldName="jc_opinion_strengthentheteam" defaultVal={chty && chty.jc_opinion_strengthentheteam} />
      </Panel>
      <Panel collapsible header="strategy & character">
        <FormTextArea fieldName="strategy" defaultVal={chty && chty.strategy} />
        <CharityBadgesEditor badges={bdgs} charity_badges={chty && chty.badges_awarded}/>
      </Panel>
      <Panel collapsible header="programs">
        { existingPrograms }
        <ButtonGroup vertical block>
          <Button bsStyle="primary" onClick={() => this.handleNew('program')} >Add new program</Button>
        </ButtonGroup>
        {this.state.new_program_array.map((index) =>
          <CharityProgramEditor
            key={index}
            _id={index}
            handleRemove={this.handleRemove}
          />)}
      </Panel>
      <Panel collapsible header="staff_info">
        <FormTextInput fieldName="headcount_year" defaultVal={chty && chty.staff_info && chty.staff_info.headcount_year} type="number"/>
        <FormTextInput fieldName="staff_headcount_number" defaultVal={chty && chty.staff_info && chty.staff_info.staff_headcount_number} type="number"/>
        <FormTextInput fieldName="volunteer_headcount_number" defaultVal={chty && chty.staff_info && chty.staff_info.volunteer_headcount_number} type="number"/>
        <FormTextInput fieldName="staff_turnover_year" defaultVal={chty && chty.staff_info && chty.staff_info.staff_turnover_year} type="number"/>
        <FormTextInput fieldName="staff_turnover_number" defaultVal={chty && chty.staff_info && chty.staff_info.staff_turnover_number} type="number"/>
        <FormTextInput fieldName="satisfaction_year" defaultVal={chty && chty.staff_info && chty.staff_info.satisfaction_year} type="number"/>
        <FormTextInput fieldName="staff_satisfaction_percentage" defaultVal={chty && chty.staff_info && chty.staff_info.staff_satisfaction_percentage} type="number"/>
        <FormTextInput fieldName="volunteer_satisfaction_percentage" defaultVal={chty && chty.staff_info && chty.staff_info.volunteer_satisfaction_percentage} type="number"/>
        <FormTextArea fieldName="staff_info_commentary" defaultVal={chty && chty.staff_info && chty.staff_info.commentary} />
      </Panel>
      <Panel collapsible header="reputation_info">
        <FormTextArea fieldName="quote_1" defaultVal={chty && chty.reputation_info && chty.reputation_info.quote_1} />
        <FormTextArea fieldName="quote_2" defaultVal={chty && chty.reputation_info && chty.reputation_info.quote_2} />
        <FormTextArea fieldName="quote_3" defaultVal={chty && chty.reputation_info && chty.reputation_info.quote_3} />
        <FormTextInput fieldName="facebook_likes_date" defaultVal={chty && chty.reputation_info && chty.reputation_info.facebook_likes_date} type="date"/>
        <FormTextInput fieldName="facebook_likes_number" defaultVal={chty && chty.reputation_info && chty.reputation_info.facebook_likes_number} type="number"/>
        <FormTextInput fieldName="media_article_1_title" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_1_title} />
        <FormTextInput fieldName="media_article_1_source" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_1_source} />
        <FormTextInput fieldName="media_article_1_date" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_1_date} type="date"/>
        <FormTextArea fieldName="media_article_1_summary" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_1_summary} />
        <FormTextInput fieldName="media_article_2_title" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_2_title} />
        <FormTextInput fieldName="media_article_2_source" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_2_source} />
        <FormTextInput fieldName="media_article_2_date" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_2_date} type="date"/>
        <FormTextArea fieldName="media_article_2_summary" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_2_summary} />
        <FormTextInput fieldName="media_article_3_title" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_3_title} />
        <FormTextInput fieldName="media_article_3_source" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_3_source} />
        <FormTextInput fieldName="media_article_3_date" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_3_date} type="date"/>
        <FormTextArea fieldName="media_article_3_summary" defaultVal={chty && chty.reputation_info && chty.reputation_info.media_article_3_summary} />
        <FormTextArea fieldName="reputation_info_commentary" defaultVal={chty && chty.reputation_info && chty.reputation_info.commentary} />
      </Panel>
      <Panel collapsible header="leadership_info">
        <FormTextInput fieldName="background_year" defaultVal={chty && chty.leadership_info && chty.leadership_info.background_year} type="number"/>
        <FormTextInput fieldName="board_size" defaultVal={chty && chty.leadership_info && chty.leadership_info.board_size} type="number"/>
        <FormTextInput fieldName="gender_ratio" defaultVal={chty && chty.leadership_info && chty.leadership_info.gender_ratio}/>

        <FormThumbnailUpload fieldName="person_1_face" metaContext={ {type: "face"} } handleUpload={this.handleUpload} />
        <Thumbnail className="thumbnail_custom" src={this.state.person_1_face} alt="face1_preview" />
        <FormTextInput fieldName="person_1_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_name} />
        <FormTextInput fieldName="person_1_position" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_position} />
        <FormTextArea fieldName="person_1_description" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_description} />

        <FormThumbnailUpload fieldName="person_2_face" metaContext={ {type: "face"} } handleUpload={this.handleUpload} />
        <Thumbnail className="thumbnail_custom" src={this.state.person_2_face} alt="face2_preview" />
        <FormTextInput fieldName="person_2_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_2_name} />
        <FormTextInput fieldName="person_2_position" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_2_position} />
        <FormTextArea fieldName="person_2_description" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_2_description} />
        <FormTextInput fieldName="profession_1_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_1_name} />
        <FormTextInput fieldName="profession_1_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_1_number} type="number"/>
        <FormTextInput fieldName="profession_2_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_2_name} />
        <FormTextInput fieldName="profession_2_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_2_number} type="number"/>
        <FormTextInput fieldName="profession_3_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_3_name} />
        <FormTextInput fieldName="profession_3_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_3_number} type="number"/>
        <FormTextInput fieldName="profession_4_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_4_name} />
        <FormTextInput fieldName="profession_4_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_4_number} type="number"/>
        <FormTextInput fieldName="profession_5_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_5_name} />
        <FormTextInput fieldName="profession_5_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_5_number} type="number"/>
        <FormTextInput fieldName="profession_6_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_6_name} />
        <FormTextInput fieldName="profession_6_number" defaultVal={chty && chty.leadership_info && chty.leadership_info.profession_6_number} type="number"/>
        <CharityChecklistEditor
          checklists= {g_checks}
          charity_checklists = {chty && chty.leadership_info && chty.leadership_info.governance_checklist_ids}
          checklist_type = "governance_checklist"
        />
        <FormTextArea fieldName="leadership_info_commentary" defaultVal={chty && chty.leadership_info && chty.leadership_info.commentary} />
      </Panel>
      <Panel collapsible header="financial_info">
        <FormTextInput fieldName="income_year_1" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_1} type="number"/>
        <FormTextInput fieldName="income_year_1_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_1_amt} type="number"/>
        <FormTextInput fieldName="expenditure_year_1_amt" defaultVal={chty && chty.financial_info && chty.financial_info.expenditure_year_1_amt} type="number"/>

        <FormTextInput fieldName="income_year_2" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_2} type="number"/>
        <FormTextInput fieldName="income_year_2_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_2_amt} type="number"/>
        <FormTextInput fieldName="expenditure_year_2_amt" defaultVal={chty && chty.financial_info && chty.financial_info.expenditure_year_2_amt} type="number"/>

        <FormTextInput fieldName="income_year_3" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_3} type="number"/>
        <FormTextInput fieldName="income_year_3_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_3_amt} type="number"/>
        <FormTextInput fieldName="expenditure_year_3_amt" defaultVal={chty && chty.financial_info && chty.financial_info.expenditure_year_3_amt} type="number"/>

        <FormTextInput fieldName="revenue_model_reporting_year" defaultVal={chty && chty.financial_info && chty.financial_info.revenue_model_reporting_year} type="number"/>
        <FormTextInput fieldName="rev_model_cash_donations_and_fundraised_income_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_cash_donations_and_fundraised_income_percent} type="number"/>
        <FormTextInput fieldName="rev_model_govt_grants_subsidies_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_govt_grants_subsidies_percent} type="number"/>
        <FormTextInput fieldName="rev_model_activity_income_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_activity_income_percent} type="number"/>
        <FormTextInput fieldName="rev_model_investment_income_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_investment_income_percent} type="number"/>
        <FormTextInput fieldName="rev_model_others_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_others_percent} type="number"/>
        <FormTextInput fieldName="major_donors_year" defaultVal={chty && chty.financial_info && chty.financial_info.major_donors_year} type="number"/>
        <FormTextInput fieldName="major_donors_number" defaultVal={chty && chty.financial_info && chty.financial_info.major_donors_number} type="number"/>
        <FormTextInput fieldName="major_donors_minimum_amt" defaultVal={chty && chty.financial_info && chty.financial_info.major_donors_minimum_amt} type="number"/>
        <FormTextInput fieldName="reserve_ratio_year" defaultVal={chty && chty.financial_info && chty.financial_info.reserve_ratio_year} type="number"/>
        <FormTextInput fieldName="reserve_ratio_amt" defaultVal={chty && chty.financial_info && chty.financial_info.reserve_ratio_amt} type="number"/>
        <CharityChecklistEditor
          checklists= {f_checks}
          charity_checklists = {chty && chty.financial_info && chty.financial_info.financial_checklist_ids}
          checklist_type = "financial_checklist"
        />
        <FormTextArea fieldName="financial_info_commentary" defaultVal={chty && chty.financial_info && chty.financial_info.commentary} />
      </Panel>

      <Button type="submit" bsStyle="success">
        {chty && chty._id ? 'Save Changes' : 'Add Charity'}
      </Button>
    </form>);
  }
}

CharityEditor.defaultProps = {
  chty: { title: '', body: '' },
};

CharityEditor.propTypes = {
  chty: PropTypes.object,
  history: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  f_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
  g_checks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharityEditor;
