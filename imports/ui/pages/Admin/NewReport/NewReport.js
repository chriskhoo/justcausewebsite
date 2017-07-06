import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Loading from '../../../components/Loading/Loading';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';
import CharitiesCollection from '../../../../api/Charities/Charities';

const NewReport = ({ history, loading, svcs, ctrys, t_grps, d_levels, chtys }) => (
  !loading ? (
    <div className="NewReport">
      <h4 className="page-header">New Report</h4>
      <ReportEditor history={history} svcs={svcs} ctrys={ctrys} t_grps= {t_grps} d_levels={d_levels} chtys={chtys}/>
    </div>
  ) : <Loading />
);

NewReport.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  chtys: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const d_levelsSubscription = Meteor.subscribe('detail_levels');
  const chtysSubscription = Meteor.subscribe('charities');
  return {
    loading: !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !d_levelsSubscription.ready() || !chtysSubscription.ready(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    d_levels: Detail_LevelsCollection.find().fetch(),
    chtys: CharitiesCollection.find().fetch(),
  };
}, NewReport);
