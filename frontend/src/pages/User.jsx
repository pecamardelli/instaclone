import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Error from "../components/common/Error/Error";
import Publications from "../components/Publications/Publications";
import Profile from "../components/User/Profile/Profile";
import { getPublicationManyByUsernameQuery } from "../gql/publicationQueries";

export default function User() {
  const { username } = useParams();
  const { data, loading, error } = useQuery(
    getPublicationManyByUsernameQuery(),
    {
      variables: { filter: { username } },
    }
  );

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { publicationManyByUsername } = data;

  return (
    <>
      <Profile
        totalPublications={loading ? "??" : publicationManyByUsername.length}
      />
      <Publications publicationArray={publicationManyByUsername} />
    </>
  );
}
