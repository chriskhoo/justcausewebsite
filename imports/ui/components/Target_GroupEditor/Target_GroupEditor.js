/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Target_GroupEditor extends React.Component {
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
    const existingTarget_Group = this.props.t_grp && this.props.t_grp._id;
    const methodToCall = existingTarget_Group ? 'target_groups.update' : 'target_groups.insert';
    const t_grp = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
    };

    if (existingTarget_Group) t_grp._id = existingTarget_Group;

    Meteor.call(methodToCall, t_grp, (error, target_groupId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingTarget_Group ? 'Target_Group updated!' : 'Target_Group added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/admin/target_groups/${target_groupId}`);
      }
    });
  }

  render() {
    const { t_grp } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={t_grp && t_grp.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <textarea
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={t_grp && t_grp.body}
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {t_grp && t_grp._id ? 'Save Changes' : 'Add Target_Group'}
      </Button>
    </form>);
  }
}

Target_GroupEditor.defaultProps = {
  t_grp: { title: '', body: '' },
};

Target_GroupEditor.propTypes = {
  t_grp: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Target_GroupEditor;
