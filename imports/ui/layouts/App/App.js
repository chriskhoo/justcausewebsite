import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Unauthenticated from '../../components/Unauthenticated/Unauthenticated';
import Index from '../../pages/Index/Index';
import Reports from '../../pages/Admin/Reports/Reports';
import NewReport from '../../pages/Admin/NewReport/NewReport';
import ViewReport from '../../pages/Admin/ViewReport/ViewReport';
import EditReport from '../../pages/Admin/EditReport/EditReport';
import Documents from '../../pages/Documents/Documents';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
      <Navigation {...props} />
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />

          <Authenticated exact path="/admin/reports" component={Reports} {...props} />
          <Authenticated exact path="/admin/reports/new" component={NewReport} {...props} />
          <Authenticated exact path="/admin/reports/:_id" component={ViewReport} {...props} />
          <Authenticated exact path="/admin/reports/:_id/edit" component={EditReport} {...props} />

          <Authenticated exact path="/documents" component={Documents} {...props} />
          <Authenticated exact path="/documents/new" component={NewDocument} {...props} />
          <Authenticated exact path="/documents/:_id" component={ViewDocument} {...props} />
          <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...props} />
          <Authenticated exact path="/profile" component={Profile} {...props} />
          <Unauthenticated path="/signup" component={Signup} {...props} />
          <Unauthenticated path="/login" component={Login} {...props} />
          <Unauthenticated path="/logout" component={Logout} {...props} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          <Route name="examplePage" path="/example-page" component={ExamplePage} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
      <Footer />
    </div> : ''}
  </Router>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
