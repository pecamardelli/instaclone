import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "./Feed/Feed";
import UsersNotFollowed from "./UsersNotFollowed/UsersNotFollowed";

import "./Home.scss";

export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column width={11} className="home__left">
        <Feed />
      </Grid.Column>
      <Grid.Column width={5} className="home__right">
        <UsersNotFollowed />
      </Grid.Column>
    </Grid>
  );
}
