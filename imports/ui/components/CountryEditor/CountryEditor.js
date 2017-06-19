/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class CountryEditor extends React.Component {
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
    const existingCountry = this.props.ctry && this.props.ctry._id;
    const methodToCall = existingCountry ? 'countries.update' : 'countries.insert';
    const ctry = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingCountry) ctry._id = existingCountry;

    Meteor.call(methodToCall, ctry, (error, reportId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingCountry ? 'Country updated!' : 'Country added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/countries/${reportId}`);
      }
    });
  }

  render() {
    const { ctry } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={ctry && ctry.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={ctry && ctry.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {ctry && ctry._id ? 'Save Changes' : 'Add Country'}
      </Button>
    </form>);
  }
}

CountryEditor.defaultProps = {
  ctry: { title: '', body: '' },
};

CountryEditor.propTypes = {
  ctry: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default CountryEditor;
