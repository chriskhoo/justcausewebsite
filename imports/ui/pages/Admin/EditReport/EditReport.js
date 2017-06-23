import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ReportEditor from '../../../components/ReportEditor/ReportEditor';
import ReportsCollection from '../../../../api/Reports/Reports';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';

const renderEditReport = ( history, rept, svcs, ctrys ) => (rept ? (
  <div className="EditReport">
    <h4 className="page-header">{`Editing "${rept.title}"`}</h4>
    <ReportEditor rept={rept} history={history} svcs={svcs} ctrys= {ctrys} />
  </div>
) : <NotFound />);

const EditReport = ({ loading, history, rept, svcs, ctrys }) => (
  !loading ? renderEditReport( history, rept, svcs, ctrys ) : <Loading />
);

EditReport.propTypes = {
  history: PropTypes.object.isRequired,
  rept: PropTypes.object.isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(({ match }) => {
  const reportId = match.params._id;
  const ReptSubscription = Meteor.subscribe('reports.view', reportId);
  const SvcsSubscription = Meteor.subscribe('services');
  const CtrySubscription = Meteor.subscribe('countries');
  return {
    loading: !ReptSubscription.ready() ||  !SvcsSubscription.ready() || !CtrySubscription.ready(),
    rept: ReportsCollection.findOne(reportId),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
  };
}, EditReport);
