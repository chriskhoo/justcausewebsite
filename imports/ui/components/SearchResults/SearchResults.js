/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Alert, Col, Row } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import TagChecklist from '../TagChecklist/TagChecklist';
import SearchBar from '../SearchBar/SearchBar';
import ReportCard from '../ReportCard/ReportCard';
import ArticleCard from '../ArticleCard/ArticleCard';
import { getCheckedIdArray, scrubObject, extract_values } from '../../../modules/get-form-elements';
import { numberWithCommas } from '../../../modules/get-form-elements'

import './SearchResults.scss';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
    this.state = {
      filter_object: _extractParams(props),
    }
  }

  handleFilters(){
    let nextState = this.state;
    filter_object = nextState.filter_object
    filter_object.article_type = getCheckedIdArray('article_type', this.form);
    filter_object.detail_level = getCheckedIdArray('detail_level', this.form);
    filter_object.country = getCheckedIdArray('country', this.form);
    filter_object.target_group = getCheckedIdArray('target_group', this.form);
    filter_object.service = getCheckedIdArray('service', this.form);
    this.setState(nextState);
  }

  handleSubmit(svcs, ctrys, t_grps, d_levels, a_types, history, match){
    const search = this.form.search.value.trim();
    const a_types_insert = a_types? _searchparameter('article_type', this.form):'';
    const d_levels_insert = d_levels? _searchparameter('detail_level', this.form):'';
    const ctrys_insert = _searchparameter('country', this.form);
    const t_grps_insert = _searchparameter('target_group', this.form);
    const svcs_insert = _searchparameter('service', this.form);
    history.push(`results?q=${search}${d_levels_insert}${a_types_insert}${ctrys_insert}${t_grps_insert}${svcs_insert}`);
    nextState = this.state;
    nextState.filter_object = _extractParams(this.props);
    this.setState(nextState);
  }

  render() {
    const { arts, rpts, svcs, ctrys, t_grps, d_levels, a_types, history, match } = this.props;
    const type = rpts? 'report' : 'article';
    const filter_object = this.state.filter_object;
    const rpts_filtered = rpts? _objectfilter(filter_object, rpts, 'report'): undefined;
    const arts_filtered = arts? _objectfilter(filter_object, arts, 'article'): undefined;
    return (
      <form className='search-results' ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <Row className='flex'>
          <SearchBar handleSubmit= {()=>this.handleSubmit(svcs, ctrys, t_grps, d_levels, a_types, history, match)} query = {filter_object.q}/>
        </Row>

        <Row className='search-results-wrapper'>
          <Col xs={12} md={3} className='search-filters'>
            <Row>
              <Col xs={12} md={12}><h4>Search Filters</h4></Col>
            </Row>
            <Row>
              {a_types? <Col xs={12} md={12} className='tag-checklist-first'><TagChecklist tag_name='article_type' tag_object={a_types} filtered_options={filter_object.article_type}  handleFilters={this.handleFilters} /></Col>: '' }
              {d_levels? <Col xs={12} md={12} className='tag-checklist-first'><TagChecklist tag_name='detail_level' tag_object={d_levels} filtered_options={filter_object.detail_level}  handleFilters={this.handleFilters} /></Col>: '' }
              <Col xs={12} md={12}><TagChecklist tag_name='country' tag_object={ctrys} filtered_options={filter_object.country} handleFilters={this.handleFilters} /></Col>
              <Col xs={12} md={12}><TagChecklist tag_name='target_group' tag_object={t_grps} filtered_options={filter_object.target_group} handleFilters={this.handleFilters} /></Col>
              <Col xs={12} md={12}><TagChecklist tag_name='service' tag_object={svcs} filtered_options={filter_object.service} handleFilters={this.handleFilters} /></Col>
            </Row>
          </Col>
          <Col xs={12} md={9} className='search-results-panel'>
            <h4>{ (type == 'report')? numberWithCommas(rpts_filtered.length) : numberWithCommas(arts_filtered.length) } Results for "{filter_object.q}"</h4>
            {(type == 'report')?
              (rpts_filtered.length ?
                <Row className="report_cards_holder">
                  {rpts_filtered.map(({ _id, charity_id, detail_level_id, target_group_ids, service_ids, description, name, logo }) => {
                  return(
                    <Col xs={12} md={6} key={_id}>
                      <ReportCard
                        detail_level_name={detail_level_id.name}
                        charity_id={charity_id}
                        _id = {_id}
                        name= {name}
                        logo= {logo}
                        description={description}
                        target_group_ids ={target_group_ids}
                        service_ids ={service_ids}
                        history= {history}
                        match= {match}
                      />
                    </Col>)})}
                </Row> : <Alert bsStyle="warning">No reports yet!</Alert>):
              (arts_filtered.length ?
                <Row className="article_cards_holder">
                  {arts_filtered.map( ({ _id, article_type_id, title, thumbnail, summary, target_group_ids, service_ids, country_id }) =>
                    <ArticleCard
                      key = {_id}
                      article_type_name={article_type_id.name}
                      _id = {_id}
                      title= {title}
                      thumbnail= {thumbnail}
                      summary={summary}
                      target_group_ids ={target_group_ids}
                      service_ids ={service_ids}
                      country_id={country_id}
                      history= {history}
                      match= {match}
                    /> )}
                </Row> : <Alert bsStyle="warning">No articles yet!</Alert>)
            }
          </Col>
        </Row>
      </form>
    );
  }
}

SearchResults.propTypes = {
  arts: PropTypes.arrayOf(PropTypes.object),
  rpts: PropTypes.arrayOf(PropTypes.object),
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object),
  a_types: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default SearchResults;

// Private functions
function _searchparameter(field, form){
  const value_array= getCheckedIdArray(field, form).toString();
  if(value_array){
    return `&${field}=${value_array}`;
  }else{
    return '';
  }
}

function _objectfilter(filter_object, object_to_filter, type){
  let object_filtered = object_to_filter.filter(({country_id})=>filter_object.country.includes(country_id._id) )
                                        .filter(({target_group_ids})=>{
                                          let contained = false;
                                          target_group_ids.map((report_target_grp)=>{
                                            if( filter_object.target_group.includes(report_target_grp._id) ){ contained = true }
                                          })
                                          return contained})
                                        .filter(({service_ids})=>{
                                          let contained = false;
                                          service_ids.map((report_service)=>{
                                            if( filter_object.service.includes(report_service._id) ){ contained = true }
                                          })
                                          return contained});
  if(type=='report'){
    object_filtered = object_filtered.filter(({detail_level_id})=>filter_object.detail_level.includes(detail_level_id._id) )
  } else if(type=='article'){
    object_filtered = object_filtered.filter(({article_type_id})=>filter_object.article_type.includes(article_type_id._id) )
  }
  return object_filtered;
}

function _extractParams(props){
  const search_param = props.history.location.search;
  if(!search_param){
    const { svcs, ctrys, t_grps, d_levels, a_types } = props;
    search_object = {'article_type': [], 'detail_level': [], 'country': [], 'target_group': [], 'service': [] };
    search_object.article_type = a_types? extract_values(a_types, '_id'): [];
    search_object.detail_level = d_levels? extract_values(d_levels, '_id'): [];
    search_object.country = ctrys? extract_values(ctrys, '_id'): [];
    search_object.target_group = t_grps? extract_values(t_grps, '_id'): [];
    search_object.service = svcs? extract_values(svcs, '_id'): [];
    return search_object;
  };
  const search = search_param.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  const {detail_level, article_type, country, target_group, service} = search_object;
  search_object.article_type = article_type? article_type.split(',') : [];
  search_object.detail_level = detail_level? detail_level.split(',') : [];
  search_object.country = country? country.split(','): [];
  search_object.target_group = target_group? target_group.split(','): [];
  search_object.service = service? service.split(','): [];
  return search_object;
}
