import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Countries from '../../../../api/Countries/Countries';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (countryId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('countries.remove', countryId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Country deleted!', 'success');
        history.push('/admin/countries');
      }
    });
  }
};

const renderCountry = (ctry, match, history) => (ctry ? (
  <div className="ViewCountry">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ ctry && ctry.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(ctry._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { ctry && ctry.body }
  </div>
) : <NotFound />);

const ViewCountry = ({ loading, ctry, match, history }) => (
  !loading ? renderCountry(ctry, match, history) : <Loading />
);

ViewCountry.propTypes = {
  loading: PropTypes.bool.isRequired,
  ctry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const countryId = match.params._id;
  const subscription = Meteor.subscribe('countries.view', countryId);

  return {
    loading: !subscription.ready(),
    ctry: Countries.findOne(countryId),
  };
}, ViewCountry);
