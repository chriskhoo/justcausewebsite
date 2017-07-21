import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Alert, PanelGroup, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../../../components/Loading/Loading';
import SearchBlock from '../../../components/SearchBlock/SearchBlock';
import ReportCard from '../../../components/ReportCard/ReportCard';
import ServicesCollection from '../../../../api/Services/Services';
import CountriesCollection from '../../../../api/Countries/Countries';
import Target_GroupsCollection from '../../../../api/Target_Groups/Target_Groups';
import Detail_LevelsCollection from '../../../../api/Detail_Levels/Detail_Levels';
import ReportsCollection from '../../../../api/Reports/Reports';
import './ReportsHome.scss';

const ReportsHome = ({ loading, rpts, svcs, ctrys, t_grps, d_levels, history, match }) => (!loading ? (
  <div className="ReportsHome">
    <div className="page-header clearfix">
      <h3 className="pull-left">Charity reports</h3>
    </div>
    <SearchBlock
      svcs={svcs}
      ctrys={ctrys}
      t_grps={t_grps}
      d_levels={d_levels}
      history={history}
      match={match} />

    <PanelGroup>
      <Panel collapsible header='Methodology' bsStyle="primary">
        <p>
          Our charity reports are designed to help donors make better informed decisions. To do this we developed our “Excellence Framework”, a list of 12 domains covering areas such as governance, leadership, finances and “mindset for impact”.
        </p>
        <p>
          It was initially developed in 2015-16 based on wide-ranging input from sector experts in Singapore, and piloted with a set of local women’s charities. Since then, we have refined our approached based on feedback and lessons learned.
        </p>
        <p>
          Now, with some seed funding from Credit Suisse’s Corporate Citizenship team, we are delighted to share our second set of charity reports. Our methodology involves three steps; a review of publicly available information, a review of relevant internal documents and an interview with senior management. We also perform surveys and interviews with stakeholders for the more detailed reports.
        </p>
        <p>
          We currently offer three levels of detail: short (based only on publicly available information), medium (includes an interview with key personnel of the charity) and long (includes an in-depth interview and surveys of staff, volunteers and beneficiaries where practical). Please note that we do not charge any fees for this service and that we do not publish anything without the charities’ permission.
        </p>
      </Panel>
      <Panel collapsible header='Glossary' bsStyle="secondary">
        <Table responsive striped>
          <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr>
              <th>Attribution</th>
              <td>An assessment of how much change was caused by people, projects and organisations, and how much by whom.</td>
            </tr>
            <tr>
              <th>Board Composition</th>
              <td>We have taken a simple approach to classifying board members’ areas of expertise based on their main professional background. We divide the fields up into: accounting/finance, legal, human resources, business, strategy & management, fundraising, communications, sector specialist, beneficiary group representative, medical and other.</td>
            </tr>
            <tr>
              <th>Impact</th>
              <td>The change that is attributable to the organisation’s activities or services.</td>
            </tr>
            <tr>
              <th>Indicator</th>
              <td>Well-defined information which shows whether or not something is happening.</td>
            </tr>
            <tr>
              <th>Outcomes</th>
              <td>The change that results from what the project or organisation makes, offers or provides.</td>
            </tr>
            <tr>
              <th>Outputs</th>
              <td>Products, services or facilities that directly result from an organisation’s or project’s activities.</td>
            </tr>
            <tr>
              <th>Registration status</th>
              <td>For Singapore-based charities, the options are Institute of Public Character (IPC), charity (non-IPC) or International Charitable Organisation (ICO).</td>
            </tr>
            <tr>
              <th>Religious affiliation</th>
              <td>We say that there is religious affiliation when an organisation subscribes to values from or is significantly influenced by a religion (regardless of whether beneficiaries are limited to those of the religion or not).</td>
            </tr>
            <tr>
              <th>Reserves Ratio</th>
              <td>Unrestricted reserves divided by the latest annual expenditure (excludes depreciation)</td>
            </tr>
            <tr>
              <th>Revenue Model</th>
              <td>{`How the organisation or programme's work is funded – we try to categorise them into: no government funding, <30% government funded, 30-70% government funded and >70% government funded`}</td>
            </tr>
            <tr>
              <th>Target Groups</th>
              <td>The specific group of people that the organisation or programme seeks to benefit through delivery of services/ activities. Options are: society in general, children & youth,  children (0-12), children in care, youth (13-25), youth at risk, families, elderly, women, ex-offenders, financially disadvantaged, physically disabled, intellectually disabled, mentally ill, cancer, people with other medical conditions, migrant workers, homeless people, foreign spouses, minority groups, animals, and environment</td>
            </tr>
            <tr>
              <th>Theory of Change</th>
              <td>A model that graphically depicts an organisation or project’s ‘story,’ logically linking outputs, outcomes and impact.  It shows how change happens in the short, medium and long term to achieve the intended impact. Theory of change is often associated with some sort of visual map, but could also be set out as a set of tables or charts.</td>
            </tr>
            <tr>
              <th>Type of Work</th>
              <td>We classify the activities and services that organisations provide into the following categories: education & educational support, training & enrichment activities, social work, health & care, research & advocacy, aid & relief, community development, arts & culture, sports, and environment</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <p>Just Cause researchers have identified several areas or characteristics of charities that we believe are noteworthy. Badges are applied based on our findings at the point of profile creation. The criteria we apply for badges are listed below. </p>
        <p>Note that some qualified organisations may not receive a badge due to the limited information available to us at the time of writing. </p>
        <Table responsive striped>
          <thead>
            <tr>
              <th>Badge</th>
              <th>Criteria</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Innovation</th>
              <td>Invests in innovation by regularly testing out creative ways to better serve beneficiaries (and can give at least two recent examples)</td>
            </tr>
            <tr>
              <th>Social enterprise</th>
              <td>Country specific criteria: in Singapore, it should be registered with raiSE</td>
            </tr>
            <tr>
              <th>Collaborative Projects</th>
              <td>Not just simple referral relationships with other agencies, but can give at least two examples of active collaboration (i.e. programmes delivered jointly with partner charities or other agencies OR openly and actively sharing data/ knowledge/ resources with other organisations). Does not include having a fund for research grants open to others OR taking interns/ secondments.</td>
            </tr>
            <tr>
              <th>Promotes Research</th>
              <td>The organisation has a dedicated research team and/or publishes research at least twice a year on their website</td>
            </tr>
            <tr>
              <th>Measuring Impact</th>
              <td>Staff are able to clearly explain or share a framework (e.g. Theory of Change or Logic Model) that explains how their work leads to change that happens in the short, medium and long term to achieve the intended impact, are able to share some specific indicators and confirm that data is reviewed regularly.</td>
            </tr>
            <tr>
              <th>Quality Accredited</th>
              <td>CARF or other acceptable external quality assurance (e.g. Charity Governance Award, Charity Transparency Award) passed in last 2 years for the organisation or relevant programme. Internal / self-assessments do not qualify.</td>
            </tr>
            <tr>
              <th>Volunteer Delivered</th>
              <td>Few or no salaried staff and the organisation confirms that it “would not function without volunteers”. As a rule of thumb, ratio of service delivery volunteers to paid staff is at least 3 volunteers to 1 staff member.</td>
            </tr>
            <tr>
              <th>Niche Cause</th>
              <td>Just Cause has identified fewer than three charities offering this specific service in the relevant country</td>
            </tr>
            <tr>
              <th>Broad reach</th>
              <td>Reports that it reaches >1,000 people per year through its main programmes (services or awareness raising)</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    </PanelGroup>

    <h4>Recent Updates</h4>
    {rpts.length ?
      <div className="report_cards_holder">
        {rpts.slice(0,6).map(({ _id, detail_level_id, description, charity_id, name, logo, target_group_ids, service_ids, country_id}) => {
        return(
          <ReportCard
            key = {_id}
            detail_level_name={detail_level_id.name}
            charity_id = {charity_id}
            _id = {_id}
            name= {name}
            logo= {logo}
            description={description}
            target_group_ids ={target_group_ids}
            service_ids ={service_ids}
            country_id={country_id}
            history= {history}
            match= {match}
          />)})}
      </div> : <Alert bsStyle="warning">No reports yet!</Alert>}
  </div>
) : <Loading />);

ReportsHome.propTypes = {
  loading: PropTypes.bool.isRequired,
  rpts: PropTypes.arrayOf(PropTypes.object).isRequired,
  svcs: PropTypes.arrayOf(PropTypes.object).isRequired,
  ctrys: PropTypes.arrayOf(PropTypes.object).isRequired,
  t_grps: PropTypes.arrayOf(PropTypes.object).isRequired,
  d_levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const rptsSubscription = Meteor.subscribe('reports.public');
  const svcsSubscription = Meteor.subscribe('services');
  const ctrySubscription = Meteor.subscribe('countries');
  const t_grpsSubscription = Meteor.subscribe('target_groups');
  const d_levelsSubscription = Meteor.subscribe('detail_levels');
  return {
    loading: !rptsSubscription.ready() ||  !svcsSubscription.ready() || !ctrySubscription.ready() || !t_grpsSubscription.ready() || !d_levelsSubscription.ready(),
    svcs: ServicesCollection.find().fetch(),
    ctrys: CountriesCollection.find().fetch(),
    t_grps: Target_GroupsCollection.find().fetch(),
    d_levels: Detail_LevelsCollection.find().fetch(),
    rpts: ReportsCollection.find().fetch(),
  };
}, ReportsHome);
