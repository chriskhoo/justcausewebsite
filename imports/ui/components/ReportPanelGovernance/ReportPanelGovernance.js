/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import parseMarkdown from '../../../modules/parse-markdown';
import Content from '../Content/Content';
import { Glyphicon, Table } from 'react-bootstrap';
import ReportIconImage from '../ReportIconImage/ReportIconImage'

import './ReportPanelGovernance.scss';

class ReportPanelGovernance extends React.Component {
  render() {
    const { chty } = this.props;
    const { leadership_info } = chty || {};
    const { background_year, board_size, gender_ratio, person_1_face, person_1_name, person_1_position, person_1_description, person_2_face, person_2_name, person_2_position, person_2_description, profession_1_name, profession_1_number, profession_2_name, profession_2_number, profession_3_name, profession_3_number, profession_4_name, profession_4_number, profession_5_name, profession_5_number, profession_6_name, profession_6_number, governance_checklist_ids, commentary } = leadership_info || {};
    const graph1_check = background_year && board_size;
    const graph2_check = background_year && gender_ratio;
    const graph3_check = person_1_face && person_1_name && person_1_position && person_1_description;
    const graph4_check = person_2_face && person_2_name && person_2_position && person_2_description;
    const graph5_check = profession_1_name && profession_1_number;
    return ( leadership_info?
      <div className='report-panel-governance'>
        {(graph1_check || graph2_check || graph5_check)?(<div className='report-section'>
          <h4>Quick facts about this organisation</h4>
          <div className='report-row' >
            <div className='report-section fact-wrapper'>
              { graph1_check? <div className='fact-container'>
                <h4>Total board size</h4>
                <p>Financial year: {background_year}</p>
                <p className='key-figure'>{board_size}</p>
              </div>:'' }
              { graph2_check? <div className='fact-container'>
                <h4>Board gender balance</h4>
                <p>Financial year: {background_year}</p>
                <p className='key-figure'>{gender_ratio}</p>
                <p>Male : Female</p>
              </div>:'' }
            </div>
            { graph5_check? <div className='fact-wrapper'>
              <div className='fact-container'>
                <h4>Board composition by professional background</h4>
                <p>Financial year: {background_year}</p>
                <Table striped bordered hover responsive>
                  <thead><tr><th>Profession</th><th>#</th></tr>
                  </thead>
                  <tbody>
                    <tr><th>{profession_1_name}</th><td>{profession_1_number}</td></tr>
                    <tr><th>{profession_2_name}</th><td>{profession_2_number}</td></tr>
                    <tr><th>{profession_3_name}</th><td>{profession_3_number}</td></tr>
                    <tr><th>{profession_4_name}</th><td>{profession_4_number}</td></tr>
                    <tr><th>{profession_5_name}</th><td>{profession_5_number}</td></tr>
                    <tr><th>{profession_6_name}</th><td>{profession_6_number}</td></tr>
                  </tbody>
                </Table>
              </div>
            </div>:'' }
          </div>
        </div>) :''}
        {graph3_check?(<div className='report-section'>
          <h4>Charity leadership</h4>
          <div className='report-row'>
            <ReportIconImage image={person_1_face}/>
            <div className='text-beside'>
              <h4>{person_1_name}</h4>
              <p><strong>{person_1_position}</strong></p>
              <Content content={ parseMarkdown(person_1_description) } />
            </div>
          </div>
          {graph4_check?<div className='report-row'>
            <ReportIconImage image={person_2_face}/>
            <div className='text-beside'>
              <h4>{person_2_name}</h4>
              <p><strong>{person_2_position}</strong></p>
              <Content content={ parseMarkdown(person_2_description) } />
            </div>
          </div>:''}
        </div>) :''}
        {governance_checklist_ids && (governance_checklist_ids.length >0 )?
          (<div className='report-section'>
            <h4>Governance checklist for this organisation</h4>
            { governance_checklist_ids.map( (checklist)=><div key={checklist._id} className='report-row' >
              <Glyphicon glyph='ok' className='key-figure' />
              <div className='text-beside'>{checklist.description}</div>
            </div> ) }
          </div>) :''}
        {commentary?(<div className='report-section opinion-box'>
          <h4>Just Cause commentary on governance and leadership</h4>
          <Content content={ parseMarkdown(commentary) } />
        </div>) :''}
      </div>:<div></div>);
  }
}

ReportPanelGovernance.propTypes = {
  chty: PropTypes.object.isRequired,
};

export default ReportPanelGovernance;
