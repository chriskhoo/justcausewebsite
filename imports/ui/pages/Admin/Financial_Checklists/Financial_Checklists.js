import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Financial_ChecklistsCollection from '../../../../api/Financial_Checklists/Financial_Checklists';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (financial_checklistId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('financial_checklists.remove', financial_checklistId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Financial_Checklist deleted!', 'success');
      }
    });
  }
};

const Financial_Checklists = ({ loading, financial_checklists, match, history }) => (!loading ? (
  <div className="Financial_Checklists">
    <div className="page-header clearfix">
      <h4 className="pull-left">Financial_Checklists</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Financial_Checklist</Link>
    </div>
    {financial_checklists.length ? <Table responsive>
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
        {financial_checklists.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No financial_checklists yet!</Alert>}
  </div>
) : <Loading />);

Financial_Checklists.propTypes = {
  loading: PropTypes.bool.isRequired,
  financial_checklists: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('financial_checklists');
  return {
    loading: !subscription.ready(),
    financial_checklists: Financial_ChecklistsCollection.find().fetch(),
  };
}, Financial_Checklists);
