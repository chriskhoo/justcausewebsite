/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { FormSelectMultiple, getSelectedObjects } from '../../componentElements/FormSelectMultiple/FormSelectMultiple';
import { FormSelectSingle, getSelectedObject } from '../../componentElements/FormSelectSingle/FormSelectSingle';

class ReportEditor extends React.Component {
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
        service_ids: {
          required: true,
        },
        country_id: {
          required: true,
        },
        target_group_ids: {
          required: true,
        },
        detail_level_id: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Please enter a title',
        },
        body: {
          required: 'Please enter a body',
        },
        service_ids: {
          required: 'Please select the appropriate service tag(s)',
        },
        country_id: {
          required: 'Please select one country tag',
        },
        target_group_ids: {
          required: true,
        },
        detail_level_id: {
          required: true,
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history, svcs, ctrys, t_grps, d_levels } = this.props;
    const { title, body, service_ids, country_id } = this.form;
    const existingReport = this.props.rept && this.props.rept._id;
    const methodToCall = existingReport ? 'reports.update' : 'reports.insert';
    const selectedServices = getSelectedObjects(service_ids, svcs);
    const selectedCountry = getSelectedObject(country_id, ctrys);
    const selectedTarget_Groups = getSelectedObjects(target_group_ids, t_grps);
    const selectedDetail_Level = getSelectedObject(detail_level_id, d_levels);
    const rept = {
      title: title.value.trim(),
      body: body.value.trim(),
      service_ids: selectedServices,
      country_id: selectedCountry,
      target_group_ids: selectedTarget_Groups,
      detail_level_id: selectedDetail_Level,

    };
    if (existingReport) rept._id = existingReport;
    Meteor.call(methodToCall, rept, (error, reportId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingReport ? 'Report updated!' : 'Report added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/reports/${reportId}`);
      }
    });
  }

  render() {
    const { svcs, rept, ctrys, t_grps, d_levels } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={rept && rept.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={rept && rept.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>

      <FormSelectMultiple
        fieldName="Services"
        fieldType="service_ids"
        optionsList= {svcs}
        defaultVal = {rept && rept.service_ids && rept.service_ids[0]._id && rept.service_ids.map( ids => ids._id )} />

      <FormSelectSingle
        fieldName="Country"
        fieldType="country_id"
        optionsList= {ctrys}
        defaultVal = {rept && rept.country_id && rept.country_id._id} />

      <FormSelectMultiple
        fieldName="Target Groups"
        fieldType="target_group_ids"
        optionsList= {t_grps}
        defaultVal = {rept && rept.target_group_ids && rept.target_group_ids[0]._id && rept.target_group_ids.map( ids => ids._id )} />

      <FormSelectSingle
        fieldName="Detail Level"
        fieldType="detail_level_id"
        optionsList= {d_levels}
        defaultVal = {rept && rept.detail_level_id && rept.detail_level_id._id} />

      <Button type="submit" bsStyle="success">
        {rept && rept._id ? 'Save Changes' : 'Add Report'}
      </Button>
    </form>);
  }
}

ReportEditor.defaultProps = {
  rept: { title: '', body: '' },
};

ReportEditor.propTypes = {
  history: PropTypes.object.isRequired,
  rept: PropTypes.object,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportEditor;
