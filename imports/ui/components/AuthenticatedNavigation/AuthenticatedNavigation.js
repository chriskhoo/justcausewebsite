import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const AuthenticatedNavigation = ({ name }) => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={1} href="/documents">Documents</NavItem>
      </LinkContainer>
      <LinkContainer to="/admin/reports">
        <NavItem eventKey={2} href="/admin/reports">Reports</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={3} title="Tags" id="user-nav-dropdown">
        <LinkContainer to="/admin/article_types">
          <NavItem eventKey={3.1} href="/admin/article_types">Article_Types</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/countries">
          <NavItem eventKey={3.2} href="/admin/countries">Countries</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/detail_levels">
          <NavItem eventKey={3.3} href="/admin/detail_levels">Detail_Levels</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/services">
          <NavItem eventKey={3.4} href="/admin/services">Services</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/target_groups">
          <NavItem eventKey={3.5} href="/admin/target_groups">Target_Groups</NavItem>
        </LinkContainer>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={4} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={4.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={4.2} onClick={() => Meteor.logout()}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
