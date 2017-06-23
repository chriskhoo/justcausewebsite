// Form component for single selection

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormSelectSingle extends React.Component {
  render() {
    const { fieldName, fieldType, optionsList, defaultVal } = this.props;
    return(
      <FormGroup controlId= {fieldType}>
        <ControlLabel>{fieldName}</ControlLabel>
        <FormControl
          componentClass="select"
          defaultValue= {defaultVal}>
          <option
            key='select'
            value={undefined}
            >Select</option>
          { optionsList.map((optionObject) =>
            <option
              key={optionObject._id}
              value={optionObject._id}
              >{optionObject.name}</option>
          )}
        </FormControl>
      </FormGroup>
    )
  }
};

FormSelectSingle.propTypes = {
  fieldType: PropTypes.string,
  fieldName: PropTypes.string,
  optionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultVal: PropTypes.any,
};

function getSelectedObject(domSelectElement, objectArray){
  id = domSelectElement.value;
  return objectArray.find( (obj) => obj._id == id );
}

export { FormSelectSingle as FormSelectSingle};
export { getSelectedObject as getSelectedObject};
