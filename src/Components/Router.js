import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
