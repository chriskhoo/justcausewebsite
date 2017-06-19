import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Detail_Levels from '../../../../api/Detail_Levels/Detail_Levels';
import Detail_LevelEditor from '../../../components/Detail_LevelEditor/Detail_LevelEditor';
import NotFound from '../../NotFound/NotFound';

const EditDetail_Level = ({ d_level, history }) => (d_level ? (
  <div className="EditDetail_Level">
    <h4 className="page-header">{`Editing "${d_level.title}"`}</h4>
    <Detail_LevelEditor d_level={d_level} history={history} />
  </div>
) : <NotFound />);

EditDetail_Level.propTypes = {
  d_level: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const detail_levelId = match.params._id;
  const subscription = Meteor.subscribe('detail_levels.view', detail_levelId);

  return {
    loading: !subscription.ready(),
    d_level: Detail_Levels.findOne(detail_levelId),
  };
}, EditDetail_Level);
