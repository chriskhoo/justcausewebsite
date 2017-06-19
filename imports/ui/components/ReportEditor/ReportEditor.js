/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

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
    const existingReport = this.props.rept && this.props.rept._id;
    const methodToCall = existingReport ? 'reports.update' : 'reports.insert';
    const rept = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
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
    const { rept } = this.props;
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
  rept: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ReportEditor;
