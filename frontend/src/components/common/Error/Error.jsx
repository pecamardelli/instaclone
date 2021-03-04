import React from "react";
import { Image } from "semantic-ui-react";
import errorGif from "../../../assets/images/error.gif";

import "./Error.scss";

export default function Error(props) {
  const { error } = props;

  return (
    <div className="error">
      <Image src={errorGif} />
      <h1>
        {error
          ? error.message || error.text
          : "There was an error with your request!"}
      </h1>
    </div>
  );
}
