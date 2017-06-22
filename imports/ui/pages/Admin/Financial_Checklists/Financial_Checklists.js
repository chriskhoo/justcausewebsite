import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminChecklistTable from '../../../components/AdminChecklistTable/AdminChecklistTable';
import Loading from '../../../components/Loading/Loading';
import Financial_ChecklistsCollection from '../../../../api/Financial_Checklists/Financial_Checklists';

const Financial_Checklists = ({ loading, financial_checklists }) => (!loading ? (
  <AdminChecklistTable  checklist_type='financial_checklist' checklists={financial_checklists} />
) : <Loading />);

Financial_Checklists.propTypes = {
  loading: PropTypes.bool.isRequired,
  financial_checklists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('financial_checklists');
  return {
    loading: !subscription.ready(),
    financial_checklists: Financial_ChecklistsCollection.find().fetch(),
  };
}, Financial_Checklists);
