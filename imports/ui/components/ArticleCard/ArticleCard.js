/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { extract_values } from '../../../modules/get-form-elements'

import './ArticleCard.scss';

class ArticleCard extends React.Component {
  render() {
    const { article_type_name, _id, title, thumbnail, summary, target_group_ids, service_ids, country_id, history, match } = this.props;
    target_group_ids_array = extract_values(target_group_ids, '_id').toString();
    service_ids_array = extract_values(service_ids, '_id').toString();
    const url = (match.url == '/articles/results')? `${_id}?target_groups=${target_group_ids_array}&services=${service_ids_array}` : `articles/${_id}?target_groups=${target_group_ids_array}&services=${service_ids_array}`
    const className = _getClassName(article_type_name);

    return(
      <div className="article_wrapper" key={_id}>
        <div className= {`article_card ${className}`}>
          <div className={ `article_type ${className}`} >{article_type_name}</div>
          <div className='article-row'>
            <div className='article-column small'>
              <div className="thumbnail_custom"><img src={thumbnail} alt={title+' thumbnail'}/></div>
              <Button
                bsStyle="success"
                onClick={() => history.push(url)}
                block
                >Read Article</Button>
            </div>
            <div className='article-column large'>
              <h4>{title}</h4>
              <p>{summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  article_type_name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  target_group_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
  service_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
  country_id: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ArticleCard;

// Private function
function _getClassName(article_type_name){
  switch (article_type_name){
    case 'Data Crunch':
      return 'data';
    case 'If I had a million':
      return 'million';
    case 'Perspectives':
      return 'perspectives';
    case 'Helicopter View':
      return 'heliview';
    default:
      return '';
  }
  return '';
}
