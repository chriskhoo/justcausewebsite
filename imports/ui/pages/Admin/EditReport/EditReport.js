import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Reports from '../../../../api/Reports/Reports';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';
import NotFound from '../../NotFound/NotFound';

const EditReport = ({ rept, history }) => (rept ? (
  <div className="EditReport">
    <h4 className="page-header">{`Editing "${rept.title}"`}</h4>
    <ReportEditor rept={rept} history={history} />
  </div>
) : <NotFound />);

EditReport.propTypes = {
  rept: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const reportId = match.params._id;
  const subscription = Meteor.subscribe('reports.view', reportId);

  return {
    loading: !subscription.ready(),
    rept: Reports.findOne(reportId),
  };
}, EditReport);
