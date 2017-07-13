/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../modules/process-strings';

import './TagChecklist.scss';

class TagChecklist extends React.Component {

  render() {
    const { tag_name, tag_object } = this.props;
    const newLabel = tag_name.split('_').map(capitalize).join(' ');
    return (
      <div className='tag-checklist'><h5>{newLabel}</h5> {tag_object.map(({_id, name})=>
        <div key={_id}>
          <input
            type= "checkbox"
            name= {`${tag_name}-${_id}`}
            defaultChecked = {true}
            />
          <span> {name}</span>
        </div>
      )}</div>
    );
  }
}

TagChecklist.propTypes = {
  tag_name: PropTypes.string.isRequired, // this should be in snake case
  tag_object: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagChecklist;
