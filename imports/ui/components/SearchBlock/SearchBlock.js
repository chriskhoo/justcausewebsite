/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import FormTextInput from '../../componentElements/FormTextInput/FormTextInput';
import TagChecklist from '../TagChecklist/TagChecklist';
import SearchBar from '../SearchBar/SearchBar';
import { getCheckedIdArray, scrubObject } from '../../../modules/get-form-elements'

import './SearchBlock.scss';

class SearchBlock extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      aSearch: false,
    }
  }

  toggleSearch(){
    nextState = this.state;
    nextState.aSearch = !this.state.aSearch;
    this.setState(nextState);
  }

  handleSubmit(svcs, ctrys, t_grps, d_levels, a_types, history, match){
    const search = this.form.search.value.trim();
    const a_types_insert = a_types?_searchparameter('article_type', this.form):'';
    const d_levels_insert = d_levels?_searchparameter('detail_level', this.form):'';
    const ctrys_insert = ctrys?_searchparameter('country', this.form):'';
    const t_grps_insert = t_grps?_searchparameter('target_group', this.form):'';
    const svcs_insert = svcs?_searchparameter('service', this.form):'';
    history.push(`${match.url}/results?q=${search}${d_levels_insert}${ctrys_insert}${t_grps_insert}${svcs_insert}${a_types_insert}`);
  }

  render() {
    const { svcs, ctrys, t_grps, d_levels, a_types, history, match } = this.props;
    return (
      <form className='searchblock' ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <SearchBar handleSubmit= {()=>this.handleSubmit(svcs, ctrys, t_grps, d_levels, a_types, history, match)} />
        <p className='caption'>Find the charity that matches your values and impact goals</p>
        <div className= {this.state.aSearch?'advance-search open':'advance-search'} >
          <div onClick={this.toggleSearch}>
            <p>Advanced Search</p>
            <Glyphicon glyph={this.state.aSearch?'chevron-up':'chevron-down'}></Glyphicon>
          </div>
          <div className={this.state.aSearch?'tag-panel':'tag-panel hidden'}>
            {a_types?<TagChecklist tag_name='article_type' tag_object={a_types} page='home'/>:''}
            {d_levels?<TagChecklist tag_name='detail_level' tag_object={d_levels} page='home'/>:''}
            <TagChecklist tag_name='country' tag_object={ctrys} page='home'/>
            <TagChecklist tag_name='target_group' tag_object={t_grps} page='home'/>
            <TagChecklist tag_name='service' tag_object={svcs} page='home'/>
          </div>
        </div>
      </form>
    );
  }
}

SearchBlock.propTypes = {
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object),
  a_types: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default SearchBlock;

// Private functions
function _searchparameter(field, form){
  const value_array= getCheckedIdArray(field, form).toString();
  if(value_array){
    return `&${field}=${value_array}`;
  }else{
    return '';
  }
}
