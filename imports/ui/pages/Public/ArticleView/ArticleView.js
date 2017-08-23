import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Row, Col} from 'react-bootstrap';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ArticlesCollection from '../../../../api/Articles/Articles';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import ReportsCollection from '../../../../api/Reports/Reports';

import ViewTemplateHeader from '../../../components/ViewTemplateHeader/ViewTemplateHeader';
import ArticlePanel from '../../../components/ArticlePanel/ArticlePanel';
import ViewTemplateAside from '../../../components/ViewTemplateAside/ViewTemplateAside';

import './ArticleView.scss';

const renderReport = (art, svcs, ctrys, t_grps, rpts_rel, match, history) => art ? (
  <div className="article-view">
    <Row>
      <Col xs={12} md={12} ><ViewTemplateHeader art={art} /></Col>
    </Row>

    <Row className="article-body">
      <Col xs={12} md={8} ><ArticlePanel art={art} /></Col>
      <Col xs={12} md={4} ><ViewTemplateAside art={art} svcs={svcs} ctrys={ctrys} t_grps={t_grps} rpts_rel={rpts_rel}/></Col>
    </Row>
  </div>
) : <NotFound />;

const ArticleView = ({ loading, art, svcs, ctrys, t_grps, rpts_rel, match, history }) => (
  !loading ? renderReport(art, svcs, ctrys, t_grps, rpts_rel, match, history) : <Loading />
);

ArticleView.propTypes = {
  loading: PropTypes.bool.isRequired,
  art: PropTypes.object.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  rpts_rel: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match, history }) => {
  const articleId = match.params._id;
  const searchQuery = _extractQueryObj(history);
  const {target_groups, services} = searchQuery;
  const target_groupsIds = target_groups? target_groups.split(',') : [];
  const servicesIds = services? services.split(',') : [];
  const artSubscription = Meteor.subscribe('articles.view', articleId);
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const rptsSubscription = Meteor.subscribe('reports.related', target_groupsIds, servicesIds)
  return {
    loading: !artSubscription.ready() || !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || ! rptsSubscription.ready(),
    art: ArticlesCollection.findOne(articleId),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    rpts_rel: ReportsCollection.find().fetch(),
  };
}, ArticleView);

//private function
function _extractQueryObj(history){
  const search = history.location.search.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  return search_object;
}
