import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Articles from '../../../../api/Articles/Articles';
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor';
import NotFound from '../../NotFound/NotFound';

const EditArticle = ({ art, history }) => (art ? (
  <div className="EditArticle">
    <h4 className="page-header">{`Editing "${art.title}"`}</h4>
    <ArticleEditor art={art} history={history} />
  </div>
) : <NotFound />);

EditArticle.propTypes = {
  art: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const articleId = match.params._id;
  const subscription = Meteor.subscribe('articles.view', articleId);

  return {
    loading: !subscription.ready(),
    art: Articles.findOne(articleId),
  };
}, EditArticle);
