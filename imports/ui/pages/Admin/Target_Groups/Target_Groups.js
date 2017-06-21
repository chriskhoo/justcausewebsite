import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagTable from '../../../components/AdminTagTable/AdminTagTable';
import Loading from '../../../components/Loading/Loading';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';

const Target_Groups = ({ loading, target_groups }) => (!loading ? (
  <AdminTagTable  tag_type='target_group' tags={target_groups} />
) : <Loading />);

Target_Groups.propTypes = {
  loading: PropTypes.bool.isRequired,
  target_groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('target_groups');
  return {
    loading: !subscription.ready(),
    target_groups: Target_GroupsCollection.find().fetch(),
  };
}, Target_Groups);
