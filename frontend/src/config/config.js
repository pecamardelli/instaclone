import config from "./config.json";
// The purpose of this object is to centralize all config values in one place.
// This way we can make changes from here and be sure that the app won't break up.
const {
  assetsProtocol,
  assetsDomain,
  assetsPort,
  baseDir,
  userDir,
  userAvatarDir,
  publicationsDir,
} = config;

const assetsUrl = `${assetsProtocol}://${assetsDomain}${
  assetsPort ? ":" + assetsPort : ""
}`;
const userAvatarPath = `${assetsUrl}${baseDir}${userDir}${userAvatarDir}`;
const publicationsPath = `${assetsUrl}${baseDir}${publicationsDir}`;

const configurations = {
  urls: {
    userAvatarPath,
    publicationsPath,
  },
};

export default configurations;
