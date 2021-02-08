import React from "react";
import "./Header.scss";
import { Container, Grid, Image } from "semantic-ui-react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu/UserMenu";
import SearchBar from "./SearchBar/SearchBar";

export default function Header() {
  return (
    <div className='header'>
      <Container>
        <Grid>
          <Grid.Column width={3} className='header__logo'>
            <Link to='/'>
              <Image src={logo} alt='Instaclone' />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <SearchBar />
          </Grid.Column>
          <Grid.Column width={3}>
            <UserMenu />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
