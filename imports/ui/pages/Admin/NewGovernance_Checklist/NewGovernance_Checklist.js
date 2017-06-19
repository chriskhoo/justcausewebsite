import React from 'react';
import PropTypes from 'prop-types';
import Governance_ChecklistEditor from '../../../components/Governance_ChecklistEditor/Governance_ChecklistEditor';

const NewGovernance_Checklist = ({ history }) => (
  <div className="NewGovernance_Checklist">
    <h4 className="page-header">New Governance_Checklist</h4>
    <Governance_ChecklistEditor history={history} />
  </div>
);

NewGovernance_Checklist.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewGovernance_Checklist;
