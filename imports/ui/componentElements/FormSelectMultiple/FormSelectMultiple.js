// Form component for multiple selection

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { capitalize } from '../../../modules/process-strings';

class FormSelectMultiple extends React.Component {
  render() {
    const { fieldName, optionsList, defaultVal } = this.props;
    const label = fieldName.split('_').map(capitalize).join(' ');
    return(
      <FormGroup controlId= {fieldName}>
        <ControlLabel>{label}</ControlLabel>
        <small>Hold ctrl (windows-users) or cmd (mac-users) to select multiple options</small>
        <FormControl
          multiple
          componentClass="select"
          defaultValue= {defaultVal}
          >
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

FormSelectMultiple.propTypes = {
  fieldName: PropTypes.string,
  optionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultVal: PropTypes.any,
};

function getSelectedObjects(domSelectElement, objectArray){
  optionsArray = [...domSelectElement.options];
  selectedOptions = optionsArray.filter(option => option.selected);
  selectedValues = selectedOptions.map( option => option.value);
  selectedObjects = selectedValues.map( val => objectArray.find( (obj) => obj._id == val )  );
  return selectedObjects;
}

export { FormSelectMultiple as FormSelectMultiple};
export { getSelectedObjects as getSelectedObjects};
