import React from "react";
import { useQuery } from "@apollo/client";
import { getUserManyNotFollowedQuery } from "../../../gql/followerQueries";
import Error from "../../../components/common/Error/Error";
import UserCard from "../../../components/common/UserCard/UserCard";
import { map } from "lodash";

import "./UsersNotFollowed.scss";

export default function UsersNotFollowed() {
  const { data, loading, error } = useQuery(getUserManyNotFollowedQuery());

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { userManyNotFollowed } = data;

  return (
    <div className="users-not-followed">
      <h3>People that you may know...</h3>
      {userManyNotFollowed &&
        map(userManyNotFollowed, (user, index) => (
          <UserCard
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
