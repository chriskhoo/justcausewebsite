import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ProgramsCollection from '../../../../api/Programs/Programs';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (programId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('programs.remove', programId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Program deleted!', 'success');
      }
    });
  }
};

const Programs = ({ loading, programs, match, history }) => (!loading ? (
  <div className="Programs">
    <div className="page-header clearfix">
      <h4 className="pull-left">Programs</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Program</Link>
    </div>
    {programs.length ? <Table responsive>
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
        {programs.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No programs yet!</Alert>}
  </div>
) : <Loading />);

Programs.propTypes = {
  loading: PropTypes.bool.isRequired,
  programs: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('programs');
  return {
    loading: !subscription.ready(),
    programs: ProgramsCollection.find().fetch(),
  };
}, Programs);
