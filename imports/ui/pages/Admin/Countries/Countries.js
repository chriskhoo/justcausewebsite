import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagTable from '../../../components/AdminTagTable/AdminTagTable';
import Loading from '../../../components/Loading/Loading';
import CountriesCollection from '../../../../api/Countries/Countries';

const Countries = ({ loading, countries }) => (!loading ? (
  <AdminTagTable  tag_type='country' tags={countries} />
) : <Loading />);

Countries.propTypes = {
  loading: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('countries');
  return {
    loading: !subscription.ready(),
    countries: CountriesCollection.find().fetch(),
  };
}, Countries);
