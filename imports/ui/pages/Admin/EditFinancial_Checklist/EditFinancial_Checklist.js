import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Financial_Checklists from '../../../../api/Financial_Checklists/Financial_Checklists';
import Financial_ChecklistEditor from '../../../components/Financial_ChecklistEditor/Financial_ChecklistEditor';
import NotFound from '../../NotFound/NotFound';

const EditFinancial_Checklist = ({ f_check, history }) => (f_check ? (
  <div className="EditFinancial_Checklist">
    <h4 className="page-header">{`Editing "${f_check.title}"`}</h4>
    <Financial_ChecklistEditor f_check={f_check} history={history} />
  </div>
) : <NotFound />);

EditFinancial_Checklist.propTypes = {
  f_check: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const financial_checklistId = match.params._id;
  const subscription = Meteor.subscribe('financial_checklists.view', financial_checklistId);

  return {
    loading: !subscription.ready(),
    f_check: Financial_Checklists.findOne(financial_checklistId),
  };
}, EditFinancial_Checklist);
