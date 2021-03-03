import React from "react";
import { useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import errorGif from "../../../assets/images/error.gif";

import "./Error.scss";

export default function Error(props) {
  const { error } = props;
  const history = useHistory();

  return (
    <div className="error">
      <Image src={errorGif} />
      <h1>
        {error
          ? error.message || error.text
          : "There was an error with your request!"}
      </h1>
      <h3 onClick={() => history.goBack()}>Go back.</h3>
    </div>
  );
}
