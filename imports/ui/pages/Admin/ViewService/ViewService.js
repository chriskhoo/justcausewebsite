import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Services from '../../../../api/Services/Services';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (serviceId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('services.remove', serviceId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Service deleted!', 'success');
        history.push('/admin/services');
      }
    });
  }
};

const renderService = (svcs, match, history) => (svcs ? (
  <div className="ViewService">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ svcs && svcs.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(svcs._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { svcs && svcs.body }
  </div>
) : <NotFound />);

const ViewService = ({ loading, svcs, match, history }) => (
  !loading ? renderService(svcs, match, history) : <Loading />
);

ViewService.propTypes = {
  loading: PropTypes.bool.isRequired,
  svcs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const serviceId = match.params._id;
  const subscription = Meteor.subscribe('services.view', serviceId);

  return {
    loading: !subscription.ready(),
    svcs: Services.findOne(serviceId),
  };
}, ViewService);
