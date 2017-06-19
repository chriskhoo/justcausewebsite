/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class CharityEditor extends React.Component {
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
    const { chty } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={chty && chty.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={chty && chty.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
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
};

export default CharityEditor;
