import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Loading from '../../../components/Loading/Loading';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';

const NewReport = ({ history, loading, svcs, ctrys }) => (
  !loading ? (
    <div className="NewReport">
      <h4 className="page-header">New Report</h4>
      <ReportEditor history={history} svcs= {svcs} ctrys= {ctrys}/>
    </div>
  ) : <Loading />
);

NewReport.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const SvcsSubscription = Meteor.subscribe('services');
  const CtrySubscription = Meteor.subscribe('countries');
  return {
    loading: !SvcsSubscription.ready() || !CtrySubscription.ready(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
  };
}, NewReport);
