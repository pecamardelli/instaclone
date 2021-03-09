import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import { getUserManyQuery } from "./../../../gql/userQueries";
import UserCard from "../../common/UserCard/UserCard";

import "./SearchBar.scss";

export default function SearchBar() {
  const [keyword, setKeyword] = useState(null);
  const [results, setResults] = useState([]);
  const [doSearch, { data, loading, error }] = useLazyQuery(getUserManyQuery());

  if (error) console.error(error);

  useEffect(() => {
    if (keyword) {
      doSearch({
        variables: {
          filter: {
            _operators: { username: { regex: keyword } },
          },
        },
      });
    }

    if (data) {
      const users = data.userMany;
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
      resultRenderer={(e) => <UserCard data={e} />}
      loading={loading}
      value={keyword || ""}
    />
  );
}
