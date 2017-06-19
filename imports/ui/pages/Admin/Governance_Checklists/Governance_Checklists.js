import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Governance_ChecklistsCollection from '../../../../api/Governance_Checklists/Governance_Checklists';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (governance_checklistId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('governance_checklists.remove', governance_checklistId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Governance_Checklist deleted!', 'success');
      }
    });
  }
};

const Governance_Checklists = ({ loading, governance_checklists, match, history }) => (!loading ? (
  <div className="Governance_Checklists">
    <div className="page-header clearfix">
      <h4 className="pull-left">Governance_Checklists</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Governance_Checklist</Link>
    </div>
    {governance_checklists.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {governance_checklists.map(({ _id, title, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYearAtTime(createdAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`${match.url}/${_id}`)}
                block
              >View</Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No governance_checklists yet!</Alert>}
  </div>
) : <Loading />);

Governance_Checklists.propTypes = {
  loading: PropTypes.bool.isRequired,
  governance_checklists: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('governance_checklists');
  return {
    loading: !subscription.ready(),
    governance_checklists: Governance_ChecklistsCollection.find().fetch(),
  };
}, Governance_Checklists);
