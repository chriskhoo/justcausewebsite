import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Article_Types from '../../../../api/Article_Types/Article_Types';
import Article_TypeEditor from '../../../components/Article_TypeEditor/Article_TypeEditor';
import NotFound from '../../NotFound/NotFound';

const EditArticle_Type = ({ a_type, history }) => (a_type ? (
  <div className="EditArticle_Type">
    <h4 className="page-header">{`Editing "${a_type.title}"`}</h4>
    <Article_TypeEditor a_type={a_type} history={history} />
  </div>
) : <NotFound />);

EditArticle_Type.propTypes = {
  a_type: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const article_typeId = match.params._id;
  const subscription = Meteor.subscribe('article_types.view', article_typeId);

  return {
    loading: !subscription.ready(),
    a_type: Article_Types.findOne(article_typeId),
  };
}, EditArticle_Type);
