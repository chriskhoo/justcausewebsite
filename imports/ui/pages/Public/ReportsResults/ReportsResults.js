import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../../../components/Loading/Loading';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';
import ReportsCollection from '../../../../api/Reports/Reports';
import SearchResults from '../../../components/SearchResults/SearchResults';

const ReportsResults = ({ loading, rpts, svcs, ctrys, t_grps, d_levels, history, match }) => (!loading ? (
  <div className="ReportsResults">
    <div className="page-header clearfix">
      <h3 className="pull-left">Charity Reports</h3>
    </div>
    <SearchResults
      rpts={rpts}
      svcs={svcs}
      ctrys={ctrys}
      t_grps={t_grps}
      d_levels={d_levels}
      history={history}
      match={match}
    />
  </div>
) : <Loading />);

ReportsResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  rpts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(({history}) => {
  const searchQuery = _extractQuery(history);
  const rptsSubscription = Meteor.subscribe('reports.search', searchQuery);
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const d_levelsSubscription = Meteor.subscribe('detail_levels');
  return {
    loading: !rptsSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !d_levelsSubscription.ready(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    d_levels: Detail_LevelsCollection.find().fetch(),
    rpts: ReportsCollection.find().fetch(),
  };
}, ReportsResults);

//private function
function _extractQuery(history){
  const search = history.location.search.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return search_object.q
}
