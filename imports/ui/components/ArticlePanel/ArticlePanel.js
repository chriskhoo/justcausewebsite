/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';

import './ArticlePanel.scss';

class ArticlePanel extends React.Component {
  render() {
    const { art } = this.props;
    const { body } = art || {};
    return ((art)?
      <div className='article-panel'>
        <img src={body} alt='article body' />
      </div>:<div>Article not found</div>);
  }
}

ArticlePanel.propTypes = {
  art: PropTypes.object.isRequired,
};

export default ArticlePanel;
