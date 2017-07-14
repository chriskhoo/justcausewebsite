/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Alert } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import TagChecklist from '../TagChecklist/TagChecklist';
import SearchBar from '../SearchBar/SearchBar';
import ReportCard from '../ReportCard/ReportCard';
import { getCheckedIdArray, scrubObject } from '../../../modules/get-form-elements'

import './SearchResults.scss';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
    this.state = {
      filter_object: _extractParams(props.history),
    }
  }

  handleFilters(){
    let nextState = this.state;
    filter_object = nextState.filter_object
    filter_object.detail_level = getCheckedIdArray('detail_level', this.form);
    filter_object.country = getCheckedIdArray('country', this.form);
    filter_object.target_group = getCheckedIdArray('target_group', this.form);
    filter_object.service = getCheckedIdArray('service', this.form);
    this.setState(nextState);
  }

  handleSubmit(svcs, ctrys, t_grps, d_levels, history, match){
    const search = this.form.search.value.trim();
    const d_levels_insert = _searchparameter('detail_level', this.form);
    const ctrys_insert = _searchparameter('country', this.form);
    const t_grps_insert = _searchparameter('target_group', this.form);
    const svcs_insert = _searchparameter('service', this.form);
    history.push(`results?q=${search}${d_levels_insert}${ctrys_insert}${t_grps_insert}${svcs_insert}`);
    nextState = this.state;
    nextState.filter_object = _extractParams(history),
    this.setState(nextState);
  }

  render() {
    const { rpts, svcs, ctrys, t_grps, d_levels, history, match } = this.props;
    const filter_object = this.state.filter_object
    const rpts_filtered = _reportfilter(filter_object, rpts)
    return (
      <form className='search-results' ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <SearchBar handleSubmit= {()=>this.handleSubmit(svcs, ctrys, t_grps, d_levels, history, match)} query = {filter_object.q}/>
        <p className='caption'>Find the charity that matches your values and impact goals</p>

        <div className='search-results-wrapper'>
          <div className='search-filters'>
            <h4>Search Filters</h4>
            <TagChecklist tag_name='detail_level' tag_object={d_levels} filtered_options={filter_object.detail_level}  handleFilters={this.handleFilters} />
            <TagChecklist tag_name='country' tag_object={ctrys} filtered_options={filter_object.country} handleFilters={this.handleFilters} />
            <TagChecklist tag_name='target_group' tag_object={t_grps} filtered_options={filter_object.target_group} handleFilters={this.handleFilters} />
            <TagChecklist tag_name='service' tag_object={svcs} filtered_options={filter_object.service} handleFilters={this.handleFilters} />
          </div>
          <div className='search-results-panel'>
            <h4>Results for "{filter_object.q}"</h4>
            {rpts_filtered.length ?
              <div className="report_cards_holder">
                {rpts_filtered.map(({ _id, detail_level_id, description, name, logo }) => {
                return(
                  <ReportCard
                    key = {_id}
                    detail_level_name={detail_level_id.name}
                    _id = {_id}
                    name= {name}
                    logo= {logo}
                    description={description}
                    history= {history}
                    match= {match}
                  />)})}
              </div> : <Alert bsStyle="warning">No reports yet!</Alert>}
          </div>
        </div>
      </form>
    );
  }
}

SearchResults.propTypes = {
  rpts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
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

function _reportfilter(filter_object, rpts){
  return rpts.filter(({detail_level_id})=>filter_object.detail_level.includes(detail_level_id._id) )
            .filter(({country_id})=>filter_object.country.includes(country_id._id) )
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
}

function _extractParams(history){
  const search = history.location.search.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  const {service, detail_level, country, target_group} = search_object;
  search_object.detail_level = detail_level? detail_level.split(',') : [];
  search_object.country = country? country.split(','): [];
  search_object.target_group = target_group? target_group.split(','): [];
  search_object.service = service? service.split(','): [];

  return search_object
}
