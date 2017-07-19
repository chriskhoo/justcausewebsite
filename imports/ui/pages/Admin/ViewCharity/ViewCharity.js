import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel, Table, Thumbnail } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import CharitiesCollection from '../../../../api/Charities/Charities';
import BadgesCollection from '../../../../api/Badges/Badges';
import NotFound from '../../NotFound/NotFound';
import Loading from '../../../components/Loading/Loading';
import parseMarkdown from '../../../../modules/parse-markdown';
import Content from '../../../components/Content/Content';

const handleRemove = (charityId, history) => {
  chty.leadership_info.leadership_info_commentary
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('charities.remove', charityId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Charity deleted!', 'success');
        history.push('/admin/charities');
      }
    });
  }
};

const renderCharity = (chty, bdgs, match, history) => (chty ? (
  <div className="ViewCharity">
    <div className="page-header clearfix">
      <Thumbnail className="pull-left thumbnail_custom" src={chty.logo} alt="logo" />
      <h4 className="pull-left">{ chty.name } (Est. {chty.year_established} )</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(chty._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <div>
      <Panel header='Strategy & Character'>
        {chty.strategy?<div>
          <strong>Strategy: </strong>
          <Content content={ parseMarkdown(chty.strategy) } />
        </div>: ''}
        {(chty.badges_awarded &&bdgs)? <Table responsive>
          <thead>
            <tr>
              <th>Badge</th>
              <th>Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {returnBadges(bdgs, chty.badges_awarded)}
          </tbody>
        </Table>:''}
      </Panel>
      <Panel header='Core Information'>
        <p>
          <strong>Website Link: </strong> <a href={ chty.website_link }>{ chty.website_link }</a>
        </p>
        <p>
          <strong>Donation Link: </strong><a href={ chty.donation_link }>{ chty.donation_link }</a>
        </p>
        <p>
          <strong>Revenue Model: </strong>{chty.revenue_model}
        </p>
        <p>
          <strong>Religious Affiliation: </strong>{chty.religious_affiliation}
        </p>
        <p>
          <strong>Registration Status: </strong>{chty.registration_status}
        </p>
        {chty.summary? <div>
          <strong>Summary: </strong>
          <Content content={ parseMarkdown(chty.summary) } />
        </div>:''}
      </Panel>
      <Panel header='Just Cause Opinion'>
        {chty.jc_opinion_justcauseloves? <div>
          <strong>Just Cause loves: </strong>
          <Content content={ parseMarkdown(chty.jc_opinion_justcauseloves) } />
          <br/>
        </div>:''}
        {chty.jc_opinion_donate_if? <div>
          <strong>Donate if: </strong>
          <Content content={ parseMarkdown(chty.jc_opinion_donate_if) } />
          <br/>
        </div>:''}
        {chty.jc_opinion_broadentheirwork? <div>
          <strong>How your money will help: </strong>
          <strong>Broaden their work: </strong>
          <Content content={ parseMarkdown(chty.jc_opinion_broadentheirwork) } />
        </div>:''}
        {chty.jc_opinion_strengthentheteam? <div>
          <strong>Strengthen the team: </strong>
          <Content content={ parseMarkdown(chty.jc_opinion_strengthentheteam) } />
        </div>:''}
      </Panel>
      {chty.programs?<Panel header='Programs'>
        {chty.programs.map( (program) =>
            <Panel>
              <h4>{program.name}</h4>
              <p><strong>Revenue Model: </strong>{program.revenue_model}</p>
              {program.summary? <div><Content content={ parseMarkdown(program.summary) } /></div>:''}
            </Panel>)}
      </Panel>:''}

      {chty.staff_info?<Panel header='Staff Information'>
        <p>
          <strong>Staff Head Count ({chty.staff_info.headcount_year}): </strong>
          {chty.staff_info.staff_headcount_number}
          {'        '}
          <strong>Volunteer Head Count: </strong>{chty.staff_info.volunteer_headcount_number}
        </p>
        <br/>
        <p>
          <strong>Staff Turnover ({chty.staff_info.staff_turnover_year}): </strong>{chty.staff_info.staff_turnover_number}
        </p>
        <br/>
        <p>
          <strong>Staff Satisfaction ({chty.staff_info.satisfaction_year}): </strong> {chty.staff_info.staff_satisfaction_percentage}
          {'        '}
          <strong>Volunteer Satisfaction: </strong> {chty.staff_info.volunteer_satisfaction_percentage}
        </p>
        {chty.staff_info.commentary? <div>
          <br/>
          <strong>Commentary: </strong>
          <Content content={ parseMarkdown(chty.staff_info.commentary) } />
        </div>:''}
      </Panel>:''}
      {chty.reputation_info? <Panel header='Reputation Information'>
        <p>
          <strong>Quote 1: </strong>
          <em>{chty.reputation_info.quote_1}</em>
        </p>
        <p>
          <strong>Quote 2: </strong>
          <em>{chty.reputation_info.quote_2}</em>
        </p>
        <p>
          <strong>Quote 3: </strong><em>{chty.reputation_info.quote_3}</em>
        </p>
        <br/>
        <p>
          <strong>Facebook likes ({chty.reputation_info.facebook_likes_date}): </strong> {chty.reputation_info.facebook_likes_number}
        </p>
        <br/>
        <p>
          <strong>Article 1 ({chty.reputation_info.media_article_1_date}): </strong> {chty.reputation_info.media_article_1_title}
          {'        '}
          <strong>By: </strong>{chty.reputation_info.media_article_1_source}
        </p>
        {chty.reputation_info.media_article_1_summary?<Content content={ parseMarkdown(chty.reputation_info.media_article_1_summary) } />:''}
        <br/>
        <p>
          <strong>Article 2 ({chty.reputation_info.media_article_2_date}): </strong> {chty.reputation_info.media_article_2_title}
          {'        '}
          <strong>By: </strong>{chty.reputation_info.media_article_2_source}
        </p>
        {chty.reputation_info.media_article_2_summary?<Content content={ parseMarkdown(chty.reputation_info.media_article_2_summary) } />:''}
        <br/>
        <p>
          <strong>Article 3 ({chty.reputation_info.media_article_3_date}): </strong> {chty.reputation_info.media_article_3_title}
          {'        '}
          <strong>By: </strong>{chty.reputation_info.media_article_3_source}
        </p>
        {chty.reputation_info.media_article_3_summary?<Content content={ parseMarkdown(chty.reputation_info.media_article_3_summary) } />:''}
      </Panel>:''}
      {chty.leadership_info?<Panel header='Leadership Information'>
        <p>
          <strong>Year: {chty.leadership_info.background_year}</strong>
        </p>
        <p>
          <strong>Board Size: {chty.leadership_info.board_size}</strong>
        </p>
        <p>
          <strong>Gender ratio: {chty.leadership_info.gender_ratio}</strong>
        </p>
        <br/>
        <Table responsive>
          <thead>
            <tr>
              <th>Photograph</th>
              <th>Name</th>
              <th>Position</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='thumbnail_custom'><img src={chty.leadership_info.person_1_face} alt="person 1 face" /></div>
              </td>
              <td>{chty.leadership_info.person_1_name}</td>
              <td>{chty.leadership_info.person_1_position}</td>
              <td>{chty.leadership_info.person_1_description}</td>
            </tr>
            <tr>
              <td>
                <div className='thumbnail_custom'><img src={chty.leadership_info.person_2_face} alt="person 2 face" /></div>
              </td>
              <td>{chty.leadership_info.person_2_name}</td>
              <td>{chty.leadership_info.person_2_position}</td>
              <td>{chty.leadership_info.person_2_description}</td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <Table responsive>
          <thead>
            <tr>
              <th>Background</th>
              <th># People</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chty.leadership_info.profession_1_name}</td>
              <td>{chty.leadership_info.profession_1_number}</td>
            </tr>
            <tr>
              <td>{chty.leadership_info.profession_2_name}</td>
              <td>{chty.leadership_info.profession_2_number}</td>
            </tr>
            <tr>
              <td>{chty.leadership_info.profession_3_name}</td>
              <td>{chty.leadership_info.profession_3_number}</td>
            </tr>
            <tr>
              <td>{chty.leadership_info.profession_4_name}</td>
              <td>{chty.leadership_info.profession_4_number}</td>
            </tr>
            <tr>
              <td>{chty.leadership_info.profession_5_name}</td>
              <td>{chty.leadership_info.profession_5_number}</td>
            </tr>
            <tr>
              <td>{chty.leadership_info.profession_6_name}</td>
              <td>{chty.leadership_info.profession_6_number}</td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <Table responsive>
          <thead>
            <tr>
              <th>Governance Checklist</th>
            </tr>
          </thead>
          <tbody>
            {chty.leadership_info.governance_checklist_ids.map((checklistObj)=>
              <tr key={checklistObj._id}>
                <td>{checklistObj.description}</td>
              </tr>)}
          </tbody>
        </Table>
        {chty.leadership_info.commentary? <div>
          <br/>
          <strong>Commentary: </strong>
          <Content content={ parseMarkdown(chty.leadership_info.commentary) } />
        </div>:''}
      </Panel>:''}
      {chty.financial_info?<Panel header='Financial Information'>
        <h2>Income</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Year</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chty.financial_info.income_year_1}</td>
              <td>{chty.financial_info.income_year_1_amt}</td>
            </tr>
            <tr>
              <td>{chty.financial_info.income_year_2}</td>
              <td>{chty.financial_info.income_year_2_amt}</td>
            </tr>
            <tr>
              <td>{chty.financial_info.income_year_3}</td>
              <td>{chty.financial_info.income_year_3_amt}</td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <h2>Revenue model for {chty.financial_info.revenue_model_reporting_year}</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Source</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cash Donations</td>
              <td>{chty.financial_info.rev_model_cash_donations_and_fundraised_income_percent}</td>
            </tr>
            <tr>
              <td>Government Grants and Subsidies</td>
              <td>{chty.financial_info.rev_model_govt_grants_subsidies_percent}</td>
            </tr>
            <tr>
              <td>Activity Income</td>
              <td>{chty.financial_info.rev_model_activity_income_percent}</td>
            </tr>
            <tr>
              <td>Investment Income</td>
              <td>{chty.financial_info.rev_model_investment_income_percent}</td>
            </tr>
            <tr>
              <td>Others</td>
              <td>{chty.financial_info.rev_model_others_percent}</td>
            </tr>
          </tbody>
        </Table>
        <br/>
          <p># Major Donors (minimum: ${chty.financial_info.major_donors_minimum_amt}) for {chty.financial_info.major_donors_year}: {chty.financial_info.major_donors_number}</p>
        <br/>
          <p>Reserve Ratio ({chty.financial_info.reserve_ratio_year}): {chty.financial_info.reserve_ratio_amt}</p>
        <br/>
        <Table responsive>
          <thead>
            <tr>
              <th>Financial Checklist</th>
            </tr>
          </thead>
          <tbody>
            {chty.financial_info.financial_checklist_ids.map((checklistObj)=>{
              return (<tr key={checklistObj._id}>
                <td>{checklistObj.description}</td>
              </tr>)}
            )}
          </tbody>
        </Table>
        {chty.financial_info.commentary? <div>
          <br/>
          <strong>Commentary: </strong>
          <Content content={ parseMarkdown(chty.financial_info.commentary) } />
        </div>:''}
      </Panel>:''}
    </div>
  </div>
) : <NotFound />);

const ViewCharity = ({ loading, chty, bdgs, match, history }) => (
  !loading ? renderCharity(chty, bdgs, match, history) : <Loading />
);

ViewCharity.propTypes = {
  loading: PropTypes.bool.isRequired,
  chty: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  bdgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(({ match }) => {
  const charityId = match.params._id;
  const chtySubscription = Meteor.subscribe('charities.view', charityId);
  const bdgsSubscription = Meteor.subscribe('badges');

  return {
    loading: !chtySubscription.ready() || !bdgsSubscription.ready(),
    chty: CharitiesCollection.findOne(charityId),
    bdgs: BadgesCollection.find().fetch(),
  };
}, ViewCharity);

// private functions
function returnBadges(bdgs, charity_badges){
  let formattedBadges = [];
  charity_badges.forEach((chty_badge)=>{
    const {_id, reason} = chty_badge;
    const {image, name} = bdgs.filter((bdg)=>bdg._id == _id)[0];
    formattedBadges.push(
      <tr key={_id}>
        <td><div className="thumbnail_custom"><img src={image} alt={`${name} logo`} /></div></td>
        <td><p>{name}</p></td>
        <td><p>{reason}</p></td>
      </tr>)
  });
  return formattedBadges;
}
