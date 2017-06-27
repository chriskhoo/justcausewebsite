import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor';
import ArticlesCollection from '../../../../api/Articles/Articles';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Article_TypesCollection from '../../../../api/Article_Types/Article_Types';

const renderEditArticle = ( history, art, svcs, ctrys, t_grps, a_types ) => (art ? (
  <div className="EditArticle">
    <h4 className="page-header">{`Editing "${art.title}"`}</h4>
    <ArticleEditor art={art} history={history} svcs={svcs} ctrys={ctrys} t_grps={t_grps} a_types={a_types}/>
  </div>
) : <NotFound />);

const EditArticle = ({ loading, history, art, svcs, ctrys, t_grps, a_types }) => (
  !loading ? renderEditArticle( history, art, svcs, ctrys, t_grps, a_types ) : <Loading />
);

EditArticle.propTypes = {
  history: PropTypes.object.isRequired,
  art: PropTypes.object.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  a_types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(({ match }) => {
  const articleId = match.params._id;
  const artSubscription = Meteor.subscribe('articles.view', articleId);
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const a_typesSubscription = Meteor.subscribe('article_types');
  return {
    loading: !artSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !a_typesSubscription.ready(),
    art: ArticlesCollection.findOne(articleId),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    a_types: Article_TypesCollection.find().fetch(),
  };
}, EditArticle);
