// Form component for text area
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormTextArea extends React.Component {
  render() {
    const { fieldName, fieldType, defaultVal } = this.props;
    return(
      <FormGroup controlId= {fieldType}>
        <ControlLabel>{fieldName}</ControlLabel>
        <textarea
          name={fieldType}
          className="form-control"
          defaultValue= {defaultVal}
          placeholder="Enter text"
        />
      </FormGroup>
    )
  }
};

FormTextArea.propTypes = {
  fieldType: PropTypes.string,
  fieldName: PropTypes.string,
  defaultVal: PropTypes.any,
};

export default FormTextArea;
