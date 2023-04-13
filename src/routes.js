import React from "react";
import { Dashboard } from "pages";
import Terms from "pages/Terms/Terms";

import { Route } from "react-router-dom";

import Profile from "pages/Profile/Profile";

import Versions from "pages/Versions/Versions";
import Details from "pages/Terms/Details";

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={(props) => (
        <route.component {...props} routes={route.routes || []} />
      )}
    />
  );
}

const routes = [
  //Dashboard
  {
    path: "/",
    exact: true,
    component: Dashboard,
  },

  {
    path: "/profile",
    exact: true,
    component: Profile,
  },

  //T&C
  {
    path: "/terms",
    exact: true,
    component: Terms,
  },
  {
    path: "/terms/:id",
    component: Details,
  },

  /**
   * Versions of the CRM
   */
  {
    path: "/versions",
    exact: true,
    component: Versions,
  },
];

export default routes;
