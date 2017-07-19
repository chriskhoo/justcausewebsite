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
        <ControlLabel>{newLabel} Image Upload:</ControlLabel>
        <div className ="upload-area">
          <p className ="alert alert-success text-center">
            <span>Click or drag an image file here to upload</span>
            <input
              type="file"
              className="form-control"
              name= {fieldName}
              onChange = {() => handleUpload(metaContext, fieldName) }
            />
            { (metaContext.type == "article") ? <span className="help-block">Image max restriction: 10 MB</span> : <span className="help-block">Image max restriction: 2.5 MB</span> }

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
