// Form component for text box

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormTextInput extends React.Component {
  render() {
    const { fieldName, fieldType, defaultVal } = this.props;
    return(
      <FormGroup controlId= {fieldType}>
        <ControlLabel>{fieldName}</ControlLabel>
        <input
          type= "text"
          className= "form-control"
          name= {fieldType}
          defaultValue= {defaultVal}
          placeholder="Enter text"
        />
      </FormGroup>
    )
  }
};

FormTextInput.propTypes = {
  fieldType: PropTypes.string,
  fieldName: PropTypes.string,
  defaultVal: PropTypes.any,
};

export default FormTextInput;
