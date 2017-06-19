import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Detail_Levels from '../../../../api/Detail_Levels/Detail_Levels';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (detail_levelId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('detail_levels.remove', detail_levelId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Detail_Level deleted!', 'success');
        history.push('/admin/detail_levels');
      }
    });
  }
};

const renderDetail_Level = (d_level, match, history) => (d_level ? (
  <div className="ViewDetail_Level">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ d_level && d_level.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(d_level._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { d_level && d_level.body }
  </div>
) : <NotFound />);

const ViewDetail_Level = ({ loading, d_level, match, history }) => (
  !loading ? renderDetail_Level(d_level, match, history) : <Loading />
);

ViewDetail_Level.propTypes = {
  loading: PropTypes.bool.isRequired,
  d_level: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const detail_levelId = match.params._id;
  const subscription = Meteor.subscribe('detail_levels.view', detail_levelId);

  return {
    loading: !subscription.ready(),
    d_level: Detail_Levels.findOne(detail_levelId),
  };
}, ViewDetail_Level);
