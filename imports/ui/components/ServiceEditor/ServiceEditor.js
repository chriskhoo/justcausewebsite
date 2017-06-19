/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ServiceEditor extends React.Component {
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
    const existingService = this.props.svcs && this.props.svcs._id;
    const methodToCall = existingService ? 'services.update' : 'services.insert';
    const svcs = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingService) svcs._id = existingService;

    Meteor.call(methodToCall, svcs, (error, serviceId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingService ? 'Service updated!' : 'Service added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/services/${serviceId}`);
      }
    });
  }

  render() {
    const { svcs } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={svcs && svcs.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={svcs && svcs.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {svcs && svcs._id ? 'Save Changes' : 'Add Service'}
      </Button>
    </form>);
  }
}

ServiceEditor.defaultProps = {
  svcs: { title: '', body: '' },
};

ServiceEditor.propTypes = {
  svcs: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ServiceEditor;
