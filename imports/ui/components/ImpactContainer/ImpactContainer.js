/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Content from '../Content/Content';
import parseMarkdown from '../../../modules/parse-markdown';
import './ImpactContainer.scss';

class ImpactContainer extends React.Component {
  render() {
    const { data_collection, continuous_improvement, impact_framework, commentary, outcome_quotes, outputs, outcomes } = this.props.impact_info;
    return (
      <Panel className='ImpactContainer' header='Impact Info'>
        {data_collection?(<div><strong>Data Collection</strong><Content content={ parseMarkdown(data_collection) } /></div>):''}
        {continuous_improvement?(<div><strong>Continuous Improvement</strong><Content content={ parseMarkdown(continuous_improvement) } /></div>):''}
        {impact_framework?(<div><strong>Impact Framework</strong><Content content={ parseMarkdown(impact_framework) } /></div>):''}
        {commentary?(<div><strong>Commentary</strong><Content content={ parseMarkdown(commentary) } /></div>):''}
        <div className='panel-group'>
          <div className='panel panel-default group-elements half-width'>
            <div className = 'panel-body'>
              <h4>Outputs</h4>
              {outputs.map((output)=>
                <div key={output._id}>
                  <div className="ten1-width inline-block key-figure">{output.number}</div>
                  <div className='ten1-width inline-block'></div>
                  <div className="ten8-width inline-block">{output.description}</div>
                </div>)}
            </div>
          </div>
          <div className='ten1-width'></div>
          <div className='panel panel-default group-elements half-width'>
            <div className='panel-body'>
              <h4>Outcomes</h4>
              {outcomes.map((outcome)=>
              <div key={outcome._id}>
                <div className="ten1-width inline-block key-figure">{outcome.number}</div>
                <div className='ten1-width inline-block'></div>
                <div className="ten8-width inline-block">{outcome.description}</div>
              </div>)}
              <p></p>
              {outcome_quotes?<Content content={ parseMarkdown(outcome_quotes) } />:''}
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

ImpactContainer.propTypes = {
  impact_info: PropTypes.object,
};

export default ImpactContainer;
