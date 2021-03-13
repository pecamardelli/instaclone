const _config = require("config");

const mongodbUriPreffix = _config.get("mongodbUriPreffix");
const mongodbUser = _config.get("mongodbUser");
const mongodbPassword = _config.get("mongodbPassword");
const mongodbNamePreffix = _config.get("mongodbNamePreffix");
const mongodbCluster = _config.get("mongodbCluster");
const mongodbUriDomain = _config.get("mongodbUriDomain");
const environment = process.env.NODE_ENV || "development";
const mongodbUri = `${mongodbUriPreffix}${mongodbUser}:${mongodbPassword}@${mongodbCluster}.${mongodbUriDomain}/${mongodbNamePreffix}${environment}`;

// The purpose of this object is to centralize all config values in one place.
// This way we can make changes from here and be sure that the app won't break up.
const config = {
  jwt: {
    privateKey: _config.get("jwtPrivateKey"),
    lifeTime: _config.get("jwtLifeTime") || "4h",
  },
  assets: {
    url: _config.get("assetsUrl"),
  },
  restApi: {
    serveStaticFiles: _config.get("serveStaticFiles"),
    serverPort: _config.get("restApiServerPort"),
  },
  mongodb: {
    uri: mongodbUri,
    sampleSize: _config.get("mongodbSampleSize"),
  },
  fileUploads: {
    directories: {
      publicDir: _config.get("publicDir"),
      baseDir: _config.get("baseDir"),
      userDir: _config.get("userDir"), // Directory where user data will be stored
      userAvatarDir: _config.get("userAvatarDir"), // Directory where profile images will be stored
      publicationsDir: _config.get("publicationsDir"),
    },
    maxUploadSize: _config.get("maxUploadSize") || 2097152, // Set to two megabytes if not defined
    protocol: _config.get("uploadProtocol") || "ftp", // This value must be one of the keys that define a protocol
    // This key must be one of 'protocol' values
    ftp: {
      host: _config.get("ftpHost"),
      port: _config.get("ftpPort"),
      publicUser: _config.get("ftpPublicUser"),
      publicPassword: _config.get("ftpPublicPassword"),
      privateUser: _config.get("ftpPrivateUser"),
      privatePassword: _config.get("ftpPrivatePassword"),
    },
    // This key must be one of 'protocol' values
    sftp: {
      host: _config.get("sftpHost"),
      port: _config.get("sftpPort"),
      publicUser: _config.get("sftpPublicUser"),
      publicPassword: _config.get("sftpPublicPassword"),
      privateUser: _config.get("sftpPrivateUser"),
      privatePassword: _config.get("sftpPrivatePassword"),
      secure: true,
    },
    aws: {
      id: _config.get("awsId"),
      secretKey: _config.get("awsSecretKey"),
      bucketName: _config.get("awsBucketName"),
    },
  },
  users: {
    roles: _config.get("users.roles"),
  },
  comments: {
    minLength: _config.get("comments.minLength") || 2,
    maxLength: _config.get("comments.maxLength") || 512,
  },
  publications: {
    minFileNameLength: _config.get("publications.minFileNameLength") || 1,
    maxFileNameLength: _config.get("publications.maxFileNameLength") || 64,
    minFileExtensionLength:
      _config.get("publications.minFileExtensionLength") || 1,
    maxFileExtensionLength:
      _config.get("publications.maxFileExtensionLength") || 16,
  },
  encrypt: {
    saltRounds: _config.get("saltRounds"),
  },
};

module.exports = config;
