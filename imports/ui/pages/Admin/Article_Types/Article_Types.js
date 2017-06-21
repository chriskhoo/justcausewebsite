import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminTagTable from '../../../components/AdminTagTable/AdminTagTable';
import Loading from '../../../components/Loading/Loading';
import Article_TypesCollection from '../../../../api/Article_Types/Article_Types';

const Article_Types = ({ loading, article_types }) => (!loading ? (
  <AdminTagTable  tag_type='article_type' tags={article_types} />
) : <Loading />);

Article_Types.propTypes = {
  loading: PropTypes.bool.isRequired,
  article_types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('article_types');
  return {
    loading: !subscription.ready(),
    article_types: Article_TypesCollection.find().fetch(),
  };
}, Article_Types);
