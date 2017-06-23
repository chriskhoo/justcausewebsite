import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ReportsCollection from '../../../../api/Reports/Reports';

const handleRemove = (reportId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('reports.remove', reportId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Report deleted!', 'success');
        history.push('/admin/reports');
      }
    });
  }
};

const renderReport = (rept, match, history) => (rept ? (
  <div className="ViewReport">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ rept && rept.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(rept._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <div>
      <Panel header='Body'>
        { rept.body }
      </Panel>
      <Panel header='Services'>
        { rept.service_ids.map( service => service.name ).join(', ') }
      </Panel>
      <Panel header='Country'>
        { rept.country_id.name }
      </Panel>
      <Panel header='Detail Level'>
        { rept.detail_level_id.name }
      </Panel>
      <Panel header='Taret Groups'>
        { rept.target_group_ids.map( target_group => target_group.name ).join(', ') }
      </Panel>
    </div>
  </div>
) : <NotFound />);

const ViewReport = ({ loading, rept, match, history }) => (
  !loading ? renderReport(rept, match, history) : <Loading />
);

ViewReport.propTypes = {
  loading: PropTypes.bool.isRequired,
  rept: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const reportId = match.params._id;
  const subscription = Meteor.subscribe('reports.view', reportId);

  return {
    loading: !subscription.ready(),
    rept: ReportsCollection.findOne(reportId),
  };
}, ViewReport);
