import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import "./SearchBar.scss";
import { SEARCH_USERS } from "./../../../gql/user";

export default function SearchBar() {
  //const [keyword, setKeyword] = useState(null);
  const [doSearch, { data, loading, error, called }] = useLazyQuery(
    SEARCH_USERS
  );

  const handleSearchChange = (event) => {
    if (loading || error) return null;
    const keyword = event.target.value;

    if (keyword) {
      doSearch({ variables: { keyword } });
      console.dir({ data });
    }
  };

  return (
    <Search
      className='search-bar'
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      placeholder='Search for your friends!'
      onSearchChange={(e) => handleSearchChange(e)}
    />
  );
}
