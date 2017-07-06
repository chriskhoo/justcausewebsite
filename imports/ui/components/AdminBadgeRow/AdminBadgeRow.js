/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, ControlLabel, FormControl, Thumbnail} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import valid from '../../../modules/valid';
import './AdminBadgeRow.scss';
import FormThumbnailUpload from '../../componentElements/FormThumbnailUpload/FormThumbnailUpload'
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput'

class AdminBadgeRow extends React.Component {
  constructor(props) {
   super(props);
   const { badge } = this.props;
   this.state = {
     image: badge && badge.image,
   }
   this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    // rule created on client and server
    Slingshot.fileRestrictions("Thumbnails", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      maxSize: 2 * 1024 * 1024 // 2 MB (use null for unlimited)
    });
  }

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
          required: `Must enter a name for the badge.`,
        },
      },
    });
  }

  handleUpload(metaContext, fieldName){
    let nextState = this.state;
    const uploader = new Slingshot.Upload("Thumbnails", metaContext);

    // update the element ID
    uploader.send(this.form[fieldName].files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response
        Bert.alert(error.message, 'danger');
      }
      else {
        nextState[fieldName] = downloadUrl;
      }
      // update the sample image
      this.setState(nextState);
    }.bind(this));
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
    valid(this.form);
    const { _id } = this.props.badge;
    const badge = {
      name: this.form.name.value.trim(),
      image: this.state.image,
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
        <td><Thumbnail alt="65x65" className="thumbnail_custom" src={this.state.image} /></td>
        <td>
          <form className="form-inline" ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <FormThumbnailUpload fieldName="image" metaContext={ {type: "badge"} } handleUpload={this.handleUpload} />
            <FormTextInput fieldName="name" defaultVal={badge && badge.name} />
          </form>
        </td>
        <td>
          <div>
            <Button
              bsStyle="warning"
              onClick={() => this.handleSubmit()}
              > Update
            </Button>
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
