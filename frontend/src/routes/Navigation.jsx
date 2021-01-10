import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";

export default function Navigation() {
  return (
    <Router>
      <Switch>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={(props) => {
              // Just to use PascalCase in the component's statement
              const Component = route.component;
              const Layout = route.layout;
              return (
                <Layout>
                  <Component {...props} />
                </Layout>
              );
            }}
          />
        ))}
      </Switch>
    </Router>
  );
}
