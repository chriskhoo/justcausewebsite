/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import './AdminTagRow.scss';

class AdminTagRow extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        name: {
          required: true,
        },
      },
      messages: {
        name: {
          required: `Must enter a name for the tag.`,
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleRemove() {
    const { _id, name } = this.props.tag;
    const methodToCall = this.props.collection_name.concat('.remove');
    if (confirm(`Delete ${name}, are you sure?`)) {
      Meteor.call(methodToCall, _id, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Tag name deleted!', 'success');
        }
      });
    }
  }

  handleSubmit() {
    const { _id, name } = this.props.tag;
    const methodToCall = this.props.collection_name.concat('.update');
    const tag = {
      name: this.name.value.trim(),
      _id: _id,
    };
    Meteor.call(methodToCall, tag, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Tag has been updated!`, 'success');
      }
    });
  }

  render() {
    const { tag, collection_name } = this.props;
    return (
      <tr>
        <td>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <InputGroup>
              <input
                type="text"
                className="form-control"
                name="name"
                ref={name => (this.name = name)}
                defaultValue={tag.name}
                placeholder="Enter tag name"
              />
              <span className="input-group-btn">
                <Button
                  type="submit"
                  bsStyle="warning"
                  onClick={() => this.handleSubmit()}
                  >Update</Button>
              </span>
            </InputGroup>
          </form>
        </td>
        <td>
          <Button
            bsStyle="danger"
            onClick={() => this.handleRemove()}
          >Delete</Button>
        </td>
      </tr>
    );
  }
}

AdminTagRow.propTypes = {
  tag: PropTypes.object.isRequired,
  collection_name: PropTypes.string.isRequired,
};

export default AdminTagRow;
