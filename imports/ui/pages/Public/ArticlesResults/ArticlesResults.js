import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../../../components/Loading/Loading';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Article_TypesCollection from '../../../../api/Article_Types/Article_Types';
import ArticlesCollection from '../../../../api/Articles/Articles';
import SearchResults from '../../../components/SearchResults/SearchResults';

const ArticlesResults = ({ loading, arts, svcs, ctrys, t_grps, a_types, history, match }) => (!loading ? (
  <div className="ArticlesResults">
    <div className="page-header clearfix">
      <h3 className="pull-left">Sector reports</h3>
    </div>
    <SearchResults
      arts={arts}
      svcs={svcs}
      ctrys={ctrys}
      t_grps={t_grps}
      a_types={a_types}
      history={history}
      match={match}
    />
  </div>
) : <Loading />);

ArticlesResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  arts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  a_types: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(({history}) => {
  const searchQuery = _extractQuery(history);
  const artsSubscription = Meteor.subscribe('articles.search', searchQuery);
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
}, ArticlesResults);

//private function
function _extractQuery(history){
  const search_param = history.location.search;
  if(!search_param){
    return "";
  };
  const search = search_param.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return search_object.q
}
