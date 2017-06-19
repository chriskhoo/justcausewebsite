import React from 'react';
import PropTypes from 'prop-types';
import Detail_LevelEditor from '../../../components/Detail_LevelEditor/Detail_LevelEditor';

const NewDetail_Level = ({ history }) => (
  <div className="NewDetail_Level">
    <h4 className="page-header">New Detail_Level</h4>
    <Detail_LevelEditor history={history} />
  </div>
);

NewDetail_Level.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDetail_Level;
