import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <div className='public-navigation'>
    <Nav>
      <LinkContainer to="/impact-eval">
        <NavItem eventKey={1} href="/impact-eval">Impact Evaluation</NavItem>
      </LinkContainer>
      <LinkContainer to="/articles">
        <NavItem eventKey={2} href="/articles">Philantrophy Insights</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem eventKey={3} href="/reports">Charity Reports</NavItem>
      </LinkContainer>
      <LinkContainer to="/about-us">
        <NavItem eventKey={4} href="/about-us">About Us</NavItem>
      </LinkContainer>
    </Nav>

    <Nav pullRight>
      <LinkContainer to="/signup">
        <NavItem eventKey={5} href="/signup">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem eventKey={6} href="/login">Log In</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);

export default PublicNavigation;
