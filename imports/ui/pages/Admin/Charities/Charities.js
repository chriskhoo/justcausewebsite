import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import CharitiesCollection from '../../../../api/Charities/Charities';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (charityId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('charities.remove', charityId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Charity deleted!', 'success');
      }
    });
  }
};

const Charities = ({ loading, charities, match, history }) => (!loading ? (
  <div className="Charities">
    <div className="page-header clearfix">
      <h4 className="pull-left">Charities</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Charity</Link>
    </div>
    {charities.length ? <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {charities.map(({ _id, name, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>{name}</td>
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
    </Table> : <Alert bsStyle="warning">No charities yet!</Alert>}
  </div>
) : <Loading />);

Charities.propTypes = {
  loading: PropTypes.bool.isRequired,
  charities: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('charities');
  return {
    loading: !subscription.ready(),
    charities: CharitiesCollection.find().fetch(),
  };
}, Charities);
