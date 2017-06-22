import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminBadgeTable from '../../../components/AdminBadgeTable/AdminBadgeTable';
import Loading from '../../../components/Loading/Loading';
import BadgesCollection from '../../../../api/Badges/Badges';

const Badges = ({ loading, badges }) => (!loading ? (
  <AdminBadgeTable  badges={badges} />
) : <Loading />);

Badges.propTypes = {
  loading: PropTypes.bool.isRequired,
  badges: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('badges');
  return {
    loading: !subscription.ready(),
    badges: BadgesCollection.find().fetch(),
  };
}, Badges);
