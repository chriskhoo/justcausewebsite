import React from 'react';
import PropTypes from 'prop-types';
import Target_GroupEditor from '../../../components/Target_GroupEditor/Target_GroupEditor';

const NewTarget_Group = ({ history }) => (
  <div className="NewTarget_Group">
    <h4 className="page-header">New Target_Group</h4>
    <Target_GroupEditor history={history} />
  </div>
);

NewTarget_Group.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTarget_Group;
