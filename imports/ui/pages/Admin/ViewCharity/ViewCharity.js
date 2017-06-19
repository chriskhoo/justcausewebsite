import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Charities from '../../../../api/Charities/Charities';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (charityId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('charities.remove', charityId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Charity deleted!', 'success');
        history.push('/admin/charities');
      }
    });
  }
};

const renderCharity = (chty, match, history) => (chty ? (
  <div className="ViewCharity">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ chty && chty.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(chty._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { chty && chty.body }
  </div>
) : <NotFound />);

const ViewCharity = ({ loading, chty, match, history }) => (
  !loading ? renderCharity(chty, match, history) : <Loading />
);

ViewCharity.propTypes = {
  loading: PropTypes.bool.isRequired,
  chty: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const charityId = match.params._id;
  const subscription = Meteor.subscribe('charities.view', charityId);

  return {
    loading: !subscription.ready(),
    chty: Charities.findOne(charityId),
  };
}, ViewCharity);
