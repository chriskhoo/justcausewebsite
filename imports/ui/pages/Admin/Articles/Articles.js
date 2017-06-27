import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYear } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ArticlesCollection from '../../../../api/Articles/Articles';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (articleId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('articles.remove', articleId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article deleted!', 'success');
      }
    });
  }
};

const Articles = ({ loading, articles, match, history }) => (!loading ? (
  <div className="Articles">
    <div className="page-header clearfix">
      <h4 className="pull-left">Articles</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Article</Link>
    </div>
    {articles.length ? <Table responsive>
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
        {articles.map(({ _id, title, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYear(createdAt)}</td>
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
    </Table> : <Alert bsStyle="warning">No articles yet!</Alert>}
  </div>
) : <Loading />);

Articles.propTypes = {
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('articles');
  return {
    loading: !subscription.ready(),
    articles: ArticlesCollection.find().fetch(),
  };
}, Articles);
