import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagTable from '../../../components/AdminTagTable/AdminTagTable';
import Loading from '../../../components/Loading/Loading';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';

const Detail_Levels = ({ loading, detail_levels }) => (!loading ? (
  <AdminTagTable  tag_type='detail_level' tags={detail_levels} />
) : <Loading />);

Detail_Levels.propTypes = {
  loading: PropTypes.bool.isRequired,
  detail_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('detail_levels');
  return {
    loading: !subscription.ready(),
    detail_levels: Detail_LevelsCollection.find().fetch(),
  };
}, Detail_Levels);
