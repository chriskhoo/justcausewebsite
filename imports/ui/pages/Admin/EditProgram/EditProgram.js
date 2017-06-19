import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Programs from '../../../../api/Programs/Programs';
import ProgramEditor from '../../../components/ProgramEditor/ProgramEditor';
import NotFound from '../../NotFound/NotFound';

const EditProgram = ({ prgm, history }) => (prgm ? (
  <div className="EditProgram">
    <h4 className="page-header">{`Editing "${prgm.title}"`}</h4>
    <ProgramEditor prgm={prgm} history={history} />
  </div>
) : <NotFound />);

EditProgram.propTypes = {
  prgm: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const programId = match.params._id;
  const subscription = Meteor.subscribe('programs.view', programId);

  return {
    loading: !subscription.ready(),
    prgm: Programs.findOne(programId),
  };
}, EditProgram);
