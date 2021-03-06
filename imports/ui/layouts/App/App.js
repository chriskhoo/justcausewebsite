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

import Article_Types from '../../pages/Admin/Article_Types/Article_Types';
import Countries from '../../pages/Admin/Countries/Countries';
import Detail_Levels from '../../pages/Admin/Detail_Levels/Detail_Levels';
import Services from '../../pages/Admin/Services/Services';
import Target_Groups from '../../pages/Admin/Target_Groups/Target_Groups';
import Badges from '../../pages/Admin/Badges/Badges';
import Financial_Checklists from '../../pages/Admin/Financial_Checklists/Financial_Checklists';
import Governance_Checklists from '../../pages/Admin/Governance_Checklists/Governance_Checklists';
import Charities from '../../pages/Admin/Charities/Charities';
import NewCharity from '../../pages/Admin/NewCharity/NewCharity';
import ViewCharity from '../../pages/Admin/ViewCharity/ViewCharity';
import EditCharity from '../../pages/Admin/EditCharity/EditCharity';
import Reports from '../../pages/Admin/Reports/Reports';
import NewReport from '../../pages/Admin/NewReport/NewReport';
import ViewReport from '../../pages/Admin/ViewReport/ViewReport';
import EditReport from '../../pages/Admin/EditReport/EditReport';
import Articles from '../../pages/Admin/Articles/Articles';
import NewArticle from '../../pages/Admin/NewArticle/NewArticle';
import ViewArticle from '../../pages/Admin/ViewArticle/ViewArticle';
import EditArticle from '../../pages/Admin/EditArticle/EditArticle';

import ReportsHome from '../../pages/Public/ReportsHome/ReportsHome';
import ReportsResults from '../../pages/Public/ReportsResults/ReportsResults';
import ReportView from '../../pages/Public/ReportView/ReportView';
import ArticlesHome from '../../pages/Public/ArticlesHome/ArticlesHome';
import ArticlesResults from '../../pages/Public/ArticlesResults/ArticlesResults';
import ArticleView from '../../pages/Public/ArticleView/ArticleView';
import StaticTerms from '../../pages/Public/StaticTerms/StaticTerms';
import StaticHome from '../../pages/Public/StaticHome/StaticHome';
import StaticAbout from '../../pages/Public/StaticAbout/StaticAbout';
import StaticImpact from '../../pages/Public/StaticImpact/StaticImpact';

import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
// import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
// import ResetPassword from '../../pages/ResetPassword/ResetPassword';
// import ExamplePage from '../../pages/ExamplePage/ExamplePage';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
      <Navigation {...props} />
      <Switch>
        <Route exact name="index" path="/" component={StaticHome} />
        <Route name="about-us" exact path="/about-us" component={StaticAbout} />
        <Route name="impact-eval" exact path="/impact-eval" component={StaticImpact} />
      </Switch>
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={()=>(<div></div>)} />
          <Route exact name="about-us" path="/about-us" component={()=>(<div></div>)} />
          <Route name="impact-eval" exact path="/impact-eval" component={()=>(<div></div>)} />

          <Authenticated exact path="/profile" component={Profile} {...props} />
          <Authenticated path="/signup" component={Signup} {...props} />
          <Unauthenticated path="/login" component={Login} {...props} />
          <Unauthenticated path="/logout" component={Logout} {...props} />
          {/* <Route name="recover-password" path="/recover-password" component={RecoverPassword} /> */}
          {/* <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} /> */}
          {/* <Route name="examplePage" path="/example-page" component={ExamplePage} /> */}

          <Authenticated exact path="/admin/article_types" component={Article_Types} {...props} />
          <Authenticated exact path="/admin/countries" component={Countries} {...props} />
          <Authenticated exact path="/admin/detail_levels" component={Detail_Levels} {...props} />
          <Authenticated exact path="/admin/services" component={Services} {...props} />
          <Authenticated exact path="/admin/target_groups" component={Target_Groups} {...props} />
          <Authenticated exact path="/admin/badges" component={Badges} {...props} />
          <Authenticated exact path="/admin/financial_checklists" component={Financial_Checklists} {...props} />
          <Authenticated exact path="/admin/governance_checklists" component={Governance_Checklists} {...props} />
          <Authenticated exact path="/admin/charities" component={Charities} {...props} />
          <Authenticated exact path="/admin/charities/new" component={NewCharity} {...props} />
          <Authenticated exact path="/admin/charities/:_id" component={ViewCharity} {...props} />
          <Authenticated exact path="/admin/charities/:_id/edit" component={EditCharity} {...props} />
          <Authenticated exact path="/admin/reports" component={Reports} {...props} />
          <Authenticated exact path="/admin/reports/new" component={NewReport} {...props} />
          <Authenticated exact path="/admin/reports/:_id" component={ViewReport} {...props} />
          <Authenticated exact path="/admin/reports/:_id/edit" component={EditReport} {...props} />
          <Authenticated exact path="/admin/articles" component={Articles} {...props} />
          <Authenticated exact path="/admin/articles/new" component={NewArticle} {...props} />
          <Authenticated exact path="/admin/articles/:_id" component={ViewArticle} {...props} />
          <Authenticated exact path="/admin/articles/:_id/edit" component={EditArticle} {...props} />

          <Route name="reports" exact path="/reports" component={ReportsHome} {...props} />
          <Route name="reports-results" exact path="/reports/results" component={ReportsResults} {...props} />
          <Route name="report-view" exact path="/reports/:_id" component={ReportView} {...props} />
          <Route name="articles" exact path="/articles" component={ArticlesHome} {...props} />
          <Route name="articles-results" exact path="/articles/results" component={ArticlesResults} {...props} />
          <Route name="article-view" exact path="/articles/:_id" component={ArticleView} {...props} />
          <Route name="terms" exact path="/terms" component={StaticTerms} />
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
