import React from 'react';
import { Jumbotron, Table, Grid, Row, Col } from 'react-bootstrap';import ReportIconImage from '../../../components/ReportIconImage/ReportIconImage';

import './StaticImpact.scss';

const StaticImpact = () => (
  <div className="static-impact">
    <Jumbotron>
      <div className='overlay'>
        <h1>Impact Evaluation</h1>
      </div>
    </Jumbotron>
    <div id='services'>
      <Grid>
        <h3>Our services</h3>
        <p>All of our work is designed to support our mission of increasing charities’ impact. We provide three main services for charities and donors: impact evaluation consulting and training, commissioned philanthropic research and charity due diligence for donors.</p>
      </Grid>
    </div>
    <div id='work'>
      <Grid>
        <h3>Examples of what we do:</h3>
        <Row>
          <Col xs={3} md={3} ><ReportIconImage image='/Logo_mercy_relief.jpeg' large/></Col>
          <Col xs={9} md={9} >
            <h4>Impact evaluation framework and tools</h4>
            <p>We supported Mercy Relief in evaluating the impact of their partner programmes in the Philippines. This involved site visits, focus group discussions, stakeholder interviews and a review of programme documents and data. We produced a report for each programme summarising the impact and providing recommendations for the future.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={9} >
            <h4>Impact evaluation training</h4>
            <p>We deliver one-day masterclasses on impact evaluation for Singapore non-profit leaders through the Social Services Institute (SSI) Capstone Leadership programme. The hands-on classes cover a wide range of real-life examples, introducing participants to practical tools they can use in their own organisations.</p>
          </Col>
          <Col xs={3} md={3} ><ReportIconImage image='/Logo_SSI.jpeg' large/></Col>
        </Row>
        <Row>
          <Col xs={3} md={3} ><ReportIconImage image='/Logo_octava.jpeg' large/></Col>
          <Col xs={9} md={9} >
            <h4>Establishing impact evaluation frameworks</h4>
            <p>We worked with a new private foundation in Singapore, Octava Foundation to establish a simple framework and process for measuring their impact. This involved a series of workshops with management and board members to map out their “Theory of Change” and agree a set of indicators to measure the impact of their funded programmes. We also developed practical data collection tools such as a beneficiary survey to capture the agreed indicators.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={9} >
            <h4>Strategic research</h4>
            <p>We produced a detailed report on philanthropy trends and unmet social needs in Singapore and six regional countries to support a major Singapore foundation in its strategic review. The research involved expert interviews in each of the countries as well as a thorough literature review.</p>
          </Col>
          <Col xs={3} md={3} ><ReportIconImage image='/Logo_strategic_research.jpeg' large/></Col>
        </Row>
      </Grid>
    </div>
    <div id='clients'>
      <Grid>
        <h3>Previous clients include:</h3>
        <Row>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_ADI.png' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_art_outreach.png' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_aware.jpeg' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_AWWA.png' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_babes.jpeg' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_cfs.png' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_magic.png' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_mercy_relief.jpeg' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_octava.jpeg' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_SSI.jpeg' large/></Col>
          <Col xs={2} md={2} ><ReportIconImage image='/Logo_talent_trust.jpg' large/></Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default StaticImpact;
