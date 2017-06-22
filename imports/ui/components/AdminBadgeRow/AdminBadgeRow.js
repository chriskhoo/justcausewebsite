/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, ControlLabel, FormControl, Thumbnail} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import './AdminBadgeRow.scss';

class AdminBadgeRow extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        name: {
          required: true,
        },
        image: {
          required: true,
        },
      },
      messages: {
        name: {
          required: `Must enter a name for the badge.`,
        },
        image: {
          required: `Must enter a url for the badge image.`,
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleRemove() {
    const { _id, name } = this.props.badge;
    if (confirm(`Delete ${name}, are you sure?`)) {
      Meteor.call('badges.remove', _id, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Badge deleted!', 'success');
        }
      });
    }
  }

  handleSubmit() {
    const { _id } = this.props.badge;
    const badge = {
      name: this.name.value.trim(),
      image: this.image.value.trim(),
      _id: _id,
    };
    Meteor.call('badges.update', badge, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Badge has been updated!`, 'success');
      }
    });
  }

  render() {
    const { badge } = this.props;
    return (
      <tr>
        <td><Thumbnail alt="65x65" className="thumbnail" src={badge.image} /></td>
        <td>
          <form className="form-inline" ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <FormGroup>
              <ControlLabel>Name:</ControlLabel>
              {'     '}
              <input
                type="text"
                className="form-control"
                name="name"
                ref={name => (this.name = name)}
                defaultValue={badge.name}
                placeholder="Enter badge name"
              />
            </FormGroup>
            {'     '}
            <FormGroup>
              <ControlLabel>Image URL:</ControlLabel>
              {'     '}
              <input
                type="text"
                className="form-control"
                name="image"
                ref={image => (this.image = image)}
                defaultValue={badge.image}
                placeholder="Enter image url"
              />
            </FormGroup>
            {'     '}
            <Button
              type="submit"
              bsStyle="warning"
              onClick={() => this.handleSubmit()}
              > Update
            </Button>
          </form>
        </td>
        <td>
          <div>
            <Button
              bsStyle="danger"
              onClick={() => this.handleRemove()}
            >Delete</Button>
          </div>
        </td>
      </tr>
    );
  }
}

AdminBadgeRow.propTypes = {
  badge: PropTypes.object.isRequired,
};

export default AdminBadgeRow;
