/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Governance_ChecklistEditor extends React.Component {
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
    const existingGovernance_Checklist = this.props.g_check && this.props.g_check._id;
    const methodToCall = existingGovernance_Checklist ? 'governance_checklists.update' : 'governance_checklists.insert';
    const g_check = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingGovernance_Checklist) g_check._id = existingGovernance_Checklist;

    Meteor.call(methodToCall, g_check, (error, governance_checklistId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingGovernance_Checklist ? 'Governance_Checklist updated!' : 'Governance_Checklist added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/governance_checklists/${governance_checklistId}`);
      }
    });
  }

  render() {
    const { g_check } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={g_check && g_check.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={g_check && g_check.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {g_check && g_check._id ? 'Save Changes' : 'Add Governance_Checklist'}
      </Button>
    </form>);
  }
}

Governance_ChecklistEditor.defaultProps = {
  g_check: { title: '', body: '' },
};

Governance_ChecklistEditor.propTypes = {
  g_check: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Governance_ChecklistEditor;
