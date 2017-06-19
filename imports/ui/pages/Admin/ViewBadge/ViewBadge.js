import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Badges from '../../../../api/Badges/Badges';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (badgeId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('badges.remove', badgeId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Badge deleted!', 'success');
        history.push('/admin/badges');
      }
    });
  }
};

const renderBadge = (bdg, match, history) => (bdg ? (
  <div className="ViewBadge">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ bdg && bdg.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(bdg._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { bdg && bdg.body }
  </div>
) : <NotFound />);

const ViewBadge = ({ loading, bdg, match, history }) => (
  !loading ? renderBadge(bdg, match, history) : <Loading />
);

ViewBadge.propTypes = {
  loading: PropTypes.bool.isRequired,
  bdg: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const badgeId = match.params._id;
  const subscription = Meteor.subscribe('badges.view', badgeId);

  return {
    loading: !subscription.ready(),
    bdg: Badges.findOne(badgeId),
  };
}, ViewBadge);
