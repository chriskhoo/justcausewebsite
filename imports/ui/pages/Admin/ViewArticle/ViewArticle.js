import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import Content from '../../../components/Content/Content';
import parseMarkdown from '../../../../modules/parse-markdown';
import ArticlesCollection from '../../../../api/Articles/Articles';

const handleRemove = (articleId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('articles.remove', articleId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article deleted!', 'success');
        history.push('/admin/articles');
      }
    });
  }
};

const renderArticle = (art, match, history) => (art ? (
  <div className="ViewArticle">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ art && art.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(art._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <div>
      <Panel header='Summary'>
        { art.summary }
      </Panel>
      <Panel header='Services'>
        { art.service_ids.map( service => service.name ).join(', ') }
      </Panel>
      <Panel header='Country'>
        { art.country_id.name }
      </Panel>
      <Panel header='Taret Groups'>
        { art.target_group_ids.map( target_group => target_group.name ).join(', ') }
      </Panel>
      <Panel header='Article Type'>
        { art.article_type_id.name }
      </Panel>
      <Panel header='Body'>
        <div className="article_image"><img src={art.body} alt="body_preview" /></div>
      </Panel>
    </div>
  </div>
) : <NotFound />);

const ViewArticle = ({ loading, art, match, history }) => (
  !loading ? renderArticle(art, match, history) : <Loading />
);

ViewArticle.propTypes = {
  loading: PropTypes.bool.isRequired,
  art: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const articleId = match.params._id;
  const subscription = Meteor.subscribe('articles.view', articleId);

  return {
    loading: !subscription.ready(),
    art: ArticlesCollection.findOne(articleId),
  };
}, ViewArticle);
