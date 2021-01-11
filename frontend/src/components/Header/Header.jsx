import React from "react";
import "./Header.scss";
import { Container, Grid, Image } from "semantic-ui-react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu/UserMenu";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link to="/">
              <Image src={logo} alt="Instaclone" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <h2>Search bar...</h2>
          </Grid.Column>
          <Grid.Column width={3}>
            <UserMenu />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
