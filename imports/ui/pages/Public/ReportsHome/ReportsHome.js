import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Alert, PanelGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../../../components/Loading/Loading';
import SearchBlock from '../../../components/SearchBlock/SearchBlock';
import ReportCard from '../../../components/ReportCard/ReportCard';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';
import ReportsCollection from '../../../../api/Reports/Reports';
import './ReportsHome.scss';

const ReportsHome = ({ loading, rpts, svcs, ctrys, t_grps, d_levels, history, match }) => (!loading ? (
  <div className="ReportsHome">
    <div className="page-header clearfix">
      <h3 className="pull-left">Charity Reports</h3>
    </div>
    <SearchBlock
      svcs={svcs}
      ctrys={ctrys}
      t_grps={t_grps}
      d_levels={d_levels}
      history={history}
      match={match} />

    <PanelGroup>
      <Panel collapsible header='Methodology' bsStyle="primary"> Methodology Stuff goes in here </Panel>
      <Panel collapsible header='Glossary' bsStyle="secondary"> Glossary Stuff goes in here </Panel>
    </PanelGroup>

    <h4>Recent Updates</h4>
    {rpts.length ?
      <div className="report_cards_holder">
        {rpts.slice(0,6).map(({ _id, detail_level_id, description, charity_id, name, logo, target_group_ids, service_ids}) => {
        return(
          <ReportCard
            key = {_id}
            detail_level_name={detail_level_id.name}
            charity_id = {charity_id}
            _id = {_id}
            name= {name}
            logo= {logo}
            description={description}
            target_group_ids ={target_group_ids}
            service_ids ={service_ids}
            history= {history}
            match= {match}
          />)})}
      </div> : <Alert bsStyle="warning">No reports yet!</Alert>}
  </div>
) : <Loading />);

ReportsHome.propTypes = {
  loading: PropTypes.bool.isRequired,
  rpts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const rptsSubscription = Meteor.subscribe('reports.public');
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
}, ReportsHome);
