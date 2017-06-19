import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ReportsCollection from '../../../../api/Reports/Reports';
import Loading from '../../../components/Loading/Loading';

import './Reports.scss';

const handleRemove = (reportId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('reports.remove', reportId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Report deleted!', 'success');
      }
    });
  }
};

const Reports = ({ loading, reports, match, history }) => (!loading ? (
  <div className="Reports">
    <div className="page-header clearfix">
      <h4 className="pull-left">Reports</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Report</Link>
    </div>
    {reports.length ? <Table responsive>
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
        {reports.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No reports yet!</Alert>}
  </div>
) : <Loading />);

Reports.propTypes = {
  loading: PropTypes.bool.isRequired,
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('reports');
  return {
    loading: !subscription.ready(),
    reports: ReportsCollection.find().fetch(),
  };
}, Reports);
