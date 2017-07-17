import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import ReportsCollection from '../../../../api/Reports/Reports';
import CharitiesCollection from '../../../../api/Charities/Charities';
import ReportHeader from '../../../components/ReportHeader/ReportHeader';
import ReportPanel from '../../../components/ReportPanel/ReportPanel';
import ReportAside from '../../../components/ReportAside/ReportAside';

import './ReportView.scss';

const renderReport = (rept, chty, match, history) => ( (rept && chty) ? (
  <div className="report-view">
    <ReportHeader rept={rept} chty={chty} />
    <div className="report-body">
      <ReportPanel rept={rept} chty={chty} />
      <ReportAside rept={rept} chty={chty} />
    </div>
  </div>
) : <NotFound />);

const ReportView = ({ loading, rept, chty, match, history }) => (
  !loading ? renderReport(rept, chty, match, history) : <Loading />
);

ReportView.propTypes = {
  loading: PropTypes.bool.isRequired,
  rept: PropTypes.object.isRequired,
  chty: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match, history }) => {
  const reportId = match.params._id;
  const searchQuery = _extractQuery(history);
  const charityId = searchQuery.charity_id;
  const reptSubscription = Meteor.subscribe('reports.public.view', reportId);
  const chtySubscription = Meteor.subscribe('charities.view', charityId);
  return {
    loading: !chtySubscription.ready() || !reptSubscription.ready() ,
    rept: ReportsCollection.findOne(reportId),
    chty: CharitiesCollection.findOne(charityId)
  };
}, ReportView);

//private function
function _extractQuery(history){
  const search = history.location.search.substring(1);
  let search_object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  return search_object;
}
