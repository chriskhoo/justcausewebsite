// Form component for text box

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { capitalize } from '../../../modules/process-strings';

import './FormThumbnailUpload.scss';

class FormThumbnailUpload extends React.Component {

  render() {
    const { fieldName, metaContext, handleUpload } = this.props;
    const newLabel = fieldName.split('_').map(capitalize).join(' ');
    return(
      <FormGroup>
        <ControlLabel>Image Upload:</ControlLabel>
        <div className ="upload-area">
          <p className ="alert alert-success text-center">
            <span>Click or drag an image file here to upload</span>
            <input
              type="file"
              className="form-control"
              name= {fieldName}
              onChange = {() => handleUpload(metaContext, fieldName) }
            />
            <span className="help-block">Image max restriction: 2.5MB, 500x500.</span>
          </p>
        </div>
      </FormGroup>
    )
  }
};

FormThumbnailUpload.defaultProps = {
  metaContext: {type: 'image'},
};

FormThumbnailUpload.propTypes = {
  fieldName: PropTypes.string.isRequired,
  metaContext: PropTypes.object.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default FormThumbnailUpload;
