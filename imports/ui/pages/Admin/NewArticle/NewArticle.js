import React from 'react';
import PropTypes from 'prop-types';
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor';

const NewArticle = ({ history }) => (
  <div className="NewArticle">
    <h4 className="page-header">New Article</h4>
    <ArticleEditor history={history} />
  </div>
);

NewArticle.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewArticle;
