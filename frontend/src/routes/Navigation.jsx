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
              const Component = route.component; // Just to use PascalCase in the component's statement
              <Component {...props} />;
            }}
          />
        ))}
      </Switch>
    </Router>
  );
}
