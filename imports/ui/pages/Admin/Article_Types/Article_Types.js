import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Article_TypesCollection from '../../../../api/Article_Types/Article_Types';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (article_typeId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('article_types.remove', article_typeId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article_Type deleted!', 'success');
      }
    });
  }
};

const Article_Types = ({ loading, article_types, match, history }) => (!loading ? (
  <div className="Article_Types">
    <div className="page-header clearfix">
      <h4 className="pull-left">Article_Types</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Article_Type</Link>
    </div>
    {article_types.length ? <Table responsive>
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
        {article_types.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No article_types yet!</Alert>}
  </div>
) : <Loading />);

Article_Types.propTypes = {
  loading: PropTypes.bool.isRequired,
  article_types: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('article_types');
  return {
    loading: !subscription.ready(),
    article_types: Article_TypesCollection.find().fetch(),
  };
}, Article_Types);
