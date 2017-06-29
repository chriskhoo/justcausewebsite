/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, ButtonGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { FormSelectMultiple, getSelectedObjects } from '../../componentElements/FormSelectMultiple/FormSelectMultiple';
import { FormSelectSingle, getSelectedObject } from '../../componentElements/FormSelectSingle/FormSelectSingle';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';
import {CharityProgramEditor, populateExistingPrograms} from '../CharityProgramEditor/CharityProgramEditor';
import CharityBadgesEditor from '../CharityBadgesEditor/CharityBadgesEditor';
import CharityChecklistEditor from '../CharityChecklistEditor/CharityChecklistEditor';

class CharityEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      new_program_index: 0,
      new_program_array: [],
    }
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        body: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This thneeds a body, please.',
        },
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
      chty[type] = chty[type].filter((obj)=> obj._id !== _id)
    }
    this.setState(nextState);
  }

  handleSubmit() {
    const { history } = this.props;
    const existingCharity = this.props.chty && this.props.chty._id;
    const methodToCall = existingCharity ? 'charities.update' : 'charities.insert';
    const chty = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingCharity) chty._id = existingCharity;

    Meteor.call(methodToCall, chty, (error, reportId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingCharity ? 'Charity updated!' : 'Charity added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/charities/${reportId}`);
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
        <FormTextInput fieldName="logo" defaultVal={chty && chty.website_link} type="url"/>
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
      <Panel collapsible header="badges_awarded">
        <CharityBadgesEditor badges={bdgs} charity_badges={chty && chty.badges}/>
      </Panel>
      <Panel collapsible header="programs">
        { existingPrograms }
        <ButtonGroup vertical block>
          <Button bsStyle="primary" onClick={() => this.handleNew('program')} >Add new program</Button>
        </ButtonGroup>
        {this.state.new_program_array.map((index) => <CharityProgramEditor key={index} _id={index} handleRemove={this.handleRemove}/>)}
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
        <FormTextArea fieldName="commentary" defaultVal={chty && chty.staff_info && chty.staff_info.commentary} />
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
      </Panel>
      <Panel collapsible header="leadership_info">
        <FormTextInput fieldName="background_year" defaultVal={chty && chty.leadership_info && chty.leadership_info.background_year} type="number"/>
        <FormTextInput fieldName="board_size" defaultVal={chty && chty.leadership_info && chty.leadership_info.board_size} type="number"/>
        <FormTextInput fieldName="gender_ratio" defaultVal={chty && chty.leadership_info && chty.leadership_info.gender_ratio} type="number"/>
        <FormTextInput fieldName="person_1_face" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_face} type="url"/>
        <FormTextInput fieldName="person_1_name" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_name} />
        <FormTextInput fieldName="person_1_position" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_position} />
        <FormTextArea fieldName="person_1_description" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_1_description} />
        <FormTextInput fieldName="person_2_face" defaultVal={chty && chty.leadership_info && chty.leadership_info.person_2_face} type="url"/>
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
        <FormTextArea fieldName="commentary" defaultVal={chty && chty.leadership_info && chty.leadership_info.commentary} />
      </Panel>
      <Panel collapsible header="financial_info">
        <FormTextInput fieldName="income_year_1" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_1} type="number"/>
        <FormTextInput fieldName="income_year_1_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_1_amt} type="number"/>
        <FormTextInput fieldName="income_year_2" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_2} type="number"/>
        <FormTextInput fieldName="income_year_2_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_2_amt} type="number"/>
        <FormTextInput fieldName="income_year_3" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_3} type="number"/>
        <FormTextInput fieldName="income_year_3_amt" defaultVal={chty && chty.financial_info && chty.financial_info.income_year_3_amt} type="number"/>
        <FormTextInput fieldName="revenue_model_reporting_year" defaultVal={chty && chty.financial_info && chty.financial_info.revenue_model_reporting_year} type="number"/>
        <FormTextInput fieldName="rev_model_cash_donations_percent" defaultVal={chty && chty.financial_info && chty.financial_info.rev_model_cash_donations_percent} type="number"/>
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
        <FormTextArea fieldName="commentary" defaultVal={chty && chty.financial_info && chty.financial_info.commentary} />
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
