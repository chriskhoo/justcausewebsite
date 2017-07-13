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

  handleSubmit(svcs, ctrys, t_grps, d_levels, history, match){
    const search = this.form.search.value.trim();
    const d_levels_array = getCheckedIdArray('detail_level', this.form).toString();
    const ctrys_array = getCheckedIdArray('country', this.form).toString();
    const t_grps_array = getCheckedIdArray('target_group', this.form).toString();
    const svcs_array = getCheckedIdArray('service', this.form).toString();
    history.push(`${match.url}/search?q=${search}&svcs=${svcs_array}&ctrys=${ctrys_array}&t_grps=${t_grps_array}&d_levels=${d_levels_array}`);
  }

  render() {
    const { svcs, ctrys, t_grps, d_levels, history, match } = this.props;
    return (
      <form className='searchblock' ref={form => (this.form = form)}>
        <SearchBar handleSubmit= {()=>this.handleSubmit(svcs, ctrys, t_grps, d_levels, history, match)} />
        <p className='caption'>Find the charity that matches your values and impact goals</p>
        {
          this.state.aSearch?
          (<div className='advance-search open'>
            <div onClick={this.toggleSearch}>
              <p>Advanced Search</p>
              <Glyphicon glyph="chevron-up"></Glyphicon>
            </div>
            <div className='tag-panel'>
              <TagChecklist tag_name='detail_level' tag_object={d_levels} />
              <TagChecklist tag_name='country' tag_object={ctrys} />
              <TagChecklist tag_name='target_group' tag_object={t_grps} />
              <TagChecklist tag_name='service' tag_object={svcs} />
            </div>
          </div>)
          :
          (<div className='advance-search' onClick={this.toggleSearch}>
            <p>Advanced Search</p>
            <Glyphicon glyph="chevron-down"></Glyphicon>
          </div>)
        }
      </form>
    );
  }
}

SearchBlock.propTypes = {
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default SearchBlock;
