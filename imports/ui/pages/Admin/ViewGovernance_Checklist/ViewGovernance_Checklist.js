import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Governance_Checklists from '../../../../api/Governance_Checklists/Governance_Checklists';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (governance_checklistId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('governance_checklists.remove', governance_checklistId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Governance_Checklist deleted!', 'success');
        history.push('/admin/governance_checklists');
      }
    });
  }
};

const renderGovernance_Checklist = (g_check, match, history) => (g_check ? (
  <div className="ViewGovernance_Checklist">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ g_check && g_check.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(g_check._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { g_check && g_check.body }
  </div>
) : <NotFound />);

const ViewGovernance_Checklist = ({ loading, g_check, match, history }) => (
  !loading ? renderGovernance_Checklist(g_check, match, history) : <Loading />
);

ViewGovernance_Checklist.propTypes = {
  loading: PropTypes.bool.isRequired,
  g_check: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const governance_checklistId = match.params._id;
  const subscription = Meteor.subscribe('governance_checklists.view', governance_checklistId);

  return {
    loading: !subscription.ready(),
    g_check: Governance_Checklists.findOne(governance_checklistId),
  };
}, ViewGovernance_Checklist);
