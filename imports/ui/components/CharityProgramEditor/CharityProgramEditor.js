// Form component for text box
import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import FormTextArea from '../../componentElements/FormTextArea/FormTextArea';

import './CharityProgramEditor.scss';

class CharityProgramEditor extends React.Component {
  render() {
    const { _id, name, summary, revenue_model, handleRemove } = this.props;
    return(
      <div className="program-group">
        <Panel bsStyle="info">
          <div className="group-elments half-width">
            <FormTextInput fieldName={`program-${_id}-name`} defaultVal={name} label="Name"/>
          </div>
          <div className="group-elments spacer">
          </div>
          <div className="group-elments half-width">
            <FormTextInput fieldName={`program-${_id}-revenue_model`} defaultVal={revenue_model} label="Revenue Model"/>
          </div>
          <div className="group-elments full-width">
            <FormTextArea fieldName={`program-${_id}-summary`} defaultVal={summary} label="Summary" />
          </div>
          <Button bsStyle="danger" onClick={() => handleRemove("program", _id)} >Remove program</Button>
        </Panel>
      </div>

    )
  }
};

CharityProgramEditor.defaultProps = {
  name: "",
  summary: "",
  revenue_model: "",
};

CharityProgramEditor.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  summary: PropTypes.string,
  revenue_model: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
};

function populateExistingPrograms(programs, handleRemove){
  if(programs){
    return programs.map((program) => <CharityProgramEditor _id={program._id} name={program.name} summary={program.summary} revenue_model={program.revenue_model} handleRemove={handleRemove}/>)
  }else{
    return "Just Cause has no recorded programs for this charity."
  }
}

export {CharityProgramEditor as CharityProgramEditor};
export {populateExistingPrograms as populateExistingPrograms};
