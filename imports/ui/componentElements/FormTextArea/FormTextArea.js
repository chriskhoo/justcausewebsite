// Form component for text area
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { capitalize } from '../../../modules/process-strings';

class FormTextArea extends React.Component {
  render() {
    const { fieldName, defaultVal, label } = this.props;
    const newLabel = label || fieldName.split('_').map(capitalize).join(' ');
    return(
      <FormGroup controlId= {fieldName}>
        <ControlLabel>{newLabel}</ControlLabel>
        <textarea
          name={fieldName}
          className="form-control"
          defaultValue= {defaultVal}
          placeholder="Enter text"
        />
      </FormGroup>
    )
  }
};

FormTextArea.propTypes = {
  fieldName: PropTypes.string,
  defaultVal: PropTypes.any,
  label: PropTypes.string,
};

export default FormTextArea;
