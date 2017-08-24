import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Row, Col} from 'react-bootstrap';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ReportsCollection from '../../../../api/Reports/Reports';
import CharitiesCollection from '../../../../api/Charities/Charities';
import BadgesCollection from '../../../../api/Badges/Badges';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import ArticlesCollection from '../../../../api/Articles/Articles';

import ViewTemplateHeader from '../../../components/ViewTemplateHeader/ViewTemplateHeader';
import ReportPanel from '../../../components/ReportPanel/ReportPanel';
import ViewTemplateAside from '../../../components/ViewTemplateAside/ViewTemplateAside';

import './ReportView.scss';

const renderReport = (rept, chty, bdgs, svcs, ctrys, t_grps, arts_rel, match, history) => ( (rept && chty) ? (
  <div className="report-view">
    <Row>
      <Col xs={12} md={12} ><ViewTemplateHeader rept={rept} chty={chty} bdgs={bdgs}/></Col>
    </Row>
    <div>
      <div className="report-body">
        <Col xs={12} md={8} ><ReportPanel rept={rept} chty={chty} bdgs={bdgs}/></Col>
        <Col xs={12} md={4} ><ViewTemplateAside rept={rept} chty={chty} svcs={svcs} ctrys={ctrys} t_grps={t_grps} arts_rel={arts_rel}/></Col>
      </div>
    </div>
  </div>
) : <NotFound />);

const ReportView = ({ loading, rept, chty, bdgs, svcs, ctrys, t_grps, arts_rel, match, history }) => (
  !loading ? renderReport(rept, chty, bdgs, svcs, ctrys, t_grps, arts_rel, match, history) : <Loading />
);

ReportView.propTypes = {
  loading: PropTypes.bool.isRequired,
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  arts_rel: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match, history }) => {
  const reportId = match.params._id;
  const searchQuery = _extractQueryObj(history);
  const {charity_id, target_groups, services} = searchQuery;
  const charityId = charity_id;
  const target_groupsIds = target_groups? target_groups.split(',') : [];
  const servicesIds = services? services.split(',') : [];
  const reptSubscription = Meteor.subscribe('reports.public.view', reportId);
  const chtySubscription = Meteor.subscribe('charities.view', charityId);
  const bdgsSubscription = Meteor.subscribe('badges');
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const artsSubscription = Meteor.subscribe('articles.related', target_groupsIds, servicesIds)
  return {
    loading: !chtySubscription.ready() || !reptSubscription.ready() || !bdgsSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || ! artsSubscription.ready(),
    rept: ReportsCollection.findOne(reportId),
    chty: CharitiesCollection.findOne(charityId),
    bdgs: BadgesCollection.find().fetch(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    arts_rel: ArticlesCollection.find().fetch(),
  };
}, ReportView);

//private function
function _extractQueryObj(history){
  const search = history.location.search.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  return search_object;
}
