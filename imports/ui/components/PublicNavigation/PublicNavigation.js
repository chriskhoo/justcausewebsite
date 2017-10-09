import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <div className='public-navigation'>
    <Nav pullRight>
      {/* <LinkContainer to="/impact-eval">
        <NavItem eventKey={1} href="/impact-eval">Impact Evaluation</NavItem>
      </LinkContainer> */}
      <LinkContainer to="/articles">
        <NavItem eventKey={2} href="/articles">Sector Reports</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports/results">
        <NavItem eventKey={3} href="/reports/results">Charity Reports</NavItem>
      </LinkContainer>
      {/* <LinkContainer to="/about-us">
        <NavItem eventKey={4} href="/about-us">About Us</NavItem>
      </LinkContainer> */}
    </Nav>
    {/* <Nav pullRight>
      <LinkContainer to="/login">
        <NavItem eventKey={6} href="/login">Log In</NavItem>
      </LinkContainer>
    </Nav> */}
  </div>
);

export default PublicNavigation;
