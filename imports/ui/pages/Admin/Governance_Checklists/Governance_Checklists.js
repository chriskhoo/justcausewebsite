import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminChecklistTable from '../../../components/AdminChecklistTable/AdminChecklistTable';
import Loading from '../../../components/Loading/Loading';
import Governance_ChecklistsCollection from '../../../../api/Governance_Checklists/Governance_Checklists';

const Governance_Checklists = ({ loading, governance_checklists }) => (!loading ? (
  <AdminChecklistTable  checklist_type='governance_checklist' checklists={governance_checklists} />
) : <Loading />);

Governance_Checklists.propTypes = {
  loading: PropTypes.bool.isRequired,
  governance_checklists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('governance_checklists');
  return {
    loading: !subscription.ready(),
    governance_checklists: Governance_ChecklistsCollection.find().fetch(),
  };
}, Governance_Checklists);
