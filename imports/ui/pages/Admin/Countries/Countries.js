import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import CountriesCollection from '../../../../api/Countries/Countries';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (countryId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('countries.remove', countryId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Country deleted!', 'success');
      }
    });
  }
};

const Countries = ({ loading, countries, match, history }) => (!loading ? (
  <div className="Countries">
    <div className="page-header clearfix">
      <h4 className="pull-left">Countries</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Country</Link>
    </div>
    {countries.length ? <Table responsive>
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
        {countries.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No countries yet!</Alert>}
  </div>
) : <Loading />);

Countries.propTypes = {
  loading: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('countries');
  return {
    loading: !subscription.ready(),
    countries: CountriesCollection.find().fetch(),
  };
}, Countries);
