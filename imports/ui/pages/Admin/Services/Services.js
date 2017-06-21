import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagTable from '../../../components/AdminTagTable/AdminTagTable';
import Loading from '../../../components/Loading/Loading';
import ServicesCollection from '../../../../api/Services/Services';

const Services = ({ loading, services }) => (!loading ? (
  <AdminTagTable  tag_type='service' tags={services} />
) : <Loading />);

Services.propTypes = {
  loading: PropTypes.bool.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('services');
  return {
    loading: !subscription.ready(),
    services: ServicesCollection.find().fetch(),
  };
}, Services);
