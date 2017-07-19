import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Alert, PanelGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../../../components/Loading/Loading';
import SearchBlock from '../../../components/SearchBlock/SearchBlock';
import ArticleCard from '../../../components/ArticleCard/ArticleCard';

import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Article_TypesCollection from '../../../../api/Article_Types/Article_Types';
import ArticlesCollection from '../../../../api/Articles/Articles';
import './ArticlesHome.scss';

const ArticlesHome = ({ loading, arts, svcs, ctrys, t_grps, a_types, history, match }) => (!loading ? (
  <div className="ArticlesHome">
    <div className="page-header clearfix">
      <h3 className="pull-left">Philantrophy insights</h3>
    </div>
    <SearchBlock
      svcs={svcs}
      ctrys={ctrys}
      t_grps={t_grps}
      a_types={a_types}
      history={history}
      match={match} />

    <PanelGroup>
      <Panel collapsible header='About Philantrophy Insights' bsStyle="secondary"> Stuff about philantrophy insights go here </Panel>
    </PanelGroup>

    <h4>Featured Articles</h4>
    {arts.length ?
      <div className="article_cards_holder">
        {arts.slice(0,6).map(({ _id, article_type_id, title, thumbnail, summary, target_group_ids, service_ids, country_id}) => {
        return(
          <ArticleCard
            key = {_id}
            article_type_name={article_type_id.name}
            _id = {_id}
            title= {title}
            thumbnail= {thumbnail}
            summary={summary}
            target_group_ids ={target_group_ids}
            service_ids ={service_ids}
            country_id={country_id}
            history= {history}
            match= {match}
          />
        )})}
      </div> : <Alert bsStyle="warning">No articles yet!</Alert>}
  </div>
) : <Loading />);

ArticlesHome.propTypes = {
  loading: PropTypes.bool.isRequired,
  arts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  a_types: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const artsSubscription = Meteor.subscribe('articles');
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const a_typesSubscription = Meteor.subscribe('article_types');
  return {
    loading: !artsSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !a_typesSubscription.ready(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    a_types: Article_TypesCollection.find().fetch(),
    arts: ArticlesCollection.find().fetch(),
  };
}, ArticlesHome);
