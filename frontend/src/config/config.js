import config from "./config.json";
// The purpose of this object is to centralize all config values in one place.
// This way we can make changes from here and be sure that the app won't break up.
const { assets } = config;

const {
  assetsProtocol,
  assetsDomain,
  assetsPort,
  baseDir,
  userDir,
  userAvatarDir,
  publicationsDir,
} = assets;

const assetsUrl = `${assetsProtocol}://${assetsDomain}${
  assetsPort ? ":" + assetsPort : ""
}`;
const userAvatarPath = `${assetsUrl}${baseDir}${userDir}${userAvatarDir}`;
const publicationsPath = `${assetsUrl}${baseDir}${publicationsDir}`;

export const urls = {
  userAvatarPath,
  publicationsPath,
};

export const publications = { ...config.publications };
