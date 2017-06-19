import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (detail_levelId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('detail_levels.remove', detail_levelId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Detail_Level deleted!', 'success');
      }
    });
  }
};

const Detail_Levels = ({ loading, detail_levels, match, history }) => (!loading ? (
  <div className="Detail_Levels">
    <div className="page-header clearfix">
      <h4 className="pull-left">Detail_Levels</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Detail_Level</Link>
    </div>
    {detail_levels.length ? <Table responsive>
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
        {detail_levels.map(({ _id, title, createdAt, updatedAt }) => (
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
    </Table> : <Alert bsStyle="warning">No detail_levels yet!</Alert>}
  </div>
) : <Loading />);

Detail_Levels.propTypes = {
  loading: PropTypes.bool.isRequired,
  detail_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('detail_levels');
  return {
    loading: !subscription.ready(),
    detail_levels: Detail_LevelsCollection.find().fetch(),
  };
}, Detail_Levels);
