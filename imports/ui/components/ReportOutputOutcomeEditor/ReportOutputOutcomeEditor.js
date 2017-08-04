// Form component for text box
import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';

import './ReportOutputOutcomeEditor.scss';

class ReportOutputOutcomeEditor extends React.Component {
  render() {
    const { _id, number, description, handleRemove, field } = this.props;
    return(
      <div className="panel-group">
        <Panel bsStyle="info">
          <div className="group-elements half-width">
            <FormTextInput fieldName={`${field}-${_id}-number`} defaultVal={number} label="Number" />
          </div>
          <div className="group-elements spacer">
          </div>
          <div className="group-elements half-width">
            <FormTextInput fieldName={`${field}-${_id}-description`} defaultVal={description} label="Description" />
          </div>
          <Button bsStyle="danger" onClick={() => handleRemove(field, _id)} >Remove {field}</Button>
        </Panel>
      </div>

    )
  }
};

ReportOutputOutcomeEditor.defaultProps = {

};

ReportOutputOutcomeEditor.propTypes = {
  _id: PropTypes.string.isRequired,
  number: PropTypes.number,
  description: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};

function populateExisting(array, handleRemove, field){
  if(array && array.length){
    return array.map((elm) => <ReportOutputOutcomeEditor key={elm._id} _id={elm._id} number={elm.number} description={elm.description} field={field} handleRemove={handleRemove}/>)
  }else{
    return "Just Cause has none recorded for this charity."
  }
}

export {ReportOutputOutcomeEditor as ReportOutputOutcomeEditor};
export {populateExisting as populateExisting};
