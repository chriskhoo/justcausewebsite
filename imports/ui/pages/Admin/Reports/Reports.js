import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYear } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ReportsCollection from '../../../../api/Reports/Reports';
import Loading from '../../../components/Loading/Loading';
import CharitiesCollection from '../../../../api/Charities/Charities';

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

const Reports = ({ loading, rpts, chtys, match, history }) => (!loading ? (
  <div className="Reports">
    <div className="page-header clearfix">
      <h4 className="pull-left">Reports</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Report</Link>
    </div>
    {rpts.length ? <Table responsive>
      <thead>
        <tr>
          <th>Charity</th>
          <th>Program</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {rpts.map(({ _id, type, charity_id, program_id, createdAt, updatedAt }) => {
          const charity = chtys && chtys.filter(({_id})=>_id == charity_id)[0];
          const charityName = charity && charity.name;
          const charityPrograms = charity && charity.programs;
          const reportProgram = charityPrograms && charityPrograms.filter(({_id})=>_id == program_id)[0];
          const reportProgramName = reportProgram && reportProgram.name;
          return(
          <tr key={_id}>
            <td>{charityName}</td>
            <td>{reportProgramName}</td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYear(createdAt)}</td>
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
        )})}
      </tbody>
    </Table> : <Alert bsStyle="warning">No reports yet!</Alert>}
  </div>
) : <Loading />);

Reports.propTypes = {
  loading: PropTypes.bool.isRequired,
  rpts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  chtys: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const rptsSubscription = Meteor.subscribe('reports');
  const chtysSubscription = Meteor.subscribe('charities');
  return {
    loading: !chtysSubscription.ready() || !rptsSubscription.ready(),
    rpts: ReportsCollection.find().fetch(),
    chtys: CharitiesCollection.find().fetch(),
  };
}, Reports);
