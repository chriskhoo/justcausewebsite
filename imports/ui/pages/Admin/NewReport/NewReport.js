import React from 'react';
import PropTypes from 'prop-types';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';

const NewReport = ({ history }) => (
  <div className="NewReport">
    <h4 className="page-header">New Report</h4>
    <ReportEditor history={history} />
  </div>
);

NewReport.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewReport;
