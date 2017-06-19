/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Financial_ChecklistEditor extends React.Component {
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

  handleSubmit() {
    const { history } = this.props;
    const existingFinancial_Checklist = this.props.f_check && this.props.f_check._id;
    const methodToCall = existingFinancial_Checklist ? 'financial_checklists.update' : 'financial_checklists.insert';
    const f_check = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingFinancial_Checklist) f_check._id = existingFinancial_Checklist;

    Meteor.call(methodToCall, f_check, (error, financial_checklistId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingFinancial_Checklist ? 'Financial_Checklist updated!' : 'Financial_Checklist added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/financial_checklists/${financial_checklistId}`);
      }
    });
  }

  render() {
    const { f_check } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={f_check && f_check.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={f_check && f_check.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {f_check && f_check._id ? 'Save Changes' : 'Add Financial_Checklist'}
      </Button>
    </form>);
  }
}

Financial_ChecklistEditor.defaultProps = {
  f_check: { title: '', body: '' },
};

Financial_ChecklistEditor.propTypes = {
  f_check: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Financial_ChecklistEditor;
