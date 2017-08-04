/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import { monthDayYear } from '@cleverbeagle/dates';
import { getArticleClassName } from '../../../modules/get-form-elements'
import ReportHeaderBadgeRow from '../ReportHeaderBadgeRow/ReportHeaderBadgeRow'

import './ViewTemplateHeader.scss';

class ViewTemplateHeader extends React.Component {
  render() {
    const { art, rept, chty, bdgs } = this.props;
    const type = art? 'article' : 'report';
    let bannerClassName = '';
    if(type == 'article'){
      var { title, summary, thumbnail, updatedAt, article_type_id } = art;
      var article_type_name = article_type_id.name;
      bannerClassName = getArticleClassName(article_type_name);
    }
    if(type == 'report'){
      var { year_established, badges_awarded } = chty;
      var { name, logo, detail_level_id } = rept;
      var detail_level_name = detail_level_id.name;
      bannerClassName = detail_level_name;
    }

    return ( (art||rept)?
      <div className='view-template-header'>
        <div className='view-template-thumbnail'>
          <img src={(type=='article')?thumbnail:logo} alt='thumbnail'/>
        </div>
        <div className = 'header-container'>
          <div className={ `banner ${bannerClassName}`} >{(type=='article')?article_type_name:detail_level_name}</div>
          <h3>{ (type=='article')?title:name }</h3>

          {(type=='article')?
          <p><strong>Last updated: { updatedAt? monthDayYear(updatedAt):'' }</strong></p>
          :<p>Organisation registered in { year_established }</p>}

          {(type=='article')?
          (summary?<Content content={ parseMarkdown(summary) } />:'')
          :<ReportHeaderBadgeRow bdgs={bdgs} badges_awarded={badges_awarded} />}
        </div>
      </div>: <div></div>)
  }
}

ViewTemplateHeader.propTypes = {
  art: PropTypes.object,
  rept: PropTypes.object,
  chty: PropTypes.object,
  bdgs: PropTypes.arrayOf(PropTypes.object),
};

export default ViewTemplateHeader;
