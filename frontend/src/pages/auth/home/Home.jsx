import React from "react";
import useAuth from "../../../hooks/useAuth";

export default function Home() {
  const auth = useAuth();
  console.log(auth);

  return (
    <div>
      <h2>This is the home page!</h2>
    </div>
  );
}
