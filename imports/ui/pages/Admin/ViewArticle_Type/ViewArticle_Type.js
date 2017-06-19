import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Article_Types from '../../../../api/Article_Types/Article_Types';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';

const handleRemove = (article_typeId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('article_types.remove', article_typeId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article_Type deleted!', 'success');
        history.push('/admin/article_types');
      }
    });
  }
};

const renderArticle_Type = (a_type, match, history) => (a_type ? (
  <div className="ViewArticle_Type">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ a_type && a_type.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(a_type._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { a_type && a_type.body }
  </div>
) : <NotFound />);

const ViewArticle_Type = ({ loading, a_type, match, history }) => (
  !loading ? renderArticle_Type(a_type, match, history) : <Loading />
);

ViewArticle_Type.propTypes = {
  loading: PropTypes.bool.isRequired,
  a_type: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const article_typeId = match.params._id;
  const subscription = Meteor.subscribe('article_types.view', article_typeId);

  return {
    loading: !subscription.ready(),
    a_type: Article_Types.findOne(article_typeId),
  };
}, ViewArticle_Type);
