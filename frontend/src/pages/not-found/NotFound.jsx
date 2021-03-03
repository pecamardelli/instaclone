import React from "react";
import notFoundGif from "../../assets/images/404.gif";
import { Image } from "semantic-ui-react";

import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="not-found">
      <Image src={notFoundGif} />
      <h1>The page you art trying to reach doesn't exists!</h1>
      <h3>See console for details.</h3>
    </div>
  );
}
