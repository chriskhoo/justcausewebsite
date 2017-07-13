import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Panel, Alert, Button, PanelGroup, Glyphicon } from 'react-bootstrap';
// import { timeago, monthDayYear } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../../components/Loading/Loading';
import SearchBlock from '../../../components/SearchBlock/SearchBlock';
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
    <SearchBlock svcs={svcs} ctrys={ctrys} t_grps={t_grps} d_levels={d_levels} history={history} match={match} />

    <PanelGroup>
      <Panel collapsible header='Methodology' bsStyle="primary"> Methodology Stuff goes in here </Panel>
      <Panel collapsible header='Glossary' bsStyle="secondary"> Glossary Stuff goes in here </Panel>
    </PanelGroup>

    <h4>Recent Updates</h4>
    {rpts.length ?
      <div className="report_cards_holder"> {rpts.slice(0,6).map(({ _id, detail_level_id, description, name, logo }) => {
        return(
        <div className="report_wrapper" key={_id}>
          <div className= {`report_card ${detail_level_id.name}`}>
            <div className={ `report_detail_level ${detail_level_id.name}`} >{detail_level_id.name}</div>
            <div className="thumbnail_custom"><img src={logo} alt={name+'logo'}/></div>
            <h4>{name}</h4>
            <p>{description}</p>
            <Button
              bsStyle="success"
              onClick={() => history.push(`${match.url}/${_id}`)}
              block
              >Details</Button>

          </div>
        </div>
      )})} </div> : <Alert bsStyle="warning">No reports yet!</Alert>}
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
