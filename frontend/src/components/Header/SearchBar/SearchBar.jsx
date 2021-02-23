import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import "./SearchBar.scss";
import { SEARCH_USERS } from "./../../../gql/user";
import SearchResult from "../../common/SearchResult/SearchResult";

export default function SearchBar() {
  const [keyword, setKeyword] = useState(null);
  const [results, setResults] = useState([]);
  const [doSearch, { data, loading, error }] = useLazyQuery(SEARCH_USERS);

  if (error) console.error(error);

  useEffect(() => {
    if (keyword) {
      doSearch({ variables: { keyword } });
    }

    if (data) {
      const users = data.search;
      const formattedUserArray = [];

      users.forEach((user, index) => {
        formattedUserArray.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });

      setResults(formattedUserArray);
    }
  }, [data, keyword, setResults, doSearch]);

  const handleResultSelect = () => {
    setResults([]);
    setKeyword("");
  };

  return (
    <Search
      className="search-results"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      placeholder="Search for your friends!"
      onSearchChange={(e) => setKeyword(e.target.value)}
      onResultSelect={handleResultSelect}
      results={results}
      resultRenderer={(e) => <SearchResult data={e} />}
      loading={loading}
      value={keyword || ""}
    />
  );
}
