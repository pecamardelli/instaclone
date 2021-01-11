import React from "react";
import { Link } from "react-router-dom";
import "./UserNotFound.scss";

export default function UserNotFound() {
  return (
    <div className="user-not-found">
      <p>User not found!</p>
      <p>The link you followed is invalid or the user has been deleted.</p>
      <Link to="/">Get back to home page</Link>
    </div>
  );
}
