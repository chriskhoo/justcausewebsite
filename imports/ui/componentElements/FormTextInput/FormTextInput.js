// Form component for text box

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { capitalize } from '../../../modules/process-strings';

class FormTextInput extends React.Component {
  render() {
    const { fieldName, defaultVal, type, label, checked } = this.props;
    const newLabel = label || fieldName.split('_').map(capitalize).join(' ');
    return(
      <FormGroup controlId= {fieldName}>
        <ControlLabel>{newLabel}</ControlLabel>
        {checked ?
          <input
            type= {type}
            className= "form-control"
            name= {fieldName}
            defaultValue= {defaultVal}
            placeholder= {`Enter ${type}`}
            checked
          />:
          <input
            type= {type}
            className= "form-control"
            name= {fieldName}
            defaultValue= {defaultVal}
            placeholder= {`Enter ${type}`}
          />}

      </FormGroup>
    )
  }
};

FormTextInput.defaultProps = {
  type: "text",
};

FormTextInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  defaultVal: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
};

export default FormTextInput;
