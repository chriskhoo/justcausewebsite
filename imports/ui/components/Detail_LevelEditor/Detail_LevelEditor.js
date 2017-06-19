/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Detail_LevelEditor extends React.Component {
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
    const existingDetail_Level = this.props.d_level && this.props.d_level._id;
    const methodToCall = existingDetail_Level ? 'detail_levels.update' : 'detail_levels.insert';
    const d_level = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingDetail_Level) d_level._id = existingDetail_Level;

    Meteor.call(methodToCall, d_level, (error, detail_levelId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDetail_Level ? 'Detail_Level updated!' : 'Detail_Level added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/detail_levels/${detail_levelId}`);
      }
    });
  }

  render() {
    const { d_level } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={d_level && d_level.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={d_level && d_level.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {d_level && d_level._id ? 'Save Changes' : 'Add Detail_Level'}
      </Button>
    </form>);
  }
}

Detail_LevelEditor.defaultProps = {
  d_level: { title: '', body: '' },
};

Detail_LevelEditor.propTypes = {
  d_level: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Detail_LevelEditor;
