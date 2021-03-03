import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Error from "../components/common/Error/Error";
import Publications from "../components/Publications/Publications";
import Profile from "../components/User/Profile/Profile";
import { GET_PUBLICATIONS } from "../gql/publication";

export default function User() {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_PUBLICATIONS, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { getPublications } = data;

  return (
    <>
      <Profile totalPublications={loading ? "??" : getPublications.length} />
      <Publications publicationArray={getPublications} />
    </>
  );
}
