import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const AuthenticatedNavigation = ({ name }) => (
  <div className='authenticated-navigation'>
    <Nav>
      <NavDropdown eventKey={2} title="Tags, lists" id="tag-lists-dropdown">
        <LinkContainer to="/admin/article_types">
          <NavItem eventKey={2.1} href="/admin/article_types">Article_Types</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/countries">
          <NavItem eventKey={2.2} href="/admin/countries">Countries</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/detail_levels">
          <NavItem eventKey={2.3} href="/admin/detail_levels">Detail_Levels</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/services">
          <NavItem eventKey={2.4} href="/admin/services">Services</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/target_groups">
          <NavItem eventKey={2.5} href="/admin/target_groups">Target_Groups</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/badges">
          <NavItem eventKey={2.6} href="/admin/badges">Badges</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/financial_checklists">
          <NavItem eventKey={2.7} href="/admin/financial_checklists">Financial_Checklists</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/governance_checklists">
          <NavItem eventKey={2.8} href="/admin/governance_checklists">Governance_checklists</NavItem>
        </LinkContainer>
      </NavDropdown>
      <LinkContainer to="/admin/charities">
        <NavItem eventKey={3} href="/admin/charities">Charities</NavItem>
      </LinkContainer>
      <LinkContainer to="/admin/reports">
        <NavItem eventKey={4} href="/admin/reports">Reports</NavItem>
      </LinkContainer>
      <LinkContainer to="/admin/articles">
        <NavItem eventKey={5} href="/admin/articles">Articles</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={6} title="Public Pages" id="public-dropdown">
        <LinkContainer to="/impact-eval">
          <NavItem eventKey={6.1} href="/impact-eval">Impact Evaluation</NavItem>
        </LinkContainer>
        <LinkContainer to="/articles">
          <NavItem eventKey={6.2} href="/articles">Philantrophy Insights</NavItem>
        </LinkContainer>
        <LinkContainer to="/reports">
          <NavItem eventKey={6.3} href="/reports">Charity Reports</NavItem>
        </LinkContainer>
        <LinkContainer to="/about-us">
          <NavItem eventKey={6.4} href="/about-us">About Us</NavItem>
        </LinkContainer>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={7} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={7.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
          <NavItem eventKey={7.2} href="/signup">Create User</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={7.3} onClick={() => Meteor.logout()}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
