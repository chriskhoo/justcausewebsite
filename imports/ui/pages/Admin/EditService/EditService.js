import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Services from '../../../../api/Services/Services';
import ServiceEditor from '../../../components/ServiceEditor/ServiceEditor';
import NotFound from '../../NotFound/NotFound';

const EditService = ({ svcs, history }) => (svcs ? (
  <div className="EditService">
    <h4 className="page-header">{`Editing "${svcs.title}"`}</h4>
    <ServiceEditor svcs={svcs} history={history} />
  </div>
) : <NotFound />);

EditService.propTypes = {
  svcs: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const serviceId = match.params._id;
  const subscription = Meteor.subscribe('services.view', serviceId);

  return {
    loading: !subscription.ready(),
    svcs: Services.findOne(serviceId),
  };
}, EditService);
