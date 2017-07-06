// Form component for single selection

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { capitalize } from '../../../modules/process-strings';

class FormSelectSingle extends React.Component {
  render() {
    const { fieldName, optionsList, defaultVal, handleChange } = this.props;
    const label = fieldName.split('_').map(capitalize).join(' ');
    return(
      <FormGroup controlId= {fieldName}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          componentClass="select"
          defaultValue= {defaultVal}
          onChange={ () => handleChange && handleChange() }
          >
          <option
            key='select'
            value={undefined}
            >Select</option>
          { optionsList.map( (optionObject) => mapOption(optionObject) ) }
        </FormControl>
      </FormGroup>
    )
  }
};

FormSelectSingle.propTypes = {
  fieldName: PropTypes.string,
  optionsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  defaultVal: PropTypes.any,
  handleChange: PropTypes.func,
};

function getSelectedObject(domSelectElement, objectArray){
  id = domSelectElement.value;
  return objectArray.find( (obj) => obj._id == id );
}

export { FormSelectSingle as FormSelectSingle};
export { getSelectedObject as getSelectedObject};

// private functions
function mapOption(optionObject){
  if(typeof(optionObject) == "object"){
    return(
      <option
        key={optionObject._id}
        value={optionObject._id}
        >{optionObject.name}</option>
    );
  } else if(typeof(optionObject) == "string") {
    return(
      <option
        key={optionObject}
        value={optionObject}
        >{optionObject}</option>
    );
  };
}

function bob(){
  console.log('bob')
}
