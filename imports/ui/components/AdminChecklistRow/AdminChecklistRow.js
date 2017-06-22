/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { timeago } from '@cleverbeagle/dates';
import validate from '../../../modules/validate';
import './AdminChecklistRow.scss';

class AdminChecklistRow extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        description: {
          required: true,
        },
      },
      messages: {
        description: {
          required: `Must enter a description.`,
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleRemove() {
    const { _id } = this.props.checklist;
    const methodToCall = this.props.collection_name.concat('.remove');
    if (confirm(`Delete checklist item, are you sure?`)) {
      Meteor.call(methodToCall, _id, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Checklist item deleted!', 'success');
        }
      });
    }
  }

  handleSubmit() {
    const { _id, description } = this.props.checklist;
    const methodToCall = this.props.collection_name.concat('.update');
    const checklist = {
      description: this.description.value.trim(),
      _id: _id,
    };
    Meteor.call(methodToCall, checklist, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Checklist item has been updated!`, 'success');
      }
    });
  }

  render() {
    const { checklist, collection_name } = this.props;
    return (
      <tr>
        <td>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <InputGroup>
              <textarea
                type="text"
                className="form-control"
                name="description"
                ref={description => (this.description = description)}
                defaultValue={checklist.description}
                placeholder="Enter description"
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
        <td>{checklist.author}</td>
        <td>{timeago(checklist.updatedAt)}</td>
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

AdminChecklistRow.propTypes = {
  checklist: PropTypes.object.isRequired,
  collection_name: PropTypes.string.isRequired,
};

export default AdminChecklistRow;
