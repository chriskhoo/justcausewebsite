import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import Content from '../../../components/Content/Content';
import parseMarkdown from '../../../../modules/parse-markdown';
import ImpactContainer from '../../../components/ImpactContainer/ImpactContainer';
import ReportsCollection from '../../../../api/Reports/Reports';
import CharitiesCollection from '../../../../api/Charities/Charities';

const renderReport = (rept, chtys, match, history) => (rept ? (
  <div className="ViewReport">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ rept && rept.title }</h4>
    </div>
    <div>
      <Panel header='Tags'>
        <p><strong>Services: </strong>{ rept.service_ids.map( service => service.name ).join(', ') }</p>
        <p><strong>Country: </strong>{ rept.country_id.name }</p>
        <p><strong>Target Groups: </strong>{ rept.target_group_ids.map( target_group => target_group.name ).join(', ') }</p>
        <p><strong>Detail Level: </strong>{ rept.detail_level_id.name }</p>
      </Panel>
      <Panel header='Report'>
        <p><strong>Type of report: </strong>{ rept.type }</p>
        <p><strong>Status: </strong>{ rept.completed? 'Completed' :'In progress' }</p>
        <p><strong>Description: </strong>{ rept.description }</p>
        <p><strong>Charity: </strong>{ getCharityName(chtys, rept.charity_id)  }</p>
        <p><strong>Program: </strong>{ getProgramName(chtys, rept.charity_id, rept.program_id) }</p>
      </Panel>
      {rept.impact_info? <ImpactContainer impact_info={rept.impact_info} /> :'' }
    </div>
  </div>
) : <NotFound />);

const ViewReport = ({ loading, rept, chtys, match, history }) => (
  !loading ? renderReport(rept, chtys, match, history) : <Loading />
);

ViewReport.propTypes = {
  loading: PropTypes.bool.isRequired,
  rept: PropTypes.object.isRequired,
  chtys: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const reportId = match.params._id;
  const reptSubscription = Meteor.subscribe('reports.view', reportId);
  const chtysSubscription = Meteor.subscribe('charities');
  return {
    loading: !chtysSubscription.ready() || !reptSubscription.ready() ,
    rept: ReportsCollection.findOne(reportId),
    chtys: CharitiesCollection.find().fetch(),
  };
}, ViewReport);

// private functions
function getCharityName(charities, charity_id){
  const charity = charities && charities.filter(({_id})=>_id == charity_id)[0];
  const charityName = charity && charity.name;
  return charityName;
}

function getProgramName(charities, charity_id, program_id){
  const charity = charities && charities.filter(({_id})=>_id == charity_id)[0];
  const charityPrograms = charity && charity.programs;
  const reportProgram = charityPrograms && charityPrograms.filter(({_id})=>_id == program_id)[0];
  const reportProgramName = reportProgram && reportProgram.name;
  return reportProgramName;
}
