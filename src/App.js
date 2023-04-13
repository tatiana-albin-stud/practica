import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes, { RouteWithSubRoutes } from "./routes";
import { useUser } from "./hooks/useUser";

import { Content, Layout, Login } from "./pages";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

function App() {
  const { user, loadingUser } = useUser();

  return loadingUser ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <React.Fragment>
      <React.Fragment>
        <Helmet>
          <title>InBUSINESS CRM</title>
        </Helmet>

        <Layout />
        <Content>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Content>
      </React.Fragment>
    </React.Fragment>
  );
}

export default App;
