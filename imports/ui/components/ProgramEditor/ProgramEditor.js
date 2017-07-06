/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ProgramEditor extends React.Component {
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
    const existingProgram = this.props.prgm && this.props.prgm._id;
    const methodToCall = existingProgram ? 'programs.update' : 'programs.insert';
    const prgm = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingProgram) prgm._id = existingProgram;

    Meteor.call(methodToCall, prgm, (error, programId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingProgram ? 'Program updated!' : 'Program added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/programs/${programId}`);
      }
    });
  }

  render() {
    const { prgm } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={prgm && prgm.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={prgm && prgm.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {prgm && prgm._id ? 'Save Changes' : 'Add Program'}
      </Button>
    </form>);
  }
}

ProgramEditor.defaultProps = {
  prgm: { title: '', body: '' },
};

ProgramEditor.propTypes = {
  prgm: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ProgramEditor;
