import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Target_Groups from '../../../../api/Target_Groups/Target_Groups';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (target_groupId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('target_groups.remove', target_groupId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Target_Group deleted!', 'success');
        history.push('/admin/target_groups');
      }
    });
  }
};

const renderTarget_Group = (t_grp, match, history) => (t_grp ? (
  <div className="ViewTarget_Group">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ t_grp && t_grp.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(t_grp._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { t_grp && t_grp.body }
  </div>
) : <NotFound />);

const ViewTarget_Group = ({ loading, t_grp, match, history }) => (
  !loading ? renderTarget_Group(t_grp, match, history) : <Loading />
);

ViewTarget_Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  t_grp: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const target_groupId = match.params._id;
  const subscription = Meteor.subscribe('target_groups.view', target_groupId);

  return {
    loading: !subscription.ready(),
    t_grp: Target_Groups.findOne(target_groupId),
  };
}, ViewTarget_Group);
