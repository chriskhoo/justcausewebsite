import React from 'react';
import PropTypes from 'prop-types';
import Article_TypeEditor from '../../../components/Article_TypeEditor/Article_TypeEditor';

const NewArticle_Type = ({ history }) => (
  <div className="NewArticle_Type">
    <h4 className="page-header">New Article_Type</h4>
    <Article_TypeEditor history={history} />
  </div>
);

NewArticle_Type.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewArticle_Type;
