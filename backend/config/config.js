const config = require("config");

const mongodbUriPreffix = config.get("mongodbUriPreffix");
const mongodbUser = config.get("mongodbUser");
const mongodbPassword = config.get("mongodbPassword");
const mongodbNamePreffix = config.get("mongodbNamePreffix");
const mongodbCluster = config.get("mongodbCluster");
const mongodbUriDomain = config.get("mongodbUriDomain");
const environment = process.env.NODE_ENV || "development";
const mongodbUri = `${mongodbUriPreffix}${mongodbUser}:${mongodbPassword}@${mongodbCluster}.${mongodbUriDomain}/${mongodbNamePreffix}${environment}`;

// The purpose of this object is to centralize all config values in one place.
// This way we can make changes from here and be sure that the app won't break up.
const configurations = {
  mongodb: {
    uri: mongodbUri,
  },
  fileUploads: {
    directories: {
      baseDir: config.get("baseDir"),
      userDir: config.get("userDir"), // Directory where user data will be stored
      userAvatarDir: config.get("userAvatarDir"), // Directory where profile images will be stored
    },
    maxUploadSize: config.get("maxUploadSize") || 2097152, // Set to two megabytes if not defined
    protocol: config.get("uploadProtocol") || "ftp", // This value must be one of the keys that define a protocol
    // This key must be one of 'protocol' values
    sftp: {
      host: config.get("ftpHost"),
      port: config.get("ftpPort"),
      publicUser: config.get("ftpPublicUser"),
      publicPassword: config.get("ftpPublicPassword"),
      privateUser: config.get("ftpPrivateUser"),
      privatePassword: config.get("ftpPrivatePassword"),
    },
    // This key must be one of 'protocol' values
    ftp: {
      host: config.get("sftpHost"),
      port: config.get("sftpPort"),
      publicUser: config.get("sftpPublicUser"),
      publicPassword: config.get("sftpPublicPassword"),
      privateUser: config.get("sftpPrivateUser"),
      privatePassword: config.get("sftpPrivatePassword"),
      secure: true,
    },
  },
};

module.exports = configurations;
