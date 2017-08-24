import React from 'react';
import ReportIconImage from '../../../components/ReportIconImage/ReportIconImage';
import {Button, Carousel, Glyphicon, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import smoothScroll from '../../../../modules/smoothScroll'

import './StaticHome.scss';

const StaticHome = () => (
  <div className="static-home">
    <Carousel interval={5000}>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/Background_person_1.jpg"/>
        <Carousel.Caption>
          <h1>Just Cause</h1>
          <h3>Thank you for visiting our prototype site - we welcome your feedback</h3>
          <h3 className='bounce'>
            <Glyphicon glyph='chevron-down' onClick={() => smoothScroll.scrollTo('who_we_are')} />
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/Background_person_2.jpg"/>
        <Carousel.Caption>
          <h1>Just Cause</h1>
          <h3>Find and help great charities</h3>
          <h3 className='bounce'>
            <Glyphicon glyph='chevron-down' onClick={() => smoothScroll.scrollTo('who_we_are')} />
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/Background_person_3.jpg"/>
        <Carousel.Caption>
          <h1>Just Cause</h1>
          <h3>Find and help great charities</h3>
          <h3>
            <Glyphicon glyph='chevron-down' onClick={() => smoothScroll.scrollTo('who_we_are')} />
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/Background_person_4.jpg"/>
        <Carousel.Caption>
          <h1>Just Cause</h1>
          <h3>Find and help great charities</h3>
          <h3 className='bounce'>
            <Glyphicon glyph='chevron-down' onClick={() => smoothScroll.scrollTo('who_we_are')} />
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/Background_person_5.jpeg"/>
        <Carousel.Caption>
          <h1>Just Cause</h1>
          <h3>Find and help great charities</h3>
          <h3 className='bounce'>
            <Glyphicon glyph='chevron-down' onClick={() => smoothScroll.scrollTo('who_we_are')} />
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Grid>
      <div id='who_we_are'>
        <h3>Who are we?</h3>
        <p>We are a Singapore-based not for profit consultancy founded in 2015. We specialise in impact evaluation and research for donors and charities.
        </p>
        <p>Our mission is to increase charities’ impact through building capacity to measure and understand what difference they make, underpinned by more strategic support from donors.</p>
        <p>Our vision is for more charities to operate on the same level as the very best of the private sector.
        </p>
      </div>
      <div id='what_we_do'>
        <h3>What do we do?</h3>
        <Row>
          <Col xs={12} md={4} >
            <h4>Impact Evaluation</h4>
            <h1><Glyphicon glyph="screenshot" /></h1>
            <p>We offer tailored support to both donors and charities in impact evaluation through a team of experienced consultants. We see impact evaluation not just as a process of data collection, but as a fundamental mindset that an organisation embraces into their culture and way of working. We offer a unique combination of professional consulting skills, impact evaluation expertise and practical non-profit sector experience, guided by a strong set of values and social purpose.</p>
            <LinkContainer to='impact-eval'>
              <Button bsStyle="success" block>Details
              </Button>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4} >
            <h4>Strategic Research</h4>
            <h1><Glyphicon glyph="search" /></h1>
            <p>We provide custom research on philanthropy trends and unmet social needs. Our work aims to contextualise issues so that donors can channel resources in a more strategic and targeted manner. Wherever possible, we encourage sharing of our research so that the wider community can also benefit.</p>
            <LinkContainer to='articles'>
              <Button bsStyle="success" block>Details
              </Button>
            </LinkContainer>
          </Col>
          <Col xs={12} md={4} >
            <h4>Charity Reports</h4>
            <h1><Glyphicon glyph="list-alt" /></h1>
            <p>We offer independent analysis on charities that seeks to understand what social impact a charity makes and how they might sustain it. Our framework involves looking at domains covering areas such as governance, leadership, finances and “mindset for impact”. We believe that with access to more objective and insightful information, donors will give more money, more strategically.</p>
            <LinkContainer to='reports'>
              <Button bsStyle="success" block>Details</Button>
            </LinkContainer>
          </Col>
        </Row>
      </div>
    </Grid>
  </div>
);

export default StaticHome;
