import { useQuery } from "@apollo/client";
import React from "react";
import SearchResult from "../../../components/common/SearchResult/SearchResult";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follower";
import "./UsersNotFollowed.scss";

export default function UsersNotFollowed() {
  const { data, loading, error } = useQuery(GET_NOT_FOLLOWEDS, {
    fetchPolicy: "network-only",
  });

  if (loading) return null;
  if (error) return <h3>{error.message}</h3>;

  const { getNotFolloweds } = data;

  return (
    <div className="users-not-followed">
      <h3>People that you may know...</h3>
      {getNotFolloweds &&
        getNotFolloweds.map((user, index) => (
          <SearchResult
            key={index}
            data={{
              title: user.name,
              username: user.username,
              avatar: user.avatar,
            }}
          />
        ))}
    </div>
  );
}
