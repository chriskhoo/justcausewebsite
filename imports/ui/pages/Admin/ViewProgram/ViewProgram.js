import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Programs from '../../../../api/Programs/Programs';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (programId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('programs.remove', programId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Program deleted!', 'success');
        history.push('/admin/programs');
      }
    });
  }
};

const renderProgram = (prgm, match, history) => (prgm ? (
  <div className="ViewProgram">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ prgm && prgm.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(prgm._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { prgm && prgm.body }
  </div>
) : <NotFound />);

const ViewProgram = ({ loading, prgm, match, history }) => (
  !loading ? renderProgram(prgm, match, history) : <Loading />
);

ViewProgram.propTypes = {
  loading: PropTypes.bool.isRequired,
  prgm: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const programId = match.params._id;
  const subscription = Meteor.subscribe('programs.view', programId);

  return {
    loading: !subscription.ready(),
    prgm: Programs.findOne(programId),
  };
}, ViewProgram);
