import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation Publish($file: Upload) {
    publish(file: $file) {
      status
      fileUrl
    }
  }
`;
