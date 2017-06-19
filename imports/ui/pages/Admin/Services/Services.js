import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ServicesCollection from '../../../../api/Services/Services';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (serviceId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('services.remove', serviceId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Service deleted!', 'success');
      }
    });
  }
};

const Services = ({ loading, services, match, history }) => (!loading ? (
  <div className="Services">
    <div className="page-header clearfix">
      <h4 className="pull-left">Services</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Service</Link>
    </div>
    {services.length ? <Table responsive>
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
        {services.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No services yet!</Alert>}
  </div>
) : <Loading />);

Services.propTypes = {
  loading: PropTypes.bool.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('services');
  return {
    loading: !subscription.ready(),
    services: ServicesCollection.find().fetch(),
  };
}, Services);
