import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Financial_Checklists from '../../../../api/Financial_Checklists/Financial_Checklists';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (financial_checklistId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('financial_checklists.remove', financial_checklistId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Financial_Checklist deleted!', 'success');
        history.push('/admin/financial_checklists');
      }
    });
  }
};

const renderFinancial_Checklist = (f_check, match, history) => (f_check ? (
  <div className="ViewFinancial_Checklist">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ f_check && f_check.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(f_check._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { f_check && f_check.body }
  </div>
) : <NotFound />);

const ViewFinancial_Checklist = ({ loading, f_check, match, history }) => (
  !loading ? renderFinancial_Checklist(f_check, match, history) : <Loading />
);

ViewFinancial_Checklist.propTypes = {
  loading: PropTypes.bool.isRequired,
  f_check: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const financial_checklistId = match.params._id;
  const subscription = Meteor.subscribe('financial_checklists.view', financial_checklistId);

  return {
    loading: !subscription.ready(),
    f_check: Financial_Checklists.findOne(financial_checklistId),
  };
}, ViewFinancial_Checklist);
