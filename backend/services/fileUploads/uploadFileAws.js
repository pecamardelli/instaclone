const AWS = require("aws-sdk");
const { fileUploads } = require("../../config/config");
const { aws } = fileUploads;

if (!aws.id) throw new Error("AWS ID is not defined.");
if (!aws.bucketName) throw new Error("AWS bucket name is not defined.");
if (!aws.secretKey) throw new Error("AWS secret is not defined.");

const s3 = new AWS.S3({
  accessKeyId: aws.id,
  secretAccessKey: aws.secretKey,
});

const uploadFileAws = async (file, filePath) => {
  if (!file) throw new Error("File is not defined.");
  if (!filePath) throw new Error("File path is not defined.");

  const params = {
    Bucket: aws.bucketName,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadFileAws;
