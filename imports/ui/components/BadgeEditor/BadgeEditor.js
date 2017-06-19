/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class BadgeEditor extends React.Component {
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
    const existingBadge = this.props.bdg && this.props.bdg._id;
    const methodToCall = existingBadge ? 'badges.update' : 'badges.insert';
    const bdg = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingBadge) bdg._id = existingBadge;

    Meteor.call(methodToCall, bdg, (error, badgeId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingBadge ? 'Badge updated!' : 'Badge added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/badges/${badgeId}`);
      }
    });
  }

  render() {
    const { bdg } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={bdg && bdg.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={bdg && bdg.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {bdg && bdg._id ? 'Save Changes' : 'Add Badge'}
      </Button>
    </form>);
  }
}

BadgeEditor.defaultProps = {
  bdg: { title: '', body: '' },
};

BadgeEditor.propTypes = {
  bdg: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default BadgeEditor;
