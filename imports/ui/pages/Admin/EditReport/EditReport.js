import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';
import ReportsCollection from '../../../../api/Reports/Reports';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';

const renderEditReport = ( history, rept, svcs, ctrys, t_grps, d_levels ) => (rept ? (
  <div className="EditReport">
    <h4 className="page-header">{`Editing "${rept.title}"`}</h4>
    <ReportEditor rept={rept} history={history} svcs={svcs} ctrys={ctrys} t_grps={t_grps} d_levels={d_levels}/>
  </div>
) : <NotFound />);

const EditReport = ({ loading, history, rept, svcs, ctrys, t_grps, d_levels }) => (
  !loading ? renderEditReport( history, rept, svcs, ctrys, t_grps, d_levels ) : <Loading />
);

EditReport.propTypes = {
  history: PropTypes.object.isRequired,
  rept: PropTypes.object.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(({ match }) => {
  const reportId = match.params._id;
  const reptSubscription = Meteor.subscribe('reports.view', reportId);
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const d_levelsSubscription = Meteor.subscribe('detail_levels');
  return {
    loading: !reptSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !d_levelsSubscription.ready(),
    rept: ReportsCollection.findOne(reportId),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    d_levels: Detail_LevelsCollection.find().fetch(),
  };
}, EditReport);
