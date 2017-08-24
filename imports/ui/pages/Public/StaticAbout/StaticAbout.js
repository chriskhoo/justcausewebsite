import React from 'react';
import ReportIconImage from '../../../components/ReportIconImage/ReportIconImage';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import smoothScroll from '../../../../modules/smoothScroll'

import './StaticAbout.scss';

const StaticAbout = () => (
  <div className="static-about">
    <Jumbotron>
      <div className='overlay'>
        <h1>About Us</h1>
      </div>
    </Jumbotron>
    <Grid>
      <div id='history'>
        <h3>History</h3>
        <p>We are a Singapore-based not for profit consultancy founded in 2015. We specialise in impact evaluation and research for donors and charities.</p>
      </div>
      <div id='vision_mission'>
        <h3>Vision & Mission</h3>
        <p>Our vision is for charities to have more impact by having better internal capacity, so they operate on the same level as the very best of the private sector.</p>
        <p>Our mission is to increase charities’ impact through building capacity to measure and understand what difference they make, underpinned by more strategic support from donors.</p>
      </div>
    </Grid>
    <div id='our_team'>
      <Grid>
        <h3>Our Team</h3>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_emily.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Emily Perkin</h4>
            <h5>Managing Director</h5>
            <p>Emily has more than 12 years of experience in the social sector as a consultant, staff member, trustee and volunteer. She has been based in Singapore since February 2013 and since then has worked with many charities, social enterprises and donors across the region to provide philanthropy advice and impact assessments. Her wide-ranging practical experience includes conducting large-scale value for money assessments for central government; managing a knowledge network for charities in Japan and Afghanistan; and co-founding an award-winning social enterprise in London. She was Trustee of a recycling charity in the UK for three years prior to moving to Singapore and regularly provides advice and training on impact assessment for non-profit ventures. Emily has a MA in Japanese Studies from Cambridge University and a Master’s in International Public Policy from Osaka University.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_faye.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Faye Lim</h4>
            <h5>Director</h5>
            <p>Faye is an experienced manager, practitioner and volunteer within the arts and culture sector. Through her work with a local statutory board, she developed evaluation frameworks for community arts programmes and facilitated multiple cross-sector platforms for artists and community organisers to connect. She founded Strangeweather Movement Group, a collective that creates and performs improvisational and cross-disciplinary dance work. Most often working within the not-for-profit environment, Faye is familiar with both the strengths and challenges of this complex and dynamic sector. She believes in Just Cause’s role as an advocate and intermediary for the social sector and is glad for the opportunity to support its work.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_wenyi.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Wen Yi Tan</h4>
            <h5>Director</h5>
            <p>Wen Yi Tan, CFA is an experienced finance professional who began as an analyst at one of the largest asset management firms worldwide. She was deeply involved with the firm’s charitable foundation, and co-led the effort in extend the reach of the foundation’s annual grant program to Singapore. Wen Yi is a founding member of Just Cause and brings specific expertise on sector research, financial analysis and governance, as well as strategy development and impact assessment.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_patsian.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Patsian Low</h4>
            <h5>Senior Advisor</h5>
            <p>Patsian has over 20 years of experience in the private and civic sectors in the US and Asia, crossing the fields of social finance, social entrepreneurship, philanthropy, non-profit leadership and commercial finance. She recently ended her tenure as head of DBS Foundation and prior to that was Director of Philanthropy at Singapore’s National Volunteer & Philanthropy Centre (NVPC), She has conducted training across Asia in Social Entrepreneurship, Assessing Social Impact, New Social Trends, Microfinance, and Human Capital Development. Patsian currently serves on the boards of Artswok Collaborative Ltd, which brings community art and social development closer together; and Forum for the Future SE Asia, a sustainable futures think tank. Before her journey into the civic sector, Patsian held senior roles in financial institutions in New York, Hong Kong and Singapore.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_jane.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Jane Binks</h4>
            <h5>Senior Advisor</h5>
            <p>Jane Binks, Senior Adviser has over 20 years of experience in strategic planning, project management and capacity building in the arts, culture, education, environment and heritage sectors. Her most recent position was as the Director of Philanthropy at the National Heritage Board, Singapore, where she worked for 8 years. With a deep knowledge of the charity sector and donor landscape in Singapore, Jane is a regular trainer and panellist on the subject of fundraising and philanthropy trends.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}><ReportIconImage image='/Profile_luenne.jpg' large/></Col>
          <Col xs={12} md={9}>
            <h4>Luenne Choa</h4>
            <h5>Outreach Partner</h5>
            <p>Luenne Choa has the academic foundation and the applied experience in the areas of Public Diplomacy. She obtained her Masters in Contemporary Asian Analysis from the University of Melbourne and has worked in the corporate communications/ public affairs division at various Ministries in Singapore. She was also the press officer at a foreign mission based in Singapore. During her time as a press officer, she worked closely with the Ambassador to adapt, design and carry out the mission’s communication goals to the Singapore audiences. Luenne’s expertise is in strategic communications, assisting policy makers and thought leaders in planning and operationalising their communication strategies to achieve the desired results using various means and channels (mainstream media and social media). She is able to conceptualise (design, language and roll-out) communication campaigns locally and regionally successfully. She is also co-founder of <a href='https://hornbillscc.com/'>Hornbills – Concepts and Communications.</a></p>
          </Col>
        </Row>
      </Grid>
    </div>
    <div id='partners_members'>
      <Grid>
        <h3>Proud Partners and Members of:</h3>
        <Row>
          <Col xs={6} md={3} ><ReportIconImage image='/Logo_AVPN.png' large/></Col>
          <Col xs={6} md={3} ><ReportIconImage image='/Logo_scopegroup.jpg' large/></Col>
          <Col xs={6} md={3} ><ReportIconImage image='/Logo_empact.jpg' large/></Col>
          <Col xs={6} md={3} ><ReportIconImage image='/Logo_soristic.jpg' large/></Col>
        </Row>
      </Grid>
    </div>
    <div id='contact'>
      <Grid>
        <h3>Contact us at: <ReportIconImage image='/Email.png'/></h3>
      </Grid>
    </div>
  </div>
);

export default StaticAbout;
