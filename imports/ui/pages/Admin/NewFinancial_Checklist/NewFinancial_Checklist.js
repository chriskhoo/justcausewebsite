import React from 'react';
import PropTypes from 'prop-types';
import Financial_ChecklistEditor from '../../../components/Financial_ChecklistEditor/Financial_ChecklistEditor';

const NewFinancial_Checklist = ({ history }) => (
  <div className="NewFinancial_Checklist">
    <h4 className="page-header">New Financial_Checklist</h4>
    <Financial_ChecklistEditor history={history} />
  </div>
);

NewFinancial_Checklist.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewFinancial_Checklist;
