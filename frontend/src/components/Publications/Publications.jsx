import React from "react";
import { Grid } from "semantic-ui-react";
import PublicationPreview from "./PublicationPreview/PublicationPreview";
import "./Publications.scss";

export default function Publications(props) {
  const { publicationArray } = props;
  return (
    <div className="publications">
      <h2>Publications</h2>
      <Grid columns={4}>
        {Array.isArray(publicationArray) &&
          publicationArray.map((pub, index) => (
            <Grid.Column key={index}>
              <PublicationPreview publication={pub} />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
}
