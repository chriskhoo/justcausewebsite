import React from 'react';
import PropTypes from 'prop-types';
import ProgramEditor from '../../../components/ProgramEditor/ProgramEditor';

const NewProgram = ({ history }) => (
  <div className="NewProgram">
    <h4 className="page-header">New Program</h4>
    <ProgramEditor history={history} />
  </div>
);

NewProgram.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewProgram;
