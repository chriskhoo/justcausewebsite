import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Target_Groups from '../../../../api/Target_Groups/Target_Groups';
import Target_GroupEditor from '../../../components/Target_GroupEditor/Target_GroupEditor';
import NotFound from '../../NotFound/NotFound';

const EditTarget_Group = ({ t_grp, history }) => (t_grp ? (
  <div className="EditTarget_Group">
    <h4 className="page-header">{`Editing "${t_grp.title}"`}</h4>
    <Target_GroupEditor t_grp={t_grp} history={history} />
  </div>
) : <NotFound />);

EditTarget_Group.propTypes = {
  t_grp: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const target_groupId = match.params._id;
  const subscription = Meteor.subscribe('target_groups.view', target_groupId);

  return {
    loading: !subscription.ready(),
    t_grp: Target_Groups.findOne(target_groupId),
  };
}, EditTarget_Group);
